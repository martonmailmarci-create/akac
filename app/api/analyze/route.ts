import { NextRequest, NextResponse } from "next/server";

async function runOnce(normalized: string, strategy: string, key: string | undefined) {
  const apiUrl =
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(normalized)}&strategy=${strategy}` +
    (key ? `&key=${key}` : "");

  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message ?? `PageSpeed API returned ${res.status}`);
  }
  return (await res.json()).lighthouseResult;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const strategy = searchParams.get("strategy") ?? "mobile";

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;

  try { new URL(normalized); } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const lhr = await runOnce(normalized, strategy, process.env.PAGESPEED_API_KEY);
    const categories = (lhr as { categories: Record<string, { score: number }> }).categories;
    const score = Math.round((categories?.performance?.score ?? 0) * 100);
    const audits = (lhr as { audits: Record<string, { displayValue?: string; score?: number; numericValue?: number }> }).audits;

    const pick = (id: string) => {
      const audit = audits?.[id];
      return {
        displayValue: audit?.displayValue ?? "—",
        score: audit?.score ?? null,
        numericValue: audit?.numericValue ?? null,
      };
    };

    return NextResponse.json({
      url: normalized,
      strategy,
      score,
      metrics: {
        fcp: pick("first-contentful-paint"),
        lcp: pick("largest-contentful-paint"),
        tbt: pick("total-blocking-time"),
        cls: pick("cumulative-layout-shift"),
        si: pick("speed-index"),
        tti: pick("interactive"),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Something went wrong." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const strategy = searchParams.get("strategy") ?? "mobile";

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = "https://" + normalized;
  }

  try {
    new URL(normalized);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const key = process.env.PAGESPEED_API_KEY;
  const apiUrl =
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(normalized)}&strategy=${strategy}` +
    (key ? `&key=${key}` : "");

  const res = await fetch(apiUrl, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body?.error?.message ?? `PageSpeed API returned ${res.status}`;
    return NextResponse.json({ error: message }, { status: res.status });
  }

  const data = await res.json();
  const lhr = data.lighthouseResult;

  const score = Math.round((lhr.categories.performance?.score ?? 0) * 100);

  const pick = (id: string) => {
    const audit = lhr.audits?.[id];
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
}

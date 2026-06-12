import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limit: max 10 analyses per IP per hour.
// Resets on cold start, which is acceptable for this tool.
const requests = new Map<string, number[]>();
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    requests.set(ip, recent);
    return true;
  }
  recent.push(now);
  requests.set(ip, recent);
  return false;
}

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
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

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

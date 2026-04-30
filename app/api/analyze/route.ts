import { NextRequest, NextResponse } from "next/server";

const RUNS = 3;

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

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

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

  // Run RUNS times in parallel, drop any that fail
  const results = await Promise.allSettled(
    Array.from({ length: RUNS }, () => runOnce(normalized, strategy, key))
  );

  const lhrs = results
    .filter((r): r is PromiseFulfilledResult<Record<string, unknown>> => r.status === "fulfilled")
    .map((r) => r.value);

  if (lhrs.length === 0) {
    const firstError = (results[0] as PromiseRejectedResult).reason as Error;
    return NextResponse.json({ error: firstError.message }, { status: 500 });
  }

  // Pick the median result by performance score
  const scores = lhrs.map((lhr) => {
    const categories = lhr.categories as Record<string, { score: number }>;
    return Math.round((categories.performance?.score ?? 0) * 100);
  });

  const medianScore = Math.round(median(scores));

  // Use the LHR whose score is closest to the median for metric details
  const bestLhr = lhrs.reduce((prev, curr) => {
    const prevCats = prev.categories as Record<string, { score: number }>;
    const currCats = curr.categories as Record<string, { score: number }>;
    const prevScore = Math.round((prevCats.performance?.score ?? 0) * 100);
    const currScore = Math.round((currCats.performance?.score ?? 0) * 100);
    return Math.abs(prevScore - medianScore) <= Math.abs(currScore - medianScore) ? prev : curr;
  });

  const audits = bestLhr.audits as Record<string, { displayValue?: string; score?: number; numericValue?: number }>;

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
    score: medianScore,
    runs: lhrs.length,
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

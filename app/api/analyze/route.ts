import { NextRequest, NextResponse } from "next/server";

const RUNS = 5;
const DELAY_MS = 1500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

function trimmedMean(values: number[]): number {
  if (values.length <= 2) return values.reduce((a, b) => a + b, 0) / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  // Drop highest and lowest, average the rest
  const trimmed = sorted.slice(1, -1);
  return Math.round(trimmed.reduce((a, b) => a + b, 0) / trimmed.length);
}

function stdDev(values: number[]): number {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return Math.round(Math.sqrt(variance));
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
  const lhrs: Record<string, unknown>[] = [];
  const individualScores: number[] = [];

  // Run sequentially with delay between each to get independent samples
  for (let i = 0; i < RUNS; i++) {
    try {
      const lhr = await runOnce(normalized, strategy, key);
      const categories = (lhr as { categories: Record<string, { score: number }> }).categories;
      const score = Math.round((categories?.performance?.score ?? 0) * 100);
      lhrs.push(lhr as Record<string, unknown>);
      individualScores.push(score);
    } catch {
      // Skip failed runs silently
    }
    // Delay between runs (skip delay after the last run)
    if (i < RUNS - 1) await sleep(DELAY_MS);
  }

  if (lhrs.length === 0) {
    return NextResponse.json({ error: "All test runs failed. Check the URL and try again." }, { status: 500 });
  }

  const finalScore = trimmedMean(individualScores);
  const spread = Math.max(...individualScores) - Math.min(...individualScores);
  const deviation = stdDev(individualScores);

  // Pick the LHR whose score is closest to the final score for metric details
  const representativeLhr = lhrs.reduce((prev, curr) => {
    const prevCats = (prev as { categories: Record<string, { score: number }> }).categories;
    const currCats = (curr as { categories: Record<string, { score: number }> }).categories;
    const prevScore = Math.round((prevCats?.performance?.score ?? 0) * 100);
    const currScore = Math.round((currCats?.performance?.score ?? 0) * 100);
    return Math.abs(prevScore - finalScore) <= Math.abs(currScore - finalScore) ? prev : curr;
  });

  const audits = (representativeLhr as { audits: Record<string, { displayValue?: string; score?: number; numericValue?: number }> }).audits;

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
    score: finalScore,
    runs: lhrs.length,
    individualScores,
    spread,
    deviation,
    confidence: deviation <= 5 ? "high" : deviation <= 10 ? "medium" : "low",
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

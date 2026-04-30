import { NextRequest, NextResponse } from "next/server";

// Lighthouse runs locally — no external API, no quota limits.
// chrome-launcher finds the installed Chrome/Chromium automatically.
export const maxDuration = 60;

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

  const isMobile = strategy === "mobile";

  // Dynamically import so Next.js doesn't try to bundle them for the client
  const { default: lighthouse } = await import("lighthouse");
  const chromeLauncher = await import("chrome-launcher");

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  let lhr: Record<string, unknown>;
  try {
    const result = await lighthouse(normalized, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance"],
      formFactor: isMobile ? "mobile" : "desktop",
      screenEmulation: isMobile
        ? { mobile: true, width: 375, height: 812, deviceScaleFactor: 3, disabled: false }
        : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
      throttlingMethod: "simulate",
    });
    lhr = result!.lhr as unknown as Record<string, unknown>;
  } finally {
    await chrome.kill();
  }

  const categories = lhr.categories as Record<string, { score: number }>;
  const audits = lhr.audits as Record<string, { displayValue?: string; score?: number; numericValue?: number }>;

  const score = Math.round((categories.performance?.score ?? 0) * 100);

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
}

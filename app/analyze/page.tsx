"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/* ─── Types ─────────────────────────────────────────────── */
interface Metric {
  displayValue: string;
  score: number | null;
  numericValue: number | null;
}

interface AnalyzeResult {
  url: string;
  strategy: string;
  score: number;
  runs: number;
  individualScores: number[];
  spread: number;
  deviation: number;
  confidence: "high" | "medium" | "low";
  metrics: {
    fcp: Metric;
    lcp: Metric;
    tbt: Metric;
    cls: Metric;
    si: Metric;
    tti: Metric;
  };
}

/* ─── Helpers ────────────────────────────────────────────── */
function scoreColor(score: number | null): string {
  if (score === null) return "#666666";
  if (score >= 0.9) return "#22c55e";
  if (score >= 0.5) return "#ED6D40";
  return "#ef4444";
}

function scoreLabel(score: number): string {
  if (score >= 90) return "GOOD";
  if (score >= 50) return "NEEDS WORK";
  return "POOR";
}

function scoreBigColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#ED6D40";
  return "#ef4444";
}

function confidenceColor(c: string): string {
  if (c === "high") return "#22c55e";
  if (c === "medium") return "#ED6D40";
  return "#ef4444";
}

function confidenceLabel(c: string): string {
  if (c === "high") return "High confidence — consistent results";
  if (c === "medium") return "Medium confidence — some variability";
  return "Low confidence — results vary significantly";
}

/* ─── Score gauge ────────────────────────────────────────── */
function ScoreGauge({ score }: { score: number }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = scoreBigColor(score);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#222" strokeWidth="10" />
        <circle
          cx="90" cy="90" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
        <text x="90" y="85" textAnchor="middle" fill={color} fontSize="40" fontWeight="700" fontFamily="var(--font-inter), sans-serif">
          {score}
        </text>
        <text x="90" y="108" textAnchor="middle" fill="#555" fontSize="12" fontWeight="500" fontFamily="var(--font-inter), sans-serif" letterSpacing="1">
          / 100
        </text>
      </svg>
      <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", color, textTransform: "uppercase" }}>
        {scoreLabel(score)}
      </span>
    </div>
  );
}

/* ─── Metric card ────────────────────────────────────────── */
function MetricCard({ label, metric }: { label: string; metric: Metric }) {
  const color = scoreColor(metric.score);
  return (
    <div style={{
      border: "1px solid #222",
      borderTop: `2px solid ${color}`,
      borderRadius: "12px",
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      background: "#161616",
    }}>
      <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em", color: "#666", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontSize: "26px", fontWeight: 700, color: "#D9D9D9", letterSpacing: "-0.5px", lineHeight: 1 }}>
        {metric.displayValue}
      </span>
      <span style={{ fontSize: "11px", fontWeight: 500, color, textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {metric.score === null ? "—" : metric.score >= 0.9 ? "Good" : metric.score >= 0.5 ? "Needs work" : "Poor"}
      </span>
    </div>
  );
}

/* ─── Individual run dots ────────────────────────────────── */
function RunDots({ scores }: { scores: number[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
      <span style={{ fontSize: "10px", fontWeight: 600, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase" }}>
        Individual runs:
      </span>
      {scores.map((s, i) => (
        <div
          key={i}
          title={`Run ${i + 1}: ${s}`}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "#1a1a1a",
            border: `1px solid ${scoreBigColor(s)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            color: scoreBigColor(s),
          }}
        >
          {s}
        </div>
      ))}
      <span style={{ fontSize: "11px", color: "#444", marginLeft: "4px" }}>
        (highest + lowest dropped)
      </span>
    </div>
  );
}

/* ─── Strategy toggle ────────────────────────────────────── */
function StrategyToggle({ value, onChange }: { value: "mobile" | "desktop"; onChange: (v: "mobile" | "desktop") => void }) {
  const btn = (label: string, v: "mobile" | "desktop") => (
    <button
      onClick={() => onChange(v)}
      style={{
        padding: "6px 20px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        border: "1px solid",
        borderColor: value === v ? "#ED6D40" : "#333",
        background: value === v ? "rgba(237,109,64,0.12)" : "transparent",
        color: value === v ? "#ED6D40" : "#666",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {btn("Mobile", "mobile")}
      {btn("Desktop", "desktop")}
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
const TOTAL_RUNS = 5;
const RUN_DURATION_MS = 20000; // ~20s per run
const TOTAL_ESTIMATED_MS = TOTAL_RUNS * RUN_DURATION_MS + (TOTAL_RUNS - 1) * 1500;

export default function AnalyzePage() {
  const [inputUrl, setInputUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const barRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const runLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  function setBarWidth(p: number) {
    if (barRef.current) barRef.current.style.width = `${p}%`;
    if (labelRef.current) labelRef.current.textContent = `${Math.floor(p)}%`;
  }

  function startProgress() {
    if (barWrapRef.current) barWrapRef.current.style.opacity = "1";
    if (barRef.current) barRef.current.style.transition = "none";
    setBarWidth(0);
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(92, (elapsed / TOTAL_ESTIMATED_MS) * 92);
      const currentRun = Math.min(TOTAL_RUNS, Math.floor(elapsed / RUN_DURATION_MS) + 1);
      setBarWidth(progress);
      if (runLabelRef.current) {
        runLabelRef.current.textContent = `Run ${currentRun} of ${TOTAL_RUNS}…`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  }

  function completeProgress() {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (barRef.current) barRef.current.style.transition = "width 0.4s ease";
    setBarWidth(100);
    if (runLabelRef.current) runLabelRef.current.textContent = "Done!";
    setTimeout(() => {
      if (barWrapRef.current) barWrapRef.current.style.opacity = "0";
      setTimeout(() => setBarWidth(0), 300);
    }, 500);
  }

  async function handleAnalyze() {
    if (!inputUrl.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    startProgress();

    try {
      const res = await fetch(`/api/analyze?url=${encodeURIComponent(inputUrl.trim())}&strategy=${strategy}`);
      const data = await res.json();
      completeProgress();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setResult(data);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch {
      completeProgress();
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const metrics: { label: string; key: keyof AnalyzeResult["metrics"] }[] = [
    { label: "First Contentful Paint", key: "fcp" },
    { label: "Largest Contentful Paint", key: "lcp" },
    { label: "Total Blocking Time", key: "tbt" },
    { label: "Cumulative Layout Shift", key: "cls" },
    { label: "Speed Index", key: "si" },
    { label: "Time to Interactive", key: "tti" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ background: "#111111", minHeight: "100svh" }}>
        <section style={{
          paddingTop: "160px",
          paddingBottom: "100px",
          paddingLeft: "clamp(24px, 8vw, 100px)",
          paddingRight: "clamp(24px, 8vw, 100px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "36px",
        }}>
          <p style={{ fontSize: "12px", fontWeight: 500, color: "#ED6D40", letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
            / AKAC STUDIO — FREE TOOL
          </p>
          <h1 style={{
            fontSize: "clamp(32px, 6vw, 60px)",
            fontWeight: 600,
            color: "#D9D9D9",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            margin: 0,
            maxWidth: "800px",
          }}>
            How fast is{" "}
            <span style={{ color: "#ED6D40", fontStyle: "italic", textShadow: "0 0 30px rgba(237,109,64,0.3)" }}>
              your site?
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 400, color: "#888", lineHeight: 1.6, maxWidth: "560px", margin: 0 }}>
            Runs {TOTAL_RUNS} sequential Lighthouse tests and drops the highest and lowest score — giving you a stable, accurate result instead of a lucky number.
          </p>

          <StrategyToggle value={strategy} onChange={setStrategy} />

          <div style={{
            display: "flex",
            width: "100%",
            maxWidth: "660px",
            border: "1px solid #333",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#161616",
          }}>
            <input
              type="url"
              placeholder="https://yoursite.com"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleAnalyze()}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "16px 20px",
                fontSize: "16px",
                fontWeight: 400,
                color: "#D9D9D9",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !inputUrl.trim()}
              style={{
                padding: "16px 28px",
                background: loading ? "#222" : "#ED6D40",
                border: "none",
                color: "#111111",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: loading || !inputUrl.trim() ? "not-allowed" : "pointer",
                transition: "background 0.2s ease",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {loading ? "Testing…" : "Analyze"}
            </button>
          </div>

          {/* Progress */}
          <div style={{
            width: "100%",
            maxWidth: "660px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "-16px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }} ref={barWrapRef}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span ref={runLabelRef} style={{ fontSize: "12px", fontWeight: 500, color: "#666", fontFamily: "var(--font-inter), sans-serif" }}>
                Run 1 of {TOTAL_RUNS}…
              </span>
              <span ref={labelRef} style={{ fontSize: "12px", fontWeight: 600, color: "#ED6D40", letterSpacing: "0.05em", fontFamily: "var(--font-inter), sans-serif" }}>
                0%
              </span>
            </div>
            <div style={{ width: "100%", height: "6px", background: "#1e1e1e", borderRadius: "99px", overflow: "hidden" }}>
              <div ref={barRef} style={{ height: "100%", width: "0%", background: "linear-gradient(90deg, #ED6D40, #f59e6a)", borderRadius: "99px" }} />
            </div>
            <p style={{ fontSize: "11px", color: "#444", margin: 0, textAlign: "left" }}>
              5 sequential tests take ~2 minutes — this gives you a meaningful average, not a lucky single result.
            </p>
          </div>

          {error && (
            <p style={{ fontSize: "14px", color: "#ef4444", margin: 0 }}>{error}</p>
          )}
        </section>

        {result && (
          <section ref={resultsRef} style={{
            paddingTop: "80px",
            paddingBottom: "120px",
            paddingLeft: "clamp(24px, 8vw, 100px)",
            paddingRight: "clamp(24px, 8vw, 100px)",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}>
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Results for
              </span>
              <span style={{ fontSize: "18px", fontWeight: 600, color: "#ED6D40", letterSpacing: "-0.3px", wordBreak: "break-all" }}>
                {result.url}
              </span>
              <span style={{ fontSize: "11px", fontWeight: 500, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {result.strategy} · {result.runs} sequential runs · Highest + lowest dropped · Powered by Google Lighthouse
              </span>
            </div>

            {/* Score + metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "60px", alignItems: "start" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                background: "#161616",
                border: "1px solid #222",
                borderRadius: "20px",
                padding: "40px 48px",
              }}>
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Performance
                </span>
                <ScoreGauge score={result.score} />
                <div style={{ textAlign: "center", marginTop: "4px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "#444" }}>
                    Range: {Math.min(...result.individualScores)}–{Math.max(...result.individualScores)}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                {metrics.map(({ label, key }) => (
                  <MetricCard key={key} label={label} metric={result.metrics[key]} />
                ))}
              </div>
            </div>

            {/* Individual run scores + confidence */}
            <div style={{
              background: "#161616",
              border: "1px solid #222",
              borderRadius: "16px",
              padding: "24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              <RunDots scores={result.individualScores} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "2px",
                  background: confidenceColor(result.confidence),
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: "12px", fontWeight: 500, color: confidenceColor(result.confidence) }}>
                  {confidenceLabel(result.confidence)}
                </span>
                <span style={{ fontSize: "12px", color: "#444", marginLeft: "4px" }}>
                  (±{result.deviation} pts std dev, {result.spread} pt spread)
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "12px", color: "#444", lineHeight: 1.6 }}>
                Lighthouse scores vary run-to-run due to network conditions and server load on Google&apos;s test infrastructure. Running {result.runs} tests and trimming outliers gives a more stable estimate — but a ±5 pt variance is normal even for a well-optimised site.
              </p>
            </div>

            {/* CTA */}
            <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: "48px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "600px" }}>
              <p style={{ margin: 0, fontSize: "22px", fontWeight: 600, color: "#D9D9D9", letterSpacing: "-0.4px" }}>
                Want a faster site?
              </p>
              <p style={{ margin: 0, fontSize: "15px", color: "#666", lineHeight: 1.6 }}>
                We build high-performance websites from the ground up. Zero bloat, sub-second load times, and a score you can be proud of.
              </p>
              <div style={{ marginTop: "8px" }}>
                <a
                  href="/contact"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    border: "1px solid #ED6D40",
                    color: "#ED6D40",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    borderRadius: "6px",
                    textDecoration: "none",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "#ED6D40";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#111";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#ED6D40";
                  }}
                >
                  Let&apos;s talk
                </a>
              </div>
            </div>
          </section>
        )}

        {!result && !loading && <div style={{ height: "60px" }} />}
        <Footer />
      </main>
    </>
  );
}

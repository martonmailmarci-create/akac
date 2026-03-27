"use client";

import { useEffect, useRef } from "react";

const rows = [
  { other: "MONTHS OF BACK-AND-FORTH",          akac: "LIVE IN 2–4 WEEKS" },
  { other: "TALK TO AN ACCOUNT MANAGER",         akac: "TALK DIRECTLY TO THE TEAM" },
  { other: "COOKIE-CUTTER TEMPLATES",            akac: "DESIGNED AROUND YOUR BRAND" },
  { other: "REVISIONS COST EXTRA",               akac: "WE ITERATE UNTIL YOU'RE HAPPY" },
  { other: "THREE DEPARTMENTS, ONE PROJECT",     akac: "TWO SPECIALISTS, FULL OWNERSHIP" },
  { other: "VAGUE TIMELINES, SURPRISE INVOICES", akac: "CLEAR SCOPE, TRANSPARENT PRICING" },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.from(leftRef.current, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
        gsap.from(rightRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-akac-light px-[100px] pt-[80px] pb-[200px]"
    >
      {/* Header row */}
      <div style={{ position: "relative", marginBottom: "150px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#111111", textTransform: "uppercase", letterSpacing: "0.18px" }}>
            / WHY CHOOSE US
          </span>
          <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px", marginTop: "8px" }}>
            WHY CHOOSE US?
          </h2>
        </div>

        <div style={{ position: "absolute", top: 0, left: "50%", width: "45%" }}>
          <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(17,17,17,0.2)", marginBottom: "16px" }} />
          <p style={{ fontSize: "16px", fontWeight: 500, color: "#111111", lineHeight: "18px", letterSpacing: "0.24px", marginBottom: "24px" }}>
            Most agencies put an account manager between you and the work. We don&apos;t. You get two specialists who care about the outcome as much as you do, one focused on design, one on code, working together on your project from day one to launch. No handoffs, no delays, no inflated timelines to justify a bigger team.
          </p>
          <a
            href="#contact"
            style={{ display: "inline-flex", alignItems: "center", fontSize: "13px", fontWeight: 500, color: "#111111", letterSpacing: "0.18px", textDecoration: "none", transition: "opacity 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            [ START A PROJECT ]
          </a>
        </div>
      </div>

      {/* Comparison */}
      <div className="flex gap-6">
        {/* Other agencies */}
        <div
          ref={leftRef}
          className="flex-1 bg-akac-offwhite rounded-card overflow-hidden"
        >
          <div className="px-8 py-5 border-b border-akac-black/10">
            <h3 className="text-[13px] font-bold text-akac-black uppercase tracking-[0.18px]">
              Other Agencies
            </h3>
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 py-5 border-b border-akac-black/10 last:border-b-0"
            >
              <div
                style={{ width: "7px", height: "7px", backgroundColor: "#111111", opacity: 0.3, flexShrink: 0 }}
                aria-hidden="true"
              />
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#111111", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.18px", lineHeight: "1.4" }}>
                {row.other}
              </span>
            </div>
          ))}
        </div>

        {/* AKAC */}
        <div
          ref={rightRef}
          className="flex-1 bg-akac-black rounded-card overflow-hidden"
        >
          <div className="flex items-center gap-3 px-8 py-5 border-b border-akac-light/10">
            <div
              style={{ width: "7px", height: "7px", backgroundColor: "#ED6D40", flexShrink: 0 }}
              aria-hidden="true"
            />
            <h3 className="text-[13px] font-bold text-akac-cream uppercase tracking-[0.18px]">
              AKAC
            </h3>
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8 py-5 border-b border-akac-light/10 last:border-b-0"
            >
              <div
                style={{ width: "7px", height: "7px", backgroundColor: "#ED6D40", flexShrink: 0 }}
                aria-hidden="true"
              />
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#F9F9F4", textTransform: "uppercase", letterSpacing: "0.18px", lineHeight: "1.4" }}>
                {row.akac}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

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
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.from(leftRef.current, { x: -40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
        gsap.from(rightRef.current, { x: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="why-akac"
      ref={sectionRef}
      className="bg-akac-light px-6 pt-24 pb-32 md:px-[100px] md:pt-[80px] md:pb-[200px]"
    >
      <SectionHeader
        label="/ WHY CHOOSE US"
        title="WHY CHOOSE US?"
        body="Most agencies put an account manager between you and the work. We don't. You get two specialists who care about the outcome as much as you do, one focused on design, one on code, working together on your project from day one to launch. No handoffs, no delays, no inflated timelines to justify a bigger team."
        cta={{ text: "START A PROJECT", href: "/contact" }}
        mbClass="mb-20 md:mb-[185px]"
      />

      {/* Comparison cards — stack on mobile */}
      <div className="flex flex-col md:flex-row gap-6">
        <div ref={leftRef} className="flex-1 bg-akac-offwhite rounded-card overflow-hidden">
          <div className="px-8 py-5 border-b border-akac-black/10">
            <h3 className="text-[13px] font-bold text-akac-black uppercase tracking-[0.18px]">Other Agencies</h3>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-3 px-8 py-6 border-b border-akac-black/10 last:border-b-0">
              <div className="w-[7px] h-[7px] bg-akac-black opacity-30 flex-shrink-0" aria-hidden="true" />
              <span className="text-[13px] font-medium text-akac-black/50 uppercase tracking-[0.18px] leading-[1.4]">
                {row.other}
              </span>
            </div>
          ))}
        </div>

        <div ref={rightRef} className="flex-1 bg-akac-black rounded-card overflow-hidden">
          <div className="flex items-center gap-3 px-8 py-5 border-b border-akac-light/10">
            <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" aria-hidden="true" />
            <h3 className="text-[13px] font-bold text-akac-cream uppercase tracking-[0.18px]">AKAC</h3>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-3 px-8 py-6 border-b border-akac-light/10 last:border-b-0">
              <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" aria-hidden="true" />
              <span className="text-[13px] font-medium text-akac-cream uppercase tracking-[0.18px] leading-[1.4]">
                {row.akac}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

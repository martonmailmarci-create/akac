"use client";

import { useEffect, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function WhyUs() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  const rows = [
    { other: t.whyUs.r1Other, akac: t.whyUs.r1Akac },
    { other: t.whyUs.r2Other, akac: t.whyUs.r2Akac },
    { other: t.whyUs.r3Other, akac: t.whyUs.r3Akac },
    { other: t.whyUs.r4Other, akac: t.whyUs.r4Akac },
    { other: t.whyUs.r5Other, akac: t.whyUs.r5Akac },
    { other: t.whyUs.r6Other, akac: t.whyUs.r6Akac },
  ];
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap } = await import("@/lib/gsap");
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
        label={t.whyUs.label}
        title={t.whyUs.title}
        body={t.whyUs.body}
        cta={{ text: t.whyUs.cta, href: "/contact" }}
        mbClass="mb-20 md:mb-[185px]"
      />

      {/* Comparison cards — stack on mobile */}
      <div className="flex flex-col md:flex-row gap-6">
        <div ref={leftRef} className="flex-1 bg-akac-offwhite rounded-card overflow-hidden">
          <div className="px-8 py-5 border-b border-akac-black/10">
            <h3 className="text-[13px] font-bold text-akac-black uppercase tracking-[0.18px]">{t.whyUs.otherAgencies}</h3>
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

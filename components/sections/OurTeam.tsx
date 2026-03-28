"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import BracketButton from "@/components/ui/BracketButton";

export default function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger, SplitText } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        const split = new SplitText(headlineRef.current, { type: "words" });
        gsap.from(split.words, {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px]"
      style={{ marginTop: "-60px", position: "relative", zIndex: 1 }}
    >
      <div className="px-6 pt-20 pb-0 md:px-[100px] md:pt-[180px]">
        {/* Top labels */}
        <div className="flex justify-between mb-12">
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
          <span className="hidden md:inline text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
        </div>

        {/* Descriptor */}
        <p className="text-[16px] font-medium text-akac-light uppercase tracking-[0.24px] leading-[18px] text-center mb-10">
          TWO PEOPLE. ONE SHARED OBSESSION.
          <br />
          DESIGN AND CODE, UNDER ONE ROOF.
        </p>

        {/* CTA */}
        <div className="flex justify-center mb-16">
          <BracketButton label="START A PROJECT" color="#D9D9D9" href="#contact" />
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[32px] md:text-[55px] font-semibold text-akac-light tracking-[-1.1px] leading-[1.1] text-center mb-16"
        >
          WE DON&apos;T HAND OFF. /
          <br />
          WE SEE IT THROUGH.
        </h2>

        {/* Photos */}
        <div className="flex justify-center">
          {/* Mobile: photos side by side scaled down; Desktop: 520x480 with overlap */}
          <div className="relative rounded-card overflow-hidden flex-shrink-0 w-[calc(50vw-40px)] h-[calc(50vw-50px)] md:w-[520px] md:h-[480px]" style={{ zIndex: 2 }}>
            <Image src="/Marcell.png" alt="Marcell Marton" fill className="object-cover" sizes="(max-width: 768px) 50vw, 520px" />
          </div>
          <div className="relative rounded-card overflow-hidden flex-shrink-0 w-[calc(50vw-40px)] h-[calc(50vw-50px)] md:w-[520px] md:h-[480px] -ml-8 md:-ml-[80px]" style={{ zIndex: 1 }}>
            <Image src="/Viktor.png" alt="Viktor Miller" fill className="object-cover" sizes="(max-width: 768px) 50vw, 520px" />
          </div>
        </div>
      </div>
    </section>
  );
}

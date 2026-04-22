"use client";

import { useEffect, useRef } from "react";
import BracketButton from "@/components/ui/BracketButton";

export default function CTA({ centered = false }: { centered?: boolean }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(headlineRef.current,
          { yPercent: -10 },
          { yPercent: 10, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 2 } }
        );
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`bg-akac-black rounded-[24px] md:rounded-section text-center overflow-hidden mx-2 my-2 md:mx-4 md:my-4 px-6 pt-40 pb-32 min-h-screen md:px-[100px] flex flex-col items-center ${centered ? "md:min-h-[900px] md:py-[80px] justify-center" : "md:min-h-0 md:pt-[220px] md:pb-[420px] justify-start"}`}
    >
      <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px] block mb-10">
        / LET&apos;S TALK
      </span>

      <h2
        ref={headlineRef}
        className="text-[30px] font-medium text-akac-light tracking-[-0.6px] leading-[32px] mb-12 max-w-[700px] mx-auto uppercase"
      >
        LET US TAKE YOU FURTHER
        <br />
        THAN YOU&apos;VE EVER BEEN
      </h2>

      <p className="text-[16px] font-semibold text-akac-light tracking-[0.24px] leading-[1.5] mb-12 max-w-[560px] mx-auto uppercase">
        BOOK A 15-MINUTE CALL OR SEND US A MESSAGE.
        <br />
        NO PREPARATION NEEDED.
      </p>

      <BracketButton label="BOOK A CALL" color="#D9D9D9" href="mailto:hello@akac.studio" />
    </section>
  );
}

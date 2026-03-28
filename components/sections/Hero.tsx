"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import BracketButton from "@/components/ui/BracketButton";

export default function Hero() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const bodyTopRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, SplitText } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        const split1 = new SplitText(line1Ref.current, { type: "chars" });
        const split2 = new SplitText(line2Ref.current, { type: "chars" });
        const tl = gsap.timeline({ delay: 0.2 });
        tl.from(split1.chars, { y: 80, opacity: 0, duration: 0.9, stagger: 0.025, ease: "power3.out" })
          .from(split2.chars, { y: 80, opacity: 0, duration: 0.9, stagger: 0.025, ease: "power3.out" }, "-=0.6")
          .from([bodyTopRef.current, bottomRef.current], { y: 16, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }, "-=0.5");
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section className="relative min-h-screen bg-akac-black overflow-hidden">

      {/* Top-right body copy — desktop only */}
      <p
        ref={bodyTopRef}
        className="hidden md:block absolute top-[120px] right-[100px] text-akac-light text-[12px] font-medium tracking-[0.18px] uppercase text-right leading-[18px] w-[280px]"
      >
        THE WEB MOVES FAST.
        <br />
        YOUR BRAND SHOULD TOO.
        <br />
        WE BUILD SITES THAT PERFORM
        <br />
        FROM DAY ONE.
      </p>

      {/* Headline line 1 — "Built for" */}
      {/* Mobile: left-6, top-[28vh] | Desktop: left-[138px], top-[35vh] */}
      <div className="absolute left-6 top-[28vh] md:left-[138px] md:top-[35vh] ">
        <div
          ref={line1Ref}
          className="font-normal text-akac-light leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(52px, 13vw, 192px)", letterSpacing: "clamp(-1.04px, -0.2vw, -3.84px)" }}
        >
          Built for
        </div>
      </div>

      {/* Headline line 2 — "Right now" */}
      {/* Mobile: right-6, top-[44vh] | Desktop: left-[calc(41.67%+99px)], top-[52vh] */}
      <div className="absolute right-6 left-auto top-[44vh] md:right-auto md:left-[calc(41.67%_+_99px)] md:top-[52vh] ">
        <div
          ref={line2Ref}
          className="font-normal text-akac-light leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(52px, 13vw, 192px)", letterSpacing: "clamp(-1.04px, -0.2vw, -3.84px)" }}
        >
          Right now
        </div>
      </div>

      {/* Bottom bar */}
      <div ref={bottomRef} className="absolute bottom-0 left-0 right-0 pt-[60px]">
        {/* Divider */}
        <div
          className="mx-6 md:mx-[100px] h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(217,217,217,0.2) 60px, rgba(217,217,217,0.2) calc(100% - 60px), transparent)" }}
        />

        {/* Bottom row */}
        <div className="relative flex items-center justify-between px-6 md:px-[100px] py-1">
          {/* Left — bracket CTA */}
          <BracketButton label="CONTACT US" color="#D9D9D9" href="#contact" className="flex-shrink-0" />

          {/* Center paragraph — desktop only */}
          <p
            className="hidden md:block absolute left-[50%] right-[260px] text-akac-light text-[12px] font-medium tracking-[0.18px] uppercase leading-[15px] text-left m-0"
          >
            THE WEB MOVES FAST. MOST AGENCIES DON&apos;T. WE WERE BUILT FROM
            THE GROUND UP FOR THE WAY BUSINESSES NEED TO OPERATE TODAY, WHERE
            SPEED MATTERS, FIRST IMPRESSIONS ARE EVERYTHING, AND YOUR WEBSITE
            CAN&apos;T AFFORD TO BE AN AFTERTHOUGHT. WE BRING TOGETHER SHARP
            DESIGN, CLEAN CODE, AND A PROCESS THAT ACTUALLY RESPECTS YOUR TIME.
            NO LEGACY BAGGAGE. NO OUTDATED PLAYBOOKS.
          </p>

          {/* Right — AKAC logo mark */}
          <Image
            src="/logo.svg"
            alt="AKAC"
            width={148}
            height={148}
            className="flex-shrink-0 opacity-90 w-[60px] h-[60px] md:w-[148px] md:h-[148px] md:translate-x-[41px]"
          />
        </div>
      </div>
    </section>
  );
}

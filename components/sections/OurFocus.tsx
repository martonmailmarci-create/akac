"use client";

import { useEffect, useRef } from "react";

export default function OurFocus() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger, SplitText } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        const split = new SplitText(headlineRef.current, { type: "words" });
        gsap.from(split.words, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-akac-light overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "60px 100px 260px" }}
    >
      <div className="max-w-[1000px] mx-auto text-center">
        <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px] block mb-8">
          / OUR FOCUS
        </span>

        <h2
          ref={headlineRef}
          className="text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.05] mb-8"
        >
          YOUR GOALS. OUR OBSESSION.
        </h2>

        <p className="text-[16px] font-medium text-akac-black tracking-[0.24px] leading-[1.6] max-w-[720px] mx-auto">
          We work with founders, startups, and growth-stage companies who need
          more than a pretty website. We go deep on strategy, conversion, and
          brand to make sure what we build actually moves the needle for your
          business.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const marqueeText = Array(8).fill("OUR TEAM •").join("  ");

export default function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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
          stagger: 0.07,
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
      className="bg-akac-black overflow-hidden"
      style={{ borderRadius: "60px 60px 0 0", marginTop: "-60px", position: "relative", zIndex: 1 }}
    >

      <div className="px-[100px] pt-[180px] pb-0">
        {/* Top labels */}
        <div className="flex justify-between mb-12">
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
            OUR TEAM
          </span>
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
            OUR TEAM
          </span>
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
            OUR TEAM
          </span>
        </div>

        {/* Descriptor */}
        <p className="text-[16px] font-medium text-akac-light uppercase tracking-[0.24px] leading-[18px] text-center mb-10">
          TWO PEOPLE. ONE SHARED OBSESSION.
          <br />
          DESIGN AND CODE, UNDER ONE ROOF.
        </p>

        {/* CTA */}
        <div className="flex justify-center mb-16">
          <Button variant="dark" href="#contact">
            START A PROJECT
          </Button>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[55px] font-semibold text-akac-light tracking-[-1.1px] leading-[1.1] text-center mb-16"
        >
          WE DON&apos;T HAND OFF. /
          <br />
          WE SEE IT THROUGH.
        </h2>

        {/* Photos */}
        <div className="flex justify-center" style={{ gap: 0 }}>
          {/* Marcell — on top */}
          <div
            className="relative rounded-card overflow-hidden flex-shrink-0"
            style={{ width: "520px", height: "480px", zIndex: 2 }}
          >
            <Image
              src="/Marcell.png"
              alt="Marcell Marton"
              fill
              className="object-cover"
              sizes="520px"
            />
          </div>
          {/* Viktor — bleeds behind Marcell */}
          <div
            className="relative rounded-card overflow-hidden flex-shrink-0"
            style={{ width: "520px", height: "480px", marginLeft: "-80px", zIndex: 1 }}
          >
            <Image
              src="/Viktor.png"
              alt="Viktor Miller"
              fill
              className="object-cover"
              sizes="520px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

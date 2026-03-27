"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function CTA() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(
          headlineRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          }
        );
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-akac-black rounded-section mx-4 my-4 px-[100px] pt-[120px] pb-[420px] text-center overflow-hidden"
    >
      <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px] block mb-6">
        / LET&apos;S TALK
      </span>

      <h2
        ref={headlineRef}
        className="text-[30px] font-medium text-akac-light tracking-[-0.6px] leading-[32px] mb-10 max-w-[700px] mx-auto uppercase"
      >
        LET US TAKE YOU FURTHER
        <br />
        THAN YOU&apos;VE EVER BEEN
      </h2>

      <p className="text-[16px] font-semibold text-akac-light tracking-[0.24px] leading-[1.5] mb-10 max-w-[560px] mx-auto uppercase">
        BOOK A 15-MINUTE CALL OR SEND US A MESSAGE.
        <br />
        NO PREPARATION NEEDED.
      </p>

      <Button variant="dark" href="mailto:hello@akac.studio">
        BOOK A CALL
      </Button>

    </section>
  );
}

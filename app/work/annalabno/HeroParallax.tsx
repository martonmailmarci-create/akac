"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

export default function HeroParallax({ children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(innerRef.current, { yPercent: -8 }, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingTop: "140px",
        paddingBottom: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Parallax image */}
      <div
        ref={innerRef}
        style={{ position: "absolute", inset: 0, top: "-10%", height: "120%", zIndex: 0 }}
      >
        <Image
          src="/project1/project1.jpg"
          alt="Anna Łabno"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(17,17,17,0.6)", zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import BracketButton from "@/components/ui/BracketButton";
import HeroBackground from "@/components/ui/HeroBackground";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    let mounted = true;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap } = await import("@/lib/gsap");
      if (!mounted || !contentRef.current) return;
      ctxRef.current?.revert();
      ctxRef.current = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.15 }
        );
      });
    })();

    return () => {
      mounted = false;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100svh",
        backgroundColor: "#111111",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Three.js ASCII S-curve background */}
      <HeroBackground />

      {/* Soft radial vignette behind content — no hard edges */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "900px",
        height: "500px",
        background: "radial-gradient(ellipse at center, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.5) 45%, rgba(17,17,17,0.15) 70%, transparent 90%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Content — centered column */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "48px 48px",
          gap: "32px",
          maxWidth: "1100px",
          width: "100%",
          visibility: "hidden",
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(32px, 7vw, 64px)",
            fontWeight: 500,
            color: "#D9D9D9",
            letterSpacing: "-1.28px",
            lineHeight: "1.156",
            margin: 0,
          }}
        >
          We are a two-person studio building{" "}
          <span style={{ color: "#ED6D40" }}>websites</span>
          {" "}that perform.
        </h1>

        {/* Subcopy */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 400,
            color: "#F9F9F4",
            lineHeight: "1.45",
            maxWidth: "661px",
            margin: 0,
          }}
        >
          Design and development under one roof. Fast turnaround, unlimited
          revisions, and a team that actually picks up the phone.
        </p>

        {/* CTA */}
        <BracketButton label="GET IN TOUCH" color="#D9D9D9" href="#contact" />
      </div>
    </section>
  );
}

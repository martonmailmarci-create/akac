"use client";

import { useEffect, useRef } from "react";
import BracketButton from "@/components/ui/BracketButton";
import HeroBackground from "@/components/ui/HeroBackground";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<{ revert: () => void } | null>(null);

  useEffect(() => {
    let mounted = true;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (contentRef.current) contentRef.current.style.visibility = "visible";
      return;
    }

    (async () => {
      const { gsap, SplitText } = await import("@/lib/gsap");
      if (!mounted || !contentRef.current) return;
      ctxRef.current?.revert();
      ctxRef.current = gsap.context(() => {
        gsap.set(contentRef.current, { visibility: "visible" });

        const split = new SplitText(headlineRef.current, { type: "words" });
        const tl = gsap.timeline({ delay: 0.15 });

        // 7 — label fades up first
        tl.from(labelRef.current, {
          autoAlpha: 0, y: 10, duration: 0.5, ease: "power3.out",
        });

        // 6 — headline word by word
        tl.from(split.words, {
          autoAlpha: 0, y: 22, duration: 0.65, stagger: 0.045, ease: "power3.out",
        }, "-=0.15");

        // 6 — subcopy fades up
        tl.from(subcopyRef.current, {
          autoAlpha: 0, y: 16, duration: 0.6, ease: "power3.out",
        }, "-=0.25");

        // 6 — CTA fades up last
        tl.from(ctaRef.current, {
          autoAlpha: 0, y: 12, duration: 0.5, ease: "power3.out",
        }, "-=0.3");
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
      <HeroBackground />

      {/* Soft radial vignette behind content */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "900px",
        height: "500px",
        background: "radial-gradient(ellipse at center, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.75) 40%, rgba(17,17,17,0.3) 65%, transparent 85%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "48px",
          gap: "28px",
          maxWidth: "1100px",
          width: "100%",
          visibility: "hidden",
        }}
      >
        {/* 7 — Label */}
        <p
          ref={labelRef}
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color: "#ED6D40",
            letterSpacing: "0.18px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          / AKAC STUDIO
        </p>

        {/* Headline — 1 italic, 2 weight 600 */}
        <h1
          ref={headlineRef}
          style={{
            fontSize: "clamp(32px, 7vw, 64px)",
            fontWeight: 600,
            color: "#D9D9D9",
            letterSpacing: "-1.28px",
            lineHeight: "1.156",
            margin: 0,
          }}
        >
          We are a two-person studio building{" "}
          <span style={{
            color: "#ED6D40",
            fontStyle: "italic",
            textShadow: "0 0 30px rgba(237, 109, 64, 0.3), 0 0 60px rgba(237, 109, 64, 0.12)",
          }}>
            websites
          </span>
          {" "}that perform.
        </h1>

        {/* Subcopy — 3 increased letter-spacing */}
        <p
          ref={subcopyRef}
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 400,
            color: "#F9F9F4",
            lineHeight: "1.45",
            letterSpacing: "0.3px",
            maxWidth: "661px",
            margin: 0,
          }}
        >
          Design and development under one roof. Fast turnaround, unlimited
          revisions, and a team that actually picks up the phone.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <BracketButton label="GET IN TOUCH" color="#D9D9D9" href="#contact" />
        </div>
      </div>
    </section>
  );
}

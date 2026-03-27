"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const bodyTopRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, SplitText } = await import("@/lib/gsap");

      ctx = gsap.context(() => {
        const split1 = new SplitText(line1Ref.current, { type: "chars" });
        const split2 = new SplitText(line2Ref.current, { type: "chars" });

        const tl = gsap.timeline({ delay: 0.2 });

        tl.from(split1.chars, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          stagger: 0.025,
          ease: "power3.out",
        })
          .from(
            split2.chars,
            {
              y: 80,
              opacity: 0,
              duration: 0.9,
              stagger: 0.025,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .from(
            [bodyTopRef.current, bottomRef.current],
            {
              y: 16,
              opacity: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.5"
          );
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#111",
        overflow: "hidden",
      }}
    >
      {/* Top-right body copy */}
      <p
        ref={bodyTopRef}
        style={{
          position: "absolute",
          top: "120px",
          right: "100px",
          color: "#D9D9D9",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.18px",
          textTransform: "uppercase",
          textAlign: "right",
          lineHeight: "18px",
          width: "280px",
        }}
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
      <div
        style={{
          position: "absolute",
          left: "138px",
          top: "35vh",
          overflow: "hidden",
        }}
      >
        <div
          ref={line1Ref}
          style={{
            fontSize: "192px",
            fontWeight: 400,
            color: "#D9D9D9",
            lineHeight: 1,
            letterSpacing: "-3.84px",
            whiteSpace: "nowrap",
          }}
        >
          Built for
        </div>
      </div>

      {/* Headline line 2 — "Right now" */}
      <div
        style={{
          position: "absolute",
          left: "calc(41.67% + 99px)",
          top: "52vh",
          overflow: "hidden",
        }}
      >
        <div
          ref={line2Ref}
          style={{
            fontSize: "192px",
            fontWeight: 400,
            color: "#D9D9D9",
            lineHeight: 1,
            letterSpacing: "-3.84px",
            whiteSpace: "nowrap",
          }}
        >
          Right now
        </div>
      </div>

      {/* Bottom bar */}
      <div
        ref={bottomRef}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingTop: "60px" }}
      >
        {/* Divider */}
        <div
          style={{
            height: "1px",
            margin: "0 100px",
            background: "linear-gradient(to right, transparent, rgba(217,217,217,0.2) 60px, rgba(217,217,217,0.2) calc(100% - 60px), transparent)",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 100px",
          }}
        >
          {/* Left — bracket CTA */}
          <a
            href="#contact"
            style={{
              color: "#D9D9D9",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.18px",
              textDecoration: "none",
              transition: "opacity 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            [ CONTACT US ]
          </a>

          {/* Center — paragraph left-aligned to the page center line */}
          <p
            style={{
              position: "absolute",
              left: "50%",
              right: "260px",
              color: "#D9D9D9",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.18px",
              textTransform: "uppercase",
              lineHeight: "15px",
              textAlign: "left",
              margin: 0,
            }}
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
            style={{ flexShrink: 0, opacity: 0.9, transform: "translateX(41px)" }}
          />
        </div>
      </div>
    </section>
  );
}

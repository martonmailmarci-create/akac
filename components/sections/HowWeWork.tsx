"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    number: "01",
    total: "04",
    title: "TAILORED BY DEFAULT",
    body: "No two clients are the same, so no two projects look the same. We study your brand, your audience, and your goals before a single pixel is placed. The result is a website that feels unmistakably yours, not a template with your logo swapped in.",
    bg: "#111111",
    titleColor: "#F9F9F4",
    counterColor: "rgba(249,249,244,0.4)",
    bodyColor: "#F9F9F4",
    borderRadius: "20px 0 0 20px",
  },
  {
    number: "02",
    total: "04",
    title: "DESIGN THAT PERFORMS",
    body: "Beautiful sites that don't convert are just expensive art. Every layout, colour choice, and interaction we make is deliberate, crafted to look exceptional and drive real results. Your site should work as hard as you do.",
    bg: "#5C939F",
    titleColor: "#000000",
    counterColor: "rgba(0,0,0,0.4)",
    bodyColor: "#000000",
    borderRadius: "20px 0 0 20px",
  },
  {
    number: "03",
    total: "04",
    title: "DELIVERED IN WEEKS",
    body: "Most agencies quote months. We deliver in 2 to 4 weeks without cutting corners. A small, focused team means fewer handoffs, faster decisions, and a site that launches while your competitors are still in kickoff meetings.",
    bg: "#ED6D40",
    titleColor: "#000000",
    counterColor: "rgba(0,0,0,0.4)",
    bodyColor: "#000000",
    borderRadius: "20px 0 0 20px",
  },
  {
    number: "04",
    total: "04",
    title: "EASY FROM START TO FINISH",
    body: "We've worked with local businesses, e-commerce brands, studios, and enterprise clients — and they all say the same thing: working with us is refreshingly straightforward. Clear communication, honest timelines, and zero drama from brief to launch.",
    bg: "#E4E4E4",
    titleColor: "#111111",
    counterColor: "rgba(17,17,17,0.4)",
    bodyColor: "#111111",
    borderRadius: "20px 0 0 20px",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.from(cardsRef.current?.children ?? [], {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      style={{ padding: "240px 100px 240px", borderRadius: "60px 60px 0 0" }}
    >
      {/* Header row */}
      <div style={{ position: "relative", marginBottom: "100px" }}>
        <div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#111111",
              textTransform: "uppercase",
              letterSpacing: "0.18px",
            }}
          >
            / OUR ETHOS
          </span>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#111111",
              letterSpacing: "-0.6px",
              lineHeight: "32px",
              marginTop: "8px",
            }}
          >
            HOW WE WORK
          </h2>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "45%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(17,17,17,0.2)",
              marginBottom: "16px",
            }}
          />
          <p
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#111111",
              lineHeight: "18px",
              letterSpacing: "0.24px",
              marginBottom: "24px",
            }}
          >
            We build websites that work as hard as your business does. With
            design that commands attention and code that never lets you down, we
            move fast without cutting corners. This isn&apos;t template-filling.
            It&apos;s deliberate, precise, and built to perform from day one.
          </p>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: "13px",
              fontWeight: 500,
              color: "#111111",
              letterSpacing: "0.18px",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            [ LET&apos;S TALK ]
          </a>
        </div>
      </div>

      {/* Cards — expand on hover, full width */}
      <div
        ref={cardsRef}
        style={{
          display: "flex",
          gap: "0px",
          width: "100%",
          height: "648px",
        }}
        onMouseLeave={() => setActiveCard(null)}
      >
        {cards.map((card, i) => {
          const isActive = activeCard === i;
          const isInactive = activeCard !== null && !isActive;

          return (
            <div
              key={card.number}
              onMouseEnter={() => setActiveCard(i)}
              style={{
                flexGrow: isActive ? 1.7 : isInactive ? 0.85 : 1,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: 0,
                backgroundColor: card.bg,
                borderRadius: card.borderRadius,
                overflow: "hidden",
                cursor: "default",
                transition: "flex-grow 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                zIndex: i + 1,
                marginRight: i < cards.length - 1 ? "-20px" : 0,
              }}
            >
              {/* Fixed-width inner wrapper — centered, layout never reflows */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "380px",
                  height: "100%",
                }}
              >
                {/* Title — pinned to top */}
                <p
                  style={{
                    position: "absolute",
                    top: "32px",
                    left: "24px",
                    right: "24px",
                    fontSize: "30px",
                    fontWeight: 500,
                    color: card.titleColor,
                    textAlign: "center",
                    letterSpacing: "-0.6px",
                    lineHeight: "32px",
                  }}
                >
                  {card.title}
                </p>

                {/* Counter — fixed distance above body */}
                <p
                  style={{
                    position: "absolute",
                    bottom: "150px",
                    left: "24px",
                    right: "24px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: card.counterColor,
                    textAlign: "center",
                    letterSpacing: "0.18px",
                  }}
                >
                  {card.number}&nbsp;&nbsp;/&nbsp;&nbsp;{card.total}
                </p>

                {/* Body — pinned to bottom */}
                <p
                  style={{
                    position: "absolute",
                    bottom: "32px",
                    left: "24px",
                    right: "24px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: card.bodyColor,
                    textAlign: "center",
                    textTransform: "uppercase",
                    lineHeight: "15px",
                    letterSpacing: "0.18px",
                  }}
                >
                  {card.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

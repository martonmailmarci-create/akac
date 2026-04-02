"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const cards = [
  {
    number: "01", total: "04",
    title: "TAILORED BY DEFAULT",
    body: "No two clients are the same, so no two projects look the same. We study your brand, your audience, and your goals before a single pixel is placed. The result is a website that feels unmistakably yours, not a template with your logo swapped in.",
    bg: "#111111", titleColor: "#F9F9F4", counterColor: "rgba(249,249,244,0.4)", bodyColor: "#F9F9F4",
  },
  {
    number: "02", total: "04",
    title: "DESIGN THAT PERFORMS",
    body: "Beautiful sites that don't convert are just expensive art. Every layout, colour choice, and interaction we make is deliberate, crafted to look exceptional and drive real results. Your site should work as hard as you do.",
    bg: "#5C939F", titleColor: "#000000", counterColor: "rgba(0,0,0,0.4)", bodyColor: "#000000",
  },
  {
    number: "03", total: "04",
    title: "DELIVERED IN WEEKS",
    body: "Most agencies quote months. We deliver in 2 to 4 weeks without cutting corners. A small, focused team means fewer handoffs, faster decisions, and a site that launches while your competitors are still in kickoff meetings.",
    bg: "#ED6D40", titleColor: "#000000", counterColor: "rgba(0,0,0,0.4)", bodyColor: "#000000",
  },
  {
    number: "04", total: "04",
    title: "EASY FROM START TO FINISH",
    body: "We've worked with local businesses, e-commerce brands, studios, and enterprise clients — and they all say the same thing: working with us is refreshingly straightforward. Clear communication, honest timelines, and zero drama from brief to launch.",
    bg: "#E4E4E4", titleColor: "#111111", counterColor: "rgba(17,17,17,0.4)", bodyColor: "#111111",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (wipeRef.current) wipeRef.current.style.display = "none";
      return;
    }

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(
          wipeRef.current,
          { xPercent: 0 },
          {
            xPercent: 100,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 110%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-akac-light rounded-t-[24px] md:rounded-t-[60px] overflow-hidden pt-28 pb-28 px-6 md:pt-[240px] md:pb-[240px] md:px-[100px]"
    >
      {/* Wipe overlay — slides right on scroll to reveal section */}
      <div
        ref={wipeRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#111111",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <SectionHeader
        label="/ OUR ETHOS"
        title="HOW WE WORK"
        body="We build websites that work as hard as your business does. With design that commands attention and code that never lets you down, we move fast without cutting corners. This isn't template-filling. It's deliberate, precise, and built to perform from day one."
        cta={{ text: "LET'S TALK", href: "#contact" }}
        mbClass="mb-20 md:mb-[160px]"
      />

      {/* ── Mobile cards: simple vertical stack ── */}
      <div ref={mobileCardsRef} className="flex flex-col gap-5 md:hidden">
        {cards.map((card) => (
          <div
            key={card.number}
            className="w-full min-h-[580px] rounded-[20px] p-6 flex flex-col justify-between text-center"
            style={{ backgroundColor: card.bg }}
          >
            <p className="text-[22px] font-medium leading-[26px] tracking-[-0.44px]" style={{ color: card.titleColor }}>
              {card.title}
            </p>
            <div>
              <p className="mb-4" style={{ fontSize: "11px", fontWeight: 500, color: card.counterColor, letterSpacing: "0.18px" }}>
                {card.number}&nbsp;&nbsp;/&nbsp;&nbsp;{card.total}
              </p>
              <p className="text-[13px] font-medium uppercase leading-[15px] tracking-[0.18px]" style={{ color: card.bodyColor }}>
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop cards: expanding flex row ── */}
      <div
        ref={desktopCardsRef}
        className="hidden md:flex h-[648px]"
        style={{ margin: "0 -60px" }}
        onMouseLeave={() => setActiveCard(null)}
      >
        {cards.map((card, i) => {
          const isActive = activeCard === i;
          const isInactive = activeCard !== null && !isActive;
          return (
            <div
              key={card.number}
              onMouseEnter={() => setActiveCard(i)}
              className="overflow-hidden cursor-default relative"
              style={{
                flexGrow: isActive ? 1.4 : isInactive ? 0.9 : 1,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: 0,
                backgroundColor: card.bg,
                borderRadius: "20px 0 0 20px",
                transition: "flex-grow 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: i + 1,
                marginRight: i < cards.length - 1 ? "-20px" : 0,
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[380px] h-full">
                <p className="absolute top-8 left-6 right-6 text-[30px] font-medium text-center leading-[32px] tracking-[-0.6px]" style={{ color: card.titleColor }}>
                  {card.title}
                </p>
                <p className="absolute bottom-[150px] left-6 right-6 text-[13px] font-medium text-center tracking-[0.18px]" style={{ color: card.counterColor }}>
                  {card.number}&nbsp;&nbsp;/&nbsp;&nbsp;{card.total}
                </p>
                <p className="absolute bottom-8 left-6 right-6 text-[13px] font-medium text-center uppercase leading-[15px] tracking-[0.18px]" style={{ color: card.bodyColor }}>
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

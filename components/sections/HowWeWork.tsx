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
  const mobileCardsRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        const target = window.innerWidth < 768 ? mobileCardsRef.current : desktopCardsRef.current;
        gsap.from(target?.children ?? [], {
          y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-akac-light rounded-t-[24px] md:rounded-t-[60px] overflow-hidden pt-20 pb-20 px-6 md:pt-[240px] md:pb-[240px] md:px-[100px]"
    >
      <SectionHeader
        label="/ OUR ETHOS"
        title="HOW WE WORK"
        body="We build websites that work as hard as your business does. With design that commands attention and code that never lets you down, we move fast without cutting corners. This isn't template-filling. It's deliberate, precise, and built to perform from day one."
        cta={{ text: "LET'S TALK", href: "#contact" }}
        mbClass="mb-12 md:mb-[100px]"
      />

      {/* ── Mobile cards: simple vertical stack ── */}
      <div ref={mobileCardsRef} className="flex flex-col gap-3 md:hidden">
        {cards.map((card) => (
          <div
            key={card.number}
            className="w-full min-h-[280px] rounded-[20px] p-6 flex flex-col justify-between"
            style={{ backgroundColor: card.bg }}
          >
            <p style={{ fontSize: "11px", fontWeight: 500, color: card.counterColor, letterSpacing: "0.18px" }}>
              {card.number}&nbsp;&nbsp;/&nbsp;&nbsp;{card.total}
            </p>
            <div>
              <p className="text-[22px] font-medium leading-[26px] tracking-[-0.44px] mb-4" style={{ color: card.titleColor }}>
                {card.title}
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
                flexGrow: isActive ? 1.7 : isInactive ? 0.85 : 1,
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

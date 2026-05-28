"use client";

import { useEffect, useRef, useState } from "react";
import AsciiIcon from "@/components/ui/AsciiIcon";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLocale } from "@/components/providers/LocaleProvider";

const CARD_STYLES = [
  { number: "01", total: "04", bg: "#111111", titleColor: "#F9F9F4", counterColor: "rgba(249,249,244,0.4)", bodyColor: "#F9F9F4", icon: "/icons/tailored.svg" },
  { number: "02", total: "04", bg: "#5C939F", titleColor: "#000000", counterColor: "rgba(0,0,0,0.4)", bodyColor: "#000000", icon: "/icons/perform.svg" },
  { number: "03", total: "04", bg: "#ED6D40", titleColor: "#000000", counterColor: "rgba(0,0,0,0.4)", bodyColor: "#000000", icon: "/icons/speed.svg" },
  { number: "04", total: "04", bg: "#E4E4E4", titleColor: "#111111", counterColor: "rgba(17,17,17,0.4)", bodyColor: "#111111", icon: "/icons/easy.svg" },
];

export default function HowWeWork() {
  const { t } = useLocale();

  const cards = CARD_STYLES.map((s, i) => ({
    ...s,
    title: t.howWeWork[`card${i + 1}Title` as "card1Title"],
    body: t.howWeWork[`card${i + 1}Body` as "card1Body"],
  }));
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
        label={t.howWeWork.label}
        title={t.howWeWork.title}
        body={t.howWeWork.body}
        cta={{ text: t.howWeWork.cta, href: "/contact" }}
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
              <div className="flex justify-center mb-8">
                <AsciiIcon src={card.icon} size={220} color={card.titleColor} />
              </div>
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <AsciiIcon src={card.icon} size={280} color={card.titleColor} />
                </div>
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

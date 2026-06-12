"use client";

import { useEffect, useRef } from "react";
import BracketButton from "@/components/ui/BracketButton";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealHeadline from "@/components/ui/RevealHeadline";
import { useLocale } from "@/components/providers/LocaleProvider";

const PLAN_STYLES = [
  { bg: "bg-akac-offwhite", textColor: "text-akac-black", priceColor: "text-akac-black", labelColor: "text-akac-black/50", hufColor: "text-akac-black/40", divider: "border-akac-black/10", dotBg: "bg-akac-orange", btnColor: "#111111", badgeBg: "rgba(17,17,17,0.07)", badgeText: "rgba(17,17,17,0.55)" },
  { bg: "bg-akac-black", textColor: "text-akac-cream", priceColor: "text-akac-light", labelColor: "text-akac-light/40", hufColor: "text-akac-light/30", divider: "border-akac-light/10", dotBg: "bg-akac-orange", btnColor: "#D9D9D9", badgeBg: "rgba(237,109,64,0.15)", badgeText: "#ED6D40" },
  { bg: "bg-akac-offwhite", textColor: "text-akac-black", priceColor: "text-akac-black", labelColor: "text-akac-black/50", hufColor: "text-akac-black/40", divider: "border-akac-black/10", dotBg: "bg-akac-orange", btnColor: "#111111", badgeBg: "rgba(17,17,17,0.07)", badgeText: "rgba(17,17,17,0.55)" },
];

export default function Pricing() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const plans = [
    { ...PLAN_STYLES[0], id: t.pricing.e_id, badge: "", price: t.pricing.e_price, huf: t.pricing.e_huf, description: t.pricing.e_desc, features: [t.pricing.e_f1, t.pricing.e_f2, t.pricing.e_f3, t.pricing.e_f4, t.pricing.e_f5] },
    { ...PLAN_STYLES[1], id: t.pricing.p_id, badge: t.pricing.p_badge, price: t.pricing.p_price, huf: t.pricing.p_huf, description: t.pricing.p_desc, features: [t.pricing.p_f1, t.pricing.p_f2, t.pricing.p_f3, t.pricing.p_f4, t.pricing.p_f5] },
    { ...PLAN_STYLES[2], id: t.pricing.n_id, badge: "", price: t.pricing.n_price, huf: t.pricing.n_huf, description: t.pricing.n_desc, features: [t.pricing.n_f1, t.pricing.n_f2, t.pricing.n_f3, t.pricing.n_f4, t.pricing.n_f5] },
  ];

  const addons = [
    { name: t.pricing.addon1Name, price: t.pricing.addon1Price, sub: t.pricing.addon1Huf },
    { name: t.pricing.addon2Name, price: t.pricing.addon2Price, sub: null },
    { name: t.pricing.addon3Name, price: t.pricing.addon3Price, sub: null },
    { name: t.pricing.addon4Name, price: t.pricing.addon4Price, sub: null },
  ];

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.from(cardsRef.current?.children ?? [], {
          scale: 0.95, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] pt-20 pb-36 px-6 md:pt-[200px] md:pb-[260px] md:px-[100px]"
    >
      <div className="text-center mb-12">
        <SectionLabel className="mb-6">{t.pricing.label}</SectionLabel>
        <RevealHeadline className="text-[28px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
          {t.pricing.headline}
        </RevealHeadline>
      </div>

      {/* ── Plan cards ── */}
      <div ref={cardsRef} className="flex flex-col md:flex-row gap-6 mb-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`${plan.bg} rounded-[20px] p-8 flex flex-col flex-1`}>

            {/* Badge — only shown when set */}
            {plan.badge && (
              <div className="mb-4">
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.18px] px-2 py-1 rounded-md"
                  style={{ backgroundColor: plan.badgeBg, color: plan.badgeText }}
                >
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan name */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-[6.897px] h-[6.897px] rounded-sm ${plan.dotBg} flex-shrink-0`} aria-hidden="true" />
              <span className={`text-[12px] font-medium ${plan.labelColor} uppercase tracking-[0.18px]`}>{plan.id}</span>
            </div>

            {/* Price + HUF */}
            <span className={`text-[36px] md:text-[48px] font-medium ${plan.priceColor} tracking-[-1.1px] leading-none block mb-1`}>{plan.price}</span>
            <span className={`text-[12px] font-medium ${plan.hufColor} tracking-[0.1px] block mb-6`}>{plan.huf}</span>

            <p className={`text-[15px] font-medium ${plan.textColor} leading-[1.5] mb-8`}>{plan.description}</p>

            <div className="flex-1 flex flex-col gap-0 mb-8">
              {plan.features.map((feat) => (
                <div key={feat} className={`flex items-center gap-3 py-4 border-t ${plan.divider}`}>
                  <div className={`w-[6.897px] h-[6.897px] rounded-sm ${plan.dotBg} flex-shrink-0`} aria-hidden="true" />
                  <span className={`text-[14px] font-medium ${plan.textColor} uppercase tracking-[0.18px]`}>{feat}</span>
                </div>
              ))}
            </div>

            <BracketButton label={t.pricing.getQuote} color={plan.btnColor} href="/contact" />
          </div>
        ))}
      </div>

      {/* ── Add-ons ── */}
      <div className="mt-16 mb-10">
        <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-5">
          {t.pricing.addonsLabel}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addons.map((addon) => (
            <div
              key={addon.name}
              className="bg-akac-offwhite rounded-[16px] px-6 py-5"
            >
              <p className="text-[14px] font-semibold text-akac-black tracking-[-0.2px] mb-1">{addon.name}</p>
              <p className="text-[18px] font-medium text-akac-black tracking-[-0.4px]">{addon.price}</p>
              {addon.sub && (
                <p className="text-[11px] font-medium text-akac-black/40 tracking-[0.1px] mt-0.5">{addon.sub}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[16px] font-medium text-akac-black tracking-[0.24px] leading-[1.6]">
        {t.pricing.footerNote}{" "}
        <a href="/contact" className="text-akac-orange underline underline-offset-2 hover:opacity-70 transition-opacity">
          {t.pricing.footerCta}
        </a>{" "}
        {t.pricing.footerNoteEnd}
      </p>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import BracketButton from "@/components/ui/BracketButton";
import SectionLabel from "@/components/ui/SectionLabel";

const plans = [
  {
    id: "ESSENTIAL",
    price: "€1,200 – €2,500",
    description: "FOR BUSINESSES THAT NEED A SHARP, FAST WEB PRESENCE WITHOUT THE COMPLEXITY.",
    bg: "bg-akac-offwhite",
    textColor: "text-akac-black",
    priceColor: "text-akac-black",
    labelColor: "text-akac-black/50",
    divider: "border-akac-black/10",
    dotBg: "bg-akac-orange",
    btnColor: "#111111",
    features: ["Clean, custom design", "Up to 5 pages", "Mobile optimised", "Contact form", "Delivered in 2 weeks"],
  },
  {
    id: "PROFESSIONAL",
    price: "€3,000 – €6,000",
    description: "FOR BUSINESSES READY TO SELL, BOOK, OR OPERATE ONLINE.",
    bg: "bg-akac-black",
    textColor: "text-akac-cream",
    priceColor: "text-akac-light",
    labelColor: "text-akac-light/40",
    divider: "border-akac-light/10",
    dotBg: "bg-akac-orange",
    btnColor: "#D9D9D9",
    features: ["Everything in Essential", "Webshop or ordering system", "Payment integration", "Admin panel", "Delivered in 2–4 weeks"],
  },
  {
    id: "ENTERPRISE",
    price: "From €8,000",
    description: "FOR COMPLEX BUILDS THAT NEED TO WORK HARD FROM DAY ONE.",
    bg: "bg-akac-offwhite",
    textColor: "text-akac-black",
    priceColor: "text-akac-black",
    labelColor: "text-akac-black/50",
    divider: "border-akac-black/10",
    dotBg: "bg-akac-orange",
    btnColor: "#111111",
    features: ["Everything in Professional", "Custom software integrations", "Multi-language support", "Email automation", "Scoped per project"],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
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
      ref={sectionRef}
      className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] pt-20 pb-24 px-6 md:pt-[200px] md:pb-[260px] md:px-[100px]"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <SectionLabel className="mb-6">/ OUR PRICES</SectionLabel>
        <h2 className="text-[28px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
          SIMPLE, TRANSPARENT PRICING
        </h2>
      </div>

      {/* Cards — stack on mobile, row on desktop */}
      <div ref={cardsRef} className="flex flex-col md:flex-row gap-6 mb-8">
        {plans.map((plan) => (
          <div key={plan.id} className={`${plan.bg} rounded-[20px] p-8 flex flex-col flex-1`}>
            {/* Label + dot */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-[6.897px] h-[6.897px] rounded-sm ${plan.dotBg} flex-shrink-0`} aria-hidden="true" />
              <span className={`text-[12px] font-medium ${plan.labelColor} uppercase tracking-[0.18px]`}>
                {plan.id}
              </span>
            </div>

            {/* Price */}
            <span className={`text-[36px] md:text-[55px] font-medium ${plan.priceColor} tracking-[-1.1px] leading-none block mb-4`}>
              {plan.price}
            </span>

            {/* Description */}
            <p className={`text-[16px] font-semibold ${plan.textColor} leading-[1.5] mb-8`}>
              {plan.description}
            </p>

            {/* Features */}
            <div className="flex-1 flex flex-col gap-0 mb-8">
              {plan.features.map((feat) => (
                <div key={feat} className={`flex items-center gap-3 py-4 border-t ${plan.divider}`}>
                  <div className={`w-[6.897px] h-[6.897px] rounded-sm ${plan.dotBg} flex-shrink-0`} aria-hidden="true" />
                  <span className={`text-[16px] font-medium ${plan.textColor} uppercase tracking-[0.24px]`}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            <BracketButton label="GET A QUOTE" color={plan.btnColor} href="#contact" />
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-[16px] font-medium text-akac-black tracking-[0.24px] leading-[1.6]">
        Not sure which fits? Every project is different.{" "}
        <a href="#contact" className="text-akac-orange underline underline-offset-2 hover:opacity-70 transition-opacity">
          Get in touch
        </a>{" "}
        and we&apos;ll put together a proposal tailored to what you actually need.
      </p>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

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
    dotColor: "bg-akac-orange",
    btnVariant: "light" as const,
    features: [
      "Clean, custom design",
      "Up to 5 pages",
      "Mobile optimised",
      "Contact form",
      "Delivered in 2 weeks",
    ],
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
    dotColor: "bg-akac-orange",
    btnVariant: "dark" as const,
    features: [
      "Everything in Essential",
      "Webshop or ordering system",
      "Payment integration",
      "Admin panel",
      "Delivered in 2–4 weeks",
    ],
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
    dotColor: "bg-akac-orange",
    btnVariant: "light" as const,
    features: [
      "Everything in Professional",
      "Custom software integrations",
      "Multi-language support",
      "Email automation",
      "Scoped per project",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.from(cardsRef.current?.children ?? [], {
          scale: 0.95,
          opacity: 0,
          duration: 0.7,
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
      className="bg-akac-light overflow-hidden px-[100px] pt-[200px] pb-[260px]"
      style={{ borderRadius: "60px 60px 0 0" }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px] block mb-6">
          / OUR PRICES
        </span>
        <h2 className="text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
          SIMPLE, TRANSPARENT PRICING
        </h2>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${plan.bg} rounded-card p-8 flex flex-col`}
          >
            {/* Label + dot */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-[6.897px] h-[6.897px] rounded-sm ${plan.dotColor} flex-shrink-0`}
                aria-hidden="true"
              />
              <span
                className={`text-[12px] font-medium ${plan.labelColor} uppercase tracking-[0.18px]`}
              >
                {plan.id}
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span
                className={`text-[55px] font-medium ${plan.priceColor} tracking-[-1.1px] leading-none block`}
              >
                {plan.price}
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-[16px] font-semibold ${plan.textColor} leading-[1.5] mb-8`}
            >
              {plan.description}
            </p>

            {/* Feature list */}
            <div className="flex-1 flex flex-col gap-0 mb-8">
              {plan.features.map((feat) => (
                <div
                  key={feat}
                  className={`flex items-center gap-3 py-4 border-t ${plan.divider}`}
                >
                  <div
                    className={`w-[6.897px] h-[6.897px] rounded-sm ${plan.dotColor} flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <span
                    className={`text-[16px] font-medium ${plan.textColor} uppercase tracking-[0.24px]`}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button variant={plan.btnVariant} href="#contact">
              GET A QUOTE
            </Button>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-[16px] font-medium text-akac-black tracking-[0.24px] leading-[1.6]">
        Not sure which fits? Every project is different.{" "}
        <a
          href="#contact"
          className="text-akac-orange underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Get in touch
        </a>{" "}
        and we&apos;ll put together a proposal tailored to what you actually need.
      </p>
    </section>
  );
}

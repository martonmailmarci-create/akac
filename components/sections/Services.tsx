"use client";

import { useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const services = [
  {
    title: "WEB DESIGN",
    description: "Pixel-perfect, brand-aligned design that works at every screen size. From wireframe to final handoff, we own the full visual layer.",
  },
  {
    title: "FRONTEND DEVELOPMENT",
    description: "Clean, performant code built on modern stacks. Fast load times, smooth interactions, and zero tech debt from day one.",
  },
  {
    title: "WEBSHOP & E-COMMERCE",
    description: "Custom storefronts built to convert. Whether it's Shopify, WooCommerce, or headless — we make buying effortless.",
  },
  {
    title: "WEB APPS & CUSTOM FUNCTIONALITY",
    description: "Beyond brochure sites. We build dashboards, portals, booking systems, and anything else your users need to get things done.",
  },
  {
    title: "ONGOING MAINTENANCE",
    description: "We don't disappear after launch. Monthly retainers keep your site fast, secure, and always improving.",
  },
  {
    title: "ALWAYS INCLUDED",
    description: "SEO foundations, performance optimisation, accessibility, mobile-first build, and a handoff you can actually understand.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.from(gridRef.current?.children ?? [], {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-24 pb-28 md:px-[100px] md:py-[120px]"
    >
      {/* Header */}
      <div className="mb-16">
        <SectionLabel>/ OUR SERVICES</SectionLabel>
        <h2 className="text-[28px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] max-w-[800px]">
          Web Design &amp; Development, End to End.
        </h2>
      </div>

      {/* Grid — 1 col mobile, 3 col desktop */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-0">
        {services.map((service) => (
          <div key={service.title} className="py-10 border-t border-akac-black/15">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[6.897px] h-[6.897px] rounded-sm bg-akac-orange flex-shrink-0" aria-hidden="true" />
              <h3 className="text-[16px] font-bold text-akac-black uppercase tracking-[0.32px]">
                {service.title}
              </h3>
            </div>
            <p className="text-[16px] font-medium text-akac-black uppercase tracking-[0.24px] leading-[1.6]">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

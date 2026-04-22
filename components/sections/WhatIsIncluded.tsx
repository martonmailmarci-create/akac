"use client";

import { useState } from "react";
import RevealHeadline from "@/components/ui/RevealHeadline";
import SectionLabel from "@/components/ui/SectionLabel";

const PLANS = ["ESSENTIAL", "PROFESSIONAL", "ENTERPRISE"];

const features = [
  {
    category: "DESIGN",
    items: [
      { name: "Custom UI/UX design",        essential: true,  professional: true,  enterprise: true  },
      { name: "Mobile optimised",            essential: true,  professional: true,  enterprise: true  },
      { name: "Micro-animations",            essential: false, professional: true,  enterprise: true  },
    ],
  },
  {
    category: "PAGES & SCOPE",
    items: [
      { name: "Up to 5 pages",              essential: true,  professional: false, enterprise: false },
      { name: "Unlimited pages",             essential: false, professional: true,  enterprise: true  },
      { name: "Contact form",               essential: true,  professional: true,  enterprise: true  },
    ],
  },
  {
    category: "FUNCTIONALITY",
    items: [
      { name: "E-commerce / webshop",       essential: false, professional: true,  enterprise: true  },
      { name: "Payment integration",         essential: false, professional: true,  enterprise: true  },
      { name: "Admin panel (CMS)",           essential: false, professional: true,  enterprise: true  },
      { name: "Custom integrations",         essential: false, professional: false, enterprise: true  },
      { name: "Multi-language support",      essential: false, professional: false, enterprise: true  },
      { name: "Email automation",            essential: false, professional: false, enterprise: true  },
    ],
  },
  {
    category: "PERFORMANCE",
    items: [
      { name: "SEO optimised",              essential: true,  professional: true,  enterprise: true  },
      { name: "Analytics setup",            essential: false, professional: true,  enterprise: true  },
    ],
  },
  {
    category: "DELIVERY & SUPPORT",
    items: [
      { name: "Delivered in 2 weeks",       essential: true,  professional: false, enterprise: false },
      { name: "Delivered in 2–4 weeks",     essential: false, professional: true,  enterprise: false },
      { name: "Custom timeline",             essential: false, professional: false, enterprise: true  },
      { name: "Post-launch support",         essential: false, professional: true,  enterprise: true  },
    ],
  },
];

function Check() {
  return (
    <div
      aria-label="Included"
      style={{ width: "7px", height: "7px", backgroundColor: "#ED6D40", borderRadius: "2px", flexShrink: 0 }}
    />
  );
}

function Dash() {
  return (
    <span style={{ color: "rgba(217,217,217,0.2)", fontSize: "14px", lineHeight: 1 }} aria-label="Not included">—</span>
  );
}

export default function WhatIsIncluded() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section
      className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
      style={{ marginTop: "-60px", position: "relative", zIndex: 2 }}
    >
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <SectionLabel dark className="mb-3">/ WHAT&apos;S INCLUDED</SectionLabel>
        <RevealHeadline
          className="text-[30px] font-medium text-akac-light tracking-[-0.6px] leading-[32px]"
        >
          EVERYTHING IN EACH PLAN
        </RevealHeadline>
      </div>

      {/* Table — desktop */}
      <div className="hidden md:block">
        {/* Plan header row */}
        <div className="grid mb-6" style={{ gridTemplateColumns: "1fr repeat(3, 160px)" }}>
          <div />
          {PLANS.map((p) => (
            <div key={p} className="text-center">
              <span className="text-[11px] font-semibold text-akac-light/50 uppercase tracking-[0.18px]">{p}</span>
            </div>
          ))}
        </div>

        {/* Feature rows */}
        {features.map((group) => (
          <div key={group.category}>
            {/* Category label */}
            <div
              className="grid py-3 border-t"
              style={{ gridTemplateColumns: "1fr repeat(3, 160px)", borderColor: "rgba(217,217,217,0.06)" }}
            >
              <span className="text-[10px] font-semibold text-akac-orange uppercase tracking-[0.18px]">
                {group.category}
              </span>
            </div>

            {/* Items */}
            {group.items.map((item) => (
              <div
                key={item.name}
                className="grid items-center py-4 border-t"
                style={{ gridTemplateColumns: "1fr repeat(3, 160px)", borderColor: "rgba(217,217,217,0.08)" }}
              >
                <span className="text-[14px] font-medium text-akac-light/70 tracking-[0.1px]">
                  {item.name}
                </span>
                {[item.essential, item.professional, item.enterprise].map((included, i) => (
                  <div key={i} className="flex justify-center">
                    {included ? <Check /> : <Dash />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: tabbed */}
      <div className="md:hidden">
        {/* Tabs */}
        <div className="flex rounded-lg overflow-hidden mb-8" style={{ backgroundColor: "rgba(217,217,217,0.06)" }}>
          {PLANS.map((plan, i) => (
            <button
              key={plan}
              onClick={() => setActiveTab(i)}
              className="flex-1 py-3 text-[10px] font-semibold uppercase tracking-[0.18px] border-none cursor-pointer transition-colors duration-200"
              style={{
                background: activeTab === i ? "#ED6D40" : "transparent",
                color: activeTab === i ? "#F9F9F4" : "rgba(217,217,217,0.4)",
              }}
            >
              {plan}
            </button>
          ))}
        </div>

        {/* Features for active tab */}
        <div className="flex flex-col">
          {features.map((group) => (
            <div key={group.category}>
              <span className="text-[10px] font-semibold text-akac-orange uppercase tracking-[0.18px] block py-3 border-t" style={{ borderColor: "rgba(217,217,217,0.06)" }}>
                {group.category}
              </span>
              {group.items.map((item) => {
                const included = activeTab === 0 ? item.essential : activeTab === 1 ? item.professional : item.enterprise;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 py-3 border-t"
                    style={{ borderColor: "rgba(217,217,217,0.08)" }}
                  >
                    {included ? <Check /> : <Dash />}
                    <span
                      className="text-[13px] font-medium tracking-[0.1px]"
                      style={{ color: included ? "rgba(217,217,217,0.85)" : "rgba(217,217,217,0.3)" }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

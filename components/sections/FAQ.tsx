"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "HOW LONG DOES A PROJECT TYPICALLY TAKE?",
    a: "Most projects are delivered in 2–6 weeks depending on scope. Essential packages ship in around 2 weeks, Professional in 3–4 weeks, and Enterprise projects are scoped individually.",
  },
  {
    q: "DO YOU WORK WITH CLIENTS OUTSIDE OF EUROPE?",
    a: "Yes — we work with clients worldwide. Communication is primarily async via Slack and Loom, with video calls when needed.",
  },
  {
    q: "WHAT DO YOU NEED FROM US TO GET STARTED?",
    a: "A brief, your brand assets, and a clear idea of what you want to achieve. We'll guide you through the rest in our onboarding call.",
  },
  {
    q: "DO YOU OFFER ONGOING SUPPORT AFTER LAUNCH?",
    a: "Absolutely. We offer monthly maintenance retainers that cover updates, performance monitoring, and new features as your business grows.",
  },
  {
    q: "CAN YOU REDESIGN OUR EXISTING WEBSITE?",
    a: "Yes — redesigns are a big part of what we do. We'll audit your current site, identify what's working, and rebuild it better.",
  },
  {
    q: "WHAT MAKES YOU DIFFERENT FROM OTHER STUDIOS?",
    a: "We're a small, focused team — no account managers, no handoffs, no outsourcing. You work directly with the people building your product from day one to launch.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-akac-light/10">
      <button
        className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-[16px] font-medium text-akac-cream uppercase tracking-[0.24px] leading-[18px]">
          {q}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
          style={{ transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path
            d="M10 4V16M4 10H16"
            stroke="#D9D9D9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[16px] font-medium text-akac-light/60 leading-[1.6] tracking-[0.24px] pb-5 pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="bg-akac-black overflow-hidden px-[100px] pt-[280px] pb-[260px]"
      style={{ borderRadius: "60px 60px 0 0", marginTop: "-60px", position: "relative", zIndex: 1 }}>
      <div className="flex gap-20">
        {/* Left label + title */}
        <div className="w-[340px] flex-shrink-0">
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px] block mb-4">
            / FAQ
          </span>
          <h2 className="text-[30px] font-medium text-akac-light tracking-[-0.6px] leading-[32px]">
            COMMON QUESTIONS
          </h2>
        </div>

        {/* Right accordion */}
        <div className="flex-1">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

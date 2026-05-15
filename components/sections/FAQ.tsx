"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { AnimatePresence, motion } from "framer-motion";
import RevealHeadline from "@/components/ui/RevealHeadline";
import { useLocale } from "@/components/providers/LocaleProvider";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-akac-light/10">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer bg-transparent border-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-[14px] md:text-[16px] font-medium text-akac-cream uppercase tracking-[0.24px] leading-[18px]">
          {q}
        </span>
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path d="M10 4V16M4 10H16" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
            <p className="text-[16px] font-medium text-akac-light/60 leading-[1.6] tracking-[0.24px] pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { t } = useLocale();
  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
    { q: t.faq.q6, a: t.faq.a6 },
  ];

  return (
    <section
      className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[280px] md:pb-[260px]"
      style={{ marginTop: "-60px", position: "relative", zIndex: 1 }}
    >
      <div className="flex flex-col gap-8 md:flex-row md:gap-20">
        {/* Left */}
        <div className="w-full md:w-[340px] md:flex-shrink-0">
          <SectionLabel dark>{t.faq.label}</SectionLabel>
          <RevealHeadline className="text-[30px] font-medium text-akac-light tracking-[-0.6px] leading-[32px]">
            {t.faq.title}
          </RevealHeadline>
        </div>

        {/* Accordion */}
        <div className="flex-1">
          {faqs.map((item) => <FAQItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </div>
    </section>
  );
}

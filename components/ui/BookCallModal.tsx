"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import BracketButton from "@/components/ui/BracketButton";

const QUESTIONS = [
  {
    id: "budget",
    label: "WHAT'S YOUR BUDGET?",
    options: ["UNDER €2,500", "€2,500 – €6,000", "€6,000 – €12,000", "€12,000+"],
  },
  {
    id: "need",
    label: "WHAT DO YOU NEED?",
    options: ["NEW WEBSITE", "WEB APP", "E-COMMERCE", "REDESIGN", "NOT SURE YET"],
  },
  {
    id: "timeline",
    label: "WHAT'S YOUR TIMELINE?",
    options: ["ASAP", "1–3 MONTHS", "3–6 MONTHS", "JUST EXPLORING"],
  },
];

interface Props {
  onClose: () => void;
}

export default function BookCallModal({ onClose }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"questions" | "calendar">("questions");

  const toggle = (id: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [id]: prev[id] === option ? "" : option }));
  };

  const handleContinue = () => setStep("calendar");

  // Fires exactly when the calendar container div enters the DOM
  const calRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    (async () => {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#ED6D40" },
          dark: { "cal-brand": "#ED6D40" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("inline", {
        elementOrSelector: node,
        calLink: "akac-studio/15min",
      });
    })();
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[100]"
        style={{ backgroundColor: "rgba(17,17,17,0.7)" }}
      />

      {/* Modal container */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 z-[101] flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="w-full bg-akac-black overflow-hidden"
          style={{ borderRadius: "24px" }}
          animate={{ maxWidth: step === "calendar" ? 900 : 560 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header — always visible */}
          <div className="flex items-start justify-between px-8 pt-10 pb-8" style={{ borderBottom: "1px solid rgba(249,249,244,0.08)" }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                <span className="text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px]">
                  / BOOK A CALL
                </span>
              </div>
              <h2 className="text-[28px] font-semibold text-akac-cream tracking-[-0.8px] leading-[1.1]">
                {step === "questions" ? "A FEW QUICK QUESTIONS" : "PICK A TIME"}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="mt-1 ml-6 flex-shrink-0 transition-opacity hover:opacity-50 cursor-pointer"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1L15 15M15 1L1 15" stroke="#F9F9F4" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {step === "questions" ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="flex flex-col gap-8 px-8 py-8">
                  {QUESTIONS.map((q) => (
                    <div key={q.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                        <span className="text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px]">
                          {q.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => {
                          const active = answers[q.id] === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => toggle(q.id, opt)}
                              className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18px] cursor-pointer transition-all duration-200"
                              style={{
                                borderRadius: "999px",
                                border: active ? "1px solid #ED6D40" : "1px solid rgba(249,249,244,0.15)",
                                color: active ? "#ED6D40" : "rgba(249,249,244,0.4)",
                                background: "transparent",
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-8 pb-8 flex justify-center" style={{ borderTop: "1px solid rgba(249,249,244,0.08)", paddingTop: "24px" }}>
                  <BracketButton label="CONTINUE" color="#F9F9F4" onClick={handleContinue} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div
                  ref={calRef}
                  style={{ width: "100%", height: "600px", overflow: "hidden" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

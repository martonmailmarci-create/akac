"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import BracketButton from "@/components/ui/BracketButton";
import { useLocale } from "@/components/providers/LocaleProvider";

interface Props {
  onClose: () => void;
}

export default function BookCallModal({ onClose }: Props) {
  const { t } = useLocale();
  const bm = t.bookModal;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"questions" | "calendar">("questions");
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const questions = [
    { id: "budget", label: bm.budgetLabel, options: [bm.budget1, bm.budget2, bm.budget3, bm.budget4] },
    { id: "need", label: bm.needLabel, options: [bm.need1, bm.need2, bm.need3, bm.need4, bm.need5] },
    { id: "timeline", label: bm.timelineLabel, options: [bm.timeline1, bm.timeline2, bm.timeline3, bm.timeline4] },
  ];

  const toggle = (id: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [id]: prev[id] === option ? "" : option }));
  };

  const handleContinue = () => setStep("calendar");

  // Escape closes the modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Move focus into the modal on open
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Fires exactly when the calendar container div enters the DOM
  const calRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    // Prefill the booking notes with the visitor's answers
    const a = answersRef.current;
    const notes = [
      a.budget && `${bm.notesBudget}: ${a.budget}`,
      a.need && `${bm.notesNeed}: ${a.need}`,
      a.timeline && `${bm.notesTimeline}: ${a.timeline}`,
    ].filter(Boolean).join(" · ");

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
        config: notes ? { notes } : undefined,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        role="dialog"
        aria-modal="true"
        aria-label={step === "questions" ? bm.questionsTitle : bm.pickTime}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 z-[101] flex items-center justify-center px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="w-full bg-akac-black"
          style={{
            borderRadius: "24px",
            maxHeight: "calc(100dvh - 32px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          }}
          animate={{ maxWidth: step === "calendar" ? 900 : 560 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header — always visible */}
          <div className="flex items-start justify-between px-8 pt-10 pb-8" style={{ borderBottom: "1px solid rgba(249,249,244,0.08)" }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                <span className="text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px]">
                  {bm.label}
                </span>
              </div>
              <h2 className="text-[28px] font-semibold text-akac-cream tracking-[-0.8px] leading-[1.1]">
                {step === "questions" ? bm.questionsTitle : bm.pickTime}
              </h2>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label={bm.close}
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
                  {questions.map((q) => (
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
                              aria-pressed={active}
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
                  <BracketButton label={bm.continueBtn} color="#F9F9F4" onClick={handleContinue} />
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
                  style={{ width: "100%", minHeight: "600px" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

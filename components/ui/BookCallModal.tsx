"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import { useLocale } from "@/components/providers/LocaleProvider";

interface Props {
  onClose: () => void;
}

export default function BookCallModal({ onClose }: Props) {
  const { t } = useLocale();
  const bm = t.bookModal;
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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
        role="dialog"
        aria-modal="true"
        aria-label={bm.pickTime}
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
            maxWidth: 900,
            maxHeight: "calc(100dvh - 32px)",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-8 pt-10 pb-8" style={{ borderBottom: "1px solid rgba(249,249,244,0.08)" }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                <span className="text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px]">
                  {bm.label}
                </span>
              </div>
              <h2 className="text-[28px] font-semibold text-akac-cream tracking-[-0.8px] leading-[1.1]">
                {bm.pickTime}
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

          {/* Calendar */}
          <div
            ref={calRef}
            style={{ width: "100%", minHeight: "600px" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

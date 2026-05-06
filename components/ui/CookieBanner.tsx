"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function grantAnalytics() {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as Record<string, (...a: unknown[]) => void>).gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", { analytics_storage: "granted" });
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookie_consent");
    if (choice === "accepted") {
      // Previously accepted — grant analytics immediately, no banner
      grantAnalytics();
    } else if (!choice) {
      // No choice yet — show banner after a short delay
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
    // If "declined" — do nothing, analytics stays denied
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    grantAnalytics();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-[420px] z-[200]"
        >
          <div
            className="bg-akac-black flex flex-col gap-4 p-6"
            style={{ borderRadius: "16px", border: "1px solid rgba(249,249,244,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
              <span className="text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px]">
                COOKIES
              </span>
            </div>
            <p className="text-[13px] font-medium text-akac-cream/70 leading-[1.6]">
              We use cookies to analyze site traffic with Google Analytics. Accept to help us improve, or decline for essential cookies only.{" "}
              <a href="/cookie-policy" className="text-akac-orange underline underline-offset-2 hover:opacity-70 transition-opacity">
                Learn more
              </a>
            </p>
            <div className="flex gap-3">
              <button
                onClick={accept}
                className="flex-1 py-2 text-[11px] font-semibold uppercase tracking-[0.18px] cursor-pointer transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#ED6D40", color: "#F9F9F4", borderRadius: "8px", border: "none" }}
              >
                ACCEPT
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2 text-[11px] font-semibold uppercase tracking-[0.18px] cursor-pointer transition-opacity hover:opacity-60"
                style={{ background: "transparent", color: "rgba(249,249,244,0.4)", borderRadius: "8px", border: "1px solid rgba(249,249,244,0.12)" }}
              >
                DECLINE
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

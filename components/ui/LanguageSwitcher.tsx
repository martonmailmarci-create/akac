"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { Locale } from "@/lib/i18n/translations";

const LOCALES: { key: Locale; label: string }[] = [
  { key: "en", label: "English" },
  { key: "hu", label: "Magyar" },
];

interface Props {
  mobile?: boolean;
}

export default function LanguageSwitcher({ mobile = false }: Props) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  // ── Mobile: inline EN / HU items inside the hamburger menu ──────────────
  if (mobile) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {(["en", "hu"] as Locale[]).map((l, i) => (
          <span key={l} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button
              onClick={() => setLocale(l)}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                fontSize: "28px", fontWeight: 600, letterSpacing: "-0.8px",
                color: locale === l ? "#ED6D40" : "rgba(249,249,244,0.35)",
                fontFamily: "inherit", transition: "color 0.2s",
              }}
            >
              {l.toUpperCase()}
            </button>
            {i === 0 && (
              <span style={{ color: "rgba(249,249,244,0.15)", fontSize: "20px", fontWeight: 300 }}>/</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  // ── Desktop: dropdown styled like other nav links ────────────────────────
  return (
    <div
      style={{ position: "relative", flexShrink: 0 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        style={{
          background: "none", border: "none", cursor: "pointer", padding: 0,
          display: "flex", alignItems: "center", gap: "3px", fontFamily: "inherit",
        }}
      >
        <span style={{
          fontSize: "clamp(10px, 1.5vw, 12px)", fontWeight: 500,
          letterSpacing: "0.18px", textTransform: "uppercase",
          color: "#F9F9F4", whiteSpace: "nowrap",
        }}>
          {locale.toUpperCase()}
        </span>
        <svg
          width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", marginTop: "1px" }}
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="#F9F9F4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute", top: "calc(100% + 4px)", right: 0,
              paddingTop: "8px", zIndex: 60, minWidth: "100px",
            }}
          >
            <div style={{
              backgroundColor: "#111111", borderRadius: "10px", overflow: "hidden",
              border: "1px solid rgba(249,249,244,0.08)",
            }}>
              {LOCALES.map((l) => (
                <button
                  key={l.key}
                  onClick={() => { setLocale(l.key); setOpen(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "10px 16px", background: "transparent", border: "none",
                    cursor: "pointer", fontSize: "11px", fontWeight: 600,
                    letterSpacing: "0.18px", textTransform: "uppercase",
                    fontFamily: "inherit",
                    color: locale === l.key ? "#ED6D40" : "#F9F9F4",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { if (locale !== l.key) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

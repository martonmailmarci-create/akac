"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "WHY AKAC", href: "#why-us" },
  { label: "TEAM", href: "#our-team" },
  { label: "WORK", href: "#featured-work" },
  { label: "SERVICES", href: "#services" },
  { label: "CONTACT", href: "#contact" },
];

const desktopLinks = [
  { label: "WHY AKAC", href: "#why-us", mobileHide: false },
  { label: "TEAM", href: "#our-team", mobileHide: true },
  { label: "WORK", href: "#featured-work", mobileHide: true },
  { label: "SERVICES", href: "#services", mobileHide: false },
  { label: "CONTACT", href: "#contact", mobileHide: false },
];

const PILL = {
  height: "55px",
  backgroundColor: "#111111",
  borderRadius: "10px",
} as const;

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScrollY.current && y > 80);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const slideY = !revealed || hidden ? "calc(-100% - 25px)" : "0";
  const transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <>
      {/* ── Desktop pill nav (md+) ── */}
      <nav
        className="hidden md:flex"
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: `translateX(-50%) translateY(${slideY})`,
          width: "min(647px, 90vw)",
          ...PILL,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 50,
          transition,
        }}
      >
        <a href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <Image src="/icons/akac-logo.svg" alt="AKAC" width={36} height={36} />
        </a>
        {desktopLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: "#F9F9F4",
              fontSize: "clamp(10px, 1.5vw, 12px)",
              fontWeight: 500,
              letterSpacing: "0.18px",
              textTransform: "uppercase",
              textDecoration: "none",
              flexShrink: 1,
              whiteSpace: "nowrap",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* ── Mobile: combined logo + hamburger pill (top-right) ── */}
      <div
        className="flex md:hidden"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 50,
          ...PILL,
          alignItems: "center",
          gap: "12px",
          padding: "0 16px 0 12px",
          transform: `translateY(${slideY})`,
          transition,
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image src="/icons/akac-logo.svg" alt="AKAC" width={28} height={28} />
        </a>
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{ display: "flex", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ display: "block", width: "20px", height: "1.5px", backgroundColor: "#F9F9F4", borderRadius: "2px" }} />
          ))}
        </button>
      </div>

      {/* ── Mobile fullscreen menu overlay ── */}
      <div
        className="flex md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          backgroundColor: "#111111",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            ...PILL,
            width: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#1e1e1e",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="1" y1="1" x2="15" y2="15" stroke="#F9F9F4" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="15" y1="1" x2="1" y2="15" stroke="#F9F9F4" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#F9F9F4",
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

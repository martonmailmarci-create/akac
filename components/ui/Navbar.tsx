"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ScrambleText from "@/components/ui/ScrambleText";

function lenisScrollTo(anchor: string) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (t: string) => void } | undefined;
  if (lenis) {
    lenis.scrollTo(anchor);
  } else {
    document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
  }
}

const navLinks = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/#services" },
  { label: "PRICING", href: "/pricing" },
  { label: "TEAM", href: "/#team" },
  { label: "CONTACT", href: "/#contact" },
];

const desktopLinks = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/#services" },
  { label: "PRICING", href: "/pricing" },
  { label: "TEAM", href: "/#team" },
  { label: "CONTACT", href: "/#contact" },
];

const PILL = {
  height: "55px",
  backgroundColor: "#111111",
  borderRadius: "10px",
} as const;

export default function Navbar() {
  const [revealed, setRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        lenisScrollTo(href.slice(1));
      }
      // else let browser navigate to /#section naturally
    }
    // /work and other page links navigate normally
  };

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const slideY = !revealed ? "calc(-100% - 25px)" : "0";
  const pillTransition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

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
          transition: pillTransition,
        }}
      >
        <a href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <Image src="/icons/akac-logo.svg" alt="AKAC" width={36} height={36} />
        </a>
        {desktopLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            style={{ textDecoration: "none", flexShrink: 1 }}
          >
            <ScrambleText
              text={link.label}
              color="#F9F9F4"
              style={{ fontSize: "clamp(10px, 1.5vw, 12px)", fontWeight: 500, letterSpacing: "0.18px", textTransform: "uppercase", whiteSpace: "nowrap" }}
            />
          </a>
        ))}
      </nav>

      {/* ── Mobile: expandable pill ── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          right: "20px",
          zIndex: 50,
          backgroundColor: "#111111",
          borderRadius: "10px",
          transform: `translateY(${slideY})`,
          transition: pillTransition,
          overflow: "hidden",
        }}
      >
        {/* Strip — always visible */}
        <div
          style={{
            height: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            flexShrink: 0,
          }}
        >
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image src="/icons/akac-logo.svg" alt="AKAC" width={30} height={30} />
          </a>
          {/* Hamburger / close toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, width: "24px", height: "24px", position: "relative" }}
          >
            {/* Bar 1 */}
            <span style={{
              position: "absolute",
              left: 0,
              width: "20px",
              height: "1.5px",
              backgroundColor: "#F9F9F4",
              borderRadius: "2px",
              top: menuOpen ? "11px" : "6px",
              transform: menuOpen ? "rotate(45deg)" : "none",
              transition: "top 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
            }} />
            {/* Bar 2 */}
            <span style={{
              position: "absolute",
              left: 0,
              width: "20px",
              height: "1.5px",
              backgroundColor: "#F9F9F4",
              borderRadius: "2px",
              top: "11px",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s ease",
            }} />
            {/* Bar 3 */}
            <span style={{
              position: "absolute",
              left: 0,
              width: "20px",
              height: "1.5px",
              backgroundColor: "#F9F9F4",
              borderRadius: "2px",
              top: menuOpen ? "11px" : "16px",
              transform: menuOpen ? "rotate(-45deg)" : "none",
              transition: "top 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
            }} />
          </button>
        </div>

        {/* Expandable content — grid trick for smooth height animation */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: menuOpen ? "1fr" : "0fr",
            transition: "grid-template-rows 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div style={{ overflow: "hidden", minHeight: 0 }}>
            <div style={{ padding: "36px 24px 36px" }}>

              {/* Nav links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "36px" }}>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { handleNav(e, link.href); setMenuOpen(false); }}
                    style={{ textDecoration: "none", lineHeight: 1.15 }}
                  >
                    <ScrambleText
                      text={link.label}
                      color="#F9F9F4"
                      style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.8px" }}
                    />
                  </a>
                ))}
              </nav>

              {/* Divider */}
              <div style={{ height: "1px", backgroundColor: "#2a2a2a", marginBottom: "24px" }} />

              {/* Contact */}
              <div style={{ marginBottom: "20px" }}>
                <span style={{ color: "#666", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18px", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  CONTACT
                </span>
                <p style={{ color: "#F9F9F4", fontSize: "13px", fontWeight: 400, margin: "0 0 14px", letterSpacing: "0.1px" }}>
                  info@akac.studio
                </p>
                <p style={{ color: "#F9F9F4", fontSize: "13px", fontWeight: 400, margin: "0 0 4px", letterSpacing: "0.1px" }}>
                  Marcell: marcell@akac.studio
                </p>
                <p style={{ color: "#F9F9F4", fontSize: "13px", fontWeight: 400, margin: 0, letterSpacing: "0.1px" }}>
                  Viktor: viktor@akac.studio
                </p>
              </div>

              {/* Socials */}
              <div style={{ marginBottom: "24px" }}>
                <p style={{ color: "#F9F9F4", fontSize: "13px", fontWeight: 400, margin: "0 0 4px", letterSpacing: "0.1px" }}>
                  Instagram: @akac.studio
                </p>
                <p style={{ color: "#F9F9F4", fontSize: "13px", fontWeight: 400, margin: 0, letterSpacing: "0.1px" }}>
                  LinkedIn: @akac-studio
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", backgroundColor: "#2a2a2a", marginBottom: "20px" }} />

              {/* Status */}
              <div>
                <span style={{ color: "#666", fontSize: "10px", fontWeight: 500, letterSpacing: "0.18px", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                  WORKING GLOBALLY
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ width: "8px", height: "8px", backgroundColor: "#E8572A", borderRadius: "2px", flexShrink: 0 }} />
                  <span style={{ color: "#F9F9F4", fontSize: "11px", fontWeight: 500, letterSpacing: "0.18px", textTransform: "uppercase" }}>
                    ACCEPTING PROJECTS. GET IN TOUCH.
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

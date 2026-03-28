"use client";

import { useEffect, useRef, useState } from "react";
import BracketButton from "@/components/ui/BracketButton";

const navLinks = ["WHY US", "PORTFOLIO", "OUR TEAM", "PRICING", "CONTACT"];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[transform,background-color] duration-500"
        style={{
          backgroundColor: scrolled ? "#111111" : "transparent",
          transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <nav className="flex items-center justify-between h-14 md:h-auto px-6 md:px-[100px] md:py-6">
          {/* Logo */}
          <a href="/" className="flex items-center no-underline">
            <span className="text-akac-light text-[26px] tracking-[-0.52px] font-semibold">akac</span>
            <span className="text-akac-light text-[26px] tracking-[-0.52px] font-black">.</span>
            <span className="text-akac-light text-[26px] tracking-[-0.52px] font-bold">studio</span>
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="block w-5 h-[1.5px] bg-akac-light transition-all duration-300"
              style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
            />
            <span
              className="block w-5 h-[1.5px] bg-akac-light transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-[1.5px] bg-akac-light transition-all duration-300"
              style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className="fixed inset-0 z-40 bg-akac-black flex flex-col justify-center items-center gap-8 transition-opacity duration-300 md:hidden"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
            className="text-akac-light text-[32px] font-medium tracking-[-0.6px] no-underline hover:opacity-50 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <BracketButton
          label="BOOK A CALL"
          color="#ED6D40"
          href="mailto:hello@akac.studio"
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "transform 0.5s ease, background-color 0.5s ease",
        backgroundColor: scrolled ? "#111111" : "transparent",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 100px",
        }}
      >
        {/* Logo — left */}
        <a
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <span
            style={{
              color: "#D9D9D9",
              fontSize: "26px",
              letterSpacing: "-0.52px",
              fontWeight: 600,
            }}
          >
            akac
          </span>
          <span
            style={{
              color: "#D9D9D9",
              fontSize: "26px",
              letterSpacing: "-0.52px",
              fontWeight: 900,
            }}
          >
            .
          </span>
          <span
            style={{
              color: "#D9D9D9",
              fontSize: "26px",
              letterSpacing: "-0.52px",
              fontWeight: 700,
            }}
          >
            studio
          </span>
        </a>

        {/* Right side — white square icon + bracket button */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href="#contact"
            style={{
              color: "#D9D9D9",
              fontSize: "13px",
              letterSpacing: "0.18px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            [ TELL US WHAT YOU NEED ]
          </a>
        </div>
      </nav>
    </header>
  );
}

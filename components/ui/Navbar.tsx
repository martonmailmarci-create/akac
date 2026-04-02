"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "WHY AKAC", href: "#why-us", mobileHide: false },
  { label: "TEAM", href: "#our-team", mobileHide: true },
  { label: "WORK", href: "#featured-work", mobileHide: true },
  { label: "SERVICES", href: "#services", mobileHide: false },
  { label: "CONTACT", href: "#contact", mobileHide: false },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [revealed, setRevealed] = useState(false);
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

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: `translateX(-50%) translateY(${!revealed || hidden ? "calc(-100% - 25px)" : "0"})`,
        width: "min(647px, 90vw)",
        height: "55px",
        backgroundColor: "#111111",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 50,
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Logo mark */}
      <a href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
        <Image
          src="/icons/akac-logo.svg"
          alt="AKAC"
          width={36}
          height={36}
        />
      </a>

      {/* Nav links */}
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={link.mobileHide ? "hidden md:block" : ""}
          style={{
            color: "#F9F9F4",
            fontSize: "clamp(10px, 1.5vw, 12px)",
            fontWeight: 500,
            letterSpacing: "0.18px",
            textTransform: "uppercase",
            textDecoration: "none",
            textAlign: "center",
            flexShrink: 1,
            whiteSpace: "nowrap",
          }}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

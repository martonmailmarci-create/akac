"use client";

import { useEffect, useRef, useState } from "react";
import { triggerEgg } from "@/components/ui/KonamiEgg";

interface MenuItem {
  label: string;
  sub?: string;
  href?: string;
  action?: () => void;
  divider?: false;
}
interface Divider {
  divider: true;
}
type Item = MenuItem | Divider;

const ITEMS: Item[] = [
  {
    label: "Steal our design",
    sub: "we dare you",
    action: () => triggerEgg(),
  },
  {
    label: "Follow our work",
    sub: "@akac.studio",
    action: () => window.open("https://www.instagram.com/akac.studio", "_blank"),
  },
  { divider: true },
  {
    label: "Test your site speed",
    sub: "free tool",
    href: "/analyze",
  },
  {
    label: "Talk to us",
    sub: "we respond fast",
    href: "/contact",
  },
  { divider: true },
  {
    label: "© AKAC Studio",
    sub: `${new Date().getFullYear()} · Built for performance`,
  },
];

export default function ContextMenu() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      // Clamp so menu stays inside viewport
      const menuW = 240;
      const menuH = 260;
      const x = Math.min(e.clientX, window.innerWidth - menuW - 12);
      const y = Math.min(e.clientY, window.innerHeight - menuH - 12);
      setPos({ x, y });
    };

    const onClose = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPos(null);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPos(null);
    };

    window.addEventListener("contextmenu", onContext);
    window.addEventListener("mousedown", onClose);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("mousedown", onClose);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      ref={menuRef}
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        zIndex: 99999,
        background: "#161616",
        border: "1px solid #2a2a2a",
        borderRadius: "12px",
        padding: "6px",
        width: "240px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
        animation: "ctxFadeIn 0.12s ease",
      }}
    >
      <style>{`
        @keyframes ctxFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(-4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {ITEMS.map((item, i) => {
        if ("divider" in item && item.divider) {
          return (
            <div
              key={i}
              style={{ height: "1px", background: "#222", margin: "4px 0" }}
            />
          );
        }

        const mi = item as MenuItem;
        const isDisabled = !mi.href && !mi.action;
        const isLast = mi.label.startsWith("©");

        const inner = (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: isDisabled ? "default" : "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!isDisabled) (e.currentTarget as HTMLDivElement).style.background = "#222";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
            }}
            onClick={() => {
              if (mi.action) { mi.action(); setPos(null); }
              else if (mi.href) setPos(null);
            }}
          >
            <span style={{
              fontSize: "13px",
              fontWeight: 500,
              color: isLast ? "#444" : "#D9D9D9",
              letterSpacing: "0.01em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              {mi.label}
            </span>
            {mi.sub && (
              <span style={{
                fontSize: "11px",
                fontWeight: 400,
                color: isLast ? "#333" : "#555",
                letterSpacing: "0.01em",
                fontFamily: "var(--font-inter), sans-serif",
              }}>
                {mi.sub}
              </span>
            )}
          </div>
        );

        if (mi.href) {
          return (
            <a key={i} href={mi.href} style={{ textDecoration: "none", display: "block" }}>
              {inner}
            </a>
          );
        }

        return <div key={i}>{inner}</div>;
      })}
    </div>
  );
}

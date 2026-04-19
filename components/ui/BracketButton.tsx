"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?[]{}|~+-=_";
const ORANGE = "#ED6D40";

interface BracketButtonProps {
  label: string;
  color?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function BracketButton({
  label,
  color = "#111111",
  href,
  onClick,
  className = "",
}: BracketButtonProps) {
  const size = 10;
  const thickness = 1;

  const chars = label.split("");
  const [display, setDisplay] = useState(chars);
  const [isOrange, setIsOrange] = useState<boolean[]>(chars.map(() => false));
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const startScramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    startRef.current = performance.now();

    const totalDuration = 550;  // ms to fully reveal all chars
    const minHold = 80;         // each char scrambles for at least this long

    const animate = (now: number) => {
      const elapsed = now - startRef.current;

      const newDisplay = chars.map((orig, i) => {
        if (orig === " ") return " ";
        const resolveAt = minHold + (i / chars.length) * (totalDuration - minHold);
        if (elapsed >= resolveAt) return orig;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      });

      const newOrange = chars.map((orig, i) => {
        if (orig === " ") return false;
        const resolveAt = minHold + (i / chars.length) * (totalDuration - minHold);
        if (elapsed >= resolveAt) return false;
        return Math.random() < 0.25;
      });

      setDisplay(newDisplay);
      setIsOrange(newOrange);

      if (elapsed < totalDuration) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [label]); // eslint-disable-line react-hooks/exhaustive-deps

  const stopScramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplay(chars);
    setIsOrange(chars.map(() => false));
  }, [label]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, []);

  const corner = (
    pos: { top?: 0; bottom?: 0; left?: 0; right?: 0 },
    dx: number,
    dy: number
  ) => ({
    position: "absolute" as const,
    width: size,
    height: size,
    ...pos,
    borderTop: pos.top === 0 ? `${thickness}px solid ${color}` : undefined,
    borderBottom: pos.bottom === 0 ? `${thickness}px solid ${color}` : undefined,
    borderLeft: pos.left === 0 ? `${thickness}px solid ${color}` : undefined,
    borderRight: pos.right === 0 ? `${thickness}px solid ${color}` : undefined,
    transform: hovered ? `translate(${dx}px, ${dy}px)` : "translate(0,0)",
    transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
  });

  const inner = (
    <>
      <span style={corner({ top: 0, left: 0 }, -4, -4)} />
      <span style={corner({ top: 0, right: 0 }, 4, -4)} />
      <span style={corner({ bottom: 0, left: 0 }, -4, 4)} />
      <span style={corner({ bottom: 0, right: 0 }, 4, 4)} />

      {/* Fixed-width wrapper prevents layout shift during scramble */}
      <span style={{ position: "relative", display: "inline-block" }}>
        {/* Invisible original text holds the width */}
        <span style={{ opacity: 0, userSelect: "none", fontSize: "13px", fontWeight: 500, letterSpacing: "0.18px", textTransform: "uppercase" as const }}>
          {label}
        </span>
        {/* Scrambling text overlaid */}
        <span style={{ position: "absolute", left: 0, top: 0, display: "inline-flex", fontSize: "13px", fontWeight: 500, letterSpacing: "0.18px", textTransform: "uppercase" as const }}>
          {display.map((ch, i) => (
            <span key={i} style={{ color: isOrange[i] ? ORANGE : color }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      </span>
    </>
  );

  const shared = {
    className: `relative inline-flex items-center justify-center px-8 py-3 bg-transparent border-none cursor-pointer no-underline ${className}`,
    style: { minWidth: "160px" },
    onClick,
    onMouseEnter: () => { setHovered(true); startScramble(); },
    onMouseLeave: () => { setHovered(false); stopScramble(); },
  };

  if (href) return <a href={href} {...shared}>{inner}</a>;
  return <button {...shared}>{inner}</button>;
}

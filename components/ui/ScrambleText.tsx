"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>?[]{}|~+-=_";
const ORANGE = "#ED6D40";

interface Props {
  text: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  triggered?: boolean; // external hover control
}

export default function ScrambleText({ text, color, className, style, triggered }: Props) {
  const chars = text.split("");
  const [display, setDisplay] = useState(chars);
  const [isOrange, setIsOrange] = useState<boolean[]>(chars.map(() => false));
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const startScramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    startRef.current = performance.now();

    const totalDuration = 450;
    const minHold = 60;

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
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const stopScramble = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplay(text.split(""));
    setIsOrange(text.split("").map(() => false));
  }, [text]);

  useEffect(() => {
    if (triggered === undefined) return;
    if (triggered) startScramble(); else stopScramble();
  }, [triggered]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, []);

  return (
    <span
      className={className}
      style={{ ...style, position: "relative", display: "inline-block" }}
      onMouseEnter={triggered === undefined ? startScramble : undefined}
      onMouseLeave={triggered === undefined ? stopScramble : undefined}
    >
      {/* Invisible original holds width */}
      <span style={{ opacity: 0, userSelect: "none" }}>{text}</span>
      {/* Scrambling overlay */}
      <span style={{ position: "absolute", left: 0, top: 0, display: "inline-flex" }}>
        {display.map((ch, i) => (
          <span key={i} style={{ color: isOrange[i] ? ORANGE : color }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

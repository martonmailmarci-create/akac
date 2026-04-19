"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    // Phase 1: fill logo from bottom to top
    const t1 = setTimeout(() => {
      logo.style.transition = "clip-path 1.2s cubic-bezier(0.76, 0, 0.24, 1)";
      logo.style.clipPath = "inset(0% 0 0 0)";
    }, 250);

    // Phase 2: wipe overlay away bottom-to-top after fill + hold
    const t2 = setTimeout(() => {
      overlay.style.transition = "clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)";
      overlay.style.clipPath = "inset(0 0 100% 0)";
    }, 250 + 1200 + 350);

    // Phase 3: signal complete after wipe finishes
    const t3 = setTimeout(() => {
      onCompleteRef.current();
    }, 250 + 1200 + 350 + 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        backgroundColor: "#111111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "inset(0 0 0% 0)",
      }}
    >
      <div
        ref={logoRef}
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        <Image
          src="/logo.svg"
          alt="AKAC Studio"
          width={140}
          height={140}
          priority
          loading="eager"
        />
      </div>
    </div>
  );
}

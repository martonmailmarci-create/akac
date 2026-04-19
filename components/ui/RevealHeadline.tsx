"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  delay?: number;
  start?: string;
}

export default function RevealHeadline({
  children,
  className,
  style,
  as: Tag = "h2",
  delay = 0,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap, ScrollTrigger, SplitText } = await import("@/lib/gsap");
      if (!el) return;

      ctx = gsap.context(() => {
        const split = new SplitText(el, { type: "words" });

        gsap.from(split.words, {
          autoAlpha: 0,
          y: 22,
          duration: 0.65,
          stagger: 0.045,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start,
          },
        });
      }, el);
    })();

    return () => ctx?.revert();
  }, [delay, start]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

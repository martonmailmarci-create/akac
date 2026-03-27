"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: "01",
    name: "REACH",
    tags: ["Marketing Site", "Tech / Crypto"],
    thumb: "/project1.png",
    large: "/project1.png",
  },
  {
    id: "02",
    name: "PROJECT 02",
    tags: ["Web App", "SaaS"],
    thumb: "/project2.png",
    large: "/project2.png",
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Scroll-based active detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Parallax on each large image
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        imageRefs.current.forEach((el) => {
          if (!el) return;
          gsap.fromTo(
            el.querySelector(".parallax-inner"),
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-akac-black"
      style={{ padding: "340px 0 280px 100px", borderRadius: "60px 60px 0 0", marginTop: "-60px", position: "relative", zIndex: 2 }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "60px" }}>

        {/* Left column — sticky */}
        <div style={{ width: "33%", minWidth: "400px", flexShrink: 0, position: "sticky", top: "60px", marginTop: "-100px" }}>
          {/* Label */}
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#D9D9D9", textTransform: "uppercase", letterSpacing: "0.18px", display: "block", marginBottom: "12px" }}>
            / OUR WORK
          </span>

          {/* Title */}
          <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#D7D7D7", letterSpacing: "-0.6px", lineHeight: "32px", marginBottom: "24px" }}>
            FEATURED WORK
          </h2>

          {/* Body paragraph */}
          <p style={{ color: "#D9D9D9", fontSize: "16px", fontWeight: 500, lineHeight: "18px", letterSpacing: "0.24px", maxWidth: "420px", marginBottom: "40px" }}>
            Every decision we make, from layout to load time, is measured against one thing: what moves the needle for your business. We build sites that strengthen how your brand is perceived, convert visitors into customers, and perform fast enough to never lose one. And when we hand it over, it&apos;s yours to manage with ease, no developer dependency, no guesswork.
          </p>

          {/* Thumbnails — orange square animates to active row */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            {/* Animated indicator */}
            <div
              style={{
                position: "absolute",
                left: "142px",
                top: `${active * (75 + 12) + (75 - 8) / 2}px`,
                width: "8px",
                height: "8px",
                backgroundColor: "#ED6D40",
                transition: "top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {projects.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "12px", opacity: active === i ? 1 : 0.4, transition: "opacity 0.4s" }}>
                <div style={{ position: "relative", width: "130px", height: "75px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={p.thumb} alt={p.name} fill className="object-cover" sizes="130px" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#"
            style={{ display: "inline-flex", alignItems: "center", border: "1px solid #ED6D40", padding: "10px 20px", textDecoration: "none" }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#ED6D40", letterSpacing: "0.18px" }}>
              [ VIEW ALL ]
            </span>
          </a>
        </div>

        {/* Right — both images stacked, bleed to right edge */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "80px" }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { imageRefs.current[i] = el; }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "600px", borderRadius: "20px 0 0 20px", overflow: "hidden" }}>
                <div className="parallax-inner" style={{ position: "absolute", inset: 0, top: "-10%", height: "120%" }}>
                  <Image
                    src={p.large}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1920px) 67vw"
                  />
                </div>
              </div>

              {/* Project info bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", paddingRight: "24px" }}>
                <span className="text-[12px] font-medium text-akac-light/40 uppercase tracking-[0.18px]">
                  {p.id}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className="text-[16px] font-semibold text-akac-light tracking-[-0.32px]">
                    {p.name}
                  </span>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] font-medium text-akac-light/50 uppercase tracking-[0.18px] border border-akac-light/20 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

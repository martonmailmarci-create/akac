"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BracketButton from "@/components/ui/BracketButton";
import RevealHeadline from "@/components/ui/RevealHeadline";

const projects = [
  {
    id: "01", name: "ANNA ŁABNO",
    tags: ["Web Design & Dev", "Healthcare / Therapy"],
    thumb: "/project1.jpg", large: "/project1.jpg",
    slug: "annalabno",
  },
  {
    id: "02", name: "PROJECT 02",
    tags: ["Web App", "SaaS"],
    thumb: "/project2.jpg", large: "/project2.jpg",
    slug: null,
  },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftColRef = useRef<HTMLDivElement>(null);
  const desktopLayoutRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-based active detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(i); }, { threshold: 0.5 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Desktop: pin left column + parallax
  useEffect(() => {
    if (window.innerWidth < 768) return;
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        // Pin left column like sticky — uses ScrollTrigger to avoid CSS sticky issues
        ScrollTrigger.create({
          trigger: leftColRef.current,
          start: "top 80px",
          endTrigger: desktopLayoutRef.current,
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
        });

        if (!prefersReduced) {
          imageRefs.current.forEach((el) => {
            if (!el) return;
            gsap.fromTo(el.querySelector(".parallax-inner"), { yPercent: -8 }, {
              yPercent: 8, ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 },
            });
          });
        }
      });
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-akac-black rounded-t-[24px] md:rounded-t-[60px]"
      style={{ marginTop: "-60px", position: "relative", zIndex: 2 }}
    >
      {/* ── Mobile layout ── */}
      <div className="md:hidden px-6 pt-28 pb-28">
        <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px] block mb-5">/ OUR WORK</span>
        <RevealHeadline className="text-[30px] font-medium text-akac-light tracking-[-0.6px] leading-[32px] mb-6">FEATURED WORK</RevealHeadline>
        <p className="text-[16px] font-medium text-akac-light leading-[18px] tracking-[0.24px] mb-14">
          Every decision we make, from layout to load time, is measured against one thing: what moves the needle for your business.
        </p>

        {/* Thumbnails row */}
        <div className="hidden flex-row gap-3 mb-8 overflow-x-auto pb-1">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition-all duration-300"
              style={{ width: "100px", height: "60px", borderColor: active === i ? "#ED6D40" : "transparent" }}
            >
              <Image src={p.thumb} alt={p.name} fill className="object-cover" sizes="100px" />
            </div>
          ))}
        </div>

        {/* Project images stacked */}
        <div className="flex flex-col gap-16">
          {projects.map((p, i) => (
            <div key={p.id} ref={(el) => { imageRefs.current[i] = el; }}>
              {p.slug ? (
                <Link href={`/work/${p.slug}`} className="block relative aspect-video rounded-[20px] overflow-hidden">
                  <Image src={p.large} alt={p.name} fill className="object-cover" sizes="100vw" />
                </Link>
              ) : (
                <div className="relative aspect-video rounded-[20px] overflow-hidden">
                  <Image src={p.large} alt={p.name} fill className="object-cover" sizes="100vw" />
                </div>
              )}
              <div className="flex items-center justify-between mt-5">
                <span className="text-[12px] font-medium text-akac-light/40 uppercase tracking-[0.18px]">{p.id}</span>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {p.slug ? (
                    <Link href={`/work/${p.slug}`} className="text-[14px] font-semibold text-akac-light tracking-[-0.28px] hover:text-akac-orange transition-colors">
                      {p.name}
                    </Link>
                  ) : (
                    <span className="text-[14px] font-semibold text-akac-light tracking-[-0.28px]">{p.name}</span>
                  )}
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-medium text-akac-light/50 uppercase tracking-[0.18px] border border-akac-light/20 rounded-full px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <BracketButton label="VIEW ALL" color="#ED6D40" href="/work" className="mt-14" />
      </div>

      {/* ── Desktop layout ── */}
      <div
        ref={desktopLayoutRef}
        className="hidden md:flex items-start gap-[60px]"
        style={{ padding: "340px 0 280px 100px" }}
      >
        {/* Left column — outer div holds flex space, inner div gets pinned */}
        <div style={{ width: "33%", minWidth: "400px", flexShrink: 0, marginTop: "-100px" }}>
        <div ref={leftColRef}>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#D9D9D9", textTransform: "uppercase", letterSpacing: "0.18px", display: "block", marginBottom: "12px" }}>
            / OUR WORK
          </span>
          <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#D7D7D7", letterSpacing: "-0.6px", lineHeight: "32px", marginBottom: "24px" }}>
            FEATURED WORK
          </h2>
          <p style={{ color: "#D9D9D9", fontSize: "16px", fontWeight: 500, lineHeight: "18px", letterSpacing: "0.24px", maxWidth: "420px", marginBottom: "40px" }}>
            Every decision we make, from layout to load time, is measured against one thing: what moves the needle for your business. We build sites that strengthen how your brand is perceived, convert visitors into customers, and perform fast enough to never lose one. And when we hand it over, it&apos;s yours to manage with ease, no developer dependency, no guesswork.
          </p>

          {/* Thumbnails */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            <div style={{
              position: "absolute", left: "142px",
              top: `${active * (75 + 12) + (75 - 8) / 2}px`,
              width: "8px", height: "8px", backgroundColor: "#ED6D40",
              transition: "top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }} />
            {projects.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "12px", opacity: active === i ? 1 : 0.4, transition: "opacity 0.4s" }}>
                <div style={{ position: "relative", width: "130px", height: "75px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={p.thumb} alt={p.name} fill className="object-cover" sizes="130px" />
                </div>
              </div>
            ))}
          </div>

          <BracketButton label="VIEW ALL" color="#ED6D40" href="/work" />
        </div>
        </div>

        {/* Right — images stacked, bleed to edge */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "80px" }}>
          {projects.map((p, i) => (
            <div key={p.id} ref={(el) => { imageRefs.current[i] = el; }}>
              {p.slug ? (
                <Link href={`/work/${p.slug}`} style={{ display: "block", position: "relative", height: "600px", borderRadius: "20px 0 0 20px", overflow: "hidden" }}>
                  <div className="parallax-inner" style={{ position: "absolute", inset: 0, top: "-10%", height: "120%" }}>
                    <Image src={p.large} alt={p.name} fill className="object-cover" sizes="(max-width: 1920px) 67vw" />
                  </div>
                </Link>
              ) : (
                <div style={{ position: "relative", height: "600px", borderRadius: "20px 0 0 20px", overflow: "hidden" }}>
                  <div className="parallax-inner" style={{ position: "absolute", inset: 0, top: "-10%", height: "120%" }}>
                    <Image src={p.large} alt={p.name} fill className="object-cover" sizes="(max-width: 1920px) 67vw" />
                  </div>
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", paddingRight: "24px" }}>
                <span className="text-[12px] font-medium text-akac-light/40 uppercase tracking-[0.18px]">{p.id}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {p.slug ? (
                    <Link href={`/work/${p.slug}`} style={{ fontSize: "16px", fontWeight: 600, color: "#D9D9D9", letterSpacing: "-0.32px", textDecoration: "none" }}>
                      {p.name}
                    </Link>
                  ) : (
                    <span className="text-[16px] font-semibold text-akac-light tracking-[-0.32px]">{p.name}</span>
                  )}
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[12px] font-medium text-akac-light/50 uppercase tracking-[0.18px] border border-akac-light/20 rounded-full px-3 py-1">
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

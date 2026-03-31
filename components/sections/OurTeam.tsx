"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BracketButton from "@/components/ui/BracketButton";

const team = [
  {
    photo: "/Marcell.png",
    name: "MARCELL MARTON",
    role: "CO-FOUNDER",
    label: "FOUNDER",
    description: "THE CREATIVE DIRECTOR. EVERY LAYOUT, COLOUR CHOICE, AND INTERACTION IS HIS WORK. OBSESSED WITH DESIGN THAT LOOKS EXCEPTIONAL AND CONVERTS.",
  },
  {
    photo: "/Viktor.png",
    name: "VIKTOR MILLER",
    role: "CO-FOUNDER",
    label: "FOUNDER",
    description: "THE ENGINEER. CLEAN, PERFORMANT CODE THAT LAUNCHES FAST AND SCALES WITHOUT DRAMA. EVERY SITE WORKS AS WELL AS IT LOOKS.",
  },
];

export default function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap, ScrollTrigger, SplitText } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        const split = new SplitText(headlineRef.current, { type: "words" });
        gsap.from(split.words, {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  const prev = () => setActiveIndex((i) => (i - 1 + team.length) % team.length);
  const next = () => setActiveIndex((i) => (i + 1) % team.length);
  const member = team[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] min-h-screen md:min-h-0"
      style={{ marginTop: "-60px", position: "relative", zIndex: 1 }}
    >
      <div className="px-6 pt-20 pb-20 md:px-[100px] md:pt-[180px] md:pb-0">
        {/* Top labels */}
        <div className="flex justify-between mb-12">
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
          <span className="hidden md:inline text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
        </div>

        {/* Reorderable block */}
        <div className="flex flex-col">
          {/* Headline — 1st on mobile, 3rd on desktop */}
          <h2
            ref={headlineRef}
            className="order-1 md:order-3 text-[32px] md:text-[55px] font-semibold text-akac-light tracking-[-1.1px] leading-[1.1] text-center mb-10 md:mb-16"
          >
            WE DON&apos;T HAND OFF. /
            <br />
            WE SEE IT THROUGH.
          </h2>

          {/* Descriptor — 2nd on mobile, 1st on desktop */}
          <p className="order-2 md:order-1 text-[16px] font-medium text-akac-light uppercase tracking-[0.24px] leading-[18px] text-center mb-10">
            TWO PEOPLE. ONE SHARED OBSESSION.
            <br />
            DESIGN AND CODE, UNDER ONE ROOF.
          </p>

          {/* CTA — 3rd on mobile, 2nd on desktop */}
          <div className="order-3 md:order-2 flex justify-center mb-16">
            <BracketButton label="MEET THE TEAM" color="#D9D9D9" href="#contact" />
          </div>
        </div>

        {/* ── Mobile: carousel ── */}
        <div className="md:hidden">
          {/* Photo */}
          <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Founder badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <div className="w-[7px] h-[7px] rounded-full bg-akac-orange flex-shrink-0" />
              <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
                {member.label}
              </span>
            </div>
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={prev}
              className="text-akac-light text-[20px] font-medium w-8 h-8 flex items-center justify-center"
              aria-label="Previous"
            >
              &lt;
            </button>
            <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
              {String(activeIndex + 1).padStart(2, "0")}&nbsp;&nbsp;/&nbsp;&nbsp;{String(team.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              className="text-akac-light text-[20px] font-medium w-8 h-8 flex items-center justify-center"
              aria-label="Next"
            >
              &gt;
            </button>
          </div>

          {/* Name + Role */}
          <div className="flex justify-between items-baseline mt-8">
            <span className="text-[16px] font-medium text-akac-light uppercase tracking-[0.18px]">
              {member.name}
            </span>
            <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
              {member.role}
            </span>
          </div>

          {/* Description */}
          <p className="text-[16px] font-medium text-akac-light tracking-[0.24px] leading-[1.6] mt-8">
            {member.description}
          </p>

          {/* CTA buttons */}
          <div className="flex gap-6 mt-10">
            <BracketButton label={`CONNECT WITH ${member.name.split(" ")[0]}`} color="#D9D9D9" href="#contact" />
          </div>
        </div>

        {/* ── Desktop: side-by-side with overlap ── */}
        <div className="hidden md:flex justify-center">
          <div className="relative rounded-card overflow-hidden flex-shrink-0 md:w-[520px] md:h-[480px]" style={{ zIndex: 2 }}>
            <Image src="/Marcell.png" alt="Marcell Marton" fill className="object-cover" sizes="520px" />
          </div>
          <div className="relative rounded-card overflow-hidden flex-shrink-0 md:w-[520px] md:h-[480px] md:-ml-[80px]" style={{ zIndex: 1 }}>
            <Image src="/Viktor.png" alt="Viktor Miller" fill className="object-cover" sizes="520px" />
          </div>
        </div>
      </div>
    </section>
  );
}

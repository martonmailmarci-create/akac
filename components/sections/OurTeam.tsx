"use client";

import { useRef } from "react";
import Image from "next/image";
import BracketButton from "@/components/ui/BracketButton";
import RevealHeadline from "@/components/ui/RevealHeadline";

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

  return (
    <section
      id="team"
      ref={sectionRef}
      className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] min-h-screen md:min-h-0"
      style={{ marginTop: "-60px", position: "relative", zIndex: 1 }}
    >
      <div className="px-6 pt-28 pb-28 md:px-[100px] md:pt-[180px] md:pb-0">
        {/* Top labels */}
        <div className="flex justify-between mb-16">
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
          <span className="hidden md:inline text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
          <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">OUR TEAM</span>
        </div>

        {/* Reorderable block */}
        <div className="flex flex-col">
          {/* Headline — 1st on mobile, 3rd on desktop */}
          <RevealHeadline className="order-1 md:order-3 text-[32px] md:text-[55px] font-semibold text-akac-light tracking-[-1.1px] leading-[1.1] text-center mb-14 md:mb-16">
            WE DON&apos;T HAND OFF.
            <br />
            WE SEE IT THROUGH.
          </RevealHeadline>

          {/* Descriptor — 2nd on mobile, 1st on desktop */}
          <p className="order-2 md:order-1 text-[16px] font-medium text-akac-light uppercase tracking-[0.24px] leading-[18px] text-center mb-14">
            TWO PEOPLE. ONE SHARED OBSESSION.
            <br />
            DESIGN AND CODE, UNDER ONE ROOF.
          </p>

          {/* CTA — 3rd on mobile, 2nd on desktop */}
          <div className="order-3 md:order-2 flex justify-center mb-20">
            <BracketButton label="MEET THE TEAM" color="#D9D9D9" href="#contact" />
          </div>
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="md:hidden flex flex-col gap-20">
          {team.map((m) => (
            <div key={m.name}>
              {/* Photo */}
              <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image src={m.photo} alt={m.name} fill className="object-cover" sizes="100vw" />
                {/* Founder badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <div className="w-[7px] h-[7px] rounded-full bg-akac-orange flex-shrink-0" />
                  <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
                    {m.label}
                  </span>
                </div>
              </div>

              {/* Name + Role */}
              <div className="flex justify-between items-baseline mt-12">
                <span className="text-[16px] font-medium text-akac-light uppercase tracking-[0.18px]">
                  {m.name}
                </span>
                <span className="text-[12px] font-medium text-akac-light uppercase tracking-[0.18px]">
                  {m.role}
                </span>
              </div>

              {/* Description */}
              <p className="text-[16px] font-medium text-akac-light tracking-[0.24px] leading-[1.6] mt-10">
                {m.description}
              </p>

              {/* CTA */}
              <div className="flex mt-14">
                <BracketButton label={`CONNECT WITH ${m.name.split(" ")[0]}`} color="#D9D9D9" href="#contact" />
              </div>
            </div>
          ))}
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

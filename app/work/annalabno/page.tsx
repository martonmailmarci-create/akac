"use client";

import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTA from "@/components/sections/CTA";
import { useLocale } from "@/components/providers/LocaleProvider";
import HeroParallax from "./HeroParallax";

export default function AnnalabnoPage() {
  const { t } = useLocale();
  const a = t.annalabno;

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero (parallax) ── */}
        <HeroParallax>
          <div className="px-6 md:px-[100px]">
            <h1 style={{ fontSize: "clamp(52px, 9vw, 110px)", fontWeight: 600, color: "#F9F9F4", letterSpacing: "-3px", lineHeight: 1 }}>
              ANNA ŁABNO
            </h1>
          </div>
        </HeroParallax>

        {/* ── Overview ── */}
        <section className="bg-akac-cream px-6 md:px-[100px] rounded-t-[24px] md:rounded-t-[60px]" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          <div className="flex flex-col md:flex-row md:gap-[100px]">
            <div style={{ flexShrink: 0, width: "100%", maxWidth: "300px", marginBottom: "40px" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(17,17,17,0.35)", textTransform: "uppercase", letterSpacing: "0.18px", marginBottom: "12px" }}>
                {a.overviewLabel}
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                {a.overviewTitle}
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#111111", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                {a.overviewP1}
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(17,17,17,0.55)", lineHeight: "27px", letterSpacing: "0.1px" }}>
                {a.overviewP2}
              </p>
            </div>
          </div>
        </section>

{/* ── First impact: iMac testimonials shot ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "60px" }}>
          <div className="relative w-full rounded-[20px] md:rounded-[28px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image src="/project1/4.jpg" alt="Anna Łabno — desktop" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, calc(100vw - 200px)" priority />
          </div>
        </section>

        {/* ── Phone mockups: 2 + 3 ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "80px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image src="/project1/2.jpg" alt="Anna Łabno — mobile homepage" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image src="/project1/3.jpg" alt="Anna Łabno — mobile pages" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </section>

        {/* ── Challenge ── */}
        <section
          className="bg-akac-black px-6 md:px-[100px] rounded-t-[24px] md:rounded-t-[60px]"
          style={{ paddingTop: "100px", paddingBottom: "100px", marginTop: "-60px", position: "relative", zIndex: 2 }}
        >
          <div className="flex flex-col md:flex-row md:gap-[100px]">
            <div style={{ flexShrink: 0, width: "100%", maxWidth: "300px", marginBottom: "40px" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(217,217,217,0.35)", textTransform: "uppercase", letterSpacing: "0.18px", marginBottom: "12px" }}>
                {a.challengeLabel}
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#D9D9D9", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                {a.challengeTitle}
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#D9D9D9", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                {a.challengeP1}
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(217,217,217,0.5)", lineHeight: "27px", letterSpacing: "0.1px" }}>
                {a.challengeP2}
              </p>
            </div>
          </div>
        </section>

        {/* ── iPad tablet shot: full-width ── */}
        <section className="bg-akac-black px-6 md:px-[100px]" style={{ paddingBottom: "80px" }}>
          <div className="relative w-full rounded-[20px] md:rounded-[28px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image src="/project1/5.jpg" alt="Anna Łabno — tablet about page" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, calc(100vw - 200px)" />
          </div>
        </section>

        {/* ── Solution ── */}
        <section
          className="bg-akac-cream px-6 md:px-[100px] rounded-t-[24px] md:rounded-t-[60px]"
          style={{ paddingTop: "100px", paddingBottom: "80px", marginTop: "-60px", position: "relative", zIndex: 3 }}
        >
          <div className="flex flex-col md:flex-row md:gap-[100px]">
            <div style={{ flexShrink: 0, width: "100%", maxWidth: "300px", marginBottom: "40px" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(17,17,17,0.35)", textTransform: "uppercase", letterSpacing: "0.18px", marginBottom: "12px" }}>
                {a.solutionLabel}
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                {a.solutionTitle}
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#111111", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                {a.solutionP1}
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(17,17,17,0.55)", lineHeight: "27px", letterSpacing: "0.1px", marginBottom: "40px" }}>
                {a.solutionP2}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                {([a.f1, a.f2, a.f3, a.f4, a.f5, a.f6]).map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "2px", backgroundColor: "#ED6D40", flexShrink: 0 }} />
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "#111111", letterSpacing: "0.1px" }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://annalabno.com" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "12px", fontWeight: 600, color: "#ED6D40", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.18px" }}>
                {a.visitSite}
              </a>
            </div>
          </div>
        </section>

        {/* ── Desktop + Contact mockups: 6 + 1 ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "100px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <Image src="/project1/6.jpg" alt="Anna Łabno — practical info" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <Image src="/project1/1.jpg" alt="Anna Łabno — contact page" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="bg-akac-black rounded-t-[24px] md:rounded-t-[60px]" style={{ marginTop: "-60px", position: "relative", zIndex: 4 }}>
          <CTA centered />
        </div>

      </main>
      <Footer />
    </>
  );
}

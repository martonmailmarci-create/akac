import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CTA from "@/components/sections/CTA";
import HeroParallax from "./HeroParallax";

export const metadata: Metadata = {
  title: "Bombanő — Case Study | AKAC Studio",
  description:
    "How we designed and built a bold, appetite-driving website for Budapest-based artisan confectionery Bombanő.",
};

export default function BombannoPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero (parallax) ── */}
        <HeroParallax>
          <div className="px-6 md:px-[100px]">
            <h1 style={{ fontSize: "clamp(52px, 9vw, 110px)", fontWeight: 600, color: "#F9F9F4", letterSpacing: "-3px", lineHeight: 1 }}>
              BOMBANŐ
            </h1>
          </div>
        </HeroParallax>

        {/* ── Overview ── */}
        <section className="bg-akac-cream px-6 md:px-[100px] rounded-t-[24px] md:rounded-t-[60px]" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          <div className="flex flex-col md:flex-row md:gap-[100px]">
            <div style={{ flexShrink: 0, width: "100%", maxWidth: "300px", marginBottom: "40px" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "rgba(17,17,17,0.35)", textTransform: "uppercase", letterSpacing: "0.18px", marginBottom: "12px" }}>
                / OVERVIEW
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                THE PROJECT
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#111111", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                Bombanő is a Budapest-based artisan confectionery specialising in hand-crafted bomboloni, seasonal pastries, and private event catering.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(17,17,17,0.55)", lineHeight: "27px", letterSpacing: "0.1px" }}>
                They came to us with a strong visual identity but no web presence to match it. The goal was a site that looked as good as the product tastes — appetite-driven, fast to load, and easy to order from.
              </p>
            </div>
          </div>
        </section>

{/* ── First impact: desktop shot ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "60px" }}>
          <div className="relative w-full rounded-[20px] md:rounded-[28px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image src="/project2/4.jpg" alt="Bombanő — desktop" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, calc(100vw - 200px)" priority />
          </div>
        </section>

        {/* ── Phone mockups: 2 + 3 ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "80px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image src="/project2/2.jpg" alt="Bombanő — mobile homepage" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image src="/project2/3.jpg" alt="Bombanő — mobile pages" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
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
                / CHALLENGE
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#D9D9D9", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                THE PROBLEM
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#D9D9D9", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                Artisan food brands live and die on visual impact. Without a proper web presence, Bombanő was losing customers to less talented competitors who simply looked more established online.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(217,217,217,0.5)", lineHeight: "27px", letterSpacing: "0.1px" }}>
                The challenge was capturing the warmth and craft of the product in a digital format — translating something you can taste and smell into something you can feel through a screen. The ordering flow also needed to be seamless, with clear options for walk-in, pre-order, and events.
              </p>
            </div>
          </div>
        </section>

        {/* ── iPad tablet shot: full-width ── */}
        <section className="bg-akac-black px-6 md:px-[100px]" style={{ paddingBottom: "80px" }}>
          <div className="relative w-full rounded-[20px] md:rounded-[28px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image src="/project2/5.jpg" alt="Bombanő — tablet page" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, calc(100vw - 200px)" />
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
                / SOLUTION
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                WHAT WE BUILT
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#111111", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                A rich, image-led website built around the product — full-bleed photography, a bold colour palette, and a layout designed to make every visit feel like a visit to the shop.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(17,17,17,0.55)", lineHeight: "27px", letterSpacing: "0.1px", marginBottom: "40px" }}>
                We structured the site around three clear entry points: daily menu, pre-orders, and event catering. Each has a dedicated flow so customers land exactly where they need to be — no confusion, no drop-off.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
                {[
                  "Custom design — no templates",
                  "Daily menu with seasonal updates",
                  "Pre-order & event catering flow",
                  "Full-bleed product photography integration",
                  "Mobile-first, fully responsive",
                  "Contact & reservation form",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "2px", backgroundColor: "#ED6D40", flexShrink: 0 }} />
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "#111111", letterSpacing: "0.1px" }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="https://bombano.eu" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "12px", fontWeight: 600, color: "#ED6D40", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.18px" }}>
                Visit live site ↗
              </a>
            </div>
          </div>
        </section>

        {/* ── Desktop + Contact mockups: 6 + 1 ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "100px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <Image src="/project2/6.jpg" alt="Bombanő — menu page" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <Image src="/project2/1.jpg" alt="Bombanő — contact page" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
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

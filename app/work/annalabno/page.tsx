import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BracketButton from "@/components/ui/BracketButton";
import CTA from "@/components/sections/CTA";
import HeroParallax from "./HeroParallax";

export const metadata: Metadata = {
  title: "Anna Łabno — Case Study | AKAC Studio",
  description:
    "How we designed and built a warm, conversion-focused website for Warsaw-based psychotherapist and sexologist Anna Łabno.",
};

export default function AnnalabnoPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero (parallax) ── */}
        <HeroParallax>
          <div className="px-6 md:px-[100px]">
            <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(217,217,217,0.5)", textTransform: "uppercase", letterSpacing: "0.18px", marginBottom: "20px" }}>
              / OUR WORK — 01
            </p>
            <h1 style={{ fontSize: "clamp(52px, 9vw, 110px)", fontWeight: 600, color: "#F9F9F4", letterSpacing: "-3px", lineHeight: 1, marginBottom: "28px" }}>
              ANNA ŁABNO
            </h1>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "rgba(217,217,217,0.5)", textTransform: "uppercase", letterSpacing: "0.18px" }}>
              [WEB DESIGN & DEVELOPMENT] — [WARSAW, POLAND] — [2025]
            </p>
          </div>
        </HeroParallax>

        {/* ── First impact: iMac testimonials shot ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingTop: "60px" }}>
          <div className="relative w-full rounded-[20px] md:rounded-[28px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <Image src="/project1/4.jpg" alt="Anna Łabno — desktop" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, calc(100vw - 200px)" priority />
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
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
              <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(17,17,17,0.12)", marginBottom: "28px" }} />
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#111111", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                Anna Łabno is a Warsaw-based psychotherapist and sexologist offering individual therapy, couples therapy using EFT (Emotionally Focused Therapy), and sexology consultations.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(17,17,17,0.55)", lineHeight: "27px", letterSpacing: "0.1px" }}>
                She came to us needing a website that would build trust with first-time visitors — people who are often hesitant, researching quietly, and deciding whether to reach out. The site needed to feel warm and safe while remaining professional, with a clear path to booking.
              </p>
            </div>
          </div>
        </section>

        {/* ── Quote block ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "100px" }}>
          <div style={{ borderTop: "1px solid rgba(17,17,17,0.12)", paddingTop: "60px", maxWidth: "800px" }}>
            <p style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 500, color: "#111111", lineHeight: 1.45, letterSpacing: "-0.5px", fontStyle: "italic", marginBottom: "28px" }}>
              &ldquo;We wanted a site that felt like stepping into a safe space before even booking an appointment — that&apos;s exactly what we got.&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "7px", height: "7px", backgroundColor: "#ED6D40", borderRadius: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(17,17,17,0.4)", textTransform: "uppercase", letterSpacing: "0.18px" }}>
                Anna Łabno — Client
              </span>
            </div>
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
                / CHALLENGE
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#D9D9D9", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                THE PROBLEM
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(217,217,217,0.12)", marginBottom: "28px" }} />
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#D9D9D9", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                Therapy is one of the most personal decisions someone makes. Visitors arrive cautious — evaluating credibility, warmth, and approachability all at once, often before they&apos;ve decided to reach out at all.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(217,217,217,0.5)", lineHeight: "27px", letterSpacing: "0.1px" }}>
                The challenge was designing a site that doesn&apos;t feel clinical or transactional — while still guiding users clearly toward booking. Three distinct services also needed to be communicated without overwhelming someone who lands in a vulnerable moment.
              </p>
            </div>
          </div>
        </section>

        {/* ── iPad tablet shot: full-width ── */}
        <section className="bg-akac-black px-6 md:px-[100px]" style={{ paddingBottom: "0" }}>
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
                / SOLUTION
              </p>
              <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px" }}>
                WHAT WE BUILT
              </h2>
            </div>
            <div style={{ maxWidth: "640px" }}>
              <div style={{ width: "100%", height: "1px", backgroundColor: "rgba(17,17,17,0.12)", marginBottom: "28px" }} />
              <p style={{ fontSize: "17px", fontWeight: 500, color: "#111111", lineHeight: "28px", letterSpacing: "0.1px", marginBottom: "20px" }}>
                A clean, image-led website with a calm visual language that mirrors the therapeutic space: soft photography, generous whitespace, and warm typography.
              </p>
              <p style={{ fontSize: "16px", fontWeight: 400, color: "rgba(17,17,17,0.55)", lineHeight: "27px", letterSpacing: "0.1px", marginBottom: "40px" }}>
                Each service has its own dedicated section with clear pricing and a direct path to contact. We built in a workshop calendar for Anna&apos;s couples retreats, a structured FAQ, and pulled in authentic client testimonials from ZnanyLekarz.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  "Custom design — no templates",
                  "Service pages with transparent pricing",
                  "Workshop & calendar section",
                  "Integrated client testimonials",
                  "Mobile-first, fully responsive",
                  "Contact form with session type selection",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "2px", backgroundColor: "#ED6D40", flexShrink: 0 }} />
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "#111111", letterSpacing: "0.1px" }}>{item}</span>
                  </div>
                ))}
              </div>
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

        {/* ── Back to work ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "80px", display: "flex", alignItems: "center", gap: "32px" }}>
          <BracketButton label="BACK TO WORK" color="#111111" href="/work" />
          <a href="https://annalabno.com" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "12px", fontWeight: 600, color: "#ED6D40", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.18px" }}>
            Visit live site ↗
          </a>
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

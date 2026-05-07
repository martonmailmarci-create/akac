import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BracketButton from "@/components/ui/BracketButton";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Anna Łabno — Case Study | AKAC Studio",
  description:
    "How we designed and built a warm, conversion-focused website for Warsaw-based psychotherapist and sexologist Anna Łabno.",
};

const META = [
  { label: "CLIENT", value: "Anna Łabno" },
  { label: "SERVICES", value: "Web Design & Development" },
  { label: "YEAR", value: "2025" },
  { label: "LIVE SITE", value: "annalabno.com", href: "https://annalabno.com" },
];

const STATS = [
  { value: "5.0", label: "Rating on ZnanyLekarz" },
  { value: "9+", label: "Client testimonials" },
  { value: "3", label: "Core services showcased" },
];

export default function AnnalabnoPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingTop: "140px",
            paddingBottom: "80px",
            backgroundImage: "linear-gradient(rgba(17,17,17,0.55), rgba(17,17,17,0.55)), url('/project1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-6 md:px-[100px]">
            <p
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(217,217,217,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.18px",
                marginBottom: "20px",
              }}
            >
              / OUR WORK — 03
            </p>
            <h1
              style={{
                fontSize: "clamp(52px, 9vw, 110px)",
                fontWeight: 600,
                color: "#F9F9F4",
                letterSpacing: "-3px",
                lineHeight: 1,
                marginBottom: "28px",
              }}
            >
              ANNA ŁABNO
            </h1>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(217,217,217,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.18px",
              }}
            >
              [WEB DESIGN & DEVELOPMENT] — [WARSAW, POLAND] — [2025]
            </p>
          </div>
        </section>

        {/* ── Meta bar ── */}
        <section
          className="bg-akac-cream"
          style={{ borderBottom: "1px solid rgba(17,17,17,0.1)" }}
        >
          <div
            className="px-6 md:px-[100px] grid grid-cols-2 md:grid-cols-4"
            style={{ paddingTop: "40px", paddingBottom: "40px", gap: "32px" }}
          >
            {META.map(({ label, value, href }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(17,17,17,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.18px",
                    marginBottom: "8px",
                  }}
                >
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#ED6D40",
                      textTransform: "uppercase",
                      letterSpacing: "-0.28px",
                      textDecoration: "none",
                    }}
                  >
                    {value} ↗
                  </a>
                ) : (
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      textTransform: "uppercase",
                      letterSpacing: "-0.28px",
                    }}
                  >
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Hero image ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingTop: "60px" }}>
          <div
            className="relative w-full rounded-[20px] overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src="/annalabno.png"
              alt="Anna Łabno website"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, calc(100vw - 200px)"
              priority
            />
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
          <div className="flex flex-col md:flex-row md:gap-[80px]">
            {/* Left */}
            <div style={{ flexShrink: 0, width: "100%", maxWidth: "340px", marginBottom: "40px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(17,17,17,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18px",
                  marginBottom: "12px",
                }}
              >
                / OVERVIEW
              </p>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: 500,
                  color: "#111111",
                  letterSpacing: "-0.6px",
                  lineHeight: "32px",
                }}
              >
                THE PROJECT
              </h2>
            </div>

            {/* Right */}
            <div style={{ maxWidth: "620px" }}>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(17,17,17,0.15)",
                  marginBottom: "24px",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#111111",
                  lineHeight: "26px",
                  letterSpacing: "0.24px",
                  marginBottom: "20px",
                }}
              >
                Anna Łabno is a Warsaw-based psychotherapist and sexologist
                offering individual therapy, couples therapy using EFT
                (Emotionally Focused Therapy), and sexology consultations.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(17,17,17,0.6)",
                  lineHeight: "26px",
                  letterSpacing: "0.24px",
                }}
              >
                She came to us needing a website that would build trust with
                first-time visitors — people who are often hesitant, researching
                quietly, and deciding whether to reach out. The site needed to
                feel warm and safe while remaining professional, with a clear
                path to booking.
              </p>
            </div>
          </div>
        </section>

        {/* ── Challenge ── */}
        <section
          className="bg-akac-black px-6 md:px-[100px] rounded-t-[24px] md:rounded-t-[60px]"
          style={{ paddingTop: "100px", paddingBottom: "100px", marginTop: "-60px", position: "relative", zIndex: 2 }}
        >
          <div className="flex flex-col md:flex-row md:gap-[80px]">
            {/* Left */}
            <div style={{ flexShrink: 0, width: "100%", maxWidth: "340px", marginBottom: "40px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(217,217,217,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18px",
                  marginBottom: "12px",
                }}
              >
                / CHALLENGE
              </p>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: 500,
                  color: "#D9D9D9",
                  letterSpacing: "-0.6px",
                  lineHeight: "32px",
                }}
              >
                THE PROBLEM
              </h2>
            </div>

            {/* Right */}
            <div style={{ maxWidth: "620px" }}>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(217,217,217,0.15)",
                  marginBottom: "24px",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#D9D9D9",
                  lineHeight: "26px",
                  letterSpacing: "0.24px",
                  marginBottom: "20px",
                }}
              >
                Therapy is one of the most personal decisions someone makes.
                Visitors arrive cautious — they&apos;re evaluating credibility,
                warmth, and approachability all at once, often before they&apos;ve
                decided they&apos;ll reach out at all.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(217,217,217,0.6)",
                  lineHeight: "26px",
                  letterSpacing: "0.24px",
                }}
              >
                The challenge was designing a site that doesn&apos;t feel clinical
                or transactional — while still guiding users clearly toward
                booking. Three distinct services (individual therapy, couples
                EFT, and sexology) also needed to be communicated without
                overwhelming someone who lands in a vulnerable moment.
              </p>
            </div>
          </div>
        </section>

        {/* ── Solution ── */}
        <section
          className="bg-akac-cream px-6 md:px-[100px] rounded-t-[24px] md:rounded-t-[60px]"
          style={{ paddingTop: "100px", paddingBottom: "60px", marginTop: "-60px", position: "relative", zIndex: 3 }}
        >
          <div className="flex flex-col md:flex-row md:gap-[80px]">
            {/* Left */}
            <div style={{ flexShrink: 0, width: "100%", maxWidth: "340px", marginBottom: "40px" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(17,17,17,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.18px",
                  marginBottom: "12px",
                }}
              >
                / SOLUTION
              </p>
              <h2
                style={{
                  fontSize: "30px",
                  fontWeight: 500,
                  color: "#111111",
                  letterSpacing: "-0.6px",
                  lineHeight: "32px",
                }}
              >
                WHAT WE BUILT
              </h2>
            </div>

            {/* Right */}
            <div style={{ maxWidth: "620px" }}>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(17,17,17,0.15)",
                  marginBottom: "24px",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#111111",
                  lineHeight: "26px",
                  letterSpacing: "0.24px",
                  marginBottom: "20px",
                }}
              >
                A clean, image-led website with a calm visual language that
                mirrors the therapeutic space: soft photography, generous
                whitespace, and warm typography.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(17,17,17,0.6)",
                  lineHeight: "26px",
                  letterSpacing: "0.24px",
                  marginBottom: "32px",
                }}
              >
                Each service has its own dedicated section with clear pricing and
                a direct path to contact. We built in a workshop calendar for
                Anna&apos;s couples retreats, a structured FAQ, and pulled in
                authentic client testimonials from ZnanyLekarz — letting social
                proof do the heavy lifting for trust.
              </p>

              {/* Feature list */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {[
                  "Custom design — no templates",
                  "Service pages with transparent pricing",
                  "Workshop & calendar section",
                  "Integrated client testimonials",
                  "Mobile-first, fully responsive",
                  "Contact form with session type selection",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#ED6D40",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#111111",
                        letterSpacing: "0.18px",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "100px" }}>
          <div
            style={{
              borderTop: "1px solid rgba(17,17,17,0.15)",
              paddingTop: "60px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: "clamp(36px, 5vw, 60px)",
                    fontWeight: 600,
                    color: "#111111",
                    letterSpacing: "-2px",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(17,17,17,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.18px",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Second screenshot ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "100px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="relative w-full rounded-[20px] overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src="/annalabno-2.png"
                alt="Anna Łabno — services"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div
              className="relative w-full rounded-[20px] overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src="/annalabno-3.png"
                alt="Anna Łabno — testimonials"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* ── Back to work ── */}
        <section className="bg-akac-cream px-6 md:px-[100px]" style={{ paddingBottom: "80px" }}>
          <BracketButton label="BACK TO WORK" color="#111111" href="/work" />
        </section>

        {/* ── CTA ── */}
        <div
          className="bg-akac-black rounded-t-[24px] md:rounded-t-[60px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 4 }}
        >
          <CTA centered />
        </div>
      </main>
      <Footer />
    </>
  );
}

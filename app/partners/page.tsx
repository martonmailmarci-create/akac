"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealHeadline from "@/components/ui/RevealHeadline";
import BracketButton from "@/components/ui/BracketButton";
import ScrambleText from "@/components/ui/ScrambleText";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";

const BAR_COLORS = ["rgba(17,17,17,0.2)", "rgba(17,17,17,0.15)", "rgba(17,17,17,0.1)", "rgba(17,17,17,0.06)"];

const STEPS_EN = [
  {
    num: "01",
    title: "INVITATION",
    body: "You receive an invitation from us — there's no self-sign-up. We add you manually and you get an email with your personal login link.",
  },
  {
    num: "02",
    title: "DASHBOARD",
    body: "Log in to your partner dashboard. You'll see your personal referral link, each referral's status, and your earned commissions at a glance.",
  },
  {
    num: "03",
    title: "SHARE",
    body: "Share your link however suits you. Anyone who signs up through it is tracked as your referral for 30 days — even if they don't register on the first visit.",
  },
  {
    num: "04",
    title: "EARN",
    body: "When your referral starts paying their monthly fee, your commission is logged automatically. Your dashboard always shows the current balance.",
  },
];

const STEPS_HU = [
  {
    num: "01",
    title: "MEGHÍVÁS",
    body: "Meghívást kapsz tőlünk — nincs önálló regisztráció. Manuálisan adunk hozzá, és e-mailben kapod meg a személyes bejelentkezési linkedet.",
  },
  {
    num: "02",
    title: "IRÁNYÍTÓPULT",
    body: "Bejelentkezel a partner irányítópultba. Látod a személyes ajánlói linkedet, az ajánlottak státuszát, és az eddig felhalmozott jutalékaidat.",
  },
  {
    num: "03",
    title: "MEGOSZTÁS",
    body: "Oszd meg a linkedet bárhogy. Mindenkit, aki ezen keresztül regisztrál, 30 napig hozzád rendelünk — akkor is, ha nem az első látogatáskor iratkozik fel.",
  },
  {
    num: "04",
    title: "JUTALÉK",
    body: "Amikor az ajánlottad elkezdi fizetni a havi díjat, a jutalékodat automatikusan rögzítjük. Az irányítópulton mindig látod az aktuális egyenlegedet.",
  },
];

const WHO_EN = [
  "Past clients",
  "Marketers & consultants",
  "Agencies & freelancers",
  "Well-connected founders",
  "Friends of the studio",
];

const WHO_HU = [
  "Korábbi ügyfelek",
  "Marketingesek és tanácsadók",
  "Ügynökségek és szabadúszók",
  "Vállalkozók erős hálózattal",
  "A stúdió barátai",
];

const DETAILS_EN = [
  {
    q: "How long does my referral link track visitors?",
    a: "30 days. If someone clicks your link and registers within 30 days, they're counted as your referral — even if they don't sign up on the first visit.",
  },
  {
    q: "Can I see who I've referred?",
    a: "Yes. Your dashboard shows each referral's first name and current status — first name only, for privacy.",
  },
  {
    q: "When and how do I get paid?",
    a: "Payouts are handled manually by the studio. When your commission balance is ready, we'll reach out to arrange payment.",
  },
  {
    q: "What language is the partner dashboard in?",
    a: "The dashboard is currently in Hungarian.",
  },
  {
    q: "Is there a minimum payout threshold?",
    a: "No fixed threshold — we discuss payouts individually based on your commission balance.",
  },
];

const DETAILS_HU = [
  {
    q: "Meddig követi az ajánlói linkem a látogatókat?",
    a: "30 napig. Ha valaki rákattint a linkre, és 30 napon belül regisztrál, ajánlottként kerül rögzítésre — akkor is, ha nem az első látogatáskor iratkozik fel.",
  },
  {
    q: "Látom, kiket ajánlottam?",
    a: "Igen. Az irányítópulton minden ajánlott keresztneve és jelenlegi státusza látható — az adatvédelem érdekében csak keresztnevet jelenítünk meg.",
  },
  {
    q: "Mikor és hogyan kapom meg a jutalékomat?",
    a: "A kifizetéseket a stúdió manuálisan kezeli. Ha a jutaléked összegyűlt, felvesszük veled a kapcsolatot a fizetés rendezéséhez.",
  },
  {
    q: "Milyen nyelven működik a partner irányítópult?",
    a: "Az irányítópult jelenleg magyar nyelven érhető el.",
  },
  {
    q: "Van minimális kifizetési összeg?",
    a: "Nincs fix küszöbérték — a kifizetést egyedileg egyeztetjük a jutalékod összege alapján.",
  },
];

/* FAQ accordion item — same as components/sections/FAQ.tsx, light colorway */
function DetailItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-akac-black/10">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer bg-transparent border-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-[14px] md:text-[16px] font-medium text-akac-black uppercase tracking-[0.24px] leading-[18px]">
          {q}
        </span>
        <svg
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path d="M10 4V16M4 10H16" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[16px] font-medium text-akac-black/60 leading-[1.6] tracking-[0.24px] pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepCard({ num, title, body, barColor }: { num: string; title: string; body: string; barColor: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="bg-akac-offwhite rounded-[20px] p-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-[6px] rounded-full mb-8"
        style={{
          backgroundColor: hovered ? "#ED6D40" : barColor,
          transition: "background-color 0.3s ease",
        }}
        aria-hidden="true"
      />
      <span
        className="block text-[56px] font-semibold tracking-[-1.5px] leading-none mb-6 select-none"
        style={{
          color: hovered ? "#ED6D40" : "rgba(17,17,17,0.07)",
          transition: "color 0.3s ease",
        }}
        aria-hidden="true"
      >
        {num}
      </span>
      <h3 className="text-[13px] font-semibold text-akac-black uppercase tracking-[0.18px] mb-3">
        <ScrambleText text={title} color="#111111" triggered={hovered} />
      </h3>
      <p className="text-[15px] font-medium text-akac-black/60 leading-[1.6] tracking-[0.1px]">
        {body}
      </p>
    </div>
  );
}

function WhoRow({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center py-5 border-t"
      style={{ borderColor: "rgba(249,249,244,0.1)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-[7px] bg-akac-orange flex-shrink-0"
        style={{
          width: hovered ? "7px" : "0px",
          marginRight: hovered ? "16px" : "0px",
          borderRadius: "2px",
          transition: "width 0.2s ease, margin-right 0.2s ease",
        }}
        aria-hidden="true"
      />
      <span className="text-[18px] md:text-[24px] font-medium text-akac-cream tracking-[-0.3px]">
        <ScrambleText text={label} color="#F9F9F4" triggered={hovered} />
      </span>
    </div>
  );
}

export default function PartnersPage() {
  const { locale } = useLocale();
  const isHu = locale === "hu";

  const steps = isHu ? STEPS_HU : STEPS_EN;
  const who = isHu ? WHO_HU : WHO_EN;
  const details = isHu ? DETAILS_HU : DETAILS_EN;

  const howRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const commRef = useRef<HTMLElement>(null);
  const recBarsRef = useRef<HTMLDivElement>(null);
  const flatBarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    (async () => {
      const { gsap } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.from(stepsRef.current?.children ?? [], {
          scale: 0.95, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: howRef.current, start: "top 75%" },
        });
        gsap.from(dashRef.current, {
          y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: dashRef.current, start: "top 85%" },
        });
        gsap.from(recBarsRef.current?.children ?? [], {
          scaleY: 0, transformOrigin: "bottom", duration: 0.6, stagger: 0.05, ease: "power3.out",
          scrollTrigger: { trigger: commRef.current, start: "top 70%" },
        });
        gsap.from(flatBarsRef.current?.children ?? [], {
          scaleY: 0, transformOrigin: "bottom", duration: 0.6, stagger: 0.05, ease: "power3.out",
          scrollTrigger: { trigger: commRef.current, start: "top 70%" },
        });
      });
    })();

    return () => ctx?.revert();
  }, []);

  const dashboardReferrals = isHu
    ? [
        { name: "Dóra", date: "márc. 4.", status: "FIZET", paying: true, amount: "12 500 Ft" },
        { name: "Bence", date: "ápr. 18.", status: "FIZET", paying: true, amount: "7 500 Ft" },
        { name: "Gábor", date: "jún. 2.", status: "REGISZTRÁLT", paying: false, amount: "—" },
        { name: "Lilla", date: "jún. 29.", status: "REGISZTRÁLT", paying: false, amount: "—" },
      ]
    : [
        { name: "Dóra", date: "Mar 4", status: "PAYING", paying: true, amount: "12 500 Ft" },
        { name: "Bence", date: "Apr 18", status: "PAYING", paying: true, amount: "7 500 Ft" },
        { name: "Gábor", date: "Jun 2", status: "SIGNED UP", paying: false, amount: "—" },
        { name: "Lilla", date: "Jun 29", status: "SIGNED UP", paying: false, amount: "—" },
      ];

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="bg-akac-black px-6 pt-36 pb-24 md:px-[100px] md:pt-[180px] md:pb-[160px]">
          <SectionLabel dark className="mb-3">PARTNER PROGRAM</SectionLabel>
          <RevealHeadline
            as="h1"
            className="text-[38px] md:text-[72px] font-semibold text-akac-cream tracking-[-1.6px] leading-[1.05] max-w-[800px] mb-8"
          >
            {isHu ? "Ajánlj minket. Keress belőle." : "Refer us. Earn from it."}
          </RevealHeadline>
          <p className="text-[16px] md:text-[18px] font-medium text-akac-light/70 leading-[1.6] tracking-[0.24px] max-w-[560px]">
            {isHu
              ? "Az AKAC Studio partnerprogram lehetővé teszi, hogy jutalékot keress azzal, ha új ügyfeleket ajánlasz hozzánk. Oszd meg a személyes linkedet — ha valaki regisztrál és elkezd fizetni, automatikusan keresed a jutalékodat."
              : "AKAC Studio's partner program lets you earn commission by referring new clients to us. Share your personal link — when someone signs up and starts paying, you earn automatically."}
          </p>
        </section>

        {/* ── How it works ── */}
        <section
          ref={howRef}
          className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 1 }}
        >
          <div className="mb-12 md:mb-16">
            <SectionLabel className="mb-3">
              {isHu ? "HOGYAN MŰKÖDIK" : "HOW IT WORKS"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
              {isHu ? "Négy lépés, és utána megy magától." : "Four steps, then it runs itself."}
            </RevealHeadline>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StepCard key={step.num} num={step.num} title={step.title} body={step.body} barColor={BAR_COLORS[i]} />
            ))}
          </div>

        </section>

        {/* ── Dashboard preview ── */}
        <section
          className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-0 md:px-[100px] md:pt-[140px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 2 }}
        >
          {/* Section copy */}
          <div className="text-center max-w-[640px] mx-auto mb-14 md:mb-20">
            <SectionLabel dark className="mb-3">
              {isHu ? "AZ IRÁNYÍTÓPULT" : "THE DASHBOARD"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-cream tracking-[-1.1px] leading-[1.1] mb-6">
              {isHu ? "Minden számod egy helyen." : "All your numbers in one place."}
            </RevealHeadline>
            <p className="text-[15px] md:text-[16px] font-medium text-akac-light/60 leading-[1.6] tracking-[0.1px]">
              {isHu
                ? "A saját irányítópultodon mindig látod a személyes linkedet, az ajánlottjaid aktuális státuszát és a felhalmozott jutalékodat. Nincs táblázatolás, nincs utánajárás — így néz ki belülről."
                : "Your personal dashboard always shows your referral link, each referral's current status, and your accumulated commission. No spreadsheets, no chasing — this is what it looks like inside."}
            </p>
          </div>

          {/* Browser-framed mock — bottom bleeds out of the section and fades away */}
          <div
            ref={dashRef}
            className="max-w-[1120px] mx-auto rounded-[16px] overflow-hidden"
            style={{
              border: "1px solid rgba(249,249,244,0.12)",
              backgroundColor: "#161616",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              marginBottom: "-40px",
            }}
            aria-hidden="true"
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-4 px-5 py-3.5 border-b"
              style={{ backgroundColor: "rgba(249,249,244,0.05)", borderColor: "rgba(249,249,244,0.08)" }}
            >
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: "rgba(249,249,244,0.15)" }} />
                <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: "rgba(249,249,244,0.15)" }} />
                <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: "rgba(249,249,244,0.15)" }} />
              </div>
              <div
                className="flex-1 max-w-[360px] mx-auto rounded-md px-4 py-1.5 text-center"
                style={{ backgroundColor: "rgba(249,249,244,0.07)" }}
              >
                <span className="text-[12px] font-medium text-akac-cream/50">partner.akac.studio</span>
              </div>
              <div className="w-[62px] flex-shrink-0 hidden sm:block" />
            </div>

            {/* App top bar */}
            <div
              className="flex items-center justify-between px-6 md:px-8 py-4 border-b"
              style={{ borderColor: "rgba(249,249,244,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                <span className="text-[11px] font-semibold text-akac-cream/60 uppercase tracking-[0.18px]">
                  AKAC PARTNER
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-medium text-akac-cream/40 hidden sm:block">Anna</span>
                <div
                  className="w-[28px] h-[28px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(237,109,64,0.2)" }}
                >
                  <span className="text-[12px] font-semibold text-akac-orange">A</span>
                </div>
              </div>
            </div>

            {/* App body */}
            <div className="px-6 md:px-8 py-6 md:py-8">
              {/* Greeting */}
              <p className="text-[18px] md:text-[22px] font-medium text-akac-cream tracking-[-0.4px] mb-6">
                {isHu ? "Szia, Anna!" : "Hi, Anna!"}
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="rounded-[12px] p-4 md:p-5" style={{ backgroundColor: "rgba(249,249,244,0.05)" }}>
                  <span className="block text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px] mb-2">
                    {isHu ? "ÖSSZES JUTALÉK" : "TOTAL COMMISSION"}
                  </span>
                  <span className="text-[24px] md:text-[28px] font-medium text-akac-orange tracking-[-0.6px]">20 000 Ft</span>
                </div>
                <div className="rounded-[12px] p-4 md:p-5" style={{ backgroundColor: "rgba(249,249,244,0.05)" }}>
                  <span className="block text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px] mb-2">
                    {isHu ? "AJÁNLÁSOK" : "REFERRALS"}
                  </span>
                  <span className="text-[24px] md:text-[28px] font-medium text-akac-cream tracking-[-0.6px]">4</span>
                </div>
                <div className="rounded-[12px] p-4 md:p-5" style={{ backgroundColor: "rgba(249,249,244,0.05)" }}>
                  <span className="block text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px] mb-2">
                    {isHu ? "AKTÍV ELŐFIZETŐK" : "PAYING CLIENTS"}
                  </span>
                  <span className="text-[24px] md:text-[28px] font-medium text-akac-cream tracking-[-0.6px]">2</span>
                </div>
              </div>

              {/* Referral link bar */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] px-4 py-3 mb-8"
                style={{ backgroundColor: "rgba(249,249,244,0.05)" }}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px]">
                    {isHu ? "SZEMÉLYES LINKED" : "YOUR REFERRAL LINK"}
                  </span>
                  <span className="text-[13px] md:text-[14px] font-medium text-akac-cream">
                    akac.studio/r/<span className="text-akac-orange">anna</span>
                  </span>
                </div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.18px] px-3 py-1.5 rounded-md"
                  style={{ backgroundColor: "rgba(249,249,244,0.07)", color: "rgba(249,249,244,0.7)" }}
                >
                  {isHu ? "MÁSOLÁS" : "COPY"}
                </span>
              </div>

              {/* Table header */}
              <div
                className="grid items-center gap-4 pb-3"
                style={{ gridTemplateColumns: "1fr auto auto auto" }}
              >
                <span className="text-[10px] font-semibold text-akac-cream/35 uppercase tracking-[0.18px]">
                  {isHu ? "NÉV" : "NAME"}
                </span>
                <span className="text-[10px] font-semibold text-akac-cream/35 uppercase tracking-[0.18px] hidden sm:block min-w-[64px]">
                  {isHu ? "DÁTUM" : "DATE"}
                </span>
                <span className="text-[10px] font-semibold text-akac-cream/35 uppercase tracking-[0.18px] min-w-[90px] text-center">
                  {isHu ? "STÁTUSZ" : "STATUS"}
                </span>
                <span className="text-[10px] font-semibold text-akac-cream/35 uppercase tracking-[0.18px] min-w-[80px] text-right">
                  {isHu ? "JUTALÉK" : "COMMISSION"}
                </span>
              </div>

              {/* Referral rows */}
              {dashboardReferrals.map((ref) => (
                <div
                  key={ref.name}
                  className="grid items-center gap-4 py-4 border-t"
                  style={{ gridTemplateColumns: "1fr auto auto auto", borderColor: "rgba(249,249,244,0.08)" }}
                >
                  <span className="text-[14px] md:text-[15px] font-medium text-akac-cream">{ref.name}</span>
                  <span className="text-[13px] font-medium text-akac-cream/40 hidden sm:block min-w-[64px]">{ref.date}</span>
                  <span className="min-w-[90px] flex justify-center">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.18px] px-2 py-1 rounded-md"
                      style={
                        ref.paying
                          ? { backgroundColor: "rgba(249,249,244,0.07)", color: "rgba(249,249,244,0.7)" }
                          : { backgroundColor: "rgba(249,249,244,0.07)", color: "rgba(249,249,244,0.45)" }
                      }
                    >
                      {ref.status}
                    </span>
                  </span>
                  <span className="text-[14px] font-medium text-akac-cream/70 text-right min-w-[80px]">
                    {ref.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fade — melts the mock's bottom into the background before the next section covers it */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: "220px", background: "linear-gradient(to bottom, rgba(17,17,17,0) 0%, #111111 65%, #111111 100%)", zIndex: 10 }}
            aria-hidden="true"
          />
        </section>

        {/* ── Commission model ── */}
        <section
          ref={commRef}
          className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 3 }}
        >
          <div className="mb-12 md:mb-16">
            <SectionLabel className="mb-3">
              {isHu ? "JUTALÉK" : "COMMISSION"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
              {isHu ? "Kétféle kereseti lehetőség." : "Two ways to earn."}
            </RevealHeadline>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Recurring */}
            <div className="flex-1 bg-akac-offwhite rounded-[20px] p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                <span className="text-[11px] font-semibold text-akac-black/50 uppercase tracking-[0.18px]">
                  {isHu ? "ISMÉTLŐDŐ" : "RECURRING"}
                </span>
              </div>
              <h3 className="text-[24px] md:text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[1.1] mb-6">
                {isHu ? "Havi jutalék" : "Monthly commission"}
              </h3>

              {/* Cumulative earnings bars */}
              <div ref={recBarsRef} className="flex items-end gap-[3px] h-[64px] mb-2" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[2px] bg-akac-orange"
                    style={{ height: `${((i + 1) / 12) * 100}%`, opacity: 0.4 + (i / 11) * 0.6 }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-akac-black/30 uppercase tracking-[0.18px] mb-8">
                <span>{isHu ? "1. HÓNAP" : "MONTH 1"}</span>
                <span>{isHu ? "12. HÓNAP" : "MONTH 12"}</span>
              </div>

              <p className="text-[15px] font-medium text-akac-black/60 leading-[1.6] tracking-[0.1px] mb-8 flex-1">
                {isHu
                  ? "Az ajánlottad minden egyes havi befizetésének egy százalékát keresed — ameddig csak ügyfél marad. Stabilan, automatikusan, hosszú távon."
                  : "Earn a percentage of every monthly payment your referral makes — for as long as they stay a client. Stable, automatic, long-term."}
              </p>
              <div className="border-t border-akac-black/10 pt-5">
                <p className="text-[13px] font-medium text-akac-black/40 leading-[1.5] tracking-[0.1px]">
                  {isHu
                    ? "A pontos százalékot egyedileg egyeztetjük veled a meghíváskor."
                    : "The exact percentage is agreed with you individually when you're invited."}
                </p>
              </div>
            </div>

            {/* Flat fee */}
            <div className="flex-1 bg-akac-offwhite rounded-[20px] p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                <span className="text-[11px] font-semibold text-akac-black/50 uppercase tracking-[0.18px]">
                  {isHu ? "EGYSZERI" : "FLAT FEE"}
                </span>
              </div>
              <h3 className="text-[24px] md:text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[1.1] mb-6">
                {isHu ? "Egyszeri összeg" : "One-time payment"}
              </h3>

              {/* One-time spike bars */}
              <div ref={flatBarsRef} className="flex items-end gap-[3px] h-[64px] mb-2" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[2px]"
                    style={
                      i === 0
                        ? { height: "100%", backgroundColor: "#ED6D40" }
                        : { height: "10%", backgroundColor: "rgba(17,17,17,0.08)" }
                    }
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-akac-black/30 uppercase tracking-[0.18px] mb-8">
                <span>{isHu ? "1. HÓNAP" : "MONTH 1"}</span>
                <span>{isHu ? "12. HÓNAP" : "MONTH 12"}</span>
              </div>

              <p className="text-[15px] font-medium text-akac-black/60 leading-[1.6] tracking-[0.1px] mb-8 flex-1">
                {isHu
                  ? "Egy rögzített összeget kapsz, amikor az ajánlottad elvégzi az első befizetését. Egyszerű, tiszta, azonnali."
                  : "Earn a fixed amount when your referral makes their first payment. Simple, clean, immediate."}
              </p>
              <div className="border-t border-akac-black/10 pt-5">
                <p className="text-[13px] font-medium text-akac-black/40 leading-[1.5] tracking-[0.1px]">
                  {isHu
                    ? "A pontos összeget egyedileg egyeztetjük veled a meghíváskor."
                    : "The exact amount is agreed with you individually when you're invited."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section
          className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 4 }}
        >
          <div className="mb-12 md:mb-16">
            <SectionLabel dark className="mb-3">
              {isHu ? "KINEK SZÓL" : "WHO IT'S FOR"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-cream tracking-[-1.1px] leading-[1.1]">
              {isHu
                ? "Ha ismersz embereket, akiknek weboldal kell."
                : "If you know people who need a website."}
            </RevealHeadline>
          </div>

          <div className="flex flex-col max-w-[700px]">
            {who.map((item) => (
              <WhoRow key={item} label={item} />
            ))}
          </div>
        </section>

        {/* ── Details ── */}
        <section
          className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 5 }}
        >
          <div className="flex flex-col gap-8 md:flex-row md:gap-20">
            {/* Left */}
            <div className="w-full md:w-[380px] md:flex-shrink-0">
              <SectionLabel>{isHu ? "RÉSZLETEK" : "DETAILS"}</SectionLabel>
              <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
                {isHu ? "Amit érdemes tudni." : "Good to know."}
              </RevealHeadline>
            </div>

            {/* Accordion */}
            <div className="flex-1">
              {details.map((item) => (
                <DetailItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-36 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 6 }}
        >
          <div className="flex flex-col items-center text-center">
            <SectionLabel dark className="mb-3">
              {isHu ? "CSATLAKOZÁS" : "JOIN"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-cream tracking-[-1.1px] leading-[1.1] mb-8 max-w-[660px]">
              {isHu ? "Szeretnél partner lenni?" : "Want to become a partner?"}
            </RevealHeadline>
            <p className="text-[16px] font-medium text-akac-light/60 leading-[1.6] tracking-[0.24px] max-w-[520px] mb-12">
              {isHu
                ? "A program meghívás alapján működik — partnereket manuálisan adunk hozzá. Vedd fel velünk a kapcsolatot, és mesélj a hálózatodról."
                : "The program is invite-based — we add partners manually. Get in touch and tell us a bit about yourself and your network."}
            </p>
            <BracketButton
              label={isHu ? "KAPCSOLATFELVÉTEL" : "GET IN TOUCH"}
              color="#D9D9D9"
              href="/contact"
            />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealHeadline from "@/components/ui/RevealHeadline";
import BracketButton from "@/components/ui/BracketButton";
import { useLocale } from "@/components/providers/LocaleProvider";

const STEPS_EN = [
  {
    num: "01",
    title: "GET INVITED",
    body: "You receive an invitation from us — there's no self-sign-up. We add you manually and you get an email with your personal login link.",
  },
  {
    num: "02",
    title: "ACCESS YOUR DASHBOARD",
    body: "Log in to your partner dashboard. You'll see your personal referral link, each referral's status, and your earned commissions at a glance.",
  },
  {
    num: "03",
    title: "SHARE YOUR LINK",
    body: "Share your link however suits you. Anyone who signs up through it is tracked as your referral for 30 days — even if they don't register on the first visit.",
  },
  {
    num: "04",
    title: "EARN COMMISSION",
    body: "When your referral starts paying their monthly fee, your commission is logged automatically. Your dashboard always shows the current balance.",
  },
];

const STEPS_HU = [
  {
    num: "01",
    title: "KAPSZ EGY MEGHÍVÓT",
    body: "Meghívást kapsz tőlünk — nincs önálló regisztráció. Manuálisan adunk hozzá, és e-mailben kapod meg a személyes bejelentkezési linkedet.",
  },
  {
    num: "02",
    title: "HOZZÁFÉRSZ AZ IRÁNYÍTÓPULTHOZ",
    body: "Bejelentkezel a partner irányítópultba. Látod a személyes ajánlói linkedet, az ajánlottak státuszát, és az eddig felhalmozott jutalékaidat.",
  },
  {
    num: "03",
    title: "MEGOSZTOD A LINKET",
    body: "Oszd meg a linkedet bárhogy. Mindenkit, aki ezen keresztül regisztrál, 30 napig hozzád rendelünk — akkor is, ha nem az első látogatáskor iratkozik fel.",
  },
  {
    num: "04",
    title: "JUTALÉKOT KERESEL",
    body: "Amikor az ajánlottad elkezdi fizetni a havi díjat, a jutalékodat automatikusan rögzítjük. Az irányítópulton mindig látod az aktuális egyenlegedet.",
  },
];

const WHO_EN = [
  "Past clients of AKAC Studio",
  "Marketers and consultants",
  "Agency contacts and freelancers",
  "Business owners with a relevant network",
  "Friends of the studio",
];

const WHO_HU = [
  "Korábbi ügyfelek",
  "Marketing szakemberek és tanácsadók",
  "Ügynökségi kapcsolatok és szabadúszók",
  "Üzletemberek releváns hálózattal",
  "A stúdió ismerősei",
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

export default function PartnersPage() {
  const { locale } = useLocale();
  const isHu = locale === "hu";

  const steps = isHu ? STEPS_HU : STEPS_EN;
  const who = isHu ? WHO_HU : WHO_EN;
  const details = isHu ? DETAILS_HU : DETAILS_EN;

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="bg-akac-offwhite rounded-[20px] p-8">
                <span className="block text-[56px] font-semibold text-akac-black/[0.07] tracking-[-1.5px] leading-none mb-6 select-none">
                  {step.num}
                </span>
                <h3 className="text-[13px] font-semibold text-akac-black uppercase tracking-[0.18px] mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] font-medium text-akac-black/60 leading-[1.6] tracking-[0.1px]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Commission model ── */}
        <section
          className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 2 }}
        >
          <div className="mb-12 md:mb-16">
            <SectionLabel dark className="mb-3">
              {isHu ? "JUTALÉK" : "COMMISSION"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-cream tracking-[-1.1px] leading-[1.1]">
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
              <h3 className="text-[24px] md:text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[1.1] mb-4">
                {isHu ? "Havi jutalék" : "Monthly commission"}
              </h3>
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
              <h3 className="text-[24px] md:text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[1.1] mb-4">
                {isHu ? "Egyszeri összeg" : "One-time payment"}
              </h3>
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
          className="bg-akac-light overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 3 }}
        >
          <div className="mb-12 md:mb-16">
            <SectionLabel className="mb-3">
              {isHu ? "KINEK SZÓL" : "WHO IT'S FOR"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
              {isHu
                ? "Ha ismersz embereket, akiknek weboldal kell."
                : "If you know people who need a website."}
            </RevealHeadline>
          </div>

          <div className="flex flex-col max-w-[700px]">
            {who.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 py-5 border-t border-akac-black/10"
              >
                <div className="w-[7px] h-[7px] bg-akac-orange flex-shrink-0" style={{ borderRadius: "2px" }} />
                <span className="text-[18px] md:text-[24px] font-medium text-akac-black tracking-[-0.3px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Details ── */}
        <section
          className="bg-akac-offwhite overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-24 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 4 }}
        >
          <div className="mb-12 md:mb-16">
            <SectionLabel className="mb-3">
              {isHu ? "RÉSZLETEK" : "DETAILS"}
            </SectionLabel>
            <RevealHeadline className="text-[30px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1]">
              {isHu ? "Amit érdemes tudni." : "Good to know."}
            </RevealHeadline>
          </div>

          <div className="flex flex-col max-w-[800px]">
            {details.map((item) => (
              <div
                key={item.q}
                className="flex flex-col md:flex-row md:gap-12 py-8 border-t border-akac-black/10"
              >
                <p className="text-[13px] font-semibold text-akac-black uppercase tracking-[0.18px] md:w-[38%] flex-shrink-0 mb-3 md:mb-0 leading-[1.5]">
                  {item.q}
                </p>
                <p className="text-[15px] font-medium text-akac-black/60 leading-[1.6] tracking-[0.1px]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="bg-akac-black overflow-hidden rounded-t-[24px] md:rounded-t-[60px] px-6 pt-20 pb-36 md:px-[100px] md:pt-[140px] md:pb-[200px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 5 }}
        >
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
        </section>

      </main>
      <Footer />
    </>
  );
}

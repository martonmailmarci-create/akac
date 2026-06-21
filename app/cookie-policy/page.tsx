"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useLocale } from "@/components/providers/LocaleProvider";

const COOKIE_ROWS_EN: [string, string, string, string][] = [
  ["cookie_consent", "Stores your cookie consent choice", "Local storage (essential)", "Persistent until cleared"],
  ["locale", "Remembers your language preference (EN/HU)", "Local storage (essential)", "Persistent until cleared"],
  ["_ga, _ga_*", "Google Analytics — measures site traffic and usage. Only set if you accept analytics cookies.", "Cookie (analytics)", "Up to 2 years"],
];

const COOKIE_ROWS_HU: [string, string, string, string][] = [
  ["cookie_consent", "A süti-hozzájárulási döntésed tárolása", "Local storage (szükséges)", "Törlésig megmarad"],
  ["locale", "Megjegyzi a nyelvi beállításodat (EN/HU)", "Local storage (szükséges)", "Törlésig megmarad"],
  ["_ga, _ga_*", "Google Analytics — a weboldal forgalmának és használatának mérése. Csak akkor kerül beállításra, ha elfogadod az analitikai sütiket.", "Süti (analitikai)", "Legfeljebb 2 év"],
];

export default function CookiePolicy() {
  const { locale } = useLocale();
  const isHu = locale === "hu";
  const rows = isHu ? COOKIE_ROWS_HU : COOKIE_ROWS_EN;

  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <section className="bg-akac-light px-6 pt-40 pb-24 md:px-[100px] md:pt-[160px] md:pb-[120px] max-w-[860px]">
          <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-4">/ LEGAL</p>
          <h1 className="text-[36px] md:text-[52px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">
            {isHu ? "Cookie Szabályzat" : "Cookie Policy"}
          </h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">
            {isHu ? "Utolsó frissítés: 2026. június" : "Last updated: June 2026"}
          </p>

          {isHu ? (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Mik a sütik?</h2>
                <p>A sütik kis méretű szövegfájlok, amelyeket az eszközöd tárol, amikor meglátogatod a weboldalunkat. Segítenek a weboldal megfelelő működésében és megjegyzik a beállításaidat. Az alább leírtak közül néhány technikailag &quot;local storage&quot; (helyi tárhely) formájában tárolódik, nem hagyományos süti formájában — a &quot;süti&quot; szót a köznapi szóhasználat szerint mindkettőre értjük.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Milyen sütiket és hasonló technológiákat használunk?</h2>
                <table className="w-full mt-4 border-collapse text-[13px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(17,17,17,0.12)" }}>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Név</th>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Cél</th>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Típus</th>
                      <th className="text-left py-3 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Időtartam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(([name, purpose, type, duration]) => (
                      <tr key={name} style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
                        <td className="py-3 pr-4 font-medium align-top">{name}</td>
                        <td className="py-3 pr-4 text-akac-black/60 align-top">{purpose}</td>
                        <td className="py-3 pr-4 text-akac-black/60 align-top">{type}</td>
                        <td className="py-3 text-akac-black/60 align-top">{duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Az analitikai sütik opcionálisak</h2>
                <p>A Google Analytics-et csak akkor töltjük be, és csak akkor állítjuk be a hozzá tartozó sütiket, ha a süti-bannerünkön az &quot;Elfogadom&quot; gombra kattintasz. Ha elutasítod, semmilyen analitikai süti nem kerül beállításra, és a látogatásodat nem követjük a weboldal működéséhez feltétlenül szükséges mértéken túl.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Harmadik féltől származó sütik</h2>
                <p>Ha a Cal.com-on keresztül foglalsz hívást, a platform saját sütiket állíthat be. Részletekért lásd a <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-akac-orange underline underline-offset-2">Cal.com adatvédelmi szabályzatát</a>.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Sütik kezelése</h2>
                <p>Bármikor megváltoztathatod a süti-beállításodat a böngésződ helyi tárhelyének törlésével ezen az oldalon, vagy a böngésződ beállításain keresztül kezelheted a sütiket. A sütik letiltása hatással lehet a weboldal működésére.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Kapcsolat</h2>
                <p>Kérdésed van? Írj nekünk: <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">What are cookies?</h2>
                <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly and remember your preferences. Some of what we describe below is technically stored via &quot;local storage&quot; rather than a traditional cookie — we use the word &quot;cookie&quot; loosely to cover both, as is common practice.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">What cookies and similar technologies do we use?</h2>
                <table className="w-full mt-4 border-collapse text-[13px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(17,17,17,0.12)" }}>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Name</th>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Purpose</th>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Type</th>
                      <th className="text-left py-3 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(([name, purpose, type, duration]) => (
                      <tr key={name} style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
                        <td className="py-3 pr-4 font-medium align-top">{name}</td>
                        <td className="py-3 pr-4 text-akac-black/60 align-top">{purpose}</td>
                        <td className="py-3 pr-4 text-akac-black/60 align-top">{type}</td>
                        <td className="py-3 text-akac-black/60 align-top">{duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Analytics cookies are optional</h2>
                <p>We only load Google Analytics, and only set its cookies, after you click &quot;Accept&quot; on our cookie banner. If you decline, no analytics cookies are set, and we don&apos;t track your visit beyond what&apos;s strictly necessary for the site to run.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Third-party cookies</h2>
                <p>When you book a call via Cal.com, their platform may set its own cookies. Please refer to <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-akac-orange underline underline-offset-2">Cal.com&apos;s privacy policy</a> for details.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">How to manage cookies</h2>
                <p>You can change your cookie preference at any time by clearing your browser&apos;s local storage for this site, or by managing cookies through your browser settings. Disabling cookies may affect how the website functions.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Contact</h2>
                <p>Questions? Email us at <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
              </div>
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

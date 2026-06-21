"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useLocale } from "@/components/providers/LocaleProvider";

const LEGAL_BASIS_ROWS_EN: [string, string][] = [
  ["Responding to your contact form enquiry", "Performance of a contract / steps prior to entering into a contract (Art. 6(1)(b) GDPR)"],
  ["Sending an automatic confirmation reply", "Legitimate interest (Art. 6(1)(f) GDPR)"],
  ["Scheduling a call via Cal.com", "Performance of a contract (Art. 6(1)(b) GDPR)"],
  ["Measuring website traffic via Google Analytics", "Consent (Art. 6(1)(a) GDPR) — only after you accept cookies"],
];

const LEGAL_BASIS_ROWS_HU: [string, string][] = [
  ["Válasz a kapcsolatfelvételi űrlapon érkező megkeresésre", "Szerződés teljesítése / szerződéskötést megelőző lépések (GDPR 6. cikk (1) b) pont)"],
  ["Automatikus visszaigazoló válasz küldése", "Jogos érdek (GDPR 6. cikk (1) f) pont)"],
  ["Hívás időpontjának foglalása a Cal.com-on keresztül", "Szerződés teljesítése (GDPR 6. cikk (1) b) pont)"],
  ["Weboldal-forgalom mérése Google Analytics segítségével", "Hozzájárulás (GDPR 6. cikk (1) a) pont) — csak a sütik elfogadása után"],
];

export default function PrivacyPolicy() {
  const { locale } = useLocale();
  const isHu = locale === "hu";
  const legalBasisRows = isHu ? LEGAL_BASIS_ROWS_HU : LEGAL_BASIS_ROWS_EN;

  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <section className="bg-akac-light px-6 pt-40 pb-24 md:px-[100px] md:pt-[160px] md:pb-[120px] max-w-[860px]">
          <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-4">/ LEGAL</p>
          <h1 className="text-[36px] md:text-[52px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">
            {isHu ? "Adatvédelmi irányelvek" : "Privacy Policy"}
          </h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">
            {isHu ? "Utolsó frissítés: 2026. június" : "Last updated: June 2026"}
          </p>

          {isHu ? (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Kik vagyunk</h2>
                <p>Az &quot;AKAC Studio&quot; a Shambhala Forrása Kft. kereskedelmi neve, amely Magyarországon bejegyzett társaság (cégjegyzékszám: 02 09 084863, adószám: 27312957202), székhelye: 7636 Pécs, Akácfa dűlő 4. (&quot;mi&quot;, &quot;minket&quot;, &quot;saját&quot;). A jelen tájékoztatóban leírt személyes adatok tekintetében mi vagyunk az adatkezelő. Elérhetőségünk: info@akac.studio.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">2. Milyen adatokat gyűjtünk</h2>
                <ul className="list-disc pl-5 flex flex-col gap-2 mb-3">
                  <li><strong>Kapcsolatfelvételi űrlap:</strong> név, cég (opcionális), e-mail cím és üzenet.</li>
                  <li><strong>Hívás foglalása:</strong> név és e-mail cím, a Cal.com időpontfoglaló rendszerünk segítségével.</li>
                  <li><strong>Használati adatok:</strong> ha elfogadod az analitikai sütiket, a Google Analytics anonimizált használati adatokat gyűjt, például a megtekintett oldalakat, az eszköz típusát és a hozzávetőleges helyet.</li>
                </ul>
                <p>Tudásod és hozzájárulásod nélkül nem gyűjtünk adatot.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">3. Az adatkezelés célja és jogalapja</h2>
                <table className="w-full mt-1 border-collapse text-[13px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(17,17,17,0.12)" }}>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Cél</th>
                      <th className="text-left py-3 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Jogalap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {legalBasisRows.map(([purpose, basis]) => (
                      <tr key={purpose} style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
                        <td className="py-3 pr-4 font-medium align-top">{purpose}</td>
                        <td className="py-3 text-akac-black/60 align-top">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">4. Harmadik fél szolgáltatások</h2>
                <p className="mb-3">Az alábbi adatfeldolgozókkal dolgozunk együtt, akik a megbízásunkból kezelhetik adataidat:</p>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li><strong>Resend</strong> — e-mail kézbesítés a kapcsolatfelvételi űrlap beküldéseihez és válaszokhoz.</li>
                  <li><strong>Cal.com</strong> — naptár-foglalás bemutatkozó hívásokhoz.</li>
                  <li><strong>Vercel</strong> — tárhely és infrastruktúra.</li>
                  <li><strong>Google Analytics</strong> — weboldal-forgalom elemzése (csak hozzájárulás esetén).</li>
                </ul>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">5. Nemzetközi adattovábbítás</h2>
                <p>A Resend, a Vercel és a Google (Google Analytics) az Egyesült Államokban székhellyel rendelkező cégek. Amennyiben személyes adat az Európai Gazdasági Térségen kívülre kerül továbbításra, az EU–USA Adatvédelmi Keretrendszer (Data Privacy Framework) szerinti tanúsításra, vagy az Európai Bizottság által jóváhagyott általános adatvédelmi kikötésekre (Standard Contractual Clauses) támaszkodunk, az adott szolgáltatótól függően. Az adott szolgáltatóra vonatkozó garanciákról további részletekért írj nekünk.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">6. Sütik</h2>
                <p>Csak a <a href="/cookie-policy" className="text-akac-orange underline underline-offset-2">Cookie Szabályzatunkban</a> leírt sütiket és hasonló technológiákat használjuk.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Adatmegőrzés</h2>
                <p>A kapcsolatfelvételi űrlapon érkező megkereséseket legfeljebb 12 hónapig őrizzük meg, ezután töröljük. A foglalási adatokat a szolgáltatás teljesítéséhez szükséges ideig, illetve az esetlegesen alkalmazandó törvényi megőrzési idő szerint őrizzük meg.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Jogaid</h2>
                <p className="mb-3">A GDPR alapján jogod van:</p>
                <ul className="list-disc pl-5 flex flex-col gap-2 mb-5">
                  <li>hozzáférni a rólad kezelt személyes adatokhoz</li>
                  <li>kérni a pontatlan adatok helyesbítését</li>
                  <li>kérni adataid törlését</li>
                  <li>tiltakozni az adatkezelés ellen, vagy korlátozást kérni</li>
                  <li>kérni adataid hordozható formátumban történő átadását (adathordozhatóság)</li>
                  <li>panaszt tenni a felügyeleti hatóságnál</li>
                </ul>
                <p className="mb-5">Ezen jogok gyakorlásához írj nekünk az <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a> címre.</p>
                <p className="mb-2">Panasszal a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) is fordulhatsz:</p>
                <p className="text-akac-black/60">
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)<br />
                  1055 Budapest, Falk Miksa utca 9–11.<br />
                  Postacím: 1363 Budapest, Pf.: 9<br />
                  Telefon: +36 (1) 391-1400<br />
                  E-mail: ugyfelszolgalat@naih.hu<br />
                  Honlap: <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" className="text-akac-orange underline underline-offset-2">naih.hu</a>
                </p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">9. Kapcsolat</h2>
                <p>Adatvédelemmel kapcsolatos kérdés esetén írj nekünk: <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Who we are</h2>
                <p>&quot;AKAC Studio&quot; is the trading name of Shambhala Forrása Kft., a company registered in Hungary (company registration number 02 09 084863, tax number 27312957202), with its registered office at 7636 Pécs, Akácfa dűlő 4. (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). We are the data controller for the personal data described in this policy. You can contact us at info@akac.studio.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">2. What data we collect</h2>
                <ul className="list-disc pl-5 flex flex-col gap-2 mb-3">
                  <li><strong>Contact form:</strong> name, company (optional), email address, and message.</li>
                  <li><strong>Booking a call:</strong> name and email address, via our scheduling provider Cal.com.</li>
                  <li><strong>Usage data:</strong> if you accept analytics cookies, Google Analytics collects anonymized usage data such as pages visited, device type, and approximate location.</li>
                </ul>
                <p>We do not collect any data without your knowledge.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">3. Purpose and legal basis for processing</h2>
                <table className="w-full mt-1 border-collapse text-[13px]">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(17,17,17,0.12)" }}>
                      <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Purpose</th>
                      <th className="text-left py-3 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Legal basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {legalBasisRows.map(([purpose, basis]) => (
                      <tr key={purpose} style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
                        <td className="py-3 pr-4 font-medium align-top">{purpose}</td>
                        <td className="py-3 text-akac-black/60 align-top">{basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">4. Third-party services</h2>
                <p className="mb-3">We work with the following processors, who may process your data on our behalf:</p>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li><strong>Resend</strong> — email delivery for contact form submissions and replies.</li>
                  <li><strong>Cal.com</strong> — calendar booking for intro calls.</li>
                  <li><strong>Vercel</strong> — hosting and infrastructure.</li>
                  <li><strong>Google Analytics</strong> — website traffic analysis (only with your consent).</li>
                </ul>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">5. International data transfers</h2>
                <p>Resend, Vercel, and Google (Google Analytics) are based in the United States. Where personal data is transferred outside the European Economic Area, we rely on the provider&apos;s certification under the EU-US Data Privacy Framework or Standard Contractual Clauses approved by the European Commission, as applicable. You can request more detail on the safeguard used for a specific provider by emailing us.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">6. Cookies</h2>
                <p>We use only the cookies and similar technologies described in our <a href="/cookie-policy" className="text-akac-orange underline underline-offset-2">Cookie Policy</a>.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Data retention</h2>
                <p>We retain contact form enquiries for up to 12 months, after which they are deleted. Booking data is retained for as long as necessary to deliver the service, plus any applicable statutory retention period.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Your rights</h2>
                <p className="mb-3">Under GDPR, you have the right to:</p>
                <ul className="list-disc pl-5 flex flex-col gap-2 mb-5">
                  <li>access the personal data we hold about you</li>
                  <li>request correction of inaccurate data</li>
                  <li>request deletion of your data</li>
                  <li>object to or request restriction of certain processing</li>
                  <li>request a copy of your data in a portable format (data portability)</li>
                  <li>lodge a complaint with the supervisory authority</li>
                </ul>
                <p className="mb-5">To exercise any of these rights, email us at <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
                <p className="mb-2">You also have the right to lodge a complaint with Hungary&apos;s data protection supervisory authority:</p>
                <p className="text-akac-black/60">
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)<br />
                  1055 Budapest, Falk Miksa utca 9–11., Hungary<br />
                  Postal address: 1363 Budapest, Pf.: 9<br />
                  Phone: +36 (1) 391-1400<br />
                  Email: ugyfelszolgalat@naih.hu<br />
                  Website: <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" className="text-akac-orange underline underline-offset-2">naih.hu</a>
                </p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">9. Contact</h2>
                <p>For any privacy-related questions, contact us at <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
              </div>
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

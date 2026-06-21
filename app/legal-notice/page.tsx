"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useLocale } from "@/components/providers/LocaleProvider";

const ROW_LABELS_EN = {
  fullName: "Registered company name",
  shortName: "Trading as",
  regNumber: "Company registration number",
  taxNumber: "Tax number",
  address: "Registered office",
  country: "Country",
  contact: "Contact",
};

const ROW_LABELS_HU = {
  fullName: "Cégnév",
  shortName: "Rövidített név",
  regNumber: "Cégjegyzékszám",
  taxNumber: "Adószám",
  address: "Székhely",
  country: "Ország",
  contact: "Elérhetőség",
};

const COMPANY = {
  fullName: "Shambhala Forrása Kereskedelmi és Szolgáltató Korlátolt Felelősségű Társaság",
  shortName: "Shambhala Forrása Kft.",
  regNumber: "02 09 084863",
  taxNumber: "27312957202",
  address: "7636 Pécs, Akácfa dűlő 4.",
  countryEn: "Hungary",
  countryHu: "Magyarország",
};

export default function LegalNotice() {
  const { locale } = useLocale();
  const isHu = locale === "hu";
  const labels = isHu ? ROW_LABELS_HU : ROW_LABELS_EN;

  const rows: [string, string][] = [
    [labels.fullName, COMPANY.fullName],
    [labels.shortName, COMPANY.shortName],
    [labels.regNumber, COMPANY.regNumber],
    [labels.taxNumber, COMPANY.taxNumber],
    [labels.address, COMPANY.address],
    [labels.country, isHu ? COMPANY.countryHu : COMPANY.countryEn],
  ];

  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <section className="bg-akac-light px-6 pt-40 pb-24 md:px-[100px] md:pt-[160px] md:pb-[120px] max-w-[860px]">
          <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-4">/ LEGAL</p>
          <h1 className="text-[36px] md:text-[52px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">
            {isHu ? "Impresszum" : "Legal Notice"}
          </h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">
            {isHu ? "Utolsó frissítés: 2026. június" : "Last updated: June 2026"}
          </p>

          <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">
                {isHu ? "Szolgáltató adatai" : "Service provider information"}
              </h2>
              <p className="mb-4">
                {isHu
                  ? "Az alábbi cég biztosítja az AKAC Studio (akac.studio) weboldal és a kapcsolódó szolgáltatások üzemeltetését, a 2001. évi CVIII. törvény (Ekertv.) és az EU elektronikus kereskedelemről szóló irányelve (2000/31/EK) alapján."
                  : "The website akac.studio and its related services are operated by the company below, in accordance with Hungarian Act CVIII of 2001 on Electronic Commerce (Ekertv.) and the EU e-Commerce Directive (2000/31/EC)."}
              </p>
              <div className="flex flex-col gap-2">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:gap-4 py-2 border-b border-akac-black/10">
                    <span className="text-[12px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] sm:w-[220px] flex-shrink-0">
                      {label}
                    </span>
                    <span className="text-akac-black/80">{value}</span>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row sm:gap-4 py-2">
                  <span className="text-[12px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] sm:w-[220px] flex-shrink-0">
                    {labels.contact}
                  </span>
                  <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">
                {isHu ? "Tárhelyszolgáltató" : "Hosting"}
              </h2>
              <p>
                {isHu
                  ? "A weboldalt a Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) tárolja és szolgálja ki."
                  : "This website is hosted and served by Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA)."}
              </p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">
                {isHu ? "Jogi nyilatkozatok" : "Related policies"}
              </h2>
              <p>
                {isHu ? "Lásd még: " : "See also: "}
                <a href="/privacy-policy" className="text-akac-orange underline underline-offset-2">
                  {isHu ? "Adatvédelmi irányelvek" : "Privacy Policy"}
                </a>
                {", "}
                <a href="/terms" className="text-akac-orange underline underline-offset-2">
                  {isHu ? "Általános Szerződési Feltételek" : "Terms and Conditions"}
                </a>
                {isHu ? " és " : " and "}
                <a href="/cookie-policy" className="text-akac-orange underline underline-offset-2">
                  {isHu ? "Cookie Szabályzat" : "Cookie Policy"}
                </a>.
              </p>
            </div>

          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

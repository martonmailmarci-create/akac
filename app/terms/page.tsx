"use client";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { useLocale } from "@/components/providers/LocaleProvider";

export default function Terms() {
  const { locale } = useLocale();
  const isHu = locale === "hu";

  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <section className="bg-akac-light px-6 pt-40 pb-24 md:px-[100px] md:pt-[160px] md:pb-[120px] max-w-[860px]">
          <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-4">/ LEGAL</p>
          <h1 className="text-[36px] md:text-[52px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">
            {isHu ? "Általános Szerződési Feltételek" : "Terms and Conditions"}
          </h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">
            {isHu ? "Utolsó frissítés: 2026. június" : "Last updated: June 2026"}
          </p>

          {isHu ? (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Megállapodás</h2>
                <p>Az AKAC Studio bármely szolgáltatásának igénybevételével elfogadod a jelen feltételeket. Ezek a feltételek minden, az AKAC Studio (üzemeltető: Shambhala Forrása Kft., székhely: 7636 Pécs, Akácfa dűlő 4., cégjegyzékszám: 02 09 084863, adószám: 27312957202) és az ügyfél közötti projektre, ajánlatra és megbízásra vonatkoznak.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">2. Szolgáltatások</h2>
                <p>Az AKAC Studio webdesign, webfejlesztés és kapcsolódó digitális szolgáltatásokat nyújt. Minden projekt terjedelmét írásos ajánlatban rögzítjük a munka megkezdése előtt.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">3. Fizetés</h2>
                <p>A projektek megkezdése előtt előleg fizetése szükséges. A fennmaradó összeg a projekt befejezésekor esedékes. A késedelmes fizetés a munka szüneteltetését eredményezheti. Az árak euróban (EUR) értendők, ha másként nem jelezzük.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">4. Módosítások</h2>
                <p>Minden projekt tartalmaz egy meghatározott számú módosítási kört, az ajánlatban rögzítettek szerint. Az egyezett kereten túli további módosításokat a szokásos óradíjunk szerint számlázhatjuk.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">5. Szellemi tulajdon</h2>
                <p>A teljes összeg kiegyenlítése után az ügyfél tulajdonába kerül minden végleges anyag. Az AKAC Studio fenntartja a jogot a projekt portfóliónkban való megjelenítésére, kivéve, ha írásban másként állapodunk meg.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">6. Lemondás</h2>
                <p>Ha az ügyfél a munka megkezdése után lemondja a projektet, az előleg nem visszatéríthető. A lemondás időpontjáig elvégzett munka a szokásos díjunk szerint számlázható.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Elállási jog magánszemélyek esetén</h2>
                <p>Ha jelen megállapodást magánszemélyként (fogyasztóként) kötöd velünk, a 14 napos elállási jogról ‒ az EU 2011/83/EU irányelve és a 45/2014. (II.26.) Korm. rendelet alapján ‒ az egyedi szerződésedben kapsz részletes tájékoztatást. Ez a pont nem vonatkozik rád, ha bejegyzett cégként szerződsz velünk.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Felelősség korlátozása</h2>
                <p>Az AKAC Studio nem vállal felelősséget semmilyen közvetett, járulékos vagy következményi kárért, amely szolgáltatásaink vagy a leszállított anyagok használatából ered. Teljes felelősségünk nem haladhatja meg az adott projektért kifizetett összeget.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">9. Alkalmazandó jog</h2>
                <p>Jelen feltételekre Magyarország joga az alkalmazandó. Bármely jogvitát a magyar bíróságok elé terjesztünk. Ha más EU-tagállamban élő fogyasztóként szerződsz velünk, a lakóhelyed szerinti ország kötelező fogyasztóvédelmi rendelkezései e ponttól függetlenül továbbra is alkalmazandók lehetnek.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">10. Kapcsolat</h2>
                <p>Kérdésed van a feltételekkel kapcsolatban? Írj nekünk: <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Agreement</h2>
                <p>By engaging AKAC Studio for any services, you agree to these terms. These terms apply to all projects, proposals, and engagements between AKAC Studio (operated by Shambhala Forrása Kft., registered office at 7636 Pécs, Akácfa dűlő 4., Hungary, company registration number 02 09 084863, tax number 27312957202) and the client.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">2. Services</h2>
                <p>AKAC Studio provides web design, web development, and related digital services. The scope of each project is agreed upon in a written proposal before work begins.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">3. Payment</h2>
                <p>Projects require a deposit before work begins. The remaining balance is due upon project completion. Late payments may result in work being paused. All prices are in EUR unless otherwise stated.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">4. Revisions</h2>
                <p>Each project includes a set number of revision rounds as outlined in the project proposal. Additional revisions beyond the agreed scope may be charged at our standard hourly rate.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">5. Intellectual property</h2>
                <p>Upon receipt of full payment, the client owns all final deliverables. AKAC Studio retains the right to display the project in our portfolio unless otherwise agreed in writing.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">6. Cancellation</h2>
                <p>If the client cancels a project after work has begun, the deposit is non-refundable. Any work completed up to the point of cancellation may be invoiced at our standard rate.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Right of withdrawal for consumers</h2>
                <p>If you are entering into this agreement as a private individual (consumer) rather than a registered business, you&apos;ll receive detailed information about your 14-day right of withdrawal — under EU Directive 2011/83/EU and Hungarian Government Decree 45/2014 (II.26.) — in your individual service contract. This clause does not apply if you are contracting with us as a registered business.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Limitation of liability</h2>
                <p>AKAC Studio is not liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability shall not exceed the amount paid for the project in question.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">9. Governing law</h2>
                <p>These terms are governed by the laws of Hungary. Any disputes shall be resolved in the courts of Hungary. If you are contracting with us as a consumer resident in another EU country, mandatory consumer-protection provisions of your country of residence may still apply regardless of this clause.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">10. Contact</h2>
                <p>Questions about these terms? Email us at <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
              </div>
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}

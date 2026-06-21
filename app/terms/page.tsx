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
            {isHu ? "Felhasználási feltételek" : "Terms of Use"}
          </h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">
            {isHu ? "Utolsó frissítés: 2026. június" : "Last updated: June 2026"}
          </p>

          {isHu ? (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Elfogadás</h2>
                <p>A weboldal (akac.studio) használatával elfogadod ezeket a felhasználási feltételeket. Ezek a feltételek csak a weboldal használatára vonatkoznak — bármely projektet, amellyel megbízol minket, egy külön, egyedileg aláírt szolgáltatási szerződés szabályoz, nem ez az oldal.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">2. A weboldal tartalma</h2>
                <p>A weboldalon található minden szöveg, design és kód az AKAC Studio (üzemeltető: Shambhala Forrása Kft., székhely: 7636 Pécs, Akácfa dűlő 4., cégjegyzékszám: 02 09 084863, adószám: 27312957202) tulajdona, kivéve, ha másként van jelölve, és nem másolható vagy használható fel írásos engedélyünk nélkül.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">3. Nem kötelező érvényű ajánlat</h2>
                <p>A weboldalon található információk — beleértve az árazási példákat és projektleírásokat — kizárólag általános tájékoztató jellegűek, és nem minősülnek kötelező érvényű ajánlatnak. A tényleges megbízást a velünk kötött egyedi, aláírt szerződés feltételei szabályozzák.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">4. Felelősség korlátozása</h2>
                <p>Igyekszünk a weboldalt pontosan és frissen tartani, de nem garantáljuk annak teljességét vagy pontosságát. Nem vállalunk felelősséget semmilyen kárért, amely a weboldal használatából vagy tartalmára való hagyatkozásból ered.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">5. Harmadik féltől származó linkek</h2>
                <p>A weboldal hivatkozhat harmadik fél weboldalaira (pl. ügyfeleink weboldalai, Cal.com). Nem vállalunk felelősséget ezen oldalak tartalmáért vagy gyakorlatáért.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">6. Alkalmazandó jog</h2>
                <p>Jelen feltételekre Magyarország joga az alkalmazandó.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Módosítások</h2>
                <p>Időről időre frissíthetjük ezeket a feltételeket. A weboldal további használata a módosítások után azt jelenti, hogy elfogadod a frissített feltételeket.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Kapcsolat</h2>
                <p>Kérdésed van? Írj nekünk: <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">
              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Acceptance</h2>
                <p>By using this website (akac.studio), you agree to these Terms of Use. These terms apply only to your use of the website itself — any project you engage us for is governed by a separate, individually signed service agreement, not by this page.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">2. Website content</h2>
                <p>All text, design, and code on this website belong to AKAC Studio (operated by Shambhala Forrása Kft., registered office at 7636 Pécs, Akácfa dűlő 4., Hungary, company registration number 02 09 084863, tax number 27312957202) unless otherwise credited, and may not be copied or reused without our written permission.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">3. No binding offer</h2>
                <p>Information on this website — including pricing examples and project descriptions — is provided for general informational purposes and does not constitute a binding offer. Any actual engagement is governed by the terms of your individual signed contract with us.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">4. Limitation of liability</h2>
                <p>We do our best to keep this website accurate and up to date, but we make no warranties about its completeness or accuracy. We are not liable for any damages arising from your use of this website or reliance on its content.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">5. Third-party links</h2>
                <p>This website may link to third-party sites (e.g. client websites, Cal.com). We are not responsible for the content or practices of those sites.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">6. Governing law</h2>
                <p>These terms are governed by the laws of Hungary.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Changes</h2>
                <p>We may update these terms from time to time. Continued use of the website after changes means you accept the updated terms.</p>
              </div>

              <div>
                <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Contact</h2>
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

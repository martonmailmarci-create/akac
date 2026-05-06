import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for AKAC Studio.",
};

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <section className="bg-akac-light px-6 pt-40 pb-24 md:px-[100px] md:pt-[160px] md:pb-[120px] max-w-[860px]">
          <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-4">/ LEGAL</p>
          <h1 className="text-[36px] md:text-[52px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">Cookie Policy</h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">Last updated: May 2026</p>

          <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">What are cookies?</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly and remember your preferences.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">What cookies do we use?</h2>
              <p>We use only essential cookies necessary for the website to function. We do not use advertising, tracking, or analytics cookies.</p>
              <table className="w-full mt-4 border-collapse text-[13px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(17,17,17,0.12)" }}>
                    <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Cookie</th>
                    <th className="text-left py-3 pr-4 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Purpose</th>
                    <th className="text-left py-3 font-semibold text-akac-black/50 uppercase tracking-[0.18px] text-[10px]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}>
                    <td className="py-3 pr-4 font-medium">cookie_consent</td>
                    <td className="py-3 pr-4 text-akac-black/60">Stores your cookie consent preference</td>
                    <td className="py-3 text-akac-black/60">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Third-party cookies</h2>
              <p>When you book a call via Cal.com, their platform may set its own cookies. Please refer to <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-akac-orange underline underline-offset-2">Cal.com&apos;s privacy policy</a> for details.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">How to manage cookies</h2>
              <p>You can control and delete cookies through your browser settings. Note that disabling cookies may affect how the website functions.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">Contact</h2>
              <p>Questions? Email us at <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
            </div>

          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

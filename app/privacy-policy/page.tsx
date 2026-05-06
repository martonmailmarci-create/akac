import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AKAC Studio.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <section className="bg-akac-light px-6 pt-40 pb-24 md:px-[100px] md:pt-[160px] md:pb-[120px] max-w-[860px]">
          <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-4">/ LEGAL</p>
          <h1 className="text-[36px] md:text-[52px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">Privacy Policy</h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">Last updated: May 2026</p>

          <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Who we are</h2>
              <p>AKAC Studio is a web design and development agency. Our website is akac.studio. You can contact us at info@akac.studio.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">2. What data we collect</h2>
              <p>We collect information you provide directly to us, including when you fill out our contact form (name, company, email address, and message). We do not collect any data without your knowledge or consent.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">3. How we use your data</h2>
              <p>We use your data solely to respond to your enquiry. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">4. Third-party services</h2>
              <p>We use the following third-party services that may process your data:</p>
              <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
                <li><strong>Resend</strong> — email delivery for contact form submissions.</li>
                <li><strong>Cal.com</strong> — calendar booking for intro calls.</li>
                <li><strong>Vercel</strong> — hosting and infrastructure.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">5. Cookies</h2>
              <p>We use only essential cookies required for the website to function. We do not use tracking or advertising cookies. For more detail, see our <a href="/cookie-policy" className="text-akac-orange underline underline-offset-2">Cookie Policy</a>.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">6. Data retention</h2>
              <p>We retain contact form enquiries for up to 12 months, after which they are deleted.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Your rights</h2>
              <p>Under GDPR, you have the right to access, correct, or delete your personal data at any time. To make a request, email us at info@akac.studio.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Contact</h2>
              <p>For any privacy-related questions, contact us at <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
            </div>

          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

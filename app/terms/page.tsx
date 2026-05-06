import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for AKAC Studio.",
};

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <section className="bg-akac-light px-6 pt-40 pb-24 md:px-[100px] md:pt-[160px] md:pb-[120px] max-w-[860px]">
          <p className="text-[10px] font-semibold text-akac-black/40 uppercase tracking-[0.18px] mb-4">/ LEGAL</p>
          <h1 className="text-[36px] md:text-[52px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] mb-4">Terms and Conditions</h1>
          <p className="text-[13px] font-medium text-akac-black/40 mb-16">Last updated: May 2026</p>

          <div className="flex flex-col gap-10 text-[15px] font-medium text-akac-black/70 leading-[1.8]">

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">1. Agreement</h2>
              <p>By engaging AKAC Studio for any services, you agree to these terms. These terms apply to all projects, proposals, and engagements between AKAC Studio and the client.</p>
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
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">7. Limitation of liability</h2>
              <p>AKAC Studio is not liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability shall not exceed the amount paid for the project in question.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">8. Governing law</h2>
              <p>These terms are governed by the laws of Hungary. Any disputes shall be resolved in the courts of Hungary.</p>
            </div>

            <div>
              <h2 className="text-[16px] font-semibold text-akac-black tracking-[-0.3px] mb-3">9. Contact</h2>
              <p>Questions about these terms? Email us at <a href="mailto:info@akac.studio" className="text-akac-orange underline underline-offset-2">info@akac.studio</a>.</p>
            </div>

          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

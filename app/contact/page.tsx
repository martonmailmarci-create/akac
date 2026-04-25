import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Contact — AKAC Studio",
  description: "Start a project with AKAC Studio. Tell us what you're building and we'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-akac-black">
        <ContactForm />
        <div className="rounded-t-[24px] md:rounded-t-[60px] overflow-hidden" style={{ marginTop: "-60px", position: "relative", zIndex: 2 }}>
          <FAQ />
        </div>
        <Footer />
      </main>
    </>
  );
}

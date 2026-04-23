import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — AKAC Studio",
  description: "Start a project with AKAC Studio. Tell us what you're building and we'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-akac-light">
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}

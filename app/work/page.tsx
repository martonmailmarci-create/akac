import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WorkGallery from "@/components/sections/WorkGallery";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Work — AKAC Studio",
  description: "Selected projects from AKAC Studio. Hand-crafted, performance-driven digital experiences.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <WorkGallery />
        <div
          className="bg-akac-black rounded-t-[24px] md:rounded-t-[60px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 2 }}
        >
          <CTA centered />
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Pricing from "@/components/sections/Pricing";
import WhatIsIncluded from "@/components/sections/WhatIsIncluded";
import HowLong from "@/components/sections/HowLong";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Pricing — AKAC Studio",
  description: "Simple, transparent pricing for web design and development. Essential, Professional, and Enterprise plans tailored to your business.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Pricing cards — extra mobile top padding since there's no hero above */}
        <div className="pt-16 md:pt-0 bg-akac-light md:bg-transparent">
          <Pricing />
        </div>

        {/* What's included */}
        <WhatIsIncluded />

        {/* How long */}
        <HowLong />

        {/* FAQ — has its own marginTop: -60px and zIndex: 1 in component */}
        <div style={{ position: "relative", zIndex: 4 }}>
          <FAQ />
        </div>

        {/* CTA */}
        <div
          className="bg-akac-black rounded-t-[24px] md:rounded-t-[60px]"
          style={{ marginTop: "-60px", position: "relative", zIndex: 5 }}
        >
          <CTA centered />
        </div>
      </main>
      <Footer />
    </>
  );
}

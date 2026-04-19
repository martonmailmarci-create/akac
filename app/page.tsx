import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import HowWeWork from "@/components/sections/HowWeWork";
import OurFocus from "@/components/sections/OurFocus";
import OurTeam from "@/components/sections/OurTeam";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero ready={true} />
        <HowWeWork />
        <OurFocus />
        <OurTeam />
        <Services />
        <WhyUs />
        <FeaturedWork />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

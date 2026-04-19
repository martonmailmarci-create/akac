"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import RevealHeadline from "@/components/ui/RevealHeadline";

export default function OurFocus() {

  return (
    <section
      className="bg-akac-light overflow-hidden flex items-center justify-center min-h-screen md:min-h-screen px-6 pb-32 -mt-px md:mt-0 md:pb-0 md:py-[60px] md:px-[100px] md:pb-[260px]"
    >
      <div className="max-w-[1000px] mx-auto text-center w-full">
        <SectionLabel className="mb-10">/ OUR FOCUS</SectionLabel>

        <RevealHeadline className="text-[36px] md:text-[55px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.05] mb-10">
          YOUR GOALS. OUR OBSESSION.
        </RevealHeadline>

        <p className="text-[16px] font-medium text-akac-black tracking-[0.24px] leading-[1.6] max-w-[720px] mx-auto">
          We work with founders, startups, and growth-stage companies who need more than a pretty website. We go deep on strategy, conversion, and brand to make sure what we build actually moves the needle for your business.
        </p>
      </div>
    </section>
  );
}

"use client";

import BracketButton from "@/components/ui/BracketButton";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="bg-akac-black min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-[7px] h-[7px] bg-akac-orange mb-10" style={{ borderRadius: "2px" }} />
      <p className="text-[11px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px] mb-6">
        500 — Something went wrong
      </p>
      <h1 className="text-[48px] md:text-[80px] font-semibold text-akac-cream tracking-[-2px] leading-[1.0] uppercase mb-6">
        OUR BAD.
      </h1>
      <p className="text-[15px] font-medium text-akac-cream/50 leading-[1.6] max-w-[400px] mb-12">
        Something broke on our end. Try refreshing — if it keeps happening, drop us a message.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <BracketButton label="TRY AGAIN" color="#F9F9F4" onClick={reset} />
        <BracketButton label="CONTACT US" color="#F9F9F4" href="/contact" />
      </div>
    </main>
  );
}

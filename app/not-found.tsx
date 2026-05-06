import Navbar from "@/components/ui/Navbar";
import BracketButton from "@/components/ui/BracketButton";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-akac-black min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="w-[7px] h-[7px] bg-akac-orange mb-10" style={{ borderRadius: "2px" }} />
        <p className="text-[11px] font-semibold text-akac-cream/40 uppercase tracking-[0.18px] mb-6">
          404 — Page not found
        </p>
        <h1 className="text-[48px] md:text-[80px] font-semibold text-akac-cream tracking-[-2px] leading-[1.0] uppercase mb-6">
          LOST?
        </h1>
        <p className="text-[15px] font-medium text-akac-cream/50 leading-[1.6] max-w-[400px] mb-12">
          The page you&apos;re looking for doesn&apos;t exist. Head back home and let&apos;s get you somewhere useful.
        </p>
        <BracketButton label="BACK TO HOME" color="#F9F9F4" href="/" />
      </main>
    </>
  );
}

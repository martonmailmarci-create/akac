import Image from "next/image";
import BracketButton from "@/components/ui/BracketButton";

const navLinks = ["WHY US", "PORTFOLIO", "OUR TEAM", "PRICING", "CONTACT"];
const legalLinks = ["PRIVACY POLICY", "TERMS AND CONDITIONS", "COOKIE POLICY"];

export default function Footer() {
  return (
    <footer className="bg-akac-orange overflow-hidden relative flex flex-col rounded-t-[24px] md:rounded-t-[60px] min-h-auto md:min-h-[780px] px-6 pb-12 pt-12 md:px-[100px] md:pb-12 md:pt-6">

      {/* Top row */}
      <div className="flex justify-between items-start">
        <div className="pt-10 md:pt-[100px]">
          <h2 className="text-[22px] md:text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[28px] md:leading-[32px] uppercase mb-8">
            TELL US WHAT YOU NEED.
          </h2>
          <BracketButton label="CONTACT US" color="#111111" href="#contact" />
        </div>

        {/* Logo — desktop only (absolute so it doesn't affect flow) */}
        <div className="hidden md:block">
          <Image
            src="/logo.svg"
            alt="AKAC Studio"
            width={600}
            height={600}
            className="brightness-0 absolute top-[-40px] right-[-66px]"
          />
        </div>

        {/* Logo — mobile: inline, smaller */}
        <Image
          src="/logo.svg"
          alt="AKAC Studio"
          width={100}
          height={100}
          className="md:hidden brightness-0 mt-10"
        />
      </div>

      {/* Bottom area */}
      <div className="mt-12 md:mt-auto flex flex-col md:flex-row md:justify-between md:items-end gap-8 md:gap-0">
        <div>
          {/* Nav links */}
          <nav className="mb-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                className="block text-[20px] md:text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[26px] md:leading-[32px] no-underline hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Credits */}
          <div className="flex flex-col gap-[2px]">
            <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px]">
              SITE BY AKAC STUDIO
            </span>
            <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px]">
              ALL RIGHTS RESERVED @ 2026 AKAC STUDIO
            </span>
          </div>
        </div>

        {/* Legal links — horizontal on mobile, vertical on desktop */}
        <div className="flex flex-row flex-wrap gap-4 md:flex-col md:gap-1 md:text-right">
          {legalLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13px] md:text-[16px] font-semibold text-akac-black tracking-[0.24px] uppercase no-underline hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

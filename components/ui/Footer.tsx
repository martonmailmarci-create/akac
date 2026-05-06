"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import BracketButton from "@/components/ui/BracketButton";

function lenisScrollTo(anchor: string) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (t: string) => void } | undefined;
  if (lenis) {
    lenis.scrollTo(anchor);
  } else {
    document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
  }
}

const navLinks = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/#services" },
  { label: "PRICING", href: "/pricing" },
  { label: "TEAM", href: "/#team" },
  { label: "CONTACT", href: "/contact" },
];
const legalLinks = [
  { label: "PRIVACY POLICY", href: "/privacy-policy" },
  { label: "TERMS AND CONDITIONS", href: "/terms" },
  { label: "COOKIE POLICY", href: "/cookie-policy" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      lenisScrollTo(href.slice(1));
    }
  };
  return (
    <footer className="bg-akac-orange overflow-hidden relative flex flex-col rounded-t-[24px] md:rounded-t-[60px] md:min-h-[780px] md:px-[100px] md:pb-12 md:pt-6">

      {/* ── Mobile layout ── */}
      <div className="md:hidden flex flex-col px-6 pt-16 pb-6" style={{ minHeight: "inherit" }}>

        {/* CTA block */}
        <div className="pt-14 mb-16">
          <h2 className="text-[32px] font-semibold text-akac-black tracking-[-1.1px] leading-[1.1] uppercase mb-12">
            TELL US WHAT YOU NEED.
          </h2>
          <BracketButton label="CONTACT US" color="#111111" href="/contact" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-akac-black opacity-20 mb-6" />

        {/* Contact */}
        <div className="mb-5">
          <span className="block text-[10px] font-medium text-akac-black uppercase tracking-[0.18px] opacity-50 mb-3">
            CONTACT
          </span>
          <p className="text-[13px] font-normal text-akac-black tracking-[0.1px] mb-1">
            info@akac.studio
          </p>
          <p className="text-[13px] font-normal text-akac-black tracking-[0.1px] mb-1">
            Marcell: marcell@akac.studio
          </p>
          <p className="text-[13px] font-normal text-akac-black tracking-[0.1px]">
            Viktor: viktor@akac.studio
          </p>
        </div>

        {/* Socials */}
        <div className="mb-10">
          <span className="block text-[10px] font-medium text-akac-black uppercase tracking-[0.18px] opacity-50 mb-3">
            SOCIALS
          </span>
          <p className="text-[13px] font-normal text-akac-black tracking-[0.1px] mb-1">
            Instagram: @akac.studio
          </p>
          <p className="text-[13px] font-normal text-akac-black tracking-[0.1px]">
            LinkedIn: @akac-studio
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-akac-black opacity-20 mb-6" />

        {/* Legal + credits */}
        <div className="flex flex-col gap-2">
          {legalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px] no-underline opacity-50"
            >
              {link.label}
            </a>
          ))}
          <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px] opacity-50 mt-1">
            ALL RIGHTS RESERVED &copy; 2026 AKAC STUDIO
          </span>
        </div>
      </div>

      {/* ── Desktop layout (original) ── */}
      <div className="hidden md:flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div className="pt-[100px]">
            <h2 className="text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[32px] uppercase mb-12">
              TELL US WHAT YOU NEED.
            </h2>
            <BracketButton label="CONTACT US" color="#111111" href="/contact" />
          </div>
          <Image
            src="/logo.svg"
            alt="AKAC Studio"
            width={290}
            height={290}
            className="brightness-[0.078] absolute top-[124px] right-[100px]"
          />
        </div>

        <div className="mt-auto flex flex-row justify-between items-end">
          <div>
            <nav className="mb-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="block text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[32px] no-underline hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px]">
                SITE BY AKAC STUDIO
              </span>
              <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px]">
                ALL RIGHTS RESERVED &copy; 2026 AKAC STUDIO
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-right">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[16px] font-semibold text-akac-black tracking-[0.24px] uppercase no-underline hover:opacity-60 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

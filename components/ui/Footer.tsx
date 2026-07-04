"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BracketButton from "@/components/ui/BracketButton";
import { useLocale } from "@/components/providers/LocaleProvider";

function lenisScrollTo(anchor: string) {
  const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo: (t: string) => void } | undefined;
  if (lenis) {
    lenis.scrollTo(anchor);
  } else {
    document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Footer() {
  const { t } = useLocale();
  const pathname = usePathname();

  const navLinks = [
    { label: t.nav.work, href: "/work" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.team, href: "/#team" },
    { label: t.nav.contact, href: "/contact" },
    { label: t.footer.partners, href: "/partners" },
  ];
  const legalLinks = [
    { label: t.footer.privacy, href: "/privacy-policy" },
    { label: t.footer.terms, href: "/terms" },
    { label: t.footer.cookies, href: "/cookie-policy" },
    { label: t.footer.legalNotice, href: "/legal-notice" },
  ];

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
            {t.footer.cta}
          </h2>
          <BracketButton label={t.footer.contactUs} color="#111111" href="/contact" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-akac-black opacity-20 mb-6" />

        {/* Contact */}
        <div className="mb-5">
          <span className="block text-[10px] font-medium text-akac-black uppercase tracking-[0.18px] opacity-50 mb-3">
            {t.footer.contact}
          </span>
          <p className="mb-1">
            <a href="mailto:info@akac.studio" className="text-[13px] font-normal text-akac-black tracking-[0.1px] no-underline">info@akac.studio</a>
          </p>
          <p className="mb-1">
            <a href="mailto:marcell@akac.studio" className="text-[13px] font-normal text-akac-black tracking-[0.1px] no-underline">Marcell: marcell@akac.studio</a>
          </p>
          <p>
            <a href="mailto:viktor@akac.studio" className="text-[13px] font-normal text-akac-black tracking-[0.1px] no-underline">Viktor: viktor@akac.studio</a>
          </p>
        </div>

        {/* Socials */}
        <div className="mb-10">
          <span className="block text-[10px] font-medium text-akac-black uppercase tracking-[0.18px] opacity-50 mb-3">
            {t.footer.socials}
          </span>
          <p className="mb-1">
            <a href="https://www.instagram.com/akac.studio" target="_blank" rel="noopener noreferrer" className="text-[13px] font-normal text-akac-black tracking-[0.1px] no-underline">Instagram: @akac.studio</a>
          </p>
          <p>
            <a href="https://linkedin.com/company/akac-studio" target="_blank" rel="noopener noreferrer" className="text-[13px] font-normal text-akac-black tracking-[0.1px] no-underline">LinkedIn: @akac-studio</a>
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-akac-black opacity-20 mb-6" />

        {/* Legal + credits */}
        <div className="flex flex-col gap-2">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px] no-underline opacity-50"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px] opacity-50 mt-1">
            {t.footer.rights}
          </span>
        </div>
      </div>

      {/* ── Desktop layout (original) ── */}
      <div className="hidden md:flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div className="pt-[100px]">
            <h2 className="text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[32px] uppercase mb-12">
              {t.footer.cta}
            </h2>
            <BracketButton label={t.footer.contactUs} color="#111111" href="/contact" />
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
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="block text-[30px] font-medium text-akac-black tracking-[-0.6px] leading-[32px] no-underline hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-[2px]">
              <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px]">
                {t.footer.siteBy}
              </span>
              <span className="text-[12px] font-medium text-akac-black uppercase tracking-[0.18px]">
                {t.footer.rights}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-right">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[16px] font-semibold text-akac-black tracking-[0.24px] uppercase no-underline hover:opacity-60 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

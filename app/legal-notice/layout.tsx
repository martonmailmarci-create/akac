import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and company information for AKAC Studio.",
  alternates: { canonical: "/legal-notice" },
};

export default function LegalNoticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}

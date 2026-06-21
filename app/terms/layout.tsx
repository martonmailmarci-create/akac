import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Website Terms of Use for AKAC Studio.",
  alternates: { canonical: "/terms" },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

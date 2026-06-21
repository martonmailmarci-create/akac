import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for AKAC Studio.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

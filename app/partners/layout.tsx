import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Program",
  description: "Join the AKAC Studio partner program and earn commission by referring new clients.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partner Program — AKAC Studio",
    description: "Earn recurring or flat commission by referring clients to AKAC Studio.",
    url: "https://akac.studio/partners",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}

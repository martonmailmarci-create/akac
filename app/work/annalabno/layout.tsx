import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annalabno — Case Study",
  description:
    "How AKAC Studio designed and built a high-performance website for Annalabno. Web design and development case study.",
  alternates: { canonical: "/work/annalabno" },
  openGraph: {
    title: "Annalabno — Case Study — AKAC Studio",
    description:
      "How AKAC Studio designed and built a high-performance website for Annalabno.",
    url: "https://akac.studio/work/annalabno",
    images: [{ url: "/project1/project1.jpg", width: 1200, height: 630, alt: "Annalabno website" }],
  },
};

export default function AnnalabnoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

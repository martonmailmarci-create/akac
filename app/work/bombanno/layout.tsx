import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bombanő — Case Study",
  description:
    "How AKAC Studio designed and built a high-performance website for Bombanő. Web design and development case study.",
  alternates: { canonical: "/work/bombanno" },
  // Temporarily hidden from work listings — keep it out of search results too
  robots: { index: false, follow: false },
  openGraph: {
    title: "Bombanő — Case Study — AKAC Studio",
    description:
      "How AKAC Studio designed and built a high-performance website for Bombanő.",
    url: "https://akac.studio/work/bombanno",
    images: [{ url: "/project2/project2.jpg", width: 1200, height: 630, alt: "Bombanő website" }],
  },
};

export default function BombannoLayout({ children }: { children: React.ReactNode }) {
  return children;
}

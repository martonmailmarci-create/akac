import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Őssejt Előadás — Case Study",
  description:
    "How AKAC Studio designed and built a high-converting event landing page for a stem cell lecture in Pécs. Web design and development case study.",
  alternates: { canonical: "/work/ossejt-eloadas" },
  openGraph: {
    title: "Őssejt Előadás — Case Study — AKAC Studio",
    description:
      "How AKAC Studio designed and built a high-converting event landing page for a stem cell lecture in Pécs.",
    url: "https://akac.studio/work/ossejt-eloadas",
    images: [{ url: "/project4/project4.jpg", width: 1200, height: 630, alt: "Őssejt Előadás website" }],
  },
};

export default function OssejtEloadasLayout({ children }: { children: React.ReactNode }) {
  return children;
}

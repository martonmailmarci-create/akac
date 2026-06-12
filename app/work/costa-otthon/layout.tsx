import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Costa Otthon — Case Study",
  description:
    "How AKAC Studio designed and built a high-performance real estate website for Costa Otthon. Web design and development case study.",
  alternates: { canonical: "/work/costa-otthon" },
  openGraph: {
    title: "Costa Otthon — Case Study — AKAC Studio",
    description:
      "How AKAC Studio designed and built a high-performance real estate website for Costa Otthon.",
    url: "https://akac.studio/work/costa-otthon",
    images: [{ url: "/project3/project3.jpg", width: 1200, height: 630, alt: "Costa Otthon website" }],
  },
};

export default function CostaOtthonLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import KonamiEgg from "@/components/ui/KonamiEgg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AKAC Studio — Web Design & Development",
  description:
    "AKAC Studio builds high-performance marketing websites, web apps, and e-commerce experiences. Delivered in weeks, not months.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <LenisProvider>{children}</LenisProvider>
        <KonamiEgg />
      </body>
    </html>
  );
}

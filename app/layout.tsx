import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import KonamiEgg from "@/components/ui/KonamiEgg";
import ContextMenu from "@/components/ui/ContextMenu";
import CookieBanner from "@/components/ui/CookieBanner";
import JsonLd from "@/components/ui/JsonLd";

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
  metadataBase: new URL("https://akac.studio"),
  title: {
    default: "AKAC Studio — Web Design & Development",
    template: "%s — AKAC Studio",
  },
  description:
    "AKAC Studio builds high-performance marketing websites, web apps, and e-commerce experiences. Delivered in weeks, not months.",
  keywords: ["web design", "web development", "agency", "marketing website", "e-commerce", "web app"],
  authors: [{ name: "AKAC Studio", url: "https://akac.studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akac.studio",
    siteName: "AKAC Studio",
    title: "AKAC Studio — Web Design & Development",
    description: "High-performance marketing websites, web apps, and e-commerce experiences. Delivered in weeks, not months.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AKAC Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKAC Studio — Web Design & Development",
    description: "High-performance marketing websites, web apps, and e-commerce experiences. Delivered in weeks, not months.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload hero canvas image */}
        <link rel="preload" href="/images/ascii-art.png" as="image" />
        {/* DNS prefetch for third-party domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//app.cal.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
        {/* Initialise gtag + set consent defaults to denied before anything loads */}
        <Script id="gtag-consent-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', { analytics_storage: 'denied' });
          gtag('js', new Date());
          gtag('config', 'G-6YGXL6DBCF');
        `}</Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6YGXL6DBCF" strategy="afterInteractive" />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
        <KonamiEgg />
        <ContextMenu />
        <CookieBanner />
      </body>
    </html>
  );
}

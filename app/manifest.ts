import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AKAC Studio",
    short_name: "AKAC",
    description: "Web design & development studio. High-performance websites delivered in weeks, not months.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: "/icons/akac-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

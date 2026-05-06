export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://akac.studio/#organization",
        name: "AKAC Studio",
        url: "https://akac.studio",
        logo: {
          "@type": "ImageObject",
          url: "https://akac.studio/logo.png",
        },
        sameAs: [
          "https://instagram.com/akac.studio",
          "https://linkedin.com/company/akac-studio",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@akac.studio",
          contactType: "customer service",
        },
        founders: [
          { "@type": "Person", name: "Marcell Marton" },
          { "@type": "Person", name: "Viktor Miller" },
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://akac.studio/#service",
        name: "AKAC Studio",
        url: "https://akac.studio",
        description:
          "AKAC Studio builds high-performance marketing websites, web apps, and e-commerce experiences. Delivered in weeks, not months.",
        priceRange: "€€",
        areaServed: "Worldwide",
        serviceType: [
          "Web Design",
          "Web Development",
          "E-commerce Development",
          "Web App Development",
        ],
        email: "info@akac.studio",
      },
      {
        "@type": "WebSite",
        "@id": "https://akac.studio/#website",
        url: "https://akac.studio",
        name: "AKAC Studio",
        publisher: { "@id": "https://akac.studio/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://akac.studio/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

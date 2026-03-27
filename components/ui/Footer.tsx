import Image from "next/image";

const navLinks = ["WHY US", "PORTFOLIO", "OUR TEAM", "PRICING", "CONTACT"];
const legalLinks = ["PRIVACY POLICY", "TERMS AND CONDITIONS", "COOKIE POLICY"];

export default function Footer() {
  return (
    <footer
      className="bg-akac-orange overflow-hidden relative"
      style={{ minHeight: "780px", display: "flex", flexDirection: "column", padding: "24px 100px 48px", borderRadius: "60px 60px 0 0" }}
    >
      {/* Top row: title left, logo mark right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ paddingTop: "100px" }}>
          <h2 style={{ fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px", textTransform: "uppercase", marginBottom: "32px" }}>
            TELL US WHAT YOU NEED.
          </h2>
          <a
            href="#contact"
            style={{ display: "inline-flex", border: "1px solid #111111", padding: "10px 20px", textDecoration: "none", cursor: "pointer" }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#111111", letterSpacing: "0.18px" }}>
              [ CONTACT US ]
            </span>
          </a>
        </div>

        {/* AKAC logo mark — top right */}
        <Image
          src="/logo.svg"
          alt="AKAC Studio"
          width={600}
          height={600}
          style={{ filter: "brightness(0)", position: "absolute", top: "-40px", right: "-66px" }}
        />
      </div>

      {/* Bottom area: nav left, legal right */}
      <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          {/* Nav links */}
          <nav style={{ marginBottom: "24px" }}>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                style={{ display: "block", fontSize: "30px", fontWeight: 500, color: "#111111", letterSpacing: "-0.6px", lineHeight: "32px", textDecoration: "none" }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Credits */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "12px", fontWeight: 500, color: "#111111", textTransform: "uppercase", letterSpacing: "0.18px" }}>
              SITE BY AKAC STUDIO
            </span>
            <span style={{ fontSize: "12px", fontWeight: 500, color: "#111111", textTransform: "uppercase", letterSpacing: "0.18px" }}>
              ALL RIGHTS RESERVED @ 2026 AKAC STUDIO
            </span>
          </div>
        </div>

        {/* Legal links — vertical stack, bottom right */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "right" }}>
          {legalLinks.map((link) => (
            <a
              key={link}
              href="#"
              style={{ fontSize: "16px", fontWeight: 600, color: "#111111", letterSpacing: "0.24px", textTransform: "uppercase", textDecoration: "none" }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

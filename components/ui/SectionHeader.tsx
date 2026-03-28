import BracketButton from "@/components/ui/BracketButton";

interface SectionHeaderProps {
  label: string;
  title: string;
  body?: string;
  cta?: { text: string; href: string };
  /** Tailwind margin-bottom class, e.g. "mb-12 md:mb-[100px]" */
  mbClass?: string;
  /** @deprecated use mbClass for responsive control */
  mb?: string;
  dark?: boolean;
}

/**
 * Standard two-column section header.
 * Desktop: label+title left, rule+body+CTA right (at 50%).
 * Mobile: stacks label → title → rule → body → CTA.
 */
export default function SectionHeader({
  label,
  title,
  body,
  cta,
  mbClass,
  mb = "100px",
  dark = false,
}: SectionHeaderProps) {
  const color = dark ? "#D9D9D9" : "#111111";
  const lineColor = dark ? "rgba(217,217,217,0.2)" : "rgba(17,17,17,0.2)";

  return (
    <div
      className={`relative ${mbClass ?? ""}`}
      style={mbClass ? undefined : { marginBottom: mb }}
    >
      {/* Left: label + title */}
      <div className={body ? "md:max-w-[50%]" : undefined}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 500,
            color,
            textTransform: "uppercase",
            letterSpacing: "0.18px",
            display: "block",
          }}
        >
          {label}
        </span>
        <h2
          style={{
            fontSize: "30px",
            fontWeight: 500,
            color,
            letterSpacing: "-0.6px",
            lineHeight: "32px",
            marginTop: "8px",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Body block — stacks on mobile, absolute on desktop */}
      {body && (
        <div className="mt-6 md:mt-0 md:absolute md:top-0 md:left-[50%] md:w-[45%]">
          <div style={{ width: "100%", height: "1px", backgroundColor: lineColor, marginBottom: "16px" }} />
          <p
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color,
              lineHeight: "18px",
              letterSpacing: "0.24px",
              marginBottom: cta ? "24px" : 0,
            }}
          >
            {body}
          </p>
          {cta && (
            <BracketButton label={cta.text} color={color} href={cta.href} />
          )}
        </div>
      )}
    </div>
  );
}

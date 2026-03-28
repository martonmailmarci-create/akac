interface BracketButtonProps {
  label: string;
  color?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function BracketButton({
  label,
  color = "#111111",
  href,
  onClick,
  className = "",
}: BracketButtonProps) {
  const size = 10;
  const thickness = 1;

  const corner = (pos: { top?: 0; bottom?: 0; left?: 0; right?: 0 }) => ({
    position: "absolute" as const,
    width: size,
    height: size,
    ...pos,
    borderTop: pos.top === 0 ? `${thickness}px solid ${color}` : undefined,
    borderBottom: pos.bottom === 0 ? `${thickness}px solid ${color}` : undefined,
    borderLeft: pos.left === 0 ? `${thickness}px solid ${color}` : undefined,
    borderRight: pos.right === 0 ? `${thickness}px solid ${color}` : undefined,
  });

  const inner = (
    <>
      <span style={corner({ top: 0, left: 0 })} />
      <span style={corner({ top: 0, right: 0 })} />
      <span style={corner({ bottom: 0, left: 0 })} />
      <span style={corner({ bottom: 0, right: 0 })} />
      <span style={{ color, fontSize: "13px", fontWeight: 500, letterSpacing: "0.18px", textTransform: "uppercase" as const }}>
        {label}
      </span>
    </>
  );

  const shared = {
    className: `relative inline-flex items-center justify-center px-8 py-3 bg-transparent border-none cursor-pointer no-underline hover:opacity-60 transition-opacity duration-200 ${className}`,
    style: { minWidth: "160px" },
    onClick,
  };

  if (href) {
    return <a href={href} {...shared}>{inner}</a>;
  }

  return <button {...shared}>{inner}</button>;
}

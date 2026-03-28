interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export default function SectionLabel({ children, dark = false, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`text-[12px] font-medium uppercase tracking-[0.18px] leading-[18px] block mb-4 ${dark ? "text-akac-light" : "text-akac-black"} ${className}`}
    >
      {children}
    </span>
  );
}

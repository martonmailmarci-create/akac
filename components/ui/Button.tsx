import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
  href?: string;
}

export default function Button({
  children,
  variant = "dark",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-semibold text-[13px] tracking-[0.2em] uppercase transition-opacity duration-200 hover:opacity-70 cursor-pointer";

  const variants = {
    dark: "text-akac-light",
    light: "text-akac-black",
  };

  const content = (
    <>
      <span className="font-light opacity-60">[</span>
      <span>{children}</span>
      <span className="font-light opacity-60">]</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
}

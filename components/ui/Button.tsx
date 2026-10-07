import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export function Button({ children, href, onClick, variant = "primary", className = "" }: ButtonProps) {
  const base = `
    inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all
    ${variant === "primary" ? "bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]" : ""}
    ${variant === "secondary" ? "bg-white/5 border border-white/15 text-white hover:bg-white/10" : ""}
    ${variant === "ghost" ? "text-cyan-300 hover:text-cyan-200" : ""}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
}
// components/ui/GlassPanel.tsx
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

// components/ui/GlassPanel.tsx
export function GlassPanel({ children, className = "", border = true, hoverable = true }: GlassPanelProps) {
  return (
    <div
      className={`
        rounded-2xl md:rounded-3xl w-full bg-white/5 backdrop-blur-sm p-4 sm:p-6 md:p-8
        ${border ? "border border-white/10" : ""}
        ${hoverable ? "transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.05)]" : ""}
        overflow-visible
        ${className}
      `}
    >
      {children}
    </div>
  );
}
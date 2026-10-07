// components/home/SectionTitle.tsx

import React from "react";

interface SectionTitleProps {
  id?: string;

  category?: string;

  eyebrow?: string;

  title: string;

  description?: string;

  quote?: string;

  align?: "left" | "center";

  children?: React.ReactNode;
}

export default function SectionTitle({
  id,
  category,
  eyebrow,
  title,
  description,
  quote,
  align = "center",
  children,
}: SectionTitleProps) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : "items-center text-center";

  return (
    <header
      id={id}
      className={`mx-auto mb-20 flex max-w-5xl flex-col ${alignment}`}
    >
      {/* Category */}

      {category && (
        <span className="mb-3 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
          {category}
        </span>
      )}

      {/* Eyebrow */}

      {eyebrow && (
        <span className="mb-5 text-sm font-semibold uppercase tracking-[0.45em] text-white/50">
          {eyebrow}
        </span>
      )}

      {/* Title */}

      <h2 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
        {title}
      </h2>

      {/* Description */}

      {description && (
        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75 md:text-xl">
          {description}
        </p>
      )}

      {/* Quote */}

      {quote && (
        <blockquote className="mt-10 max-w-3xl border-l-4 border-cyan-400 pl-6 italic text-cyan-100/90">
          “{quote}”
        </blockquote>
      )}

      {/* Divider */}

      <div className="mt-12 h-[2px] w-28 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

      {children}
    </header>
  );
}
"use client";

import React, { useEffect, useRef } from "react";
import { ChevronRight, HelpCircle } from "lucide-react";

export interface ChapterProps {
  id?: string;
  question?: string;
  category?: string;
  title: string;
  description: string;
  manifesto?: string;
  align?: "left" | "center";
  icon?: React.ReactNode;
  cta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  children: React.ReactNode;
  className?: string;
  variant?: "hero" | "narrative";
}

export default function Chapter({
  id,
  question,
  category,
  title,
  description,
  manifesto,
  align = "center",
  icon,
  cta,
  children,
  className = "",
  variant = "narrative",
}: ChapterProps) {
  const centered = align === "center";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots: { x: number; y: number; r: number; dx: number; dy: number }[] = [];
    for (let i = 0; i < 80; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.3)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // Variant-specific classes
  const headerWidth = variant === "hero" ? "max-w-5xl" : "max-w-4xl";
  const titleSize = variant === "hero"
    ? "text-[clamp(1.8rem,4vw,3.5rem)]"
    : "text-[clamp(1.4rem,3vw,2.8rem)]";
  const descWidth = variant === "hero" ? "max-w-4xl" : "max-w-2xl";
  const dividerSpacing = variant === "hero" ? "mt-8" : "mt-6";
  const childMargin = variant === "hero" ? "mt-10" : "mt-8";

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden border-b border-white/5 bg-linear-to-br from-cyan-950/25 via-slate-900/50 to-emerald-950/25 ${className}`}
    >
      {/* Background layers */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[url('/assets/logo/nday-favicon.ico')] opacity-10 mix-blend-overlay" />

      {/* Inner container – fluid width */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-14 sm:px-6 md:py-20">
        <header
          className={`mx-auto flex max-w-5xl flex-col ${
            centered ? "items-center text-center" : "items-start text-left"
          }`}
        >
          {/* Question */}
          {question && (
            <div className="mb-4 flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-cyan-300 md:h-10 md:w-10" />
              <h1 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
                {question}
              </h1>
            </div>
          )}

          {/* Category */}
          {category && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 backdrop-blur-lg">
              {icon ?? <ChevronRight size={16} />}
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <h2
            className={`${headerWidth} font-bold leading-tight tracking-tight text-white text-balance ${
              question
                ? "text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90"
                : titleSize
            }`}
          >
            {title}
          </h2>

          {/* Description */}
          <p className={`mt-6 text-base leading-8 text-white/85 md:text-lg ${descWidth}`}>
            {description}
          </p>

          {/* Manifesto */}
          {manifesto && (
            <div className="mt-8 max-w-3xl rounded-2xl border-l-4 border-cyan-400 bg-cyan-500/5 px-6 py-5 backdrop-blur-md">
              <p className="text-lg italic leading-8 text-cyan-100">
                “{manifesto}”
              </p>
            </div>
          )}

          {/* Divider */}
          <div className={`${dividerSpacing} h-0.5 w-28 rounded-full bg-linear-to-r from-cyan-400 via-blue-400 to-emerald-400`} />

          {/* CTA */}
          {cta && (
            <div className="mt-8">
              <a
                href={cta.href}
                onClick={cta.onClick}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/30"
              >
                {cta.label}
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          )}
        </header>

        {/* Children – fluid width */}
        <div className={`${childMargin} w-full max-w-7xl mx-auto flex flex-col items-center`}>
          {children}
        </div>
      </div>
    </section>
  );
}
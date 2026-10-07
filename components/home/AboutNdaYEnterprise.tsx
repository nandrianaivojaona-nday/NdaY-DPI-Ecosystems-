"use client";

import { useState } from "react";
import { enterprise } from "@/data/enterprise";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function AboutNdaYEnterprise() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sections = [
    {
      title: "Building Digital Public Infrastructure Around People",
      content: (
        <>
          <p className="text-[clamp(0.85rem,1.5vw,1.1rem)] text-white/80 mt-2 leading-relaxed break-words">
            NdaY' Enterprise is an innovation and digital transformation enterprise dedicated to designing,
            building and evolving Digital Public Infrastructure (DPI) ecosystems that place people, communities
            and public value at the heart of digital transformation.
          </p>
          <p className="text-[clamp(0.85rem,1.5vw,1.1rem)] text-white/70 mt-3 leading-relaxed break-words">
            Rather than creating isolated software applications, NdaY' designs shared digital foundations that
            enable individuals, communities, governments, businesses, academia and development partners to
            collaborate through trusted, interoperable and sustainable digital ecosystems.
          </p>
        </>
      ),
    },
    {
      title: "Our Story",
      content: <p className="text-[clamp(0.85rem,1.5vw,1.1rem)] text-white/80 mt-2 leading-relaxed break-words">{enterprise.story}</p>,
    },
    {
      title: "Our Vision",
      content: <p className="text-[clamp(0.85rem,1.5vw,1.1rem)] text-white/80 mt-2 leading-relaxed break-words">{enterprise.vision}</p>,
    },
    {
      title: "Our Mission",
      content: <p className="text-[clamp(0.85rem,1.5vw,1.1rem)] text-white/80 mt-2 leading-relaxed break-words">{enterprise.mission}</p>,
    },
    {
      title: "Our Philosophy",
      content: (
        <div className="mt-3 p-4 bg-cyan-500/5 rounded-xl border border-cyan-400/20 overflow-visible w-full">
          <p className="text-[clamp(1rem,2vw,1.4rem)] font-light italic text-cyan-200 text-center break-words">
            “{enterprise.philosophy}”
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-full md:max-w-4xl mx-auto px-2 sm:px-0 overflow-visible">
      {sections.map((section, index) => {
        const isHovered = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={index}
            className={`w-full transition-all duration-300 ${
              isDimmed ? "opacity-40 scale-[0.98]" : ""
            } ${isHovered ? "scale-[1.02] z-10" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <GlassPanel
              className={`transition-all duration-300 overflow-visible ${
                isHovered
                  ? "shadow-[0_0_60px_rgba(34,211,238,0.3)] border-cyan-400/40 bg-white/10"
                  : ""
              } ${index === sections.length - 1 ? "border-cyan-400/30" : ""}`}
            >
              <h3 className={`text-[clamp(1.2rem,3vw,2rem)] font-semibold text-white ${index === 0 ? "text-[clamp(1.5rem,4vw,2.5rem)]" : ""}`}>
                {section.title}
              </h3>
              {section.content}
            </GlassPanel>
          </div>
        );
      })}
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const hierarchy = [
  { label: "Citizens", level: 0 },
  { label: "Households", level: 1 },
  { label: "Fokontany", level: 2 },
  { label: "Commune", level: 3, isHub: true },
  { label: "District", level: 4 },
  { label: "Region", level: 5 },
  { label: "Country", level: 6 },
];

export default function CommunalDPI() {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6 py-4">
      {hierarchy.map((item, index) => {
        const isHub = item.isHub;
        const isLast = index === hierarchy.length - 1;

        let sizeClass = "px-6 py-3 text-sm";
        let bgClass = "bg-white/5 border-white/10";
        let textClass = "text-white/70";
        let glow = "";

        if (isHub) {
          sizeClass = "px-10 py-6 text-2xl font-bold";
          bgClass = "bg-cyan-200/20 border-cyan-400/40";
          textClass = "text-white";
          glow = "shadow-[0_0_40px_rgba(34,211,238,0.25)] border-2";
        } else if (isLast) {
          sizeClass = "px-6 py-3 text-base font-semibold";
          textClass = "text-white/90";
        } else {
          sizeClass = "px-6 py-3 text-sm";
          textClass = "text-white/70";
        }

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.12,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="relative z-10 w-full flex flex-col items-center"
          >
            {/* Card */}
            <div
              className={`
                relative rounded-2xl border backdrop-blur-sm text-center
                ${sizeClass}
                ${bgClass}
                ${textClass}
                ${isHub ? glow : "border-white/10"}
                transition-all duration-300
                ${isHub ? "hover:shadow-[0_0_60px_rgba(34,211,238,0.4)]" : "hover:bg-white/10"}
                min-w-30 md:min-w-40
              `}
            >
              {isHub && (
                <div className="absolute -inset-1 rounded-2xl border border-cyan-400/20 animate-pulse" />
              )}
              <span className="relative z-10 block">{item.label}</span>
              {isHub && (
                <span className="block text-xs font-normal text-cyan-200/70 mt-1">
                  Digital Public Infrastructure Hub
                </span>
              )}
            </div>

            {/* Arrow connector - points UP, between items */}
            {!isLast && (
              <div className="relative w-full flex justify-center mt-2">
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.12 + 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  <ChevronUp className="w-5 h-5 text-cyan-400/60" strokeWidth={1.5} />
                </motion.div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
"use client";

import { motion } from "framer-motion";

const steps = [
  { label: "Research", icon: "🔬" },
  { label: "Co-design", icon: "🤝" },
  { label: "Prototype", icon: "🧪" },
  { label: "Pilot", icon: "🚀" },
  { label: "Scale", icon: "🌱" },
];

export default function LivingLabs() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl backdrop-blur-sm">
            {step.icon}
          </div>
          <span className="mt-2 text-xs font-medium uppercase tracking-wider text-white/60">
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className="hidden text-white/20 md:block md:ml-2 md:text-2xl">→</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
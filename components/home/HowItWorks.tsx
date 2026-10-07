"use client";

import { motion } from "framer-motion";

const layers = [
  {
    title: "Identity & Registry",
    description: "Every citizen, household, and commune has a trusted digital identity.",
  },
  {
    title: "Governance & Participation",
    description: "Communities participate in decision-making through transparent digital tools.",
  },
  {
    title: "Data & Intelligence",
    description: "Territorial data informs planning, resource allocation, and impact measurement.",
  },
  {
    title: "Interoperability",
    description: "All platforms share common standards – they speak the same language.",
  },
];

export default function HowItWorks() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-2xl text-cyan-300">
            {index + 1}
          </div>
          <h3 className="text-xl font-semibold text-white">{layer.title}</h3>
          <p className="mt-3 text-sm text-white/70">{layer.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
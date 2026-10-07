"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Communes",
    value: 6,
    suffix: "",
    description: "Ranomafana, Ambatondrazaka, Ampasikely, Amparafaravola, Vohidiala, Tanambe",
  },
  {
    label: "Citizens",
    value: 234000,
    suffix: "+",
    description: "Projected population for 2027 across 6 communes",
  },
  {
    label: "Platforms",
    value: 7,
    suffix: "",
    description: "NdaY'Ben'Tanàna, Fako, Tantsaha, Tsidika, Hety, Lanona, Radoko",
  },
  {
    label: "Living Labs",
    value: 6,
    suffix: "",
    description: "Research → Co-design → Prototype → Pilot → Scale",
  },
  {
    label: "Partners",
    value: 0,
    suffix: "+",
    description: "Actively seeking partnerships — join us!",
  },
];

export default function Impact() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounts(stats.map((s) => s.value));
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm group hover:bg-white/10 transition-all"
          >
            <div className="text-3xl font-bold text-white md:text-4xl">
              {counts[index].toLocaleString()}
              {stat.suffix}
            </div>
            <div className="mt-1 text-sm text-white/60">{stat.label}</div>
            {stat.description && (
              <div className="mt-2 text-[10px] text-white/40 leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                {stat.description}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center text-sm text-white/40">
        <p>Based on RGPH-3 (2018) data with projections to 2027 using a 2.38% annual growth rate.</p>
        <p className="mt-1">
          <span className="text-white/60">Ranomafana</span> (Vatovavy) ·
          <span className="text-white/60"> Ambatondrazaka</span> ·
          <span className="text-white/60"> Ampasikely</span> ·
          <span className="text-white/60"> Amparafaravola</span> ·
          <span className="text-white/60"> Vohidiala</span> ·
          <span className="text-white/60"> Tanambe</span> (Alaotra Mangoro)
        </p>
      </div>
    </div>
  );
}
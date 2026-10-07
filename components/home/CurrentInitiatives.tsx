"use client";

import { motion } from "framer-motion";

const initiatives = [
  "RN25 Initiative 2055",
  "NdaY'Fako",
  "SecureFarm",
  "ACEA",
  "Communal Living Labs",
  "Diniky Tanàna Ifotony",
];

export default function CurrentInitiatives() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {initiatives.map((initiative, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="glass-card rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-white/80">{initiative}</span>
        </motion.div>
      ))}
    </div>
  );
}
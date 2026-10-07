// components/home/ArchitectureExplorer.tsx (renamed)
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { dpiarLayers } from "@/data/dpiar";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function ArchitectureExplorer() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col items-center gap-3 max-w-3xl mx-auto w-full">
      {dpiarLayers.map((layer) => {
        const isExpanded = expanded[layer.id] || false;
        const hasChildren = layer.children && layer.children.length > 0;

        return (
          <div key={layer.id} className="w-full">
            <GlassPanel
              className={`border ${layer.border} bg-linear-to-r ${layer.color} cursor-pointer ${
                layer.isRoot ? "border-2 border-cyan-400/60" : ""
              }`}
              onClick={() => hasChildren && toggle(layer.id)}
            >
              <div className="flex items-center justify-center gap-2">
                {hasChildren && (
                  <span className="text-white/50">
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </span>
                )}
                <h3 className={`text-lg font-bold text-white ${layer.isRoot ? "text-xl" : ""}`}>
                  {layer.label}
                </h3>
              </div>
              <p className="text-sm text-white/70">{layer.subtitle}</p>
              {layer.href && !hasChildren && (
                <Link href={layer.href} className="text-xs text-cyan-300 hover:underline block mt-1">
                  Learn more →
                </Link>
              )}
            </GlassPanel>

            <AnimatePresence>
              {isExpanded && hasChildren && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap justify-center gap-2 mt-2 p-2 bg-white/5 rounded-xl backdrop-blur-sm">
                    {layer.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href || "#"}
                        className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
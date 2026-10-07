"use client";

import { enterprise } from "@/data/enterprise";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function StrategicPillars() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {enterprise.strategicPillars.map((pillar) => (
        <GlassPanel key={pillar.title} className="text-center">
          <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
          <p className="text-white/70 text-sm mt-1">{pillar.description}</p>
        </GlassPanel>
      ))}
    </div>
  );
}
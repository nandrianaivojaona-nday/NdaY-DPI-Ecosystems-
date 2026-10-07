"use client";

import { enterprise } from "@/data/enterprise";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function EnterpriseImpact() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {enterprise.impact.map((item) => (
        <GlassPanel key={item.metric} className="text-center">
          <div className="text-3xl font-bold text-cyan-300">{item.value}</div>
          <div className="text-sm font-medium text-white/80">{item.metric}</div>
          <div className="text-xs text-white/50 mt-1">{item.description}</div>
        </GlassPanel>
      ))}
    </div>
  );
}
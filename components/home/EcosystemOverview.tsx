"use client";

import { ecosystem } from "@/data/ecosystem";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function EcosystemOverview() {
  return (
    <div className="space-y-6">
      <GlassPanel>
        <p className="text-white/80 leading-relaxed">{ecosystem.overview}</p>
      </GlassPanel>
      <div className="grid md:grid-cols-2 gap-4">
        <GlassPanel>
          <h4 className="font-semibold text-white">Governance</h4>
          <p className="text-white/70 text-sm">{ecosystem.governance}</p>
        </GlassPanel>
        <GlassPanel>
          <h4 className="font-semibold text-white">Information</h4>
          <p className="text-white/70 text-sm">{ecosystem.information}</p>
        </GlassPanel>
        <GlassPanel>
          <h4 className="font-semibold text-white">Capability</h4>
          <p className="text-white/70 text-sm">{ecosystem.capability}</p>
        </GlassPanel>
        <GlassPanel>
          <h4 className="font-semibold text-white">Technical</h4>
          <p className="text-white/70 text-sm">{ecosystem.technical}</p>
        </GlassPanel>
      </div>
    </div>
  );
}
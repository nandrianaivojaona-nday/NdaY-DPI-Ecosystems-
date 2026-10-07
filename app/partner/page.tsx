import Chapter from "@/components/ui/Chapter";

export default function PartnersPage() {
  return (
    <Chapter
      id="partners"
      title="Partner with NdaY’"
      description="Build the future of digital ecosystems for sustainable development."
      align="center"
      className="pb-24"
    >
      <div className="flex w-full justify-center">
        <div className="w-full max-w-3xl space-y-8">
          {/* Why Partner */}
          <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Why Partner?</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Access a multi-sector ecosystem</li>
              <li>Engage directly with communities</li>
              <li>Contribute to national impact</li>
              <li>Co‑create innovative Digital Public Infrastructure</li>
            </ul>
          </div>

          {/* Partnership Areas */}
          <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Partnership Areas</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Agriculture</li>
              <li>Tourism</li>
              <li>Governance</li>
              <li>Digital Infrastructure</li>
              <li>Health</li>
              <li>Education</li>
              <li>Research & Innovation</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/30">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
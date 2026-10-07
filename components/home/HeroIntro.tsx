// components/home/HeroIntro.tsx
"use client";

export default function HeroIntro() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-sm">
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Digital transformation is about creating the conditions for people, communities and
          institutions to participate, create, collaborate and prosper through trusted, inclusive
          and interoperable digital public infrastructure.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
          <span className="font-semibold text-cyan-300">NdaY' roots Digital Public Infrastructure in the individual as a citizen.</span>{' '}
          From this foundation, it strengthens families, empowers communities, supports local
          governance and enables institutions to work together through shared digital capabilities.
        </p>
      </div>

      <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-sm">
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          These interconnected capabilities form an ecosystem in which identity, trust, data,
          services, territorial intelligence and interoperability reinforce one another to create
          lasting public value.
        </p>
        <div className="mt-6 flex flex-col items-start gap-1 text-sm text-white/70 border-l-2 border-cyan-400/30 pl-4">
          <span>Individual → Family</span>
          <span>Family → Community</span>
          <span>Community → Local Governance</span>
          <span>Local Governance → Institutions</span>
          <span className="font-semibold text-cyan-300">Institutions → Public Value</span>
        </div>
        <p className="mt-4 text-sm text-white/60 italic">
          From the individual to the family, from the family to the community, from the community
          to local governance, and from local governance to institutions — NdaY' connects the
          foundations through interoperable Digital Public Infrastructure.
        </p>
      </div>
    </div>
  );
}
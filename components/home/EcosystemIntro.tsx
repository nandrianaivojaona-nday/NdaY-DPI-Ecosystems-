// components/home/EcosystemIntro.tsx
export default function EcosystemIntro() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-sm">
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          NdaY' is a national digital ecosystem designed to foster sustainable development across
          Madagascar. By integrating public services, private innovation, and community participation,
          we build a resilient digital backbone for the nation.
        </p>
        <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">
          <span className="font-semibold text-cyan-300">Every individual is a citizen.</span>{' '}
          Every citizen belongs to a family, every family to a community, every community to a
          commune, and every commune to a region. NdaY' connects these layers through trusted,
          interoperable Digital Public Infrastructure.
        </p>
      </div>
      <div className="glass-card rounded-xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-sm">
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Our platforms span agriculture, waste management, tourism, health, governance, and more —
          all working together to create a cohesive, accessible, and inclusive digital future.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/60">
          <span className="px-3 py-1 border border-white/10 rounded-full">Identity</span>
          <span className="px-3 py-1 border border-white/10 rounded-full">Trust</span>
          <span className="px-3 py-1 border border-white/10 rounded-full">Interoperability</span>
          <span className="px-3 py-1 border border-white/10 rounded-full">Territorial Intelligence</span>
          <span className="px-3 py-1 border border-white/10 rounded-full">Public Value</span>
        </div>
      </div>
    </div>
  );
}
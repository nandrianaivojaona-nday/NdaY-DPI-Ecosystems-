import { architectureVersion, invariants, layers } from "@/data/architecture92";

export default function Architecture92() {
  return (
    <div className="space-y-10">
      <p className="text-center text-xs uppercase tracking-widest text-white/60">
        Ecosystem architecture {architectureVersion.ecosystem} · TVE Core v{architectureVersion.tve}
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {layers.map((l) => (
          <div key={l.name} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <h3 className="mb-2 font-semibold text-white">{l.name}</h3>
            <p className="text-sm text-white/70">{l.scope}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 font-semibold text-white">Architectural invariants</h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/70">
          {invariants.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

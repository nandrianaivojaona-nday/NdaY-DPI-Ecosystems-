import Link from "next/link";
import { getVolume, volumes, conceptualChain } from "@/data/dpiarVolumes";

export default function VolumePage({ slug }: { slug: string }) {
  const v = getVolume(slug);
  const i = volumes.findIndex((x) => x.slug === slug);
  const prev = volumes[i - 1];
  const next = volumes[i + 1];
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-32 pt-16 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href="/reference" className="text-sm text-cyan-300 hover:underline">&larr; DPIAR reference library</Link>
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-cyan-300">Volume {v.number}</p>
          <h1 className="text-3xl font-semibold tracking-tight">{v.title}</h1>
          <p className="text-white/60">{v.subtitle}</p>
          <p className="text-white/80">{v.purpose}</p>
          <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
            Draft content for review.
          </p>
        </header>
        {v.sections.map((s) => (
          <section key={s.heading} className="space-y-2">
            <h2 className="text-xl font-medium">{s.heading}</h2>
            {s.body && <p className="text-white/70">{s.body}</p>}
            {s.items && (
              <ul className="list-disc space-y-1 pl-5 text-white/80">
                {s.items.map((it) => (<li key={it}>{it}</li>))}
              </ul>
            )}
            {s.diagram && (
              <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-white/80">{s.diagram}</pre>
            )}
          </section>
        ))}
        <p className="text-xs text-white/40">Chain: {conceptualChain.join(" > ")}</p>
        <nav className="flex justify-between border-t border-white/10 pt-4 text-sm">
          {prev ? <Link href={`/reference/${prev.slug}`} className="text-cyan-300 hover:underline">&larr; Volume {prev.number}</Link> : <span />}
          {next ? <Link href={`/reference/${next.slug}`} className="text-cyan-300 hover:underline">Volume {next.number} &rarr;</Link> : <span />}
        </nav>
      </div>
    </main>
  );
}

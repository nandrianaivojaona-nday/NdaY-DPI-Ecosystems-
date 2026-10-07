import Link from "next/link";

export default function PlaceholderPage({ title, description, nextStep }: { title: string; description: string; nextStep: string }) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-32 pt-16 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/" className="text-sm text-cyan-300 hover:underline">&larr; Home</Link>
        <p className="text-xs uppercase tracking-widest text-cyan-300">NdaY&apos; DPI Ecosystems</p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-white/70">{description}</p>
        <section className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-5">
          <h2 className="font-medium text-amber-100">In preparation</h2>
          <p className="mt-2 text-sm text-amber-100/80">{nextStep}</p>
        </section>
        <p className="text-sm text-white/60">This public page will be developed in alignment with DPIAR, Ecosystem Architecture V9.2 and TVE Core v3.0.0.</p>
      </div>
    </main>
  );
}

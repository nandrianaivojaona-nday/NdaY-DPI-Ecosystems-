import Link from "next/link";

export type DocSection = { heading: string; body: string };

export default function DocPage({
  title,
  intro,
  sections,
  back = { label: "Home", href: "/" },
  placeholder = true,
}: {
  title: string;
  intro: string;
  sections: DocSection[];
  back?: { label: string; href: string };
  placeholder?: boolean;
}) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-32 pt-16 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href={back.href} className="text-sm text-cyan-300 hover:underline">
          &larr; {back.label}
        </Link>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-white/70">{intro}</p>
          {placeholder && (
            <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
              Placeholder content. To be completed.
            </p>
          )}
        </header>
        {sections.map((s) => (
          <section key={s.heading} className="space-y-2">
            <h2 className="text-xl font-medium">{s.heading}</h2>
            <p className="text-white/70">{s.body}</p>
          </section>
        ))}
        <p className="pt-6 text-xs text-white/40">
          Ecosystem Architecture V9.2 &bull; TVE Core v3.0.0
        </p>
      </div>
    </main>
  );
}

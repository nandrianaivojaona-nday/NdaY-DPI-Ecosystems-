import Link from "next/link";
import { volumes, dpiarName, anchorPrinciple, conceptualChain } from "@/data/dpiarVolumes";

export const metadata = { title: "DPIAR Reference Library | NdaY' DPI Ecosystems" };

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-32 pt-16 text-white">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link href="/" className="text-sm text-cyan-300 hover:underline">&larr; Home</Link>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{dpiarName}</h1>
          <p className="text-white/70">{anchorPrinciple}</p>
          <p className="text-sm text-cyan-300">{conceptualChain.join(" > ")}</p>
        </header>
        <ul className="space-y-3">
          {volumes.map((v) => (
            <li key={v.slug}>
              <Link href={`/reference/${v.slug}`} className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-300/50">
                <span className="font-medium">Volume {v.number}: {v.title}</span>
                <span className="block text-sm text-white/60">{v.subtitle}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-white/60">
          See also the <Link href="/architecture" className="text-cyan-300 underline">V9.2 architecture page</Link>.
        </p>
      </div>
    </main>
  );
}

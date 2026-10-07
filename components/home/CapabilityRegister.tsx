import { capabilities, roadmap } from "@/data/architecture92";

const color: Record<string, string> = {
  implemented: "text-green-300 border-green-300/30",
  pilot: "text-yellow-300 border-yellow-300/30",
  planned: "text-sky-300 border-sky-300/30",
  blocked: "text-red-300 border-red-300/30",
};

export default function CapabilityRegister() {
  return (
    <div className="space-y-8">
      <ul className="grid gap-3 md:grid-cols-2">
        {capabilities.map((c) => (
          <li key={c.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-sm text-white">{c.name}</span>
            <span className={`rounded-full border px-3 py-0.5 text-xs uppercase ${color[c.status]}`}>{c.status}</span>
          </li>
        ))}
      </ul>
      <ol className="flex flex-wrap justify-center gap-2">
        {roadmap.map((m, i) => (
          <li key={m} className="rounded-full border border-white/10 px-4 py-1 text-xs text-white/70">
            {i + 1}. {m}
          </li>
        ))}
      </ol>
    </div>
  );
}

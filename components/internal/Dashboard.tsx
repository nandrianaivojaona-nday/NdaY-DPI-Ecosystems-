"use client";

import { useMemo, useState } from "react";
import { useSession } from "./InternalGate";
import { useCollection } from "./useCollection";
import {
  canReadBudget,
  type ActivityDoc, type BudgetLineDoc, type DeliverableDoc, type PlanDoc, type TaskDoc,
} from "@/lib/internal/types";

const money = (n: number) => `${new Intl.NumberFormat("en-US").format(Math.round(n))} MGA`;
const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : null);
const HEALTH = [
  { label: "On track", cls: "border-emerald-400/40 bg-emerald-500/15 text-emerald-100" },
  { label: "Watch", cls: "border-amber-400/40 bg-amber-500/15 text-amber-100" },
  { label: "At risk", cls: "border-rose-400/40 bg-rose-500/15 text-rose-100" },
];

function Bar({ label, value, tone }: { label: string; value: number | null; tone: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-white/80">
        <span>{label}</span>
        <span>{value === null ? "No data yet" : `${value}%`}</span>
      </div>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value ?? 0}
        className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full ${tone}`} style={{ width: `${Math.min(value ?? 0, 100)}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { role } = useSession();
  const showBudget = canReadBudget(role);
  const projects = useCollection<PlanDoc>("projects");
  const programmes = useCollection<PlanDoc>("programmes");
  const activities = useCollection<ActivityDoc>("activities");
  const tasks = useCollection<TaskDoc>("tasks");
  const deliverables = useCollection<DeliverableDoc>("deliverables");
  const budget = useCollection<BudgetLineDoc>("budgetLines", "code", showBudget);
  const [today] = useState(() => new Date().toISOString().slice(0, 10));
  const loadError = projects.error || programmes.error || activities.error || tasks.error || deliverables.error || budget.error;

  const rows = useMemo(() => {
    const now = Date.parse(today);
    return projects.rows
      .filter((p) => p.status !== "Cancelled")
      .map((p) => {
        const acts = activities.rows.filter((a) => a.projectId === p.id);
        const actIds = new Set(acts.map((a) => a.id));
        const tks = tasks.rows.filter((t) => actIds.has(t.activityId));
        const dels = deliverables.rows.filter((d) => d.projectId === p.id);
        const parts = [
          pct(acts.filter((a) => a.status === "Done").length, acts.length),
          pct(tks.filter((t) => t.status === "Done").length, tks.length),
          pct(dels.filter((d) => d.status === "Validated").length, dels.length),
        ].filter((v): v is number => v !== null);
        const progress = parts.length ? Math.round(parts.reduce((a, b) => a + b, 0) / parts.length) : null;

        const start = Date.parse(p.startDate ?? "");
        const end = Date.parse(p.endDate ?? "");
        const timePct = Number.isFinite(start) && Number.isFinite(end) && end > start
          ? Math.max(0, Math.min(100, Math.round(((now - start) / (end - start)) * 100))) : null;

        const lines = budget.rows.filter((l) => l.projectId === p.id && l.status !== "Rejected");
        const sum = (k: "plannedAmount" | "committedAmount" | "actualAmount") => lines.reduce((t, l) => t + (Number(l[k]) || 0), 0);
        const planned = sum("plannedAmount"), committed = sum("committedAmount"), actual = sum("actualAmount");
        const envelope = Number(p.budgetPlanned) || 0;
        const burn = pct(actual, planned);

        const overdue =
          acts.filter((a) => a.status !== "Done" && a.dueDate && a.dueDate < today).length +
          tks.filter((t) => t.status !== "Done" && t.dueDate && t.dueDate < today).length +
          dels.filter((d) => d.status !== "Validated" && d.dueDate && d.dueDate < today).length;
        const blocked = acts.filter((a) => a.status === "Blocked").length + tks.filter((t) => t.status === "Blocked").length;

        const flags: string[] = [];
        const closed = p.status === "Completed";
        if (!closed) {
          if (overdue) flags.push(`${overdue} overdue item${overdue > 1 ? "s" : ""}`);
          if (blocked) flags.push(`${blocked} blocked item${blocked > 1 ? "s" : ""}`);
          if (timePct !== null && progress !== null && timePct - progress > 20) flags.push(`Behind schedule (${timePct}% of time used, ${progress}% progress)`);
          if (showBudget && burn !== null && progress !== null && burn - progress > 20) flags.push(`Spending ahead of progress (${burn}% spent, ${progress}% progress)`);
          if (showBudget && planned > envelope && envelope > 0) flags.push(`Planned lines exceed the envelope by ${money(planned - envelope)}`);
        }
        const severity = showBudget && planned > envelope && envelope > 0 ? 2 : flags.length >= 2 ? 2 : flags.length;
        return { p, acts, tks, dels, progress, timePct, planned, committed, actual, envelope, burn, flags, severity, overdue, blocked };
      })
      .sort((a, b) => b.severity - a.severity || a.p.code.localeCompare(b.p.code));
  }, [projects.rows, activities.rows, tasks.rows, deliverables.rows, budget.rows, today, showBudget]);

  const programmeRows = useMemo(() => {
    const groups = new Map<string, typeof rows>();
    for (const g of programmes.rows) if (g.status !== "Cancelled") groups.set(g.id, []);
    for (const r of rows) {
      const key = r.p.programmeId ?? "";
      groups.set(key, [...(groups.get(key) ?? []), r]);
    }
    return [...groups.entries()]
      .map(([id, items]) => {
        const prog = programmes.rows.find((g) => g.id === id);
        const withProgress = items.filter((r) => r.progress !== null);
        const progress = withProgress.length
          ? Math.round(withProgress.reduce((t, r) => t + (r.progress ?? 0), 0) / withProgress.length) : null;
        const total = (k: "planned" | "committed" | "actual" | "envelope" | "overdue" | "blocked") => items.reduce((t, r) => t + r[k], 0);
        const planned = total("planned"), committed = total("committed"), actual = total("actual"), envelopes = total("envelope");
        const budget = Number(prog?.budgetPlanned) || 0;
        const atRisk = items.filter((r) => r.severity === 2).length;
        const watch = items.filter((r) => r.severity === 1).length;
        const overBudget = showBudget && budget > 0 && envelopes > budget;
        const flags: string[] = [];
        if (overBudget) flags.push(`Project envelopes exceed the programme budget by ${money(envelopes - budget)}`);
        if (atRisk) flags.push(`${atRisk} of ${items.length} project${items.length > 1 ? "s" : ""} at risk`);
        if (watch) flags.push(`${watch} project${watch > 1 ? "s" : ""} on watch`);
        if (!prog) flags.push("Projects are not linked to an existing programme");
        const severity = overBudget || atRisk >= 2 || (atRisk >= 1 && atRisk / items.length >= 0.5) ? 2 : atRisk + watch > 0 || !prog ? 1 : 0;
        return { id, prog, items, progress, planned, committed, actual, envelopes, budget, burn: pct(actual, planned), overdue: total("overdue"), blocked: total("blocked"), flags, severity };
      })
      .sort((a, b) => b.severity - a.severity || (a.prog?.code ?? "~").localeCompare(b.prog?.code ?? "~"));
  }, [rows, programmes.rows, showBudget]);

  const progressed = rows.filter((r) => r.progress !== null);
  const kpis = [
    { label: "Programmes", value: String(programmeRows.filter((g) => g.prog).length) },
    { label: "Projects", value: String(rows.length) },
    { label: "Average progress", value: progressed.length ? `${Math.round(progressed.reduce((t, r) => t + (r.progress ?? 0), 0) / progressed.length)}%` : "No data yet" },
    { label: "At risk", value: String(rows.filter((r) => r.severity === 2).length) },
    { label: "Overdue items", value: String(rows.reduce((t, r) => t + r.overdue, 0)) },
    ...(showBudget ? [
      { label: "Planned vs envelope", value: `${money(rows.reduce((t, r) => t + r.planned, 0))} / ${money(rows.reduce((t, r) => t + r.envelope, 0))}` },
      { label: "Actual spent", value: money(rows.reduce((t, r) => t + r.actual, 0)) },
    ] : []),
  ];

  return (
    <div className="space-y-6">
      {loadError && <p role="status" className="text-sm text-amber-200">{loadError}</p>}
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <dt className="text-xs uppercase tracking-wider text-white/70">{k.label}</dt>
            <dd className="mt-1 text-lg font-semibold text-white">{k.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="dash-programmes" className="space-y-4">
        <h3 id="dash-programmes" className="text-lg font-semibold text-white">Programmes</h3>
        {!programmeRows.length && <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">No programmes yet.</p>}
        <ul className="grid gap-4 lg:grid-cols-2">
          {programmeRows.map((g) => {
            const h = HEALTH[g.severity > 2 ? 2 : g.severity];
            return (
              <li key={g.id || "unassigned"} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{g.prog ? `${g.prog.code} · ${g.prog.status}` : "Unassigned"}</p>
                    <h4 className="text-lg font-semibold text-white">{g.prog?.title ?? "Projects without a programme"}</h4>
                    {g.prog && <p className="mt-1 text-sm text-white/70">Owner: {g.prog.owner}</p>}
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${h.cls}`}>{h.label}</span>
                </div>
                <div className="mt-4 space-y-3">
                  <Bar label="Average project progress" value={g.progress} tone="bg-cyan-400" />
                  {showBudget && <Bar label="Budget spent (actual / planned)" value={g.burn} tone="bg-fuchsia-400" />}
                </div>
                <p className="mt-4 text-xs text-white/70">
                  {g.items.length} project{g.items.length === 1 ? "" : "s"} · At risk {g.items.filter((r) => r.severity === 2).length} · Watch {g.items.filter((r) => r.severity === 1).length} · Overdue items {g.overdue} · Blocked {g.blocked}
                </p>
                {showBudget && (
                  <p className="mt-1 text-xs text-white/70">
                    {g.prog && `Programme budget ${money(g.budget)} · `}Project envelopes {money(g.envelopes)} · Planned {money(g.planned)} · Committed {money(g.committed)} · Actual {money(g.actual)}
                  </p>
                )}
                {g.items.length > 0 && (
                  <p className="mt-2 text-xs text-white/60">Projects: {g.items.map((r) => r.p.code).join(", ")}</p>
                )}
                {g.flags.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-100">
                    {g.flags.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <h3 className="pt-2 text-lg font-semibold text-white">Projects</h3>
      {!rows.length && <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">No projects yet. Create a programme and a project to see progress here.</p>}

      <ul className="grid gap-4 lg:grid-cols-2">
        {rows.map((r) => (
          <li key={r.p.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{r.p.code} \u00b7 {r.p.status}</p>
                <h3 className="text-lg font-semibold text-white">{r.p.title}</h3>
                <p className="mt-1 text-sm text-white/70">Owner: {r.p.owner}{r.p.endDate && ` \u00b7 Ends ${r.p.endDate}`}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${HEALTH[r.severity > 2 ? 2 : r.severity].cls}`}>{HEALTH[r.severity > 2 ? 2 : r.severity].label}</span>
            </div>

            <div className="mt-4 space-y-3">
              <Bar label="Delivery progress" value={r.progress} tone="bg-cyan-400" />
              <Bar label="Time elapsed" value={r.timePct} tone="bg-indigo-400" />
              {showBudget && <Bar label="Budget spent (actual / planned)" value={r.burn} tone="bg-fuchsia-400" />}
            </div>

            <p className="mt-4 text-xs text-white/70">
              Activities {r.acts.filter((a) => a.status === "Done").length}/{r.acts.length} \u00b7 Tasks {r.tks.filter((t) => t.status === "Done").length}/{r.tks.length} \u00b7 Deliverables validated {r.dels.filter((d) => d.status === "Validated").length}/{r.dels.length}
            </p>
            {showBudget && (
              <p className="mt-1 text-xs text-white/70">
                Envelope {money(r.envelope)} \u00b7 Planned {money(r.planned)} \u00b7 Committed {money(r.committed)} \u00b7 Actual {money(r.actual)}
              </p>
            )}
            {r.flags.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-100">
                {r.flags.map((f) => <li key={f}>{f}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <p className="text-xs leading-relaxed text-white/60">
        Progress is the average of the shares of activities done, tasks done and deliverables validated (only the types that exist are counted).
        Time elapsed compares today with the project dates. Budget figures exclude rejected lines. A flag appears when time or spending runs more than 20 points ahead of progress, when items are overdue or blocked, or when planned lines exceed the envelope. A programme shows the average progress of its projects (equal weight) and adds up their budget figures. It is At risk when two or more projects are At risk (or half or more of its projects), or when project envelopes exceed the programme budget, and on Watch when any project is At risk or on Watch.
      </p>
    </div>
  );
}

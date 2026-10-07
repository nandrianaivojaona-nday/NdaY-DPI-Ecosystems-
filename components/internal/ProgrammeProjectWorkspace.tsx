"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSession } from "./InternalGate";
import { savePlan, watchPlans } from "@/lib/internal/planning";
import {
  APPROVALS, RISKS, STATUSES, canApprove, canWrite,
  type Approval, type PlanDoc, type PlanKind,
} from "@/lib/internal/types";

type FieldSpec = {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "date";
  required?: boolean;
  options?: { value: string; label: string }[];
};

const opt = (values: readonly string[]) => values.map((v) => ({ value: v, label: v }));
const input = "w-full rounded-lg border border-white/20 bg-white/10 p-2.5 text-sm text-white outline-none focus:border-cyan-400";
const money = (n: number) => `${new Intl.NumberFormat("en-US").format(n || 0)} MGA`;

export default function ProgrammeProjectWorkspace() {
  const { user, role, db } = useSession();
  const writable = canWrite(role);
  const [tab, setTab] = useState<PlanKind>("programmes");
  const [programmes, setProgrammes] = useState<PlanDoc[]>([]);
  const [projects, setProjects] = useState<PlanDoc[]>([]);
  const [editing, setEditing] = useState<{ kind: PlanKind; record: PlanDoc | null } | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onError = () => setMessage("Could not load data. Check your permissions and connection.");
    const a = watchPlans(db, "programmes", setProgrammes, onError);
    const b = watchPlans(db, "projects", setProjects, onError);
    return () => { a(); b(); };
  }, [db]);

  const fields: FieldSpec[] = useMemo(() => {
    const common: FieldSpec[] = [
      { key: "code", label: "Code", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "owner", label: "Owner", type: "text", required: true },
      { key: "status", label: "Status", type: "select", options: opt(STATUSES) },
      { key: "riskLevel", label: "Risk level", type: "select", options: opt(RISKS) },
      { key: "budgetPlanned", label: "Planned budget (MGA)", type: "number" },
    ];
    if (editing?.kind === "projects") {
      return [
        common[0],
        { key: "programmeId", label: "Programme", type: "select", required: true,
          options: programmes.map((p) => ({ value: p.id, label: `${p.code} – ${p.title}` })) },
        ...common.slice(1, 3),
        { key: "scope", label: "Scope", type: "textarea" },
        { key: "startDate", label: "Start date", type: "date" },
        { key: "endDate", label: "End date", type: "date" },
        ...common.slice(3),
      ];
    }
    return [
      ...common.slice(0, 3),
      { key: "strategicObjective", label: "Strategic objective", type: "textarea" },
      { key: "institutionalAlignment", label: "Institutional alignment", type: "text" },
      { key: "timeHorizon", label: "Time horizon", type: "text" },
      { key: "summary", label: "Summary", type: "textarea" },
      ...common.slice(3),
    ];
  }, [editing?.kind, programmes]);

  function openForm(kind: PlanKind, record: PlanDoc | null) {
    const base: Record<string, string> = { status: "Draft", riskLevel: "Low", budgetPlanned: "0" };
    const next = { ...base };
    if (record) for (const [k, v] of Object.entries(record)) if (typeof v === "string" || typeof v === "number") next[k] = String(v);
    setValues(next);
    setEditing({ kind, record });
    setMessage("");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;
    for (const f of fields) {
      if (f.required && !values[f.key]?.trim()) return setMessage(`${f.label} is required.`);
    }
    if (Number(values.budgetPlanned) < 0) return setMessage("Budget cannot be negative.");
    if (values.startDate && values.endDate && values.endDate < values.startDate) {
      return setMessage("End date must be after the start date.");
    }
    const data: Record<string, string | number> = {};
    for (const f of fields) {
      const raw = (values[f.key] ?? "").trim();
      data[f.key] = f.type === "number" ? Number(raw) || 0 : raw;
    }
    if (editing.kind === "projects") {
      const parent = programmes.find((p) => p.id === data.programmeId);
      data.programme = parent ? parent.title : "";
    }
    if (!editing.record) data.approvalState = "Not Submitted";
    setSaving(true);
    try {
      await savePlan(db, editing.kind, { uid: user.uid, email: user.email ?? "unknown" }, data, editing.record?.id);
      setEditing(null);
      setMessage("Saved.");
    } catch {
      setMessage("Save failed. You may not have permission for this change.");
    } finally {
      setSaving(false);
    }
  }

  async function setApproval(kind: PlanKind, record: PlanDoc, approvalState: Approval) {
    try {
      await savePlan(db, kind, { uid: user.uid, email: user.email ?? "unknown" }, { approvalState }, record.id);
      setMessage(`${record.code}: ${approvalState}.`);
    } catch {
      setMessage("Approval change refused. Only administrators can approve or reject.");
    }
  }

  const rows = tab === "programmes" ? programmes : projects;
  const stats = [
    { label: "Programmes", value: programmes.length },
    { label: "Projects", value: projects.length },
    { label: "Active", value: [...programmes, ...projects].filter((r) => r.status === "Active").length },
    { label: "Awaiting approval", value: [...programmes, ...projects].filter((r) => r.approvalState === "Submitted" || r.approvalState === "Under Review").length },
    { label: "Planned budget", value: money(programmes.reduce((s, p) => s + (p.budgetPlanned || 0), 0)) },
  ];

  return (
    <div className="space-y-6">
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <dt className="text-xs uppercase tracking-wider text-white/70">{s.label}</dt>
            <dd className="mt-1 text-lg font-semibold text-white">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" className="flex gap-2">
          {(["programmes", "projects"] as PlanKind[]).map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize ${tab === k ? "bg-cyan-500/25 text-cyan-100" : "border border-white/15 text-white/80 hover:bg-white/10"}`}>
              {k}
            </button>
          ))}
        </div>
        {writable && (
          <button onClick={() => openForm(tab, null)} disabled={tab === "projects" && programmes.length === 0}
            className="rounded-full bg-cyan-500/20 px-5 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30 disabled:opacity-40">
            New {tab === "programmes" ? "programme" : "project"}
          </button>
        )}
      </div>

      {message && <p role="status" className="text-sm text-cyan-200">{message}</p>}
      {tab === "projects" && writable && programmes.length === 0 && (
        <p className="text-sm text-white/70">Create a programme first, then add projects to it.</p>
      )}

      {editing && (
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-cyan-400/30 bg-slate-900/80 p-6">
          <h3 className="text-lg font-semibold text-white">
            {editing.record ? "Edit" : "New"} {editing.kind === "programmes" ? "programme" : "project"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((f) => (
              <label key={f.key} className={`block text-sm text-white/80 ${f.type === "textarea" ? "md:col-span-2" : ""}`}>
                {f.label}{f.required && " *"}
                {f.type === "textarea" ? (
                  <textarea rows={3} className={`${input} mt-1`} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                ) : f.type === "select" ? (
                  <select className={`${input} mt-1`} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}>
                    <option value="" className="text-black">Select…</option>
                    {f.options?.map((o) => <option key={o.value} value={o.value} className="text-black">{o.label}</option>)}
                  </select>
                ) : (
                  <input type={f.type} min={f.type === "number" ? 0 : undefined} className={`${input} mt-1`} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                )}
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button disabled={saving} className="rounded-full bg-cyan-500/25 px-6 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/35 disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white hover:bg-white/10">
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="space-y-3">
        {rows.length === 0 && <li className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">No {tab} yet.</li>}
        {rows.map((r) => (
          <li key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{r.code}</p>
                <h3 className="text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-1 text-sm text-white/70">
                  Owner: {r.owner}
                  {tab === "projects" && r.programmeId && ` · Programme: ${programmes.find((p) => p.id === r.programmeId)?.code ?? "—"}`}
                  {r.startDate && ` · ${r.startDate} → ${r.endDate || "…"}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge>{r.status}</Badge>
                <Badge>Risk: {r.riskLevel}</Badge>
                <Badge>{r.approvalState}</Badge>
              </div>
            </div>
            <p className="mt-2 text-sm text-white/80">Planned: {money(r.budgetPlanned)}</p>
            {(r.summary || r.scope) && <p className="mt-2 text-sm text-white/75">{r.summary || r.scope}</p>}
            {writable && (
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <button onClick={() => openForm(tab, r)} className="rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/10">Edit</button>
                {(r.approvalState === "Not Submitted" || r.approvalState === "Rejected") && (
                  <button onClick={() => setApproval(tab, r, "Submitted")} className="rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/10">Submit for approval</button>
                )}
                {canApprove(role) && (r.approvalState === "Submitted" || r.approvalState === "Under Review") && (
                  <>
                    <button onClick={() => setApproval(tab, r, "Approved")} className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-emerald-100 hover:bg-emerald-500/30">Approve</button>
                    <button onClick={() => setApproval(tab, r, "Rejected")} className="rounded-full bg-rose-500/20 px-4 py-1.5 text-rose-100 hover:bg-rose-500/30">Reject</button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="text-xs text-white/60">Approval states: {APPROVALS.join(" → ")}. Every change is recorded in the audit log.</p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/90">{children}</span>;
}

"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSession } from "./InternalGate";
import { savePlan, watchActivities, watchPlans } from "@/lib/internal/planning";
import { ACTIVITY_STATUSES, canWrite, type ActivityDoc, type PlanDoc } from "@/lib/internal/types";

const input = "w-full rounded-lg border border-white/20 bg-white/10 p-2.5 text-sm text-white outline-none focus:border-cyan-400";

type FormValues = Record<string, string>;

export default function ActivityWorkspace() {
  const { user, role, db } = useSession();
  const writable = canWrite(role);
  const [activities, setActivities] = useState<ActivityDoc[]>([]);
  const [projects, setProjects] = useState<PlanDoc[]>([]);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<ActivityDoc | null | undefined>(undefined);
  const [values, setValues] = useState<FormValues>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const error = () => setMessage("Could not load activities. Check your permissions and connection.");
    const a = watchActivities(db, setActivities, error);
    const b = watchPlans(db, "projects", setProjects, error);
    return () => { a(); b(); };
  }, [db]);

  const shown = useMemo(
    () => activities.filter((a) => filter === "all" || a.projectId === filter),
    [activities, filter],
  );

  function open(record?: ActivityDoc) {
    setEditing(record ?? null);
    setValues(record ? {
      code: record.code, projectId: record.projectId, title: record.title, owner: record.owner,
      workstream: record.workstream ?? "", status: record.status, dueDate: record.dueDate ?? "",
      blockers: record.blockers ?? "", evidenceRequired: record.evidenceRequired ?? "",
    } : { status: "Planned", projectId: filter === "all" ? "" : filter });
    setMessage("");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    const required = ["code", "projectId", "title", "owner"];
    const missing = required.find((key) => !values[key]?.trim());
    if (missing) return setMessage("Code, project, title and owner are required.");
    setSaving(true);
    try {
      await savePlan(db, "activities", { uid: user.uid, email: user.email ?? "unknown" }, values, editing?.id);
      setEditing(undefined);
      setMessage("Activity saved.");
    } catch {
      setMessage("Save failed. You may not have permission for this change.");
    } finally { setSaving(false); }
  }

  const counts = ACTIVITY_STATUSES.map((status) => ({ status, count: activities.filter((a) => a.status === status).length }));
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {counts.map(({ status, count }) => <div key={status} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-wider text-white/70">{status}</p><p className="mt-1 text-lg font-semibold text-white">{count}</p></div>)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-sm text-white/80">Project
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${input} mt-1 min-w-64`}>
            <option value="all" className="text-black">All projects</option>
            {projects.map((p) => <option key={p.id} value={p.id} className="text-black">{p.code} – {p.title}</option>)}
          </select>
        </label>
        {writable && <button onClick={() => open()} disabled={!projects.length} className="rounded-full bg-cyan-500/20 px-5 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30 disabled:opacity-40">New activity</button>}
      </div>
      {message && <p role="status" className="text-sm text-cyan-200">{message}</p>}
      {!projects.length && <p className="text-sm text-white/70">Create a project first, then add its delivery activities.</p>}

      {editing !== undefined && (
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-cyan-400/30 bg-slate-900/80 p-6">
          <h3 className="text-lg font-semibold text-white">{editing ? "Edit activity" : "New activity"}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Code *"><input className={input} value={values.code ?? ""} onChange={(e) => setValues({ ...values, code: e.target.value })} /></Field>
            <Field label="Project *"><select className={input} value={values.projectId ?? ""} onChange={(e) => setValues({ ...values, projectId: e.target.value })}><option value="" className="text-black">Select…</option>{projects.map((p) => <option key={p.id} value={p.id} className="text-black">{p.code} – {p.title}</option>)}</select></Field>
            <Field label="Title *"><input className={input} value={values.title ?? ""} onChange={(e) => setValues({ ...values, title: e.target.value })} /></Field>
            <Field label="Owner *"><input className={input} value={values.owner ?? ""} onChange={(e) => setValues({ ...values, owner: e.target.value })} /></Field>
            <Field label="Workstream"><input className={input} value={values.workstream ?? ""} onChange={(e) => setValues({ ...values, workstream: e.target.value })} /></Field>
            <Field label="Status"><select className={input} value={values.status ?? "Planned"} onChange={(e) => setValues({ ...values, status: e.target.value })}>{ACTIVITY_STATUSES.map((s) => <option key={s} value={s} className="text-black">{s}</option>)}</select></Field>
            <Field label="Due date"><input type="date" className={input} value={values.dueDate ?? ""} onChange={(e) => setValues({ ...values, dueDate: e.target.value })} /></Field>
            <Field label="Blockers"><input className={input} value={values.blockers ?? ""} onChange={(e) => setValues({ ...values, blockers: e.target.value })} /></Field>
            <div className="md:col-span-2"><Field label="Evidence required"><textarea rows={3} className={input} value={values.evidenceRequired ?? ""} onChange={(e) => setValues({ ...values, evidenceRequired: e.target.value })} /></Field></div>
          </div>
          <div className="flex gap-3"><button disabled={saving} className="rounded-full bg-cyan-500/25 px-6 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/35 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button><button type="button" onClick={() => setEditing(undefined)} className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white hover:bg-white/10">Cancel</button></div>
        </form>
      )}
      <ul className="space-y-3">
        {!shown.length && <li className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">No activities match this view.</li>}
        {shown.map((a) => <li key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{a.code} · {projects.find((p) => p.id === a.projectId)?.code ?? "Unknown project"}</p><h3 className="text-lg font-semibold text-white">{a.title}</h3><p className="mt-1 text-sm text-white/70">Owner: {a.owner}{a.workstream && ` · ${a.workstream}`}{a.dueDate && ` · Due ${a.dueDate}`}</p></div><span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">{a.status}</span></div>{a.blockers && <p className="mt-3 text-sm text-amber-100">Blockers: {a.blockers}</p>}{a.evidenceRequired && <p className="mt-2 text-sm text-white/75">Evidence: {a.evidenceRequired}</p>}{writable && <button onClick={() => open(a)} className="mt-4 rounded-full border border-white/20 px-4 py-1.5 text-sm hover:bg-white/10">Edit</button>}</li>)}
      </ul>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm text-white/80">{label}<div className="mt-1">{children}</div></label>; }

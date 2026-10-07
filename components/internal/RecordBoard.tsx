"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSession } from "./InternalGate";
import { savePlan } from "@/lib/internal/planning";
import { canApprove, canWrite, type InternalCollection, type Role } from "@/lib/internal/types";

export type FieldSpec = {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "date" | "url";
  required?: boolean;
  options?: readonly string[];
  parent?: boolean;
  full?: boolean;
};

export type BoardRow = { id: string } & Record<string, unknown>;

type Props = {
  collection: InternalCollection;
  noun: string;
  fields: FieldSpec[];
  rows: BoardRow[];
  parentKey: string;
  parentLabel: string;
  parents: { value: string; label: string }[];
  statusKey: string;
  statuses: readonly string[];
  defaults: Record<string, string>;
  meta: (row: BoardRow, parentName: string) => string;
  badges: (row: BoardRow) => string[];
  details: (row: BoardRow) => { label: string; value: string }[];
  review?: { from: string; approve: string; reject: string };
  loadError?: string;
  optionSets?: Record<string, { value: string; label: string }[]>;
  validate?: (values: Record<string, string>, editingId?: string) => string | null;
  canEdit?: (role?: Role | null) => boolean;
};

const actionLabel = (status: string) =>
  ({ Validated: "Validate", Approved: "Approve", Rejected: "Reject" })[status] ?? status;

const inputCls = "w-full rounded-lg border border-white/20 bg-white/10 p-2.5 text-sm text-white outline-none focus:border-cyan-400";
const text = (row: BoardRow, key: string) => String(row[key] ?? "");

export default function RecordBoard(props: Props) {
  const { collection, noun, fields, rows, parentKey, parentLabel, parents, statusKey, statuses, defaults, review } = props;
  const { user, role, db } = useSession();
  const writable = (props.canEdit ?? canWrite)(role);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<BoardRow | null | undefined>(undefined);
  const [values, setValues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState(props.loadError ?? "");
  const [saving, setSaving] = useState(false);

  const actor = { uid: user.uid, email: user.email ?? "unknown" };
  const shown = useMemo(() => rows.filter((r) => filter === "all" || text(r, parentKey) === filter), [rows, filter, parentKey]);
  const parentName = (id: string) => parents.find((p) => p.value === id)?.label ?? "Unknown";

  function open(record?: BoardRow) {
    setEditing(record ?? null);
    const next: Record<string, string> = { ...defaults };
    if (record) for (const f of fields) next[f.key] = text(record, f.key);
    else if (filter !== "all") next[parentKey] = filter;
    setValues(next);
    setMessage("");
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !values[f.key]?.trim()) return setMessage(`${f.label} is required.`);
      if (f.type === "url" && values[f.key]?.trim() && !/^https?:\/\//i.test(values[f.key].trim())) {
        return setMessage(`${f.label} must start with http:// or https://.`);
      }
    }
    const problem = props.validate?.(values, editing?.id);
    if (problem) return setMessage(problem);
    const data: Record<string, string | number> = {};
    for (const f of fields) {
      const raw = (values[f.key] ?? "").trim();
      data[f.key] = f.type === "number" ? Math.max(0, Number(raw) || 0) : raw;
    }
    setSaving(true);
    try {
      await savePlan(db, collection, actor, data, editing?.id);
      setEditing(undefined);
      setMessage(`${noun} saved.`);
    } catch {
      setMessage("Save failed. You may not have permission for this change.");
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(row: BoardRow, status: string) {
    try {
      await savePlan(db, collection, actor, { [statusKey]: status }, row.id);
      setMessage(`${text(row, "code")}: ${status}.`);
    } catch {
      setMessage("Change refused. Only administrators can validate or reject.");
    }
  }

  function optionsFor(f: FieldSpec) {
    const set = props.optionSets?.[f.key];
    if (set) return set;
    if (f.parent) return parents;
    const all = f.options ?? [];
    const list = f.key === statusKey && review && !canApprove(role) ? all.filter((o) => o !== review.approve && o !== review.reject) : all;
    return list.map((o) => ({ value: o, label: o }));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {statuses.map((s) => (
          <div key={s} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-white/70">{s}</p>
            <p className="mt-1 text-lg font-semibold text-white">{rows.filter((r) => text(r, statusKey) === s).length}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="text-sm text-white/80">
          {parentLabel}
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${inputCls} mt-1 min-w-64`}>
            <option value="all" className="text-black">All</option>
            {parents.map((p) => <option key={p.value} value={p.value} className="text-black">{p.label}</option>)}
          </select>
        </label>
        {writable && (
          <button onClick={() => open()} disabled={!parents.length}
            className="rounded-full bg-cyan-500/20 px-5 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30 disabled:opacity-40">
            New {noun}
          </button>
        )}
      </div>

      {message && <p role="status" className="text-sm text-cyan-200">{message}</p>}
      {!parents.length && <p className="text-sm text-white/70">Add a {parentLabel.toLowerCase()} first.</p>}

      {editing !== undefined && (
        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-cyan-400/30 bg-slate-900/80 p-6">
          <h3 className="text-lg font-semibold text-white">{editing ? "Edit" : "New"} {noun}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map((f) => (
              <label key={f.key} className={`block text-sm text-white/80 ${f.full ? "md:col-span-2" : ""}`}>
                {f.label}{f.required && " *"}
                {f.type === "textarea" ? (
                  <textarea rows={3} className={`${inputCls} mt-1`} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                ) : f.type === "select" ? (
                  <select className={`${inputCls} mt-1`} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}>
                    <option value="" className="text-black">Select…</option>
                    {optionsFor(f).map((o) => <option key={o.value} value={o.value} className="text-black">{o.label}</option>)}
                  </select>
                ) : (
                  <input type={f.type} min={f.type === "number" ? 0 : undefined} className={`${inputCls} mt-1`} value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
                )}
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button disabled={saving} className="rounded-full bg-cyan-500/25 px-6 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/35 disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
            <button type="button" onClick={() => setEditing(undefined)} className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white hover:bg-white/10">Cancel</button>
          </div>
        </form>
      )}

      <ul className="space-y-3">
        {!shown.length && <li className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">No {noun}s in this view.</li>}
        {shown.map((r) => (
          <li key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{text(r, "code")}</p>
                <h3 className="text-lg font-semibold text-white">{text(r, "title")}</h3>
                <p className="mt-1 text-sm text-white/70">{props.meta(r, parentName(text(r, parentKey)))}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {props.badges(r).map((b) => <span key={b} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/90">{b}</span>)}
              </div>
            </div>
            {props.details(r).filter((d) => d.value).map((d) => (
              <p key={d.label} className="mt-2 text-sm text-white/75">{d.label}: {d.value}</p>
            ))}
            {writable && (
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <button onClick={() => open(r)} className="rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/10">Edit</button>
                {review && canApprove(role) && text(r, statusKey) === review.from && (
                  <>
                    <button onClick={() => setStatus(r, review.approve)} className="rounded-full bg-emerald-500/20 px-4 py-1.5 text-emerald-100 hover:bg-emerald-500/30">{actionLabel(review.approve)}</button>
                    <button onClick={() => setStatus(r, review.reject)} className="rounded-full bg-rose-500/20 px-4 py-1.5 text-rose-100 hover:bg-rose-500/30">{actionLabel(review.reject)}</button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

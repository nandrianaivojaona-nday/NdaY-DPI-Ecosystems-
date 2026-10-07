"use client";

import RecordBoard, { type BoardRow, type FieldSpec } from "./RecordBoard";
import { useCollection } from "./useCollection";
import { DELIVERABLE_STATUSES, DELIVERABLE_TYPES, type DeliverableDoc, type PlanDoc } from "@/lib/internal/types";

const fields: FieldSpec[] = [
  { key: "code", label: "Code", type: "text", required: true },
  { key: "projectId", label: "Project", type: "select", required: true, parent: true },
  { key: "title", label: "Title", type: "text", required: true },
  { key: "owner", label: "Owner", type: "text", required: true },
  { key: "type", label: "Type", type: "select", options: DELIVERABLE_TYPES },
  { key: "status", label: "Status", type: "select", options: DELIVERABLE_STATUSES },
  { key: "dueDate", label: "Due date", type: "date" },
  { key: "evidenceLink", label: "Evidence link (URL)", type: "url" },
  { key: "acceptanceCriteria", label: "Acceptance criteria", type: "textarea", full: true },
];

export default function DeliverableWorkspace() {
  const projects = useCollection<PlanDoc>("projects");
  const deliverables = useCollection<DeliverableDoc>("deliverables");
  return (
    <RecordBoard
      collection="deliverables"
      noun="deliverable"
      fields={fields}
      rows={deliverables.rows as unknown as BoardRow[]}
      parentKey="projectId"
      parentLabel="Project"
      parents={projects.rows.map((p) => ({ value: p.id, label: `${p.code} \u2013 ${p.title}` }))}
      statusKey="status"
      statuses={DELIVERABLE_STATUSES}
      defaults={{ status: "Expected", type: "Report" }}
      review={{ from: "In Validation", approve: "Validated", reject: "Rejected" }}
      loadError={deliverables.error || projects.error}
      meta={(r, parent) => `${r.type} \u00b7 Owner: ${r.owner} \u00b7 Project: ${parent.split(" \u2013 ")[0]}${r.dueDate ? ` \u00b7 Due ${r.dueDate}` : ""}`}
      badges={(r) => [String(r.status)]}
      details={(r) => [
        { label: "Acceptance criteria", value: String(r.acceptanceCriteria ?? "") },
        { label: "Evidence", value: String(r.evidenceLink ?? "") },
      ]}
    />
  );
}

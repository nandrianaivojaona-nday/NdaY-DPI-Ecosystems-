"use client";

import RecordBoard, { type BoardRow, type FieldSpec } from "./RecordBoard";
import { useCollection } from "./useCollection";
import { TASK_PRIORITIES, TASK_STATUSES, type ActivityDoc, type TaskDoc } from "@/lib/internal/types";

const fields: FieldSpec[] = [
  { key: "code", label: "Code", type: "text", required: true },
  { key: "activityId", label: "Activity", type: "select", required: true, parent: true },
  { key: "title", label: "Title", type: "text", required: true },
  { key: "assignee", label: "Assignee", type: "text", required: true },
  { key: "status", label: "Status", type: "select", options: TASK_STATUSES },
  { key: "priority", label: "Priority", type: "select", options: TASK_PRIORITIES },
  { key: "dueDate", label: "Due date", type: "date" },
  { key: "estimateHours", label: "Estimate (hours)", type: "number" },
  { key: "notes", label: "Notes", type: "textarea", full: true },
];

export default function TaskWorkspace() {
  const activities = useCollection<ActivityDoc>("activities");
  const tasks = useCollection<TaskDoc>("tasks");
  return (
    <RecordBoard
      collection="tasks"
      noun="task"
      fields={fields}
      rows={tasks.rows as unknown as BoardRow[]}
      parentKey="activityId"
      parentLabel="Activity"
      parents={activities.rows.map((a) => ({ value: a.id, label: `${a.code} \u2013 ${a.title}` }))}
      statusKey="status"
      statuses={TASK_STATUSES}
      defaults={{ status: "To Do", priority: "Medium", estimateHours: "0" }}
      loadError={tasks.error || activities.error}
      meta={(r, parent) => `Assignee: ${r.assignee} \u00b7 Activity: ${parent.split(" \u2013 ")[0]}${r.dueDate ? ` \u00b7 Due ${r.dueDate}` : ""}`}
      badges={(r) => [String(r.status), `Priority: ${r.priority}`, ...(Number(r.estimateHours) ? [`${r.estimateHours} h`] : [])]}
      details={(r) => [{ label: "Notes", value: String(r.notes ?? "") }]}
    />
  );
}

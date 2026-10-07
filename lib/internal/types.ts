import type { Timestamp } from "firebase/firestore";

export const ROLES = ["admin", "manager", "finance", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export const canWrite = (role?: Role | null) => role === "admin" || role === "manager";
export const canApprove = (role?: Role | null) => role === "admin";

export const STATUSES = ["Draft", "Planned", "Active", "On Hold", "Completed", "Cancelled"] as const;
export const APPROVALS = ["Not Submitted", "Submitted", "Under Review", "Approved", "Rejected"] as const;
export const RISKS = ["Low", "Medium", "High", "Critical"] as const;

export type Status = (typeof STATUSES)[number];
export type Approval = (typeof APPROVALS)[number];
export type Risk = (typeof RISKS)[number];

export interface PlanDoc {
  id: string;
  code: string;
  title: string;
  owner: string;
  status: Status;
  approvalState: Approval;
  riskLevel: Risk;
  budgetPlanned: number;
  summary?: string;
  strategicObjective?: string;
  institutionalAlignment?: string;
  timeHorizon?: string;
  programmeId?: string;
  scope?: string;
  startDate?: string;
  endDate?: string;
  updatedBy?: string;
  updatedAt?: Timestamp | null;
}

export const ACTIVITY_STATUSES = ["Planned", "Ready", "In Progress", "Blocked", "Done"] as const;
export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];

export interface ActivityDoc {
  id: string;
  code: string;
  projectId: string;
  title: string;
  owner: string;
  workstream?: string;
  status: ActivityStatus;
  dueDate?: string;
  blockers?: string;
  evidenceRequired?: string;
  updatedBy?: string;
  updatedAt?: Timestamp | null;
}

export type PlanKind = "programmes" | "projects";
export type InternalCollection = PlanKind | "activities" | "tasks" | "deliverables" | "resources" | "budgetLines" | "allocations";

export const canWriteBudget = (role?: Role | null) => role === "admin" || role === "manager" || role === "finance";
export const canReadBudget = canWriteBudget;

export const RESOURCE_TYPES = ["Human", "Asset", "Supplier", "Partner", "Data"] as const;
export const RESOURCE_AVAILABILITY = ["Available", "Allocated", "Unavailable"] as const;
export const RESOURCE_UNITS = ["hour", "day", "month", "item", "licence"] as const;
export const BUDGET_CATEGORIES = ["Personnel", "Equipment", "Services", "Travel", "Training", "Operations", "Other"] as const;
export const BUDGET_STATUSES = ["Draft", "Submitted", "Approved", "Rejected"] as const;

export interface ResourceDoc {
  id: string;
  code: string;
  title: string;
  type: (typeof RESOURCE_TYPES)[number];
  contact: string;
  availability: (typeof RESOURCE_AVAILABILITY)[number];
  unitCost?: number;
  unit?: (typeof RESOURCE_UNITS)[number];
  notes?: string;
}

export interface BudgetLineDoc {
  id: string;
  code: string;
  projectId: string;
  title: string;
  category: (typeof BUDGET_CATEGORIES)[number];
  resourceId?: string;
  plannedAmount: number;
  committedAmount: number;
  actualAmount: number;
  status: (typeof BUDGET_STATUSES)[number];
  notes?: string;
}

export const TASK_STATUSES = ["To Do", "In Progress", "Blocked", "In Review", "Done"] as const;
export const TASK_PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;
export const DELIVERABLE_STATUSES = ["Expected", "In Validation", "Validated", "Rejected"] as const;
export const DELIVERABLE_TYPES = ["Report", "Dataset", "Software", "Training", "Event", "Policy brief", "Other"] as const;

export interface TaskDoc {
  id: string;
  code: string;
  activityId: string;
  title: string;
  assignee: string;
  status: (typeof TASK_STATUSES)[number];
  priority: (typeof TASK_PRIORITIES)[number];
  dueDate?: string;
  estimateHours?: number;
  notes?: string;
}

export interface DeliverableDoc {
  id: string;
  code: string;
  projectId: string;
  title: string;
  owner: string;
  type: (typeof DELIVERABLE_TYPES)[number];
  status: (typeof DELIVERABLE_STATUSES)[number];
  dueDate?: string;
  evidenceLink?: string;
  acceptanceCriteria?: string;
}

export const ALLOCATION_STATUSES = ["Proposed", "Confirmed", "Completed", "Cancelled"] as const;

export interface AllocationDoc {
  id: string;
  code: string;
  activityId: string;
  resourceId: string;
  title: string;
  quantity: number;
  loadPercent: number;
  startDate: string;
  endDate: string;
  status: (typeof ALLOCATION_STATUSES)[number];
  notes?: string;
}

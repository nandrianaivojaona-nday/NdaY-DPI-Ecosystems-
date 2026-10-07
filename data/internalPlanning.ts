export type PlanningStatus =
  | "Draft"
  | "Planned"
  | "Approval Review"
  | "Approved"
  | "In Progress"
  | "Blocked"
  | "Completed";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type ApprovalState = "Not Submitted" | "Submitted" | "Under Review" | "Approved" | "Rejected";
export type ReadinessState = "Concept" | "Scoping" | "Ready" | "Conditional" | "On Hold";
export type ResourceType = "Human" | "Budget" | "Asset" | "Supplier" | "Partner" | "Data";
export type ActivityStatus = "Planned" | "Ready" | "In Progress" | "Blocked" | "Done";
export type OutputStatus = "Expected" | "In Validation" | "Validated" | "Rejected";
export type OutcomeStatus = "Observed" | "Emerging" | "Validated" | "Under Review";
export type EmploymentStatus = "Active" | "Onboarding" | "Probation" | "Leave" | "Suspended" | "Exited";
export type ContractType = "Permanent" | "Fixed Term" | "Consultant" | "Intern" | "Volunteer";
export type PayrollCycle = "Weekly" | "Bi-Weekly" | "Monthly" | "Quarterly";
export type PayrollStatus = "Draft" | "Calculated" | "Approved" | "Paid" | "Rejected";
export type LeaveType = "Annual" | "Sick" | "Maternity" | "Paternity" | "Unpaid" | "Special";
export type TransactionDirection = "Inbound" | "Outbound";
export type TreasuryAccountType = "Operating" | "Payroll" | "Restricted" | "Savings";
export type BankReportType = "Statement" | "Reconciliation" | "Payroll Batch" | "Compliance Filing";
export type ProcurementStatus = "Requested" | "Quoted" | "Approved" | "Ordered" | "Received" | "Closed";
export type AssetStatus = "In Service" | "In Maintenance" | "Idle" | "Disposed";
export type FiscalReportStatus = "Draft" | "Prepared" | "Submitted" | "Accepted";

export interface PlanningField {
  label: string;
  group?: string;
  required?: boolean;
}

export interface BudgetEnvelope {
  currency: "MGA";
  planned: number;
  committed: number;
  actual: number;
}

export interface MilestoneRecord {
  id: string;
  label: string;
  dueDate: string;
  status: PlanningStatus | ActivityStatus | OutputStatus;
}

export interface ProgrammeRecord {
  id: string;
  code: string;
  title: string;
  strategicObjective: string;
  constitutionalAlignment: string;
  territories: string[];
  ecosystems: string[];
  owner: string;
  governanceOwner: string;
  status: PlanningStatus;
  readiness: ReadinessState;
  approvalState: ApprovalState;
  riskLevel: RiskLevel;
  timeHorizon: string;
  milestoneCadence: string;
  budget: BudgetEnvelope;
  fundingSources: string[];
  focus: string;
  summary: string;
  milestoneIds: string[];
}

export interface ProjectRecord {
  id: string;
  code: string;
  programmeId: string;
  programme: string;
  title: string;
  scope: string;
  deliveryLogic: string;
  expectedOutputs: string[];
  owner: string;
  team: string[];
  deliveryPartners: string[];
  status: PlanningStatus;
  readiness: ReadinessState;
  approvalState: ApprovalState;
  riskLevel: RiskLevel;
  startDate: string;
  endDate: string;
  checkpointSchedule: string;
  budget: BudgetEnvelope;
  dependencies: string[];
}

export interface ActivityRecord {
  id: string;
  projectId: string;
  code: string;
  title: string;
  owner: string;
  workstream: string;
  status: ActivityStatus;
  dueDate: string;
  blockers: string[];
  evidenceRequired: string[];
}

export interface ResourceRecord {
  id: string;
  linkedType: "programme" | "project" | "activity";
  linkedId: string;
  type: ResourceType;
  name: string;
  owner: string;
  allocation: string;
  status: "Available" | "Committed" | "Constrained";
  value?: number;
  currency?: "MGA";
}

export interface OutputRecord {
  id: string;
  projectId: string;
  title: string;
  type: string;
  status: OutputStatus;
  validationOwner: string;
  validationDate?: string;
  evidenceLinks: string[];
}

export interface OutcomeRecord {
  id: string;
  programmeId: string;
  title: string;
  indicator: string;
  baseline: string;
  currentValue: string;
  targetValue: string;
  status: OutcomeStatus;
  reviewCycle: string;
}

export interface EvidenceRecord {
  id: string;
  linkedType: "activity" | "output" | "outcome";
  linkedId: string;
  title: string;
  evidenceType: string;
  owner: string;
  submittedAt: string;
  reviewState: ApprovalState;
}

export interface DepartmentRecord {
  id: string;
  code: string;
  name: string;
  lead: string;
  costCenter: string;
  headcountPlanned: number;
  headcountActive: number;
}

export interface EmployeeRecord {
  id: string;
  employeeCode: string;
  fullName: string;
  departmentId: string;
  department: string;
  title: string;
  manager: string;
  employmentStatus: EmploymentStatus;
  contractType: ContractType;
  startDate: string;
  endDate?: string;
  baseSalary: number;
  currency: "MGA";
  bankName?: string;
  bankAccountMasked?: string;
}

export interface LeaveRecord {
  id: string;
  employeeId: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: ApprovalState;
  approver: string;
}

export interface PayrollRecord {
  id: string;
  cycle: PayrollCycle;
  periodLabel: string;
  employeeId: string;
  employeeName: string;
  departmentId: string;
  grossPay: number;
  deductions: number;
  netPay: number;
  currency: "MGA";
  status: PayrollStatus;
  paymentDate?: string;
  bankInstructionRef?: string;
}

export interface TreasuryAccountRecord {
  id: string;
  accountName: string;
  bankName: string;
  accountType: TreasuryAccountType;
  currency: "MGA";
  availableBalance: number;
  ledgerBalance: number;
  signatoryGroup: string;
}

export interface FinanceTransactionRecord {
  id: string;
  reference: string;
  direction: TransactionDirection;
  category: string;
  departmentId: string;
  programmeId?: string;
  amount: number;
  currency: "MGA";
  transactionDate: string;
  status: ApprovalState | PayrollStatus;
  counterparty: string;
}

export interface ProcurementRecord {
  id: string;
  requestCode: string;
  title: string;
  requestingUnit: string;
  status: ProcurementStatus;
  supplier?: string;
  amount: number;
  currency: "MGA";
  expectedDeliveryDate: string;
}

export interface AssetRecord {
  id: string;
  assetCode: string;
  name: string;
  category: string;
  assignedTo: string;
  location: string;
  status: AssetStatus;
  acquisitionValue: number;
  currency: "MGA";
  maintenanceDue?: string;
}

export interface FiscalReportRecord {
  id: string;
  reportName: string;
  periodLabel: string;
  status: FiscalReportStatus;
  owner: string;
  submissionDate?: string;
  authority: string;
}

export interface BankReportRecord {
  id: string;
  reportType: BankReportType;
  accountId: string;
  periodLabel: string;
  status: ApprovalState | FiscalReportStatus;
  generatedOn: string;
  notes: string;
}

export const programmePlanningFields: PlanningField[] = [
  { label: "Programme code and title", group: "Identity", required: true },
  { label: "Strategic objective and institutional alignment", group: "Strategy", required: true },
  { label: "Target territories and ecosystems", group: "Scope", required: true },
  { label: "Programme lead and governance owner", group: "Ownership", required: true },
  { label: "Time horizon and milestone cadence", group: "Timeline", required: true },
  { label: "Budget ceiling and partner funding sources", group: "Finance", required: true },
  { label: "Risk assumptions and approval readiness", group: "Governance", required: true },
];

export const projectPlanningFields: PlanningField[] = [
  { label: "Project code, title and linked programme", group: "Identity", required: true },
  { label: "Scope, delivery logic and expected outputs", group: "Delivery", required: true },
  { label: "Project manager, team and delivery partners", group: "Ownership", required: true },
  { label: "Start date, end date and checkpoint schedule", group: "Timeline", required: true },
  { label: "Budget envelope, resource plan and dependencies", group: "Finance", required: true },
  { label: "Readiness state, approval state and risk level", group: "Governance", required: true },
];

export const sampleMilestones: MilestoneRecord[] = [
  { id: "mil-001", label: "Programme charter approved", dueDate: "2026-10-20", status: "Approval Review" },
  { id: "mil-002", label: "Territory baseline complete", dueDate: "2026-11-05", status: "Planned" },
  { id: "mil-003", label: "Partner onboarding validated", dueDate: "2026-11-18", status: "In Progress" },
];

export const sampleProgrammes: ProgrammeRecord[] = [
  {
    id: "prg-001",
    code: "PRG-001",
    title: "Territorial Governance Acceleration",
    strategicObjective: "Operationalise territorial governance capacity across priority communes.",
    constitutionalAlignment: "Institutional strengthening and public service coordination.",
    territories: ["Ben'Tanàna", "Selected Fokontany"],
    ecosystems: ["Territorial Governance", "Digital Public Services"],
    owner: "Programme Lead · Governance",
    governanceOwner: "Executive / Institutional Lead",
    status: "Draft",
    readiness: "Scoping",
    approvalState: "Under Review",
    riskLevel: "Medium",
    timeHorizon: "2026-2027",
    milestoneCadence: "Monthly",
    budget: { currency: "MGA", planned: 450000000, committed: 125000000, actual: 42000000 },
    fundingSources: ["Core budget", "Territorial partners"],
    focus: "Ben'Tanàna, Fokontany, public territorial service readiness",
    summary: "Builds governance readiness, delivery structures and operational baselines for territorial rollout.",
    milestoneIds: ["mil-001", "mil-002"],
  },
  {
    id: "prg-002",
    code: "PRG-002",
    title: "Circular Economy Rollout",
    strategicObjective: "Scale NdaY'Fako operational readiness with partner-backed service delivery.",
    constitutionalAlignment: "Environmental service performance and territorial inclusion.",
    territories: ["Urban communes", "Expansion clusters"],
    ecosystems: ["Waste", "Operational Intelligence"],
    owner: "Programme Lead · Sector Delivery",
    governanceOwner: "Finance & Operations",
    status: "Planned",
    readiness: "Ready",
    approvalState: "Approved",
    riskLevel: "High",
    timeHorizon: "2026-2028",
    milestoneCadence: "Bi-weekly",
    budget: { currency: "MGA", planned: 680000000, committed: 310000000, actual: 95000000 },
    fundingSources: ["Partner financing", "Municipal co-funding"],
    focus: "NdaY'Fako expansion, commune onboarding and operational intelligence",
    summary: "Activates partner networks, onboarding flows and operational metrics for circular economy deployment.",
    milestoneIds: ["mil-003"],
  },
];

export const sampleProjects: ProjectRecord[] = [
  {
    id: "prj-014",
    code: "PRJ-014",
    programmeId: "prg-001",
    programme: "Territorial Governance Acceleration",
    title: "Commune Readiness Baseline",
    scope: "Assess readiness across governance, staffing, service workflows and data conditions.",
    deliveryLogic: "Baseline first, prioritise gaps, then define authorized intervention packages.",
    expectedOutputs: ["Readiness scorecards", "Gap analysis", "Intervention roadmap"],
    owner: "Project Manager · Territorial Ops",
    team: ["Field coordination", "Data analyst", "Institutional liaison"],
    deliveryPartners: ["Commune offices", "Local coordinators"],
    status: "Approval Review",
    readiness: "Conditional",
    approvalState: "Under Review",
    riskLevel: "Medium",
    startDate: "2026-10-12",
    endDate: "2026-12-18",
    checkpointSchedule: "Weekly review every Friday",
    budget: { currency: "MGA", planned: 85000000, committed: 30000000, actual: 9000000 },
    dependencies: ["Programme charter", "Field access approval"],
  },
  {
    id: "prj-021",
    code: "PRJ-021",
    programmeId: "prg-002",
    programme: "Circular Economy Rollout",
    title: "Fako Partner Activation",
    scope: "Prepare operators, partners and commune stakeholders for active service deployment.",
    deliveryLogic: "Activate partnership agreements, onboarding tools, and operating routines before launch.",
    expectedOutputs: ["Partner onboarding pack", "Activation checklist", "Launch readiness review"],
    owner: "Project Manager · Waste Ecosystem",
    team: ["Partner success", "Finance operations", "Field mobilisation"],
    deliveryPartners: ["Waste operators", "Municipal services"],
    status: "Draft",
    readiness: "Scoping",
    approvalState: "Submitted",
    riskLevel: "High",
    startDate: "2026-10-25",
    endDate: "2027-01-30",
    checkpointSchedule: "Bi-weekly activation review",
    budget: { currency: "MGA", planned: 120000000, committed: 40000000, actual: 0 },
    dependencies: ["Partner MoUs", "Procurement release", "Training schedule"],
  },
];

export const sampleActivities: ActivityRecord[] = [
  {
    id: "act-001",
    projectId: "prj-014",
    code: "ACT-001",
    title: "Field survey planning",
    owner: "Field coordination",
    workstream: "Assessment",
    status: "Ready",
    dueDate: "2026-10-18",
    blockers: [],
    evidenceRequired: ["Approved survey tool", "Enumerator roster"],
  },
  {
    id: "act-002",
    projectId: "prj-021",
    code: "ACT-002",
    title: "Partner onboarding schedule",
    owner: "Partner success",
    workstream: "Activation",
    status: "Blocked",
    dueDate: "2026-10-28",
    blockers: ["Unsigned partner agreement"],
    evidenceRequired: ["Signed agreement", "Confirmed timetable"],
  },
];

export const sampleResources: ResourceRecord[] = [
  {
    id: "res-001",
    linkedType: "project",
    linkedId: "prj-014",
    type: "Budget",
    name: "Baseline assessment envelope",
    owner: "Finance & Operations",
    allocation: "MGA 85,000,000",
    status: "Committed",
    value: 85000000,
    currency: "MGA",
  },
  {
    id: "res-002",
    linkedType: "activity",
    linkedId: "act-002",
    type: "Partner",
    name: "Waste operator onboarding team",
    owner: "Programme Lead · Sector Delivery",
    allocation: "3 partner focal points",
    status: "Constrained",
  },
];

export const sampleOutputs: OutputRecord[] = [
  {
    id: "out-001",
    projectId: "prj-014",
    title: "Commune readiness scorecard",
    type: "Assessment report",
    status: "Expected",
    validationOwner: "Reviewer / Approver",
    evidenceLinks: ["EV-001"],
  },
  {
    id: "out-002",
    projectId: "prj-021",
    title: "Partner activation checklist",
    type: "Operations checklist",
    status: "In Validation",
    validationOwner: "Finance & Operations",
    validationDate: "2026-11-02",
    evidenceLinks: ["EV-002"],
  },
];

export const sampleOutcomes: OutcomeRecord[] = [
  {
    id: "oc-001",
    programmeId: "prg-001",
    title: "Improved commune delivery readiness",
    indicator: "Share of targeted communes with validated readiness baseline",
    baseline: "0/12 communes",
    currentValue: "3/12 communes",
    targetValue: "12/12 communes",
    status: "Emerging",
    reviewCycle: "Quarterly governance review",
  },
  {
    id: "oc-002",
    programmeId: "prg-002",
    title: "Operational waste partner network activated",
    indicator: "Number of commune-partner operating cells launched",
    baseline: "0 cells",
    currentValue: "1 cell",
    targetValue: "8 cells",
    status: "Observed",
    reviewCycle: "Monthly programme review",
  },
];

export const sampleEvidence: EvidenceRecord[] = [
  {
    id: "EV-001",
    linkedType: "output",
    linkedId: "out-001",
    title: "Readiness scorecard template",
    evidenceType: "Template",
    owner: "Data analyst",
    submittedAt: "2026-10-14",
    reviewState: "Submitted",
  },
  {
    id: "EV-002",
    linkedType: "activity",
    linkedId: "act-002",
    title: "Signed onboarding checklist",
    evidenceType: "Signed document",
    owner: "Partner success",
    submittedAt: "2026-11-01",
    reviewState: "Under Review",
  },
];

export const sampleDepartments: DepartmentRecord[] = [
  {
    id: "dep-001",
    code: "DPT-GOV",
    name: "Governance & Institutional Delivery",
    lead: "Executive / Institutional Lead",
    costCenter: "CC-100",
    headcountPlanned: 8,
    headcountActive: 5,
  },
  {
    id: "dep-002",
    code: "DPT-OPS",
    name: "Finance, Operations & Support",
    lead: "Finance & Operations",
    costCenter: "CC-200",
    headcountPlanned: 10,
    headcountActive: 7,
  },
];

export const sampleEmployees: EmployeeRecord[] = [
  {
    id: "emp-001",
    employeeCode: "NDY-EMP-001",
    fullName: "Aina Rakoto",
    departmentId: "dep-001",
    department: "Governance & Institutional Delivery",
    title: "Programme Lead · Governance",
    manager: "Executive / Institutional Lead",
    employmentStatus: "Active",
    contractType: "Permanent",
    startDate: "2025-11-01",
    baseSalary: 3200000,
    currency: "MGA",
    bankName: "BFV-SG",
    bankAccountMasked: "**** 4821",
  },
  {
    id: "emp-002",
    employeeCode: "NDY-EMP-014",
    fullName: "Tiana Razafindranaivo",
    departmentId: "dep-002",
    department: "Finance, Operations & Support",
    title: "Operations Analyst",
    manager: "Finance & Operations",
    employmentStatus: "Probation",
    contractType: "Fixed Term",
    startDate: "2026-08-15",
    baseSalary: 1800000,
    currency: "MGA",
    bankName: "BOA Madagascar",
    bankAccountMasked: "**** 1934",
  },
];

export const sampleLeaveRecords: LeaveRecord[] = [
  {
    id: "leave-001",
    employeeId: "emp-001",
    type: "Annual",
    startDate: "2026-12-21",
    endDate: "2026-12-30",
    status: "Approved",
    approver: "Executive / Institutional Lead",
  },
  {
    id: "leave-002",
    employeeId: "emp-002",
    type: "Sick",
    startDate: "2026-10-07",
    endDate: "2026-10-09",
    status: "Submitted",
    approver: "Finance & Operations",
  },
];

export const samplePayroll: PayrollRecord[] = [
  {
    id: "pay-2026-09-001",
    cycle: "Monthly",
    periodLabel: "September 2026",
    employeeId: "emp-001",
    employeeName: "Aina Rakoto",
    departmentId: "dep-001",
    grossPay: 3200000,
    deductions: 285000,
    netPay: 2915000,
    currency: "MGA",
    status: "Paid",
    paymentDate: "2026-09-28",
    bankInstructionRef: "BANK-PAY-0926-001",
  },
  {
    id: "pay-2026-09-014",
    cycle: "Monthly",
    periodLabel: "September 2026",
    employeeId: "emp-002",
    employeeName: "Tiana Razafindranaivo",
    departmentId: "dep-002",
    grossPay: 1800000,
    deductions: 140000,
    netPay: 1660000,
    currency: "MGA",
    status: "Calculated",
    bankInstructionRef: "BANK-PAY-0926-014",
  },
];

export const sampleTreasuryAccounts: TreasuryAccountRecord[] = [
  {
    id: "tre-001",
    accountName: "NdaY Operating Account",
    bankName: "BFV-SG",
    accountType: "Operating",
    currency: "MGA",
    availableBalance: 286000000,
    ledgerBalance: 301500000,
    signatoryGroup: "Executive + Finance",
  },
  {
    id: "tre-002",
    accountName: "NdaY Payroll Account",
    bankName: "BOA Madagascar",
    accountType: "Payroll",
    currency: "MGA",
    availableBalance: 45200000,
    ledgerBalance: 47000000,
    signatoryGroup: "Finance + Payroll",
  },
];

export const sampleFinanceTransactions: FinanceTransactionRecord[] = [
  {
    id: "txn-001",
    reference: "TXN-2026-1001",
    direction: "Outbound",
    category: "Payroll",
    departmentId: "dep-002",
    programmeId: "prg-001",
    amount: 4575000,
    currency: "MGA",
    transactionDate: "2026-10-01",
    status: "Approved",
    counterparty: "BFV-SG payroll batch",
  },
  {
    id: "txn-002",
    reference: "TXN-2026-1007",
    direction: "Inbound",
    category: "Partner funding",
    departmentId: "dep-001",
    programmeId: "prg-002",
    amount: 85000000,
    currency: "MGA",
    transactionDate: "2026-10-03",
    status: "Approved",
    counterparty: "Municipal co-funding facility",
  },
];

export const sampleProcurement: ProcurementRecord[] = [
  {
    id: "proc-001",
    requestCode: "PR-2026-014",
    title: "Field tablets for baseline assessment",
    requestingUnit: "Governance & Institutional Delivery",
    status: "Approved",
    supplier: "TechHub Madagascar",
    amount: 12500000,
    currency: "MGA",
    expectedDeliveryDate: "2026-10-26",
  },
  {
    id: "proc-002",
    requestCode: "PR-2026-021",
    title: "Protective kits for waste activation",
    requestingUnit: "Finance, Operations & Support",
    status: "Quoted",
    amount: 8600000,
    currency: "MGA",
    expectedDeliveryDate: "2026-11-04",
  },
];

export const sampleAssets: AssetRecord[] = [
  {
    id: "asset-001",
    assetCode: "AST-VEH-002",
    name: "Field operations vehicle",
    category: "Fleet",
    assignedTo: "Territorial Ops",
    location: "Antananarivo hub",
    status: "In Service",
    acquisitionValue: 78000000,
    currency: "MGA",
    maintenanceDue: "2026-11-15",
  },
  {
    id: "asset-002",
    assetCode: "AST-IT-014",
    name: "Finance workstation cluster",
    category: "IT Equipment",
    assignedTo: "Finance & Operations",
    location: "Internal office",
    status: "In Maintenance",
    acquisitionValue: 15400000,
    currency: "MGA",
    maintenanceDue: "2026-10-19",
  },
];

export const sampleFiscalReports: FiscalReportRecord[] = [
  {
    id: "fis-001",
    reportName: "Monthly tax declaration",
    periodLabel: "September 2026",
    status: "Prepared",
    owner: "Finance & Operations",
    authority: "Tax administration",
  },
  {
    id: "fis-002",
    reportName: "Quarterly employer filing",
    periodLabel: "Q3 2026",
    status: "Draft",
    owner: "Finance & Operations",
    authority: "Labour and fiscal authorities",
  },
];

export const sampleBankReports: BankReportRecord[] = [
  {
    id: "bank-001",
    reportType: "Reconciliation",
    accountId: "tre-001",
    periodLabel: "September 2026",
    status: "Approved",
    generatedOn: "2026-10-02",
    notes: "Operating account reconciled with outstanding cheque review pending closure.",
  },
  {
    id: "bank-002",
    reportType: "Payroll Batch",
    accountId: "tre-002",
    periodLabel: "September 2026",
    status: "Submitted",
    generatedOn: "2026-09-27",
    notes: "Payroll transfer file submitted to banking partner for release window.",
  },
];

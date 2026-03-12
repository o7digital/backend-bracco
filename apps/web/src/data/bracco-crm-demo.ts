export type DemoModuleId =
  | "dashboard"
  | "requests"
  | "workflow"
  | "approvals"
  | "procurement"
  | "finance"
  | "legal"
  | "contracts"
  | "ia-pulse"
  | "reporting"
  | "admin";

export interface DemoNavItem {
  id: DemoModuleId;
  href: string;
  label: string;
}

export interface DemoMetric {
  label: string;
  value: string;
  hint: string;
}

export interface DemoRequest {
  id: string;
  title: string;
  market: string;
  module: string;
  requester: string;
  owner: string;
  stage: string;
  priority: "low" | "medium" | "high" | "critical";
  dueDate: string;
  amount: string;
}

export interface DemoWorkflowStage {
  id: string;
  title: string;
  count: number;
  owner: string;
  eta: string;
  requests: string[];
}

export interface DemoApproval {
  department: string;
  owner: string;
  status: string;
  due: string;
  note: string;
}

export interface DemoBoardItem {
  title: string;
  owner: string;
  market: string;
  status: string;
  note: string;
}

export interface DemoContract {
  id: string;
  type: string;
  market: string;
  languages: string;
  owner: string;
  status: string;
  value: string;
}

export interface DemoAiSignal {
  team: string;
  score: number;
  status: string;
  summary: string;
  nextAction: string;
}

export interface DemoSeriesPoint {
  month: string;
  created: number;
  approved: number;
  closed: number;
}

export interface DemoReportRow {
  module: string;
  market: string;
  volume: number;
  avgDays: number;
  sla: string;
}

export interface DemoAdminPanel {
  title: string;
  description: string;
  owner: string;
}

export const demoNav: DemoNavItem[] = [
  { id: "dashboard", href: "/demo", label: "Dashboard" },
  { id: "requests", href: "/demo/requests", label: "Solicitudes / Requests" },
  { id: "workflow", href: "/demo/workflow", label: "Workflow" },
  { id: "approvals", href: "/demo/approvals", label: "Approvals" },
  { id: "procurement", href: "/demo/procurement", label: "Compras / Procurement" },
  { id: "finance", href: "/demo/finance", label: "Finanzas / Finance" },
  { id: "legal", href: "/demo/legal", label: "Legal" },
  { id: "contracts", href: "/demo/contracts", label: "Contracts / NDA / Quotations" },
  { id: "ia-pulse", href: "/demo/ia-pulse", label: "IA Pulse" },
  { id: "reporting", href: "/demo/reporting", label: "Reporting" },
  { id: "admin", href: "/demo/admin", label: "Admin" },
];

export const demoModuleMeta: Record<
  DemoModuleId,
  { section: string; title: string; description: string }
> = {
  dashboard: {
    section: "Overview",
    title: "Bracco Process CRM dashboard",
    description:
      "A PulseCRM-style command center for Mexico and USA internal process requests, approvals, contracts, and follow-through.",
  },
  requests: {
    section: "Requests",
    title: "Solicitudes / Requests",
    description:
      "A live request register for internal process submissions, with owners, priorities, market context, and the current workflow stage.",
  },
  workflow: {
    section: "Workflow",
    title: "Workflow board",
    description:
      "The Bracco approval route reuses the CRM kanban mentality: every request is visible from creation to closure.",
  },
  approvals: {
    section: "Approvals",
    title: "Approval queue",
    description:
      "Department leads see what needs action now, which SLA is slipping, and what is ready for DG sign-off.",
  },
  procurement: {
    section: "Procurement",
    title: "Compras / Procurement desk",
    description:
      "Vendor packs, quotations, and sourcing validations are grouped by market and owner for demo purposes.",
  },
  finance: {
    section: "Finance",
    title: "Finanzas / Finance review",
    description:
      "Budget gates, threshold approvals, and spend checks mirror the existing CRM operational style with fake data only.",
  },
  legal: {
    section: "Legal",
    title: "Legal workbench",
    description:
      "NDA, contract clauses, and policy checks stay visible in the same dark CRM shell used by the base product.",
  },
  contracts: {
    section: "Contracts",
    title: "Contracts / NDA / Quotations",
    description:
      "A document-oriented workspace for quotations, NDAs, procurement packs, and master agreements within the Bracco demo.",
  },
  "ia-pulse": {
    section: "IA Pulse",
    title: "Bracco IA Pulse",
    description:
      "AI-assisted summaries, blockers, and next-best actions built in the same product language as the source CRM.",
  },
  reporting: {
    section: "Reporting",
    title: "Operational reporting",
    description:
      "Internal process reporting focused on request volume, cycle time, and market load for the Mexico and USA demo scope.",
  },
  admin: {
    section: "Admin",
    title: "Admin and demo controls",
    description:
      "Roles, bilingual labels, environment switches, and demo operating assumptions live in a familiar CRM admin layer.",
  },
};

export const demoMetrics: DemoMetric[] = [
  { label: "Open requests", value: "42", hint: "Mexico + USA internal process queue" },
  { label: "Approvals due today", value: "9", hint: "Finance, legal, and DG combined" },
  { label: "Contract packs", value: "18", hint: "Quotation, NDA, MSA, procurement docs" },
  { label: "IA alerts", value: "5", hint: "Translation, SLA, or budget friction" },
];

export const demoRequests: DemoRequest[] = [
  {
    id: "BRC-REQ-1042",
    title: "Imaging distributor quotation refresh",
    market: "Mexico",
    module: "Commercial",
    requester: "Fernanda Ruiz",
    owner: "Carlos Mendez",
    stage: "Revisión comercial",
    priority: "high",
    dueDate: "2026-03-18",
    amount: "USD 148,000",
  },
  {
    id: "BRC-REQ-1045",
    title: "Houston service partner NDA",
    market: "USA",
    module: "Legal",
    requester: "Liam Carter",
    owner: "Daniela Soto",
    stage: "Legal",
    priority: "medium",
    dueDate: "2026-03-17",
    amount: "N/A",
  },
  {
    id: "BRC-REQ-1048",
    title: "Cross-border purchase package for demo devices",
    market: "Mexico",
    module: "Compras",
    requester: "Marta Gutierrez",
    owner: "Jorge Perez",
    stage: "Compras",
    priority: "critical",
    dueDate: "2026-03-15",
    amount: "USD 232,000",
  },
  {
    id: "BRC-REQ-1051",
    title: "Clinical event budget release",
    market: "USA",
    module: "Finance",
    requester: "Alex Rivera",
    owner: "Natalie Brooks",
    stage: "Finanzas",
    priority: "high",
    dueDate: "2026-03-16",
    amount: "USD 96,500",
  },
  {
    id: "BRC-REQ-1053",
    title: "Distributor pricing exception",
    market: "Mexico",
    module: "DG",
    requester: "Ana Morales",
    owner: "Marcela Torres",
    stage: "DG",
    priority: "critical",
    dueDate: "2026-03-14",
    amount: "USD 315,000",
  },
  {
    id: "BRC-REQ-1058",
    title: "Bilingual quotation packet for ultrasound line",
    market: "USA",
    module: "Contracts",
    requester: "Jake Foster",
    owner: "Daniela Soto",
    stage: "Aprobado",
    priority: "medium",
    dueDate: "2026-03-20",
    amount: "USD 74,200",
  },
  {
    id: "BRC-REQ-1060",
    title: "Procurement vendor tax validation",
    market: "Mexico",
    module: "Compras",
    requester: "Sofia Valdez",
    owner: "Jorge Perez",
    stage: "Solicitud creada",
    priority: "low",
    dueDate: "2026-03-22",
    amount: "USD 12,000",
  },
  {
    id: "BRC-REQ-1063",
    title: "Master services agreement renewal",
    market: "USA",
    module: "Legal",
    requester: "Nora Patel",
    owner: "Daniela Soto",
    stage: "Cerrado",
    priority: "medium",
    dueDate: "2026-03-11",
    amount: "USD 410,000",
  },
];

export const demoWorkflowStages: DemoWorkflowStage[] = [
  { id: "created", title: "Solicitud creada", count: 6, owner: "Ana Morales", eta: "Today", requests: ["BRC-REQ-1060", "BRC-REQ-1065"] },
  { id: "commercial", title: "Revisión comercial", count: 5, owner: "Carlos Mendez", eta: "4h", requests: ["BRC-REQ-1042", "BRC-REQ-1062"] },
  { id: "procurement", title: "Compras", count: 4, owner: "Jorge Perez", eta: "6h", requests: ["BRC-REQ-1048", "BRC-REQ-1064"] },
  { id: "finance", title: "Finanzas", count: 3, owner: "Natalie Brooks", eta: "1 day", requests: ["BRC-REQ-1051", "BRC-REQ-1066"] },
  { id: "legal", title: "Legal", count: 3, owner: "Daniela Soto", eta: "Today", requests: ["BRC-REQ-1045", "BRC-REQ-1061"] },
  { id: "dg", title: "DG", count: 2, owner: "Marcela Torres", eta: "2h", requests: ["BRC-REQ-1053", "BRC-REQ-1067"] },
  { id: "approved", title: "Aprobado", count: 5, owner: "Shared Services", eta: "Ready", requests: ["BRC-REQ-1058", "BRC-REQ-1068"] },
  { id: "closed", title: "Cerrado", count: 11, owner: "Ops Archive", eta: "Done", requests: ["BRC-REQ-1063", "BRC-REQ-1039"] },
];

export const demoApprovals: DemoApproval[] = [
  {
    department: "Commercial",
    owner: "Carlos Mendez",
    status: "Ready to approve",
    due: "Today, 16:00",
    note: "Pricing guardrails reviewed for Mexico distributor request.",
  },
  {
    department: "Compras",
    owner: "Jorge Perez",
    status: "In review",
    due: "Today, 18:30",
    note: "Vendor tax package missing one invoice reference.",
  },
  {
    department: "Finanzas",
    owner: "Natalie Brooks",
    status: "Waiting",
    due: "Tomorrow, 09:00",
    note: "Budget threshold check for Houston event release.",
  },
  {
    department: "Legal",
    owner: "Daniela Soto",
    status: "Clause redraft",
    due: "Today, 15:15",
    note: "NDA wording updated for bilingual contract pack.",
  },
  {
    department: "DG",
    owner: "Marcela Torres",
    status: "Queued",
    due: "Today, 17:00",
    note: "Strategic exception ready after finance validation.",
  },
];

export const procurementBoard: DemoBoardItem[] = [
  {
    title: "Vendor onboarding for demo equipment",
    owner: "Jorge Perez",
    market: "Mexico",
    status: "Tax file pending",
    note: "Waiting on supplier fiscal certificate before finance handoff.",
  },
  {
    title: "Quotation sourcing for imaging accessories",
    owner: "Elsa Moreno",
    market: "USA",
    status: "3 offers compared",
    note: "Best-value proposal selected for legal review.",
  },
  {
    title: "Shared services purchase packet",
    owner: "Diego Campos",
    market: "Mexico",
    status: "Ready for finance",
    note: "Purchase workflow aligned with local approval thresholds.",
  },
];

export const financeBoard: DemoBoardItem[] = [
  {
    title: "Clinical event budget release",
    owner: "Natalie Brooks",
    market: "USA",
    status: "Variance check",
    note: "Budget delta is within tolerance but needs DG note attached.",
  },
  {
    title: "Distributor rebate reserve",
    owner: "Paola Jimenez",
    market: "Mexico",
    status: "Validated",
    note: "Reserve scenario approved for sales operations follow-up.",
  },
  {
    title: "Quotation margin control",
    owner: "Ricardo Luna",
    market: "USA",
    status: "Watchlist",
    note: "Margin is acceptable if procurement lead time stays below 10 days.",
  },
];

export const legalBoard: DemoBoardItem[] = [
  {
    title: "Houston service partner NDA",
    owner: "Daniela Soto",
    market: "USA",
    status: "Awaiting signature",
    note: "Standard confidentiality pack translated and cleared.",
  },
  {
    title: "Master services agreement renewal",
    owner: "Luis Ortega",
    market: "Mexico",
    status: "Template finalization",
    note: "Bilingual annexes prepared for legal ops review.",
  },
  {
    title: "Promotional claims review",
    owner: "Carla Vega",
    market: "Mexico",
    status: "Commercial clarification",
    note: "Marketing wording needs alignment before approval.",
  },
];

export const contractDesk: DemoContract[] = [
  {
    id: "Q-2026-1082",
    type: "Quotation",
    market: "Mexico",
    languages: "ES / EN",
    owner: "Fernanda Ruiz",
    status: "Ready for approval",
    value: "USD 148,000",
  },
  {
    id: "NDA-2026-221",
    type: "NDA",
    market: "USA",
    languages: "EN / ES",
    owner: "Daniela Soto",
    status: "Auto-generated",
    value: "N/A",
  },
  {
    id: "MSA-2026-044",
    type: "Master Service Agreement",
    market: "USA",
    languages: "EN",
    owner: "Legal Hub",
    status: "Signature in progress",
    value: "USD 1.2M",
  },
  {
    id: "PO-2026-718",
    type: "Purchase workflow",
    market: "Mexico",
    languages: "ES / EN",
    owner: "Jorge Perez",
    status: "Finance validation",
    value: "USD 92,500",
  },
];

export const aiSignals: DemoAiSignal[] = [
  {
    team: "Commercial Ops MX",
    score: 84,
    status: "Positive",
    summary: "Approval friction is low. Questions focus on supplier lead times and quotation margin visibility.",
    nextAction: "Keep commercial review under 24h and route quotation packets straight to procurement.",
  },
  {
    team: "Finance USA",
    score: 61,
    status: "Watch",
    summary: "Teams ask for clearer payment-rule visibility for multi-country orders and cross-border demo packs.",
    nextAction: "Add finance note templates before DG review for high-value requests.",
  },
  {
    team: "Legal Hub",
    score: 76,
    status: "Stable",
    summary: "NDA and MSA templates reduce back-and-forth on standard clauses across Mexico and USA.",
    nextAction: "Expand bilingual clause snippets to procurement-generated vendor packs.",
  },
];

export const reportingSeries: DemoSeriesPoint[] = [
  { month: "Jan", created: 18, approved: 12, closed: 10 },
  { month: "Feb", created: 22, approved: 16, closed: 13 },
  { month: "Mar", created: 27, approved: 20, closed: 18 },
  { month: "Apr", created: 25, approved: 19, closed: 16 },
  { month: "May", created: 31, approved: 24, closed: 20 },
  { month: "Jun", created: 29, approved: 22, closed: 21 },
];

export const reportingRows: DemoReportRow[] = [
  { module: "Solicitudes", market: "Mexico", volume: 18, avgDays: 4.2, sla: "92%" },
  { module: "Workflow", market: "USA", volume: 14, avgDays: 5.1, sla: "88%" },
  { module: "Compras", market: "Mexico", volume: 11, avgDays: 3.8, sla: "94%" },
  { module: "Finanzas", market: "USA", volume: 9, avgDays: 4.9, sla: "90%" },
  { module: "Legal", market: "Mexico", volume: 8, avgDays: 5.4, sla: "86%" },
];

export const adminPanels: DemoAdminPanel[] = [
  {
    title: "Roles and approvals matrix",
    description: "Department leads, DG approvers, and shared services operators mapped to the Bracco demo flow.",
    owner: "Admin Ops",
  },
  {
    title: "Bilingual labels",
    description: "ES / EN labels applied across navigation and process terminology for Mexico and USA demos.",
    owner: "Product Ops",
  },
  {
    title: "Demo tenants and fake users",
    description: "No real customer or employee data. Demo personas only for Bracco presentations.",
    owner: "Demo Governance",
  },
];

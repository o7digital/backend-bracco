export type DepartmentCode =
  | "commercial"
  | "procurement"
  | "finance"
  | "legal"
  | "executive_management";

export type WorkflowPriority = "standard" | "high" | "critical";
export type WorkflowStatus =
  | "draft"
  | "in_review"
  | "awaiting_approval"
  | "approved"
  | "changes_requested";
export type StepStatus = "pending" | "in_review" | "approved" | "at_risk";
export type ApprovalStatus = "pending" | "approved" | "changes_requested";
export type InsightLabel = "positive" | "neutral" | "attention";
export type TrendTone = "up" | "neutral" | "down";
export type AutomationLevel = "guided" | "semi_automatic" | "ready_for_handoff";
export type NotificationChannel = "email" | "slack" | "in_app";
export type NotificationStatus = "queued" | "delivered" | "action_required";

export interface AppMeta {
  name: string;
  tagline: string;
  description: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
  tone: TrendTone;
}

export interface ExecutiveBriefing {
  id: string;
  title: string;
  message: string;
  owner: string;
  eta: string;
}

export interface Department {
  id: string;
  code: DepartmentCode;
  name: string;
  mandate: string;
  leader: string;
  escalationWindowHours: number;
}

export interface Country {
  id: string;
  code: string;
  name: string;
  region: string;
  defaultLanguage: string;
  languages: string[];
  complianceFocus: string;
  coordinationModel: string;
}

export interface UserDirectoryEntry {
  id: string;
  name: string;
  title: string;
  department: DepartmentCode;
  countryCode: string;
  email: string;
  languages: string[];
}

export interface WorkflowStep {
  id: string;
  order: number;
  department: DepartmentCode;
  title: string;
  owner: string;
  slaHours: number;
  status: StepStatus;
}

export interface Workflow {
  id: string;
  title: string;
  summary: string;
  requestedBy: string;
  countryCode: string;
  language: string;
  priority: WorkflowPriority;
  status: WorkflowStatus;
  dueDate: string;
  steps: WorkflowStep[];
}

export interface WorkflowPlaybook {
  id: string;
  name: string;
  primaryDepartment: DepartmentCode;
  description: string;
  markets: string[];
  averageCycleDays: number;
}

export interface ApprovalItem {
  id: string;
  workflowId: string;
  workflowTitle: string;
  department: DepartmentCode;
  approver: string;
  status: ApprovalStatus;
  eta: string;
}

export interface DocumentAutomationCard {
  id: string;
  title: string;
  template: string;
  automationLevel: AutomationLevel;
  owner: string;
  lastUpdated: string;
  note: string;
}

export interface DocumentTemplate {
  id: string;
  code: string;
  name: string;
  department: DepartmentCode;
  automationLevel: AutomationLevel;
  languages: string[];
  coverage: string;
}

export interface SentimentInsight {
  id: string;
  countryCode: string;
  label: InsightLabel;
  score: number;
  topic: string;
  summary: string;
  recommendedAction: string;
}

export interface CountryPipelineStage {
  department: DepartmentCode;
  active: number;
  approved: number;
  atRisk: number;
  owner: string;
}

export interface CountryPipelineSnapshot {
  countryCode: string;
  countryName: string;
  coordinationNote: string;
  stages: CountryPipelineStage[];
}

export interface LanguageCoverage {
  language: string;
  countries: string[];
  translatorMode: string;
  complianceSupport: string;
}

export interface NotificationItem {
  id: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  title: string;
  message: string;
  audience: string;
  scheduledFor: string;
}

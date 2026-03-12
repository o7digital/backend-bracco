import { aiInsights, approvalQueue, countryCoverage, dashboardMetrics, executiveBriefings, featuredWorkflows } from "@bracco/config";

export const getDashboardSummary = () => ({
  metrics: dashboardMetrics,
  executiveBriefings,
  activeWorkflows: featuredWorkflows.length,
  activeCountries: countryCoverage.length,
});

export const getDashboardAlerts = () => ({
  approvalEscalations: approvalQueue.filter((item) => item.status === "changes_requested"),
  sentimentAlerts: aiInsights.filter((item) => item.label === "attention"),
});

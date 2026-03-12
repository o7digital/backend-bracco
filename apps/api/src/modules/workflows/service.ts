import { featuredWorkflows, workflowPlaybooks } from "@bracco/config";

export const listWorkflows = () => featuredWorkflows;

export const listWorkflowPlaybooks = () => workflowPlaybooks;

export const getWorkflowSummary = () => ({
  total: featuredWorkflows.length,
  critical: featuredWorkflows.filter((workflow) => workflow.priority === "critical").length,
  awaitingApproval: featuredWorkflows.filter((workflow) => workflow.status === "awaiting_approval").length,
});

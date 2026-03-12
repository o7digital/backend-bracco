import { approvalQueue } from "@bracco/config";

export const listApprovals = () => approvalQueue;

export const getApprovalSummary = () => ({
  pending: approvalQueue.filter((item) => item.status === "pending").length,
  changesRequested: approvalQueue.filter((item) => item.status === "changes_requested").length,
  approved: approvalQueue.filter((item) => item.status === "approved").length,
});

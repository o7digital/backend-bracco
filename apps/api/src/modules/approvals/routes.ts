import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getApprovalSummary, listApprovals } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(listApprovals(), { module: "approvals" }));
});

router.get("/summary", (_req, res) => {
  res.json(success(getApprovalSummary(), { module: "approvals" }));
});

export { router as approvalsRouter };

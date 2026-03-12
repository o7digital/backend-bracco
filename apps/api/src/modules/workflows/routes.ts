import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getWorkflowSummary, listWorkflowPlaybooks, listWorkflows } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(listWorkflows(), { module: "workflows" }));
});

router.get("/playbooks", (_req, res) => {
  res.json(success(listWorkflowPlaybooks(), { module: "workflows" }));
});

router.get("/summary", (_req, res) => {
  res.json(success(getWorkflowSummary(), { module: "workflows" }));
});

export { router as workflowsRouter };

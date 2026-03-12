import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getDashboardAlerts, getDashboardSummary } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(getDashboardSummary(), { module: "dashboard" }));
});

router.get("/alerts", (_req, res) => {
  res.json(success(getDashboardAlerts(), { module: "dashboard" }));
});

export { router as dashboardRouter };

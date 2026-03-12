import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getAiOverview, listAiInsights } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(listAiInsights(), { module: "ai" }));
});

router.get("/overview", (_req, res) => {
  res.json(success(getAiOverview(), { module: "ai" }));
});

export { router as aiRouter };

import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getAuthOverview, getSessionPolicy } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(getAuthOverview(), { module: "auth" }));
});

router.get("/session-policy", (_req, res) => {
  res.json(success(getSessionPolicy(), { module: "auth" }));
});

export { router as authRouter };

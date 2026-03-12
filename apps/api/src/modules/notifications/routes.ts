import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getNotificationSummary, listNotifications } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(listNotifications(), { module: "notifications" }));
});

router.get("/summary", (_req, res) => {
  res.json(success(getNotificationSummary(), { module: "notifications" }));
});

export { router as notificationsRouter };

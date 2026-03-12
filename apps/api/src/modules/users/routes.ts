import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getDirectorySummary, listUsers } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(listUsers(), { module: "users" }));
});

router.get("/directory-summary", (_req, res) => {
  res.json(success(getDirectorySummary(), { module: "users" }));
});

export { router as usersRouter };

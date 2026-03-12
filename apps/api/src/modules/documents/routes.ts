import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getDocumentSummary, listDocuments, listDocumentTemplates } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(listDocuments(), { module: "documents" }));
});

router.get("/templates", (_req, res) => {
  res.json(success(listDocumentTemplates(), { module: "documents" }));
});

router.get("/summary", (_req, res) => {
  res.json(success(getDocumentSummary(), { module: "documents" }));
});

export { router as documentsRouter };

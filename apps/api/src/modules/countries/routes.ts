import { Router, type Router as ExpressRouter } from "express";
import { success } from "../../lib/http";
import { getCountrySummary, listCountries, listLanguageCoverage } from "./service";

const router: ExpressRouter = Router();

router.get("/", (_req, res) => {
  res.json(success(listCountries(), { module: "countries" }));
});

router.get("/coverage", (_req, res) => {
  res.json(success(listLanguageCoverage(), { module: "countries" }));
});

router.get("/summary", (_req, res) => {
  res.json(success(getCountrySummary(), { module: "countries" }));
});

export { router as countriesRouter };

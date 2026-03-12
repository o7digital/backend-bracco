import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { success } from "./lib/http";
import { modules } from "./modules";

export const createApp = (): Express => {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin: env.appOrigins.includes("*") ? true : env.appOrigins,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

  app.get("/health", (_req, res) => {
    res.json(
      success({
        service: "bracco-process-hub-api",
        status: "ok",
        environment: env.nodeEnv,
      }),
    );
  });

  app.get("/api", (_req, res) => {
    res.json(
      success({
        name: "Bracco Process Hub API",
        version: "0.1.0",
        modules: modules.map((module) => module.path.replace("/", "")),
      }),
    );
  });

  modules.forEach((module) => {
    app.use(`/api${module.path}`, module.router);
  });

  app.use((_req, res) => {
    res.status(404).json({
      ok: false,
      error: "Route not found",
    });
  });

  return app;
};

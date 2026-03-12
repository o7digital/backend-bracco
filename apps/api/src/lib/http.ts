import type { Router } from "express";

export interface ApiModule {
  path: string;
  router: Router;
}

export const success = <T>(data: T, meta: Record<string, unknown> = {}) => ({
  ok: true,
  generatedAt: new Date().toISOString(),
  meta,
  data,
});

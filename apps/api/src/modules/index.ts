import type { ApiModule } from "../lib/http";
import { aiRouter } from "./ai/routes";
import { approvalsRouter } from "./approvals/routes";
import { authRouter } from "./auth/routes";
import { countriesRouter } from "./countries/routes";
import { dashboardRouter } from "./dashboard/routes";
import { documentsRouter } from "./documents/routes";
import { notificationsRouter } from "./notifications/routes";
import { usersRouter } from "./users/routes";
import { workflowsRouter } from "./workflows/routes";

export const modules: ApiModule[] = [
  { path: "/auth", router: authRouter },
  { path: "/users", router: usersRouter },
  { path: "/workflows", router: workflowsRouter },
  { path: "/approvals", router: approvalsRouter },
  { path: "/documents", router: documentsRouter },
  { path: "/ai", router: aiRouter },
  { path: "/notifications", router: notificationsRouter },
  { path: "/countries", router: countriesRouter },
  { path: "/dashboard", router: dashboardRouter },
];

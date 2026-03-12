import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BellRing,
  BrainCircuit,
  Calculator,
  FileSignature,
  FileText,
  LayoutDashboard,
  Scale,
  Settings2,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  adminPanels,
  aiSignals,
  contractDesk,
  demoApprovals,
  demoMetrics,
  demoModuleMeta,
  demoNav,
  demoRequests,
  demoWorkflowStages,
  financeBoard,
  legalBoard,
  procurementBoard,
  reportingRows,
  reportingSeries,
  type DemoBoardItem,
  type DemoContract,
  type DemoModuleId,
  type DemoRequest,
} from "@/data/bracco-crm-demo";
import { cn } from "@/lib/utils";

const iconMap: Record<DemoModuleId, LucideIcon> = {
  dashboard: LayoutDashboard,
  requests: FileText,
  workflow: Workflow,
  approvals: BadgeCheck,
  procurement: ShoppingCart,
  finance: Calculator,
  legal: Scale,
  contracts: FileSignature,
  "ia-pulse": BrainCircuit,
  reporting: BarChart3,
  admin: Settings2,
};

function priorityTone(priority: DemoRequest["priority"]) {
  switch (priority) {
    case "critical":
      return "border-rose-400/30 bg-rose-500/10 text-rose-200";
    case "high":
      return "border-amber-400/30 bg-amber-500/10 text-amber-100";
    case "medium":
      return "border-cyan-400/30 bg-cyan-500/10 text-cyan-100";
    default:
      return "border-slate-300/15 bg-white/5 text-slate-300";
  }
}

function statusTone(status: string) {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("ready") ||
    normalized.includes("approved") ||
    normalized.includes("validated") ||
    normalized.includes("stable")
  ) {
    return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  }

  if (
    normalized.includes("review") ||
    normalized.includes("queued") ||
    normalized.includes("watch") ||
    normalized.includes("pending")
  ) {
    return "border-amber-400/20 bg-amber-500/10 text-amber-100";
  }

  return "border-slate-300/15 bg-white/5 text-slate-300";
}

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="crm-card p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

function BoardCard({ item }: { item: DemoBoardItem }) {
  return (
    <div className="crm-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">{item.title}</p>
          <p className="mt-1 text-xs text-slate-500">
            {item.market} · {item.owner}
          </p>
        </div>
        <span className={cn("rounded-full border px-2.5 py-1 text-xs", statusTone(item.status))}>
          {item.status}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{item.note}</p>
    </div>
  );
}

export default function BraccoCrmShell({ activeModule }: { activeModule: DemoModuleId }) {
  const [requestQuery, setRequestQuery] = useState("");
  const [contractQuery, setContractQuery] = useState("");

  const activeMeta = demoModuleMeta[activeModule];
  const ActiveIcon = iconMap[activeModule];

  const filteredRequests = useMemo(() => {
    if (!requestQuery.trim()) {
      return demoRequests;
    }

    const q = requestQuery.toLowerCase();
    return demoRequests.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [requestQuery]);

  const filteredContracts = useMemo(() => {
    if (!contractQuery.trim()) {
      return contractDesk;
    }

    const q = contractQuery.toLowerCase();
    return contractDesk.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [contractQuery]);

  const requestsByStage = useMemo(() => {
    return demoWorkflowStages.map((stage) => ({
      ...stage,
      openValue: demoRequests
        .filter((request) => request.stage === stage.title)
        .map((request) => request.amount)
        .join(" · "),
    }));
  }, []);

  return (
    <div className="crm-theme">
      <header className="crm-app-header sticky top-0 z-20 border-b backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="crm-brand-mark flex h-10 w-10 items-center justify-center rounded-xl font-black">
              BR
            </div>
            <div>
              <p className="text-lg font-semibold">Bracco Demo CRM</p>
              <p className="text-xs text-slate-400">Based on the o7 PulseCRM shell · Mexico / USA · Fake data only</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 text-sm md:flex">
            {demoNav.map((item) => {
              const Icon = iconMap[item.id];
              const active = item.id === activeModule;

              return (
                <a
                  className={cn(
                    "crm-nav-link flex items-center gap-2",
                    active ? "crm-nav-link-active" : "text-slate-300 hover:bg-white/5",
                  )}
                  href={item.href}
                  key={item.id}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a className="crm-btn-secondary text-sm" href="/">
              Landing
            </a>
            <div className="crm-card px-3 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Demo user</p>
              <p className="text-sm font-semibold text-slate-100">Ana Morales · Ops Lead</p>
            </div>
          </div>
        </div>

        <div className="mx-auto block max-w-7xl px-4 pb-4 md:hidden">
          <nav className="flex flex-wrap gap-2 text-sm">
            {demoNav.map((item) => {
              const Icon = iconMap[item.id];
              const active = item.id === activeModule;

              return (
                <a
                  className={cn(
                    "crm-nav-link flex items-center gap-2",
                    active ? "crm-nav-link-active" : "text-slate-300 hover:bg-white/5",
                  )}
                  href={item.href}
                  key={item.id}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="crm-card mb-8 p-6"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="border border-white/10 bg-white/5 text-slate-200">Bracco internal process demo</Badge>
                <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">ES / EN ready</Badge>
                <Badge className="border border-cyan-400/20 bg-cyan-500/10 text-cyan-100">MX / USA context</Badge>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Reusing the CRM foundation, not a blank mockup.
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-slate-300">
                This demo keeps the Bracco landing page intact and moves the main experience into a real CRM-style shell
                inspired by the existing o7 PulseCRM product: same dark SaaS tone, module navigation, operational cards,
                tables, and workflow-first UX patterns.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3 lg:w-[420px]">
              <div className="crm-card p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Tenant</p>
                <p className="mt-2 font-semibold text-slate-100">Bracco Process Hub</p>
              </div>
              <div className="crm-card p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Region</p>
                <p className="mt-2 font-semibold text-slate-100">Mexico + USA</p>
              </div>
              <div className="crm-card p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Mode</p>
                <p className="mt-2 font-semibold text-slate-100">Demo only</p>
              </div>
            </div>
          </div>
        </motion.div>

        <section className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.15em] text-slate-400">{activeMeta.section}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-200">
                <ActiveIcon className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-semibold">{activeMeta.title}</h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{activeMeta.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="border border-white/10 bg-white/5 text-slate-200">Fake data only</Badge>
            <Badge className="border border-amber-400/20 bg-amber-500/10 text-amber-100">Bracco demo labels</Badge>
            <Badge className="border border-cyan-400/20 bg-cyan-500/10 text-cyan-100">o7 CRM shell pattern</Badge>
          </div>
        </section>

        {activeModule === "dashboard" && (
          <section className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {demoMetrics.map((metric) => (
                <MetricCard hint={metric.hint} key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.8fr]">
              <div className="crm-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Requests trend</p>
                    <h3 className="text-xl font-semibold">Created vs approved vs closed</h3>
                  </div>
                  <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">
                    Weekly pulse
                  </Badge>
                </div>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer height="100%" width="100%">
                    <AreaChart data={reportingSeries}>
                      <defs>
                        <linearGradient id="createdFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#4f8e57" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#4f8e57" stopOpacity={0.03} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(233,237,245,0.08)" strokeDasharray="4 4" />
                      <XAxis axisLine={false} dataKey="month" tick={{ fill: "#9fb3c8" }} tickLine={false} />
                      <YAxis axisLine={false} tick={{ fill: "#9fb3c8" }} tickLine={false} />
                      <Tooltip />
                      <Area dataKey="created" fill="url(#createdFill)" stroke="#4f8e57" strokeWidth={3} type="monotone" />
                      <Area dataKey="approved" fill="transparent" stroke="#22d3ee" strokeWidth={2} type="monotone" />
                      <Area dataKey="closed" fill="transparent" stroke="#cbd5e1" strokeWidth={2} type="monotone" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="crm-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Workflow funnel</p>
                    <h3 className="text-xl font-semibold">Bracco process stages</h3>
                  </div>
                  <Workflow className="h-5 w-5 text-emerald-300" />
                </div>
                <div className="mt-5 space-y-3">
                  {requestsByStage.map((stage) => (
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4" key={stage.id}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-100">{stage.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{stage.owner}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">{stage.count}</p>
                          <p className="text-xs text-slate-500">{stage.eta}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="crm-card overflow-hidden">
                <div className="border-b border-white/8 px-5 py-4">
                  <p className="text-sm text-slate-400">Recent requests</p>
                  <h3 className="text-xl font-semibold">Live operational queue</h3>
                </div>
                <div className="divide-y divide-white/6">
                  {demoRequests.slice(0, 5).map((request) => (
                    <div className="grid gap-3 px-5 py-4 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]" key={request.id}>
                      <div>
                        <p className="font-medium text-slate-100">{request.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{request.id}</p>
                      </div>
                      <p className="text-sm text-slate-300">{request.market}</p>
                      <p className="text-sm text-slate-300">{request.owner}</p>
                      <p className="text-sm text-slate-300">{request.stage}</p>
                      <p className="text-sm text-slate-300">{request.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="crm-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Approval desk</p>
                    <h3 className="text-xl font-semibold">Due today</h3>
                  </div>
                  <BellRing className="h-5 w-5 text-cyan-200" />
                </div>
                <div className="mt-5 space-y-3">
                  {demoApprovals.slice(0, 4).map((approval) => (
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4" key={approval.department}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-100">{approval.department}</p>
                          <p className="mt-1 text-xs text-slate-500">{approval.owner}</p>
                        </div>
                        <span className={cn("rounded-full border px-2.5 py-1 text-xs", statusTone(approval.status))}>
                          {approval.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-300">{approval.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeModule === "requests" && (
          <section className="space-y-6">
            <div className="crm-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">Search and triage</p>
                  <h3 className="text-xl font-semibold">Request register</h3>
                </div>
                <div className="w-full max-w-md">
                  <Input
                    className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
                    onChange={(event) => setRequestQuery(event.target.value)}
                    placeholder="Search by request, owner, market..."
                    value={requestQuery}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.8fr]">
              <div className="crm-card overflow-hidden">
                <div className="grid grid-cols-6 gap-3 border-b border-white/8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <div>ID</div>
                  <div>Solicitud</div>
                  <div>Market</div>
                  <div>Owner</div>
                  <div>Stage</div>
                  <div>Priority</div>
                </div>
                {filteredRequests.map((request) => (
                  <div className="grid grid-cols-6 gap-3 border-b border-white/6 px-5 py-4 text-sm last:border-b-0" key={request.id}>
                    <div className="font-medium text-slate-100">{request.id}</div>
                    <div className="text-slate-300">{request.title}</div>
                    <div className="text-slate-300">{request.market}</div>
                    <div className="text-slate-300">{request.owner}</div>
                    <div className="text-slate-300">{request.stage}</div>
                    <div>
                      <span className={cn("rounded-full border px-2.5 py-1 text-xs", priorityTone(request.priority))}>
                        {request.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="crm-card p-5">
                  <p className="text-sm text-slate-400">Route summary</p>
                  <h3 className="mt-2 text-xl font-semibold">Workflow distribution</h3>
                  <div className="mt-5 space-y-3">
                    {demoWorkflowStages.map((stage) => (
                      <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3" key={stage.id}>
                        <span className="text-sm text-slate-300">{stage.title}</span>
                        <span className="text-sm font-semibold text-slate-100">{stage.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="crm-card p-5">
                  <p className="text-sm text-slate-400">Market coverage</p>
                  <h3 className="mt-2 text-xl font-semibold">Demo scope</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="border border-white/10 bg-white/5 text-slate-200">Mexico</Badge>
                    <Badge className="border border-white/10 bg-white/5 text-slate-200">USA</Badge>
                    <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">ES / EN labels</Badge>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeModule === "workflow" && (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {demoWorkflowStages.map((stage) => (
                <div className="crm-card p-5" key={stage.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-400">{stage.title}</p>
                      <p className="mt-2 text-3xl font-semibold">{stage.count}</p>
                    </div>
                    <Badge className="border border-white/10 bg-white/5 text-slate-200">{stage.eta}</Badge>
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-500">{stage.owner}</p>
                  <div className="mt-4 space-y-2">
                    {stage.requests.map((requestId) => (
                      <div className="rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-sm text-slate-300" key={requestId}>
                        {requestId}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="crm-card p-5">
              <p className="text-sm text-slate-400">Workflow path</p>
              <h3 className="mt-2 text-xl font-semibold">Bracco process sequence</h3>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                {demoWorkflowStages.map((stage, index) => (
                  <div className="flex items-center gap-2" key={stage.id}>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{stage.title}</span>
                    {index < demoWorkflowStages.length - 1 ? <ArrowRight className="h-4 w-4 text-slate-500" /> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeModule === "approvals" && (
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {demoApprovals.map((approval) => (
                <div className="crm-card p-5" key={approval.department}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-100">{approval.department}</p>
                      <p className="mt-1 text-sm text-slate-400">{approval.owner}</p>
                    </div>
                    <span className={cn("rounded-full border px-2.5 py-1 text-xs", statusTone(approval.status))}>
                      {approval.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{approval.note}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-500">{approval.due}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="crm-card p-5">
                <p className="text-sm text-slate-400">SLA posture</p>
                <h3 className="mt-2 text-xl font-semibold">Department health</h3>
                <div className="mt-5 space-y-3">
                  {[
                    ["Commercial", "Inside SLA"],
                    ["Compras", "2 items to review"],
                    ["Finanzas", "1 threshold alert"],
                    ["Legal", "Clause update in progress"],
                    ["DG", "Queue ready for final sign-off"],
                  ].map(([label, text]) => (
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4" key={label}>
                      <p className="font-medium text-slate-100">{label}</p>
                      <p className="mt-1 text-sm text-slate-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="crm-card p-5">
                <p className="text-sm text-slate-400">Ready for DG</p>
                <h3 className="mt-2 text-xl font-semibold">Executive lane</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Two requests are waiting for DG after finance and legal complete. This mirrors the source CRM pattern
                  where the final decision stays visible in the same shell rather than moving to a separate tool.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeModule === "procurement" && (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {procurementBoard.map((item) => (
                <BoardCard item={item} key={item.title} />
              ))}
            </div>
            <div className="crm-card p-5">
              <p className="text-sm text-slate-400">Procurement summary</p>
              <h3 className="mt-2 text-xl font-semibold">Vendor and sourcing checks</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <MetricCard hint="Cross-border demo packs" label="Open sourcing files" value="7" />
                <MetricCard hint="Finance next-step reviews" label="Ready for finance" value="3" />
                <MetricCard hint="Legal + procurement handoff" label="Awaiting contract clauses" value="2" />
              </div>
            </div>
          </section>
        )}

        {activeModule === "finance" && (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {financeBoard.map((item) => (
                <BoardCard item={item} key={item.title} />
              ))}
            </div>
            <div className="crm-card p-5">
              <p className="text-sm text-slate-400">Finance thresholds</p>
              <h3 className="mt-2 text-xl font-semibold">Budget and release controls</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <MetricCard hint="Value above DG threshold" label="High-value requests" value="4" />
                <MetricCard hint="Average review time" label="Finance cycle" value="1.8 days" />
                <MetricCard hint="Bilingual summary packs sent" label="Memo packets" value="12" />
              </div>
            </div>
          </section>
        )}

        {activeModule === "legal" && (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {legalBoard.map((item) => (
                <BoardCard item={item} key={item.title} />
              ))}
            </div>
            <div className="crm-card p-5">
              <p className="text-sm text-slate-400">Clause posture</p>
              <h3 className="mt-2 text-xl font-semibold">Legal focus areas</h3>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  "NDA standardization for USA partnerships",
                  "Bilingual annex consistency for Mexico approvals",
                  "Policy alignment before DG sign-off",
                ].map((item) => (
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-slate-300" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeModule === "contracts" && (
          <section className="space-y-6">
            <div className="crm-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-slate-400">Document workspace</p>
                  <h3 className="mt-2 text-xl font-semibold">Contracts / NDA / Quotations</h3>
                </div>
                <div className="w-full max-w-md">
                  <Input
                    className="border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
                    onChange={(event) => setContractQuery(event.target.value)}
                    placeholder="Search by contract, owner, market..."
                    value={contractQuery}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="crm-card overflow-hidden">
                <div className="grid grid-cols-6 gap-3 border-b border-white/8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <div>ID</div>
                  <div>Type</div>
                  <div>Market</div>
                  <div>Languages</div>
                  <div>Owner</div>
                  <div>Status</div>
                </div>
                {filteredContracts.map((doc: DemoContract) => (
                  <div className="grid grid-cols-6 gap-3 border-b border-white/6 px-5 py-4 text-sm last:border-b-0" key={doc.id}>
                    <div className="font-medium text-slate-100">{doc.id}</div>
                    <div className="text-slate-300">{doc.type}</div>
                    <div className="text-slate-300">{doc.market}</div>
                    <div className="text-slate-300">{doc.languages}</div>
                    <div className="text-slate-300">{doc.owner}</div>
                    <div>
                      <span className={cn("rounded-full border px-2.5 py-1 text-xs", statusTone(doc.status))}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="crm-card p-5">
                  <p className="text-sm text-slate-400">Template packs</p>
                  <h3 className="mt-2 text-xl font-semibold">Reusable contract base</h3>
                  <div className="mt-5 space-y-3">
                    {[
                      "Quotation packet ES / EN",
                      "NDA with bilingual signature instructions",
                      "Master services agreement with Bracco demo labels",
                    ].map((item) => (
                      <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-slate-300" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="crm-card p-5">
                  <p className="text-sm text-slate-400">Document value</p>
                  <h3 className="mt-2 text-xl font-semibold">Tracked exposure</h3>
                  <p className="mt-4 text-3xl font-semibold text-slate-100">USD 1.76M</p>
                  <p className="mt-2 text-sm text-slate-400">Fake values across quotations, MSA, and purchase workflows.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeModule === "ia-pulse" && (
          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              {aiSignals.map((signal) => (
                <div className="crm-card p-5" key={signal.team}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-100">{signal.team}</p>
                      <p className="mt-1 text-sm text-slate-500">{signal.status}</p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-right">
                      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Score</p>
                      <p className="mt-1 text-lg font-semibold text-slate-100">{signal.score}/100</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{signal.summary}</p>
                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                    {signal.nextAction}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="crm-card p-5">
                <p className="text-sm text-slate-400">Recommended next actions</p>
                <h3 className="mt-2 text-xl font-semibold">IA Pulse summary</h3>
                <div className="mt-5 space-y-3">
                  {[
                    "Attach finance note templates before DG review",
                    "Keep bilingual NDA snippets ready for USA vendor requests",
                    "Escalate procurement tax-file blockers within the same shell",
                  ].map((item) => (
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-slate-300" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="crm-card p-5">
                <p className="text-sm text-slate-400">Mode</p>
                <h3 className="mt-2 text-xl font-semibold">Demo-safe AI layer</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  No live models or customer content. All summaries, signals, and email suggestions are fake and
                  presentation-safe while preserving the IA Pulse product feel.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeModule === "reporting" && (
          <section className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="crm-card p-5">
                <div className="mb-4">
                  <p className="text-sm text-slate-400">Operations trend</p>
                  <h3 className="text-xl font-semibold">Created vs closed volume</h3>
                </div>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer height="100%" width="100%">
                    <BarChart data={reportingSeries}>
                      <CartesianGrid stroke="rgba(233,237,245,0.08)" strokeDasharray="4 4" />
                      <XAxis axisLine={false} dataKey="month" tick={{ fill: "#9fb3c8" }} tickLine={false} />
                      <YAxis axisLine={false} tick={{ fill: "#9fb3c8" }} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="created" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="closed" fill="#4f8e57" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="crm-card p-5">
                <p className="text-sm text-slate-400">SLA by module</p>
                <h3 className="mt-2 text-xl font-semibold">Reporting view</h3>
                <div className="mt-5 space-y-3">
                  {reportingRows.map((row) => (
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-4" key={`${row.module}-${row.market}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-100">{row.module}</p>
                          <p className="mt-1 text-xs text-slate-500">{row.market}</p>
                        </div>
                        <Badge className="border border-emerald-400/20 bg-emerald-500/10 text-emerald-200">{row.sla}</Badge>
                      </div>
                      <p className="mt-3 text-sm text-slate-300">
                        {row.volume} items · {row.avgDays} day average cycle
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="crm-card overflow-hidden">
              <div className="grid grid-cols-4 gap-3 border-b border-white/8 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                <div>Module</div>
                <div>Market</div>
                <div>Volume</div>
                <div>Avg cycle</div>
              </div>
              {reportingRows.map((row) => (
                <div className="grid grid-cols-4 gap-3 border-b border-white/6 px-5 py-4 text-sm last:border-b-0" key={`${row.module}-${row.market}-table`}>
                  <div className="font-medium text-slate-100">{row.module}</div>
                  <div className="text-slate-300">{row.market}</div>
                  <div className="text-slate-300">{row.volume}</div>
                  <div className="text-slate-300">{row.avgDays} days</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeModule === "admin" && (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {adminPanels.map((panel) => (
                <div className="crm-card p-5" key={panel.title}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-100">{panel.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{panel.owner}</p>
                    </div>
                    <Settings2 className="h-5 w-5 text-cyan-200" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{panel.description}</p>
                </div>
              ))}
            </div>

            <div className="crm-card p-5">
              <p className="text-sm text-slate-400">Demo assumptions</p>
              <h3 className="mt-2 text-xl font-semibold">Environment notes</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <MetricCard hint="No production connection" label="Data source" value="Fake dataset" />
                <MetricCard hint="Landing preserved at root" label="Entry points" value="/ + /demo/*" />
                <MetricCard hint="Bracco repo remote stays active" label="Repository" value="backend-bracco" />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

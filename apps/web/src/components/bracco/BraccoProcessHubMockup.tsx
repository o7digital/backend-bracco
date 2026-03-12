import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileCheck2,
  FileSignature,
  Globe2,
  Languages,
  Mail,
  MapPinned,
  Microscope,
  SearchCheck,
  ShieldCheck,
  Stethoscope,
  Workflow,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const approvals = [
  { dept: "Commercial", owner: "S. Moretti", status: "Approved", sla: "3h 12m" },
  { dept: "Procurement", owner: "L. Rinaldi", status: "In review", sla: "6h 40m" },
  { dept: "Finance", owner: "A. Dubois", status: "Pending", sla: "Waiting" },
  { dept: "Legal", owner: "E. Caruso", status: "Drafting NDA", sla: "1h 05m" },
  { dept: "General Mgmt", owner: "M. Ferretti", status: "Queued", sla: "Today" },
];

const workflowData = [
  { name: "Created", value: 148 },
  { name: "Commercial", value: 132 },
  { name: "Procurement", value: 106 },
  { name: "Finance", value: 89 },
  { name: "Legal", value: 74 },
  { name: "DG", value: 51 },
  { name: "Signed", value: 44 },
];

const countryData = [
  { country: "Italy", active: 24 },
  { country: "France", active: 18 },
  { country: "Spain", active: 14 },
  { country: "Mexico", active: 11 },
  { country: "Brazil", active: 9 },
  { country: "USA", active: 7 },
];

const sentimentFeed = [
  {
    team: "Commercial Ops",
    score: 84,
    label: "Positive",
    insight: "Approval friction is low. Objections mainly concern supplier lead times.",
  },
  {
    team: "Finance",
    score: 61,
    label: "Watch",
    insight: "Teams ask for clearer payment-rule visibility for multi-country orders.",
  },
  {
    team: "Legal",
    score: 76,
    label: "Stable",
    insight: "NDA and MSA templates reduce back-and-forth on standard clauses.",
  },
];

const contracts = [
  {
    id: "Q-2026-1082",
    type: "Quotation",
    region: "EMEA",
    lang: "EN / IT",
    owner: "Giulia B.",
    status: "Ready for approval",
    value: "EUR 148,000",
  },
  {
    id: "NDA-2026-221",
    type: "NDA",
    region: "LATAM",
    lang: "ES / EN",
    owner: "Marco L.",
    status: "Auto-generated",
    value: "N/A",
  },
  {
    id: "MSA-2026-044",
    type: "Master Service Agreement",
    region: "Global",
    lang: "EN / FR / IT",
    owner: "Legal Hub",
    status: "Signature in progress",
    value: "EUR 1.2M",
  },
  {
    id: "PO-2026-718",
    type: "Purchase workflow",
    region: "NA",
    lang: "EN",
    owner: "Helena S.",
    status: "Finance validation",
    value: "USD 92,500",
  },
];

const deptPills = ["Commercial", "Procurement", "Finance", "Legal", "DG", "Shared Services"];

type StatCardProps = {
  title: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
};

function StatCard({ title, value, hint, icon: Icon }: StatCardProps) {
  return (
    <Card className="rounded-3xl border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
            <p className="mt-2 text-sm text-slate-500">{hint}</p>
          </div>
          <div className="rounded-2xl bg-[#508c54]/10 p-3 text-[#508c54]">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function statusTone(status: string) {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("approved") ||
    normalized.includes("ready") ||
    normalized.includes("auto")
  ) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (
    normalized.includes("review") ||
    normalized.includes("progress") ||
    normalized.includes("validation")
  ) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function BraccoProcessHubMockup() {
  const [query, setQuery] = useState("");

  const filteredContracts = useMemo(() => {
    if (!query.trim()) {
      return contracts;
    }

    const normalizedQuery = query.toLowerCase();

    return contracts.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(normalizedQuery)),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e8f4ea,transparent_35%),radial-gradient(circle_at_top_right,#eef4ff,transparent_30%),linear-gradient(180deg,#f6faf7_0%,#f5f7fb_55%,#eef3f1_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[32px] border border-white/70 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#508c54] text-white shadow-lg shadow-[#508c54]/20">
                <Microscope className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight">BRACCO Process Hub</h1>
                  <Badge className="rounded-full border border-[#508c54]/20 bg-[#508c54]/10 px-3 py-1 text-[#508c54] hover:bg-[#508c54]/10">
                    Concept mockup
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Cross-department workflow orchestration for commercial, procurement, finance, legal and DG approvals.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-full border-slate-200 bg-white px-3 py-1 text-slate-700">
                <Globe2 className="mr-2 h-4 w-4" /> 6 countries online
              </Badge>
              <Badge variant="outline" className="rounded-full border-slate-200 bg-white px-3 py-1 text-slate-700">
                <Languages className="mr-2 h-4 w-4" /> EN / FR / IT / ES / PT
              </Badge>
              <Button className="rounded-2xl bg-[#508c54] px-5 text-white hover:bg-[#457b48]">
                Open executive cockpit
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="lg:col-span-8"
          >
            <Card className="overflow-hidden rounded-[32px] border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
              <CardContent className="p-0">
                <div className="grid gap-0 lg:grid-cols-[1.25fr_0.95fr]">
                  <div className="p-7 sm:p-8">
                    <Badge className="rounded-full bg-[#508c54]/10 px-3 py-1 text-[#508c54] hover:bg-[#508c54]/10">
                      Pharma-grade workflow management
                    </Badge>
                    <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                      One platform to route requests, approvals, contracts and communications.
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                      Built as an internal process backbone for multi-country teams, with workflow automation, document generation,
                      multilingual collaboration, sentiment analysis and audit-ready decision trails.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {deptPills.map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-4">
                        <p className="text-sm text-slate-500">Approval SLA</p>
                        <p className="mt-2 text-2xl font-semibold">-34%</p>
                        <p className="mt-1 text-sm text-slate-600">Average reduction in approval time</p>
                      </div>
                      <div className="rounded-3xl border border-sky-100 bg-sky-50/80 p-4">
                        <p className="text-sm text-slate-500">Contract automation</p>
                        <p className="mt-2 text-2xl font-semibold">82%</p>
                        <p className="mt-1 text-sm text-slate-600">Templates generated without manual rewrite</p>
                      </div>
                      <div className="rounded-3xl border border-violet-100 bg-violet-50/80 p-4">
                        <p className="text-sm text-slate-500">Multi-language usage</p>
                        <p className="mt-2 text-2xl font-semibold">5 langs</p>
                        <p className="mt-1 text-sm text-slate-600">Interface, templates and email flows</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l border-slate-100 bg-[linear-gradient(180deg,#f7fbf8_0%,#eef6ef_100%)] p-6 sm:p-7">
                    <div className="rounded-[28px] border border-white bg-white/90 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Live approval path</p>
                          <p className="text-lg font-semibold">Global strategic request</p>
                        </div>
                        <Badge className="rounded-full bg-amber-100 text-amber-800 hover:bg-amber-100">Finance next</Badge>
                      </div>

                      <div className="mt-5 space-y-3">
                        {approvals.map((step, idx) => (
                          <div key={step.dept} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-2xl ${
                                idx < 1
                                  ? "bg-emerald-100 text-emerald-700"
                                  : idx === 1
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {idx < 1 ? <CheckCircle2 className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-medium text-slate-800">{step.dept}</p>
                                <Badge variant="outline" className={`rounded-full border px-2.5 py-1 text-xs ${statusTone(step.status)}`}>
                                  {step.status}
                                </Badge>
                              </div>
                              <div className="mt-1 flex items-center justify-between gap-3 text-sm text-slate-500">
                                <span>{step.owner}</span>
                                <span>{step.sla}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[28px] border border-white bg-white/85 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                        <p className="text-sm text-slate-500">AI mail assistant</p>
                        <p className="mt-2 text-xl font-semibold">Suggests replies, escalations and reminders</p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4 text-[#508c54]" /> Outlook / Gmail ready
                        </div>
                      </div>
                      <div className="rounded-[28px] border border-white bg-white/85 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                        <p className="text-sm text-slate-500">Document engine</p>
                        <p className="mt-2 text-xl font-semibold">Quotes, NDA, MSA and purchase flows auto-generated</p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                          <FileSignature className="h-4 w-4 text-[#508c54]" /> Versioned and auditable
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="grid gap-4 lg:col-span-4"
          >
            <StatCard title="Open workflows" value="148" hint="Across approvals, contracts and procurement paths" icon={Workflow} />
            <StatCard title="Documents automated" value="1,284" hint="Quotes, NDA, MSA, PO and renewal packs" icon={FileCheck2} />
            <StatCard title="AI insights generated" value="362" hint="Sentiment, blockers, risk signals and next actions" icon={Brain} />
          </motion.div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card className="rounded-[32px] border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl">Workflow funnel by stage</CardTitle>
                    <p className="mt-1 text-sm text-slate-500">Illustrative data for internal request routing.</p>
                  </div>
                  <Badge variant="outline" className="rounded-full bg-white">Updated live</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={workflowData}>
                      <defs>
                        <linearGradient id="workflowFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#508c54" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#508c54" stopOpacity={0.04} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#508c54" strokeWidth={3} fill="url(#workflowFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="rounded-[32px] border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Country adoption snapshot</CardTitle>
                <p className="text-sm text-slate-500">Pilot-ready multi-country deployment view.</p>
              </CardHeader>
              <CardContent>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={countryData} layout="vertical" margin={{ left: 10, right: 10 }}>
                      <CartesianGrid stroke="#eef2f7" strokeDasharray="4 4" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="country" type="category" tickLine={false} axisLine={false} width={70} />
                      <Tooltip />
                      <Bar dataKey="active" fill="#508c54" radius={[0, 10, 10, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Card className="h-full rounded-[32px] border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">AI sentiment and friction radar</CardTitle>
                  <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                    Hugging Face layer
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {sentimentFeed.map((item) => (
                  <div key={item.team} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{item.team}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Score</p>
                        <p className="text-lg font-semibold text-slate-900">{item.score}/100</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.insight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <Card className="rounded-[32px] border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-xl">Automated documents workspace</CardTitle>
                    <p className="mt-1 text-sm text-slate-500">Illustrative records only. No real customer data.</p>
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search by doc, owner, region..."
                      className="rounded-2xl border-slate-200 bg-white pl-10"
                    />
                    <SearchCheck className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-3xl border border-slate-100">
                  <div className="grid grid-cols-6 gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <div>ID</div>
                    <div>Type</div>
                    <div>Region</div>
                    <div>Language</div>
                    <div>Owner</div>
                    <div>Status</div>
                  </div>
                  {filteredContracts.map((doc) => (
                    <div key={doc.id} className="grid grid-cols-6 gap-3 border-b border-slate-100 bg-white px-4 py-4 text-sm last:border-b-0">
                      <div className="font-medium text-slate-900">{doc.id}</div>
                      <div className="text-slate-700">{doc.type}</div>
                      <div className="text-slate-700">{doc.region}</div>
                      <div className="text-slate-700">{doc.lang}</div>
                      <div className="text-slate-700">{doc.owner}</div>
                      <div>
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${statusTone(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: ClipboardList,
              title: "Workflow Engine",
              text: "Custom approval chains by department, amount, country, product family and risk level.",
            },
            {
              icon: FileSignature,
              title: "Document Automation",
              text: "Generate quotations, contracts, NDA, renewal notices and email drafts from structured data.",
            },
            {
              icon: Languages,
              title: "Multi-language Layer",
              text: "Localized UI, templates and notification logic for international teams and external stakeholders.",
            },
            {
              icon: ShieldCheck,
              title: "Audit & Compliance",
              text: "Role-based permissions, history logs, approval traceability and country-aware controls.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.04, duration: 0.45 }}
            >
              <Card className="h-full rounded-[32px] border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#508c54]/10 text-[#508c54]">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[32px] border-white/60 bg-slate-950 text-white shadow-[0_20px_60px_rgba(15,23,42,0.22)]">
            <CardContent className="p-7 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">Suggested stack</Badge>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight">Astro + React on the front. Supabase + Railway on the back.</h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                    Reuse the latest CRM foundation, then add a dedicated process layer: request orchestration, template engine,
                    country rules, AI assistants, multilingual notifications and executive analytics.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Button className="rounded-2xl bg-[#508c54] px-5 text-white hover:bg-[#457b48]">
                    Build from CRM core
                  </Button>
                  <Button variant="outline" className="rounded-2xl border-white/20 bg-transparent text-white hover:bg-white/10">
                    Export for Codex brief
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-white/60 bg-white/85 shadow-[0_10px_40px_rgba(80,140,84,0.08)] backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">Module roadmap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Phase 1", "Core workflow + approvals + roles"],
                ["Phase 2", "Quotes, NDA, contracts and email automation"],
                ["Phase 3", "Sentiment analysis + executive analytics + multilingual rollout"],
                ["Phase 4", "Mobile wrapper + field approvals + push notifications"],
              ].map(([phase, desc]) => (
                <div key={phase} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                  <div className="mt-0.5 rounded-xl bg-[#508c54]/10 p-2 text-[#508c54]">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{phase}</p>
                    <p className="mt-1 text-sm text-slate-600">{desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { icon: Building2, label: "Departments", value: "6 connected" },
            { icon: MapPinned, label: "Countries", value: "Multi-country rules" },
            { icon: Bot, label: "AI", value: "Copilot for teams" },
            { icon: Bell, label: "Alerts", value: "SLA & escalation engine" },
            { icon: Stethoscope, label: "Positioning", value: "Healthcare enterprise UX" },
          ].map((item) => (
            <div key={item.label} className="rounded-[28px] border border-white/60 bg-white/75 p-4 shadow-[0_10px_40px_rgba(80,140,84,0.06)] backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#508c54]/10 p-2.5 text-[#508c54]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="font-semibold text-slate-900">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

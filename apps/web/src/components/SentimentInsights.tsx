import { useState } from "react";
import { aiInsights, countryCoverage } from "@bracco/config";
import type { InsightLabel } from "@bracco/types";

const filters: Array<{ label: string; value: InsightLabel | "all" }> = [
  { label: "All signals", value: "all" },
  { label: "Attention", value: "attention" },
  { label: "Neutral", value: "neutral" },
  { label: "Positive", value: "positive" },
];

const toneClasses: Record<InsightLabel, string> = {
  positive: "border-emerald-200 bg-emerald-50 text-emerald-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  attention: "border-amber-200 bg-amber-50 text-amber-700",
};

const countryNames = Object.fromEntries(countryCoverage.map((country) => [country.code, country.name]));

export default function SentimentInsights() {
  const [activeFilter, setActiveFilter] = useState<InsightLabel | "all">("all");

  const filteredInsights =
    activeFilter === "all" ? aiInsights : aiInsights.filter((entry) => entry.label === activeFilter);

  const totals = {
    positive: aiInsights.filter((entry) => entry.label === "positive").length,
    neutral: aiInsights.filter((entry) => entry.label === "neutral").length,
    attention: aiInsights.filter((entry) => entry.label === "attention").length,
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.75fr]">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "border-bracco-green bg-bracco-mint text-bracco-green"
                    : "border-bracco-line bg-white/80 text-bracco-muted hover:border-bracco-green hover:text-bracco-green",
                ].join(" ")}
                onClick={() => setActiveFilter(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4">
          {filteredInsights.map((insight) => (
            <article
              className="rounded-[26px] border border-bracco-line/80 bg-white/82 p-5 shadow-[0_18px_50px_rgba(17,36,27,0.06)]"
              key={insight.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="label-chip">{countryNames[insight.countryCode] ?? insight.countryCode}</span>
                    <span className={`rounded-full border px-3 py-1 text-sm font-medium ${toneClasses[insight.label]}`}>
                      {insight.label}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-bracco-ink">{insight.topic}</h3>
                </div>
                <div className="rounded-[20px] border border-bracco-line/70 bg-bracco-stone/70 px-4 py-3 text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bracco-muted">Confidence</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-bracco-ink">{insight.score}%</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-bracco-muted">{insight.summary}</p>

              <div className="mt-5 h-2.5 rounded-full bg-bracco-mint/50">
                <div className="h-full rounded-full bg-bracco-green" style={{ width: `${insight.score}%` }} />
              </div>

              <div className="mt-5 rounded-[22px] border border-bracco-line/75 bg-bracco-stone/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bracco-muted">
                  Recommended action
                </p>
                <p className="mt-2 text-sm leading-6 text-bracco-ink">{insight.recommendedAction}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="surface p-6">
        <div className="space-y-3 border-b border-bracco-line/80 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-bracco-green">Signal balance</p>
          <h3 className="text-2xl font-semibold tracking-tight text-bracco-ink">AI-assisted narrative scan</h3>
          <p className="text-sm leading-6 text-bracco-muted">
            Placeholder sentiment analysis highlights where wording, assumptions, or translation quality can delay the
            next approval.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-[24px] bg-bracco-mint/60 p-4">
            <p className="text-sm font-medium text-bracco-muted">Positive signals</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-bracco-green">{totals.positive}</p>
          </div>
          <div className="rounded-[24px] bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Neutral signals</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-700">{totals.neutral}</p>
          </div>
          <div className="rounded-[24px] bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-700/90">Attention signals</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-amber-700">{totals.attention}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

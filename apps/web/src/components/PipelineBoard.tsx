import { useState } from "react";
import { countryPipelineSnapshots, departmentCatalog } from "@bracco/config";

const departmentNames = Object.fromEntries(
  departmentCatalog.map((department) => [department.code, department.name]),
);

export default function PipelineBoard() {
  const [activeCountry, setActiveCountry] = useState(countryPipelineSnapshots[0]?.countryCode ?? "IT");
  const snapshot =
    countryPipelineSnapshots.find((entry) => entry.countryCode === activeCountry) ?? countryPipelineSnapshots[0];

  const totals = snapshot.stages.reduce(
    (acc, stage) => {
      acc.active += stage.active;
      acc.approved += stage.approved;
      acc.atRisk += stage.atRisk;
      return acc;
    },
    { active: 0, approved: 0, atRisk: 0 },
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {countryPipelineSnapshots.map((entry) => {
          const isActive = entry.countryCode === snapshot.countryCode;

          return (
            <button
              key={entry.countryCode}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "border-bracco-forest bg-bracco-forest text-white"
                  : "border-bracco-line bg-white/80 text-bracco-muted hover:border-bracco-green hover:text-bracco-green",
              ].join(" ")}
              onClick={() => setActiveCountry(entry.countryCode)}
              type="button"
            >
              {entry.countryName}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {snapshot.stages.map((stage) => (
            <article
              className="rounded-[26px] border border-bracco-line/80 bg-white/82 p-5 shadow-[0_18px_50px_rgba(17,36,27,0.06)]"
              key={stage.department}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bracco-muted">
                {departmentNames[stage.department]}
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-bracco-ink">{stage.active}</p>
                  <p className="text-sm text-bracco-muted">Active reviews</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-bracco-mint/60 p-3">
                    <p className="font-semibold text-bracco-green">{stage.approved}</p>
                    <p className="mt-1 text-bracco-muted">Approved</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-3">
                    <p className="font-semibold text-amber-700">{stage.atRisk}</p>
                    <p className="mt-1 text-amber-700/80">At risk</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-bracco-line/70 bg-bracco-stone/70 p-3 text-sm text-bracco-muted">
                  <p className="font-semibold text-bracco-ink">{stage.owner}</p>
                  <p className="mt-1">Current coordinating lead</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-[30px] bg-bracco-ink p-6 text-white shadow-[0_24px_80px_rgba(17,36,27,0.18)]">
          <div className="space-y-3 border-b border-white/10 pb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-bracco-lime">Country summary</p>
            <h3 className="text-3xl font-semibold tracking-tight">{snapshot.countryName}</h3>
            <p className="text-sm leading-6 text-white/72">{snapshot.coordinationNote}</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">Active</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{totals.active}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">Approved</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-bracco-lime">{totals.approved}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/56">At risk</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-amber-300">{totals.atRisk}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

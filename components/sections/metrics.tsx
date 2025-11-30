import type { Metric } from "@/types/content";

export default function Metrics({ items }: { items: Metric[] }) {
  return (
    <section className="py-12">
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm sm:grid-cols-3">
        {items.map((metric) => (
          <div key={metric.label} className="rounded-2xl bg-slate-50/80 p-4 text-center shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="text-3xl font-semibold text-slate-900">{metric.value}</p>
            <p className="text-sm text-slate-600">{metric.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

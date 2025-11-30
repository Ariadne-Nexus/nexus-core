import type { Outcome } from "@/types/content";

export default function Outcomes({ items }: { items: Outcome[] }) {
  return (
    <section id="outcomes" className="py-16">
      <div className="mb-6 flex flex-col gap-3">
        <p className="eyebrow">Outcomes</p>
        <h2 className="section-title">Launch playbooks your teams trust</h2>
        <p className="section-subtitle">
          Ship new processes with less risk and measurable gains for customers, revenue, and compliance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm">
            <div className="mt-1 h-9 w-9 rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 text-slate-900 flex items-center justify-center font-semibold">
              {item.label.slice(0, 1)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{item.label}</h3>
              <p className="text-sm text-slate-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

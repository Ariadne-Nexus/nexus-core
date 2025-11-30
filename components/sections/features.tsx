import type { Feature } from "@/types/content";

export default function Features({ items }: { items: Feature[] }) {
  return (
    <section id="solutions" className="py-16">
      <div className="mb-6 flex flex-col gap-3">
        <p className="eyebrow">Solutions</p>
        <h2 className="section-title">Everything you need to launch with confidence</h2>
        <p className="section-subtitle">
          Each module is built for operators who need clarity, guardrails, and proofs of performance.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((feature) => (
          <article
            key={feature.title}
            className="feature-card"
          >
            <span className="feature-badge">{feature.badge}</span>
            <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {feature.bulletPoints.map((point) => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

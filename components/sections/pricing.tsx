import type { PricingTier } from "@/types/content";

export default function Pricing({ tiers }: { tiers: PricingTier[] }) {
  return (
    <section id="pricing" className="py-16">
      <div className="mb-6 flex flex-col gap-3">
        <p className="eyebrow">Pricing</p>
        <h2 className="section-title">Built for teams that need reliability</h2>
        <p className="section-subtitle">Straightforward plans with white-glove onboarding and controls.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {tiers.map((tier) => (
          <article key={tier.name} className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-md">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
              <p className="text-lg font-semibold text-slate-800">{tier.price}</p>
            </div>
            <p className="mt-2 text-sm text-slate-600">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-semibold text-white">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              href="#contact"
            >
              {tier.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

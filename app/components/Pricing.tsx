const plans = [
  {
    name: "Growth",
    price: "$48",
    cadence: "per user / month",
    description: "Unified workspace, automation, and reporting to align sales and success teams.",
    features: ["Unlimited playbooks", "Collaborative workspace", "Role-based access"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "for advanced teams",
    description: "Advanced governance, security reviews, and tailored success programs.",
    features: ["SAML & SCIM", "Dedicated CSM", "Custom onboarding"],
    cta: "Talk to sales",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-white py-16 text-slate-900 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">Pricing</p>
          <h2 className="text-3xl font-semibold sm:text-4xl">Choose a plan that grows with you</h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Start free and upgrade when you need advanced security, governance, and guidance.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex h-full flex-col gap-4 rounded-2xl border p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10 dark:border-slate-800 ${
                plan.highlighted
                  ? "border-indigo-200 bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-900"
                  : "border-slate-100 bg-white dark:bg-slate-950"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
                </div>
                {plan.highlighted && (
                  <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase text-white">Most popular</span>
                )}
              </div>
              <div>
                <span className="text-4xl font-bold text-slate-950 dark:text-white">{plan.price}</span>
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-300">{plan.cadence}</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-sky-400"
                    : "border border-slate-200 bg-white text-slate-900 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:border-indigo-500"
                }`}
                href="#demo"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

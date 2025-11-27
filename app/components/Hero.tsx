import Image from "next/image";

const highlights = [
  "Automated handoffs",
  "Realtime collaboration",
  "Enterprise-grade security",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white text-slate-900 dark:from-slate-900 dark:via-slate-900 dark:to-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.12),_transparent_35%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-indigo-200">
            CustomerOS Platform
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl dark:text-white">
              Build relationships that scale with precision.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              CustomerOS brings your entire revenue team together with one workspace for
              sales, success, and product signals. Automate handoffs, orchestrate journeys,
              and deliver proactive support without the busywork.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              href="#demo"
            >
              Request a demo
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:border-indigo-500"
              href="#pricing"
            >
              Get started
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-300">No credit card required</p>
          </div>
          <div className="flex items-center gap-10 text-sm text-slate-500 dark:text-slate-300">
            <div className="space-y-1">
              <p className="text-xl font-semibold text-slate-900 dark:text-white">2.4x</p>
              <p>Faster time to value</p>
            </div>
            <div className="space-y-1">
              <p className="text-xl font-semibold text-slate-900 dark:text-white">98% </p>
              <p>Customer satisfaction</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-indigo-500/10 transition-transform duration-300 hover:translate-y-[-4px] dark:border-slate-800 dark:bg-slate-950">
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live workspace
            </div>
            <Image
              src="/hero-dashboard.svg"
              alt="CustomerOS revenue workspace"
              width={1200}
              height={780}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

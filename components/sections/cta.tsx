import type { CtaContent } from "@/types/content";

export default function CTA({ content }: { content: CtaContent }) {
  return (
    <section className="py-16">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 px-8 py-12 text-white shadow-2xl shadow-indigo-500/20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-200">Launch-ready</p>
            <h2 className="text-3xl font-semibold leading-tight lg:text-4xl">{content.title}</h2>
            <p className="text-base text-slate-200">{content.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={content.primaryCta.href}
            >
              {content.primaryCta.label}
            </a>
            {content.secondaryCta ? (
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={content.secondaryCta.href}
              >
                {content.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

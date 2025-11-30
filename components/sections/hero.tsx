import Image from "next/image";
import type { HeroContent } from "@/types/content";

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section id="top" className="py-16 sm:py-24">
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              {content.eyebrow}
            </div>
            <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {content.title}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
              {content.subtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                href={content.primaryCta.href}
              >
                {content.primaryCta.label}
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                href={content.secondaryCta.href}
              >
                {content.secondaryCta.label}
              </a>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {content.highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt>
                  <dd className="text-lg font-semibold text-slate-900">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative h-full">
            <div className="absolute -left-10 -top-10 hidden h-32 w-32 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 blur-3xl lg:block" aria-hidden />
            <div className="absolute -bottom-12 -right-12 hidden h-32 w-32 rounded-full bg-gradient-to-br from-indigo-100 to-sky-100 blur-3xl lg:block" aria-hidden />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900/90 shadow-2xl shadow-indigo-500/10">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

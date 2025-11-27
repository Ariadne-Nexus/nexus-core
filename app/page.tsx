import Link from "next/link";
import { siteContent } from "./content";

export default function Home() {
  const { hero, features, testimonials } = siteContent;

  return (
    <div className="bg-zinc-50 text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-20 px-6 py-16 sm:py-24">
        <section className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            {hero.eyebrow}
          </p>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4 sm:max-w-2xl">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{hero.title}</h1>
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-300">{hero.description}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={hero.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {hero.primaryCta.label}
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-3 text-base font-semibold text-zinc-900 transition hover:border-indigo-200 hover:text-indigo-700 dark:border-zinc-700 dark:text-zinc-50 dark:hover:border-indigo-500"
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 px-5 py-4 text-sm font-medium text-indigo-900 shadow-inner dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-100">
              <p>
                &ldquo;Every product decision should be easy to explain. If it isn&apos;t, we dig deeper until it is.&rdquo; — The Team
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">What we deliver</h2>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Capabilities</span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {feature.title}
                  </h3>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">{feature.description}</p>
                </div>
                <span className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Learn more →</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">What partners say</h2>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Testimonials</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <blockquote className="text-lg leading-8 text-zinc-700 dark:text-zinc-200">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  <div>{testimonial.name}</div>
                  <div className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

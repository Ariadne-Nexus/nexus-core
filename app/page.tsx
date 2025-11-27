import Image from "next/image";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-indigo-50 font-sans dark:from-black dark:via-zinc-950 dark:to-indigo-950/30">
      <main className="flex min-h-screen w-full max-w-5xl flex-col gap-12 py-20 px-6 sm:px-12">
        <header className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-white/70 p-8 shadow-lg ring-1 ring-zinc-200 backdrop-blur-md dark:bg-zinc-900/70 dark:ring-white/10 sm:flex-row">
          <div className="flex items-center gap-4">
            <Image
              className="h-12 w-auto dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={40}
              priority
            />
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-500">Studio</p>
              <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">Portfolio Contact</h1>
            </div>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            Crafted with Next.js App Router and ready for your own CTA.
          </div>
        </header>

        <section className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Let&apos;s collaborate</p>
            <h2 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-white">
              Tell us about your next great idea.
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              Share what you&apos;re building and we&apos;ll respond with a tailored plan. We typically respond within one business day
              and can schedule a kickoff call as soon as the same week.
            </p>
            <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/60 p-6 text-sm text-indigo-900 dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:text-indigo-50">
              <p className="font-semibold">What to include</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>Your goals and success metrics.</li>
                <li>Timeline or launch date.</li>
                <li>Key integrations or dependencies.</li>
              </ul>
            </div>
          </div>

          <ContactForm />
        </section>
      </main>
    </div>
  );
}

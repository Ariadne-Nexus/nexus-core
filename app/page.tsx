export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-50 flex items-center justify-center">
      <div className="max-w-5xl w-full space-y-12 p-8">
        {/* HERO */}
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold">Automation, Systems & AI for Lean Teams</h1>
          <p className="text-zinc-400 max-w-2xl">
            I design and ship one-command automations, AI-powered workflows, and
            clean developer environments that turn scattered tools into a repeatable,
            documented system.
          </p>
        </header>

        {/* SELECTED AUTOMATIONS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Selected Automations</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <article className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold">Automation Spine: Daily Runner + AI Issue Flow</h3>
              <p className="mt-2 text-zinc-400">
                One-command automation that runs in a managed virtual environment, pulls the latest notes, and uses
                OpenAI to generate and triage GitHub issues. Designed as a reusable template for turning messy daily
                workflows into a predictable, logged system.
              </p>
              <ul className="mt-4 space-y-2 text-zinc-300 list-disc list-inside">
                <li>Single entrypoint for the full daily workflow</li>
                <li>OpenAI-generated GitHub issues with titles, descriptions, and labels</li>
                <li>Repo hardened for sharing with clients, collaborators, and investors</li>
              </ul>
            </article>

            {/* Placeholder for other cards - keep layout consistent */}
            <article className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <h3 className="text-lg font-semibold">Environment & DevOps Setup</h3>
              <p className="mt-2 text-zinc-400">Reproducible virtual environments, secrets management, and repo structure for reliable delivery.</p>
            </article>
          </div>
        </section>

        {/* DEMO PREVIEW */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
          {/* DemoPreview is a client component that fetches /api/demo */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <div>
            {/* Import dynamically to keep page a server component */}
            {/* @ts-ignore */}
            <DemoPreviewClient />
          </div>
        </section>
      </div>
    </main>
  );
}

// Dynamic import of client component
import dynamic from "next/dynamic";
const DemoPreviewClient = dynamic(() => import("./components/DemoPreview"), { ssr: false });

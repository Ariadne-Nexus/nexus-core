// app/automation/page.tsx

export default function AutomationPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 lg:px-24">
      {/* Hero */}
      <section className="max-w-3xl space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Ariadne Nexus
        </h1>
        <p className="text-lg text-muted-foreground">
          Automation-first workflows for founders and operators — from daily Python
          runners to investor-ready dashboards, all wired into a real codebase at{" "}
          <span className="font-medium">ariadnenexus.com</span>.
        </p>
      </section>

      {/* Under the Hood */}
      <section className="mt-16 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Under the hood</h2>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            DAILY AUTOMATION · OPENAI · GITHUB · NEXT.JS
          </p>

          <p className="text-base leading-relaxed text-muted-foreground">
            This isn&apos;t just a landing page. Behind Ariadne Nexus is a real
            automation engine designed to tighten the loop between{" "}
            <span className="font-medium">&quot;what happened today&quot;</span>,{" "}
            <span className="font-medium">&quot;what needs to be tracked&quot;</span>, and{" "}
            <span className="font-medium">&quot;how it looks to stakeholders&quot;</span>.
          </p>

          <ul className="space-y-3 text-muted-foreground text-sm md:text-base">
            <li>
              <span className="font-medium">Daily Python runner:</span> a script
              (`daily_v2.py`) that ingests raw notes and project updates from local
              files.
            </li>
            <li>
              <span className="font-medium">AI-generated summaries:</span> the
              runner calls the OpenAI API to turn unstructured text into structured
              daily summaries: key events, decisions, risks, and next actions.
            </li>
            <li>
              <span className="font-medium">Issue tracking:</span> action items can
              be turned into GitHub issues with consistent titles, labels, and
              descriptions, keeping work traceable.
            </li>
            <li>
              <span className="font-medium">Safe modes:</span> `--demo` and
              `--dry-run` flags allow you to exercise the workflow without real
              API calls or external side effects.
            </li>
            <li>
              <span className="font-medium">Frontend layer:</span> this Next.js App
              Router app, deployed on Vercel at{" "}
              <span className="font-mono text-xs align-baseline">
                ariadnenexus.com
              </span>
              , is the presentation layer that can surface those summaries and
              workflows for clients, teammates, or investors.
            </li>
          </ul>
        </div>

        {/* Side card – "What this shows" */}
        <aside className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">What this project demonstrates</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Designing a one-command daily automation workflow</li>
            <li>• Integrating OpenAI with GitHub for issue creation</li>
            <li>• Keeping automation code production-ready and documented</li>
            <li>• Shipping a live Next.js frontend on a custom domain</li>
            <li>• Making the whole stack AI-assistant friendly</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

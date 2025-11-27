const navLinks = [
  { label: "Product", href: "#demo" },
  { label: "Capabilities", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Support", href: "#footer" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-100/80 bg-white/85 backdrop-blur dark:border-slate-800/80 dark:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500" aria-hidden="true" />
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-white">CustomerOS</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Relationship workspace</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-indigo-600 dark:hover:text-indigo-300">
              {link.label}
            </a>
          ))}
          <a
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            href="#demo"
          >
            Request a demo
          </a>
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <a
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:text-white dark:hover:border-indigo-500"
            href="#pricing"
          >
            Plans
          </a>
          <a
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-500 hover:to-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            href="#demo"
          >
            Demo
          </a>
        </div>
      </div>
    </header>
  );
}

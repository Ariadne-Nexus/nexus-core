const links = [
  { label: "Product", href: "#features" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#cta" },
  { label: "Support", href: "#footer" },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-slate-100 bg-white py-10 text-slate-600 dark:border-slate-800 dark:bg-black dark:text-slate-300"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">CustomerOS</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Operating system for modern revenue and success teams.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          {links.map((link) => (
            <a key={link.label} className="hover:text-indigo-600 dark:hover:text-indigo-300" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-semibold">
              A
            </span>
            <div>
              <p className="text-base font-semibold text-slate-900">{siteConfig.name}</p>
              <p className="text-sm text-slate-500">Operational intelligence, shipped.</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Built for teams that need reliable launches, measurable outcomes, and governance that doesn’t slow operators down.
          </p>
          <div className="flex gap-4 text-sm text-slate-700">
            <a className="nav-link" href={siteConfig.social.linkedin}>
              LinkedIn
            </a>
            <a className="nav-link" href={siteConfig.social.twitter}>
              Twitter/X
            </a>
            <a className="nav-link" href={siteConfig.social.email}>
              Email
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm text-slate-700 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Product</p>
            <div className="flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company</p>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="nav-link">
                Privacy
              </Link>
              <Link href="/terms" className="nav-link">
                Terms
              </Link>
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resources</p>
            <div className="flex flex-col gap-2">
              <a className="nav-link" href="/Avidelta-Overview.pdf">
                Overview PDF
              </a>
              <a className="nav-link" href="#faq">
                FAQ
              </a>
              <a className="nav-link" href="#pricing">
                Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Crafted for teams that operate on evidence, not guesswork.</p>
        </div>
      </div>
    </footer>
  );
}

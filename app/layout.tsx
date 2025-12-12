import "./globals.css";
import type { Metadata } from "next";
import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ariadnenexus.com"),
  title: "Ariadne Nexus",
  description: "Built with a Python daily runner (daily_v2.py), OpenAI-powered summarization, GitHub issue automation, and a Next.js frontend deployed on Vercel at ariadnenexus.com.",
  keywords: ["automation", "AI workflows", "GitHub integration", "OpenAI", "DevOps", "systems"],
  authors: [{ name: "Ariadne Nexus" }],
  openGraph: {
    title: "Ariadne Nexus",
    description: "Built with a Python daily runner (daily_v2.py), OpenAI-powered summarization, GitHub issue automation, and a Next.js frontend deployed on Vercel at ariadnenexus.com.",
    url: "https://www.ariadnenexus.com",
    siteName: "Ariadne Nexus",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ariadne Nexus",
    description: "Built with a Python daily runner (daily_v2.py), OpenAI-powered summarization, GitHub issue automation, and a Next.js frontend deployed on Vercel at ariadnenexus.com.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Vercel Analytics - automatically enabled on Vercel */}
        {/* Add Google Analytics or other analytics here if needed */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1">{children}</div>
        <footer className="border-t border-zinc-800 bg-black text-zinc-400 py-8 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <section className="mb-6 text-sm space-y-2">
              <h2 className="text-base font-semibold text-zinc-200">
                Automation stack behind this site
              </h2>
              <p className="leading-relaxed">
                Under the hood: a daily Python runner (<code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 rounded">daily_v2.py</code>) ingests notes,
                calls the OpenAI API to generate structured summaries, and can turn action items
                into GitHub issues. This Next.js frontend, deployed on Vercel at
                <span className="font-mono text-zinc-200"> ariadnenexus.com</span>, is the presentation layer
                for that automation.
              </p>
            </section>
            <p className="text-xs md:text-sm leading-relaxed pt-4 border-t border-zinc-900">
              Built with a Python daily runner (<code className="text-zinc-300">daily_v2.py</code>), OpenAI-powered summarization, GitHub issue automation, and a Next.js frontend deployed on Vercel at{" "}
              <span className="text-zinc-200 font-medium">ariadnenexus.com</span>.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

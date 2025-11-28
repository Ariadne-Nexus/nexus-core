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
        <footer className="border-t border-zinc-800 bg-black text-zinc-400 py-6 px-6 md:px-12 lg:px-24">
          <p className="text-xs md:text-sm leading-relaxed max-w-5xl mx-auto">
            Built with a Python daily runner (<code className="text-zinc-300">daily_v2.py</code>), OpenAI-powered summarization, GitHub issue automation, and a Next.js frontend deployed on Vercel at{" "}
            <span className="text-zinc-200 font-medium">ariadnenexus.com</span>.
          </p>
        </footer>
      </body>
    </html>
  );
}

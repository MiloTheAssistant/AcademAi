import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { NavClient } from "@/components/NavClient";

export const metadata: Metadata = {
  title: {
    default: "AcademAI — Learn Claude AI & Anthropic Technologies",
    template: "%s — AcademAI",
  },
  description:
    "Free structured courses and learning paths to master Claude AI, Claude Code, the Anthropic API, and Model Context Protocol.",
  metadataBase: new URL("https://academai.app"),
  openGraph: {
    type: "website",
    siteName: "AcademAI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <span className="font-bold text-lg tracking-tight">AcademAI</span>
              </Link>

              <NavClient />
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <span className="font-bold">AcademAI</span>
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  Free courses for mastering Claude AI, Claude Code, and Anthropic technologies. Inspired by{" "}
                  <a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Anthropic&apos;s official training platform
                  </a>.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Learn</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/courses" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Courses</Link></li>
                  <li><Link href="/paths" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Learning Paths</Link></li>
                  <li><Link href="/courses?category=foundational" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Start Here</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Official Anthropic Training</a></li>
                  <li><a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Anthropic Docs</a></li>
                  <li><a href="https://github.com/anthropics/courses" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub Courses</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
              <p>© {new Date().getFullYear()} AcademAI. Independent educational project.</p>
              <p>Not affiliated with or endorsed by Anthropic PBC.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}

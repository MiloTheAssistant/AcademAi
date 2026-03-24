import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AcademAI - Learn Claude AI & Anthropic Skills",
  description: "Master Claude AI, Claude Code, and Anthropic technologies through structured courses and learning paths.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                <span className="font-bold text-xl tracking-tight">AcademAI</span>
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/courses" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</a>
                <a href="/paths" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Learning Paths</a>
                <a href="/about" className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              </nav>
              <div className="flex items-center gap-3">
                <a href="/courses" className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Start Learning
                </a>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <span className="font-bold">AcademAI</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Educational content inspired by Anthropic&apos;s Skilljar platform.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">Courses</a>
                <a href="/paths" className="hover:text-blue-600 dark:hover:text-blue-400">Paths</a>
                <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
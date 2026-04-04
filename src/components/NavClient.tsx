"use client";

import { useState } from "react";
import Link from "next/link";

interface NavClientProps {
  session: { user?: { name?: string | null; image?: string | null } } | null;
}

export function NavClient({ session }: NavClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop nav links */}
      <nav className="hidden md:flex items-center gap-1">
        <Link href="/courses" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Courses
        </Link>
        <Link href="/paths" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          Learning Paths
        </Link>
        <Link href="/about" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          About
        </Link>
      </nav>

      {/* Desktop auth */}
      <div className="hidden md:flex items-center gap-3">
        {session?.user ? (
          <div className="flex items-center gap-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700"
              />
            )}
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg md:hidden">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link href="/courses" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Courses
            </Link>
            <Link href="/paths" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Learning Paths
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              About
            </Link>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              {session?.user ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    {session.user.image && (
                      <img src={session.user.image} alt="" className="w-7 h-7 rounded-full" />
                    )}
                    <span className="text-sm font-medium">{session.user.name}</span>
                  </div>
                  <form action="/api/auth/signout" method="POST">
                    <button type="submit" className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                      Sign out
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors">
                  Sign in with GitHub →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

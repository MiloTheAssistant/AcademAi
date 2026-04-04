"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface LessonSidebarProps {
  slug: string;
  modules: { title: string }[];
  currentIndex: number;
  accent: string;
}

export function LessonSidebar({ slug, modules, currentIndex, accent }: LessonSidebarProps) {
  const { getCompletedModules } = useProgress();
  const completed = new Set(getCompletedModules(slug));
  const completedCount = completed.size;
  const total = modules.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="sticky top-32">
      <Link
        href={`/courses/${slug}`}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Course overview
      </Link>

      {/* Mini progress bar */}
      {completedCount > 0 && (
        <div className="mb-4 px-2">
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-1.5">
            <span>{completedCount} of {total} complete</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
        Modules
      </p>
      <nav className="space-y-0.5">
        {modules.map((m, i) => {
          const isActive = i === currentIndex;
          const isDone = completed.has(i);
          return (
            <Link
              key={i}
              href={`/courses/${slug}/lessons/${i}`}
              className={`flex items-start gap-2.5 px-2 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-medium"
                  : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <span
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${
                  isActive
                    ? `${accent} text-white`
                    : isDone
                    ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {isDone && !isActive ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className="leading-snug">{m.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

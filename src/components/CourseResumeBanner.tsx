"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface CourseResumeBannerProps {
  slug: string;
  totalModules: number;
}

export function CourseResumeBanner({ slug, totalModules }: CourseResumeBannerProps) {
  const { getCompletedModules, getCourseProgress, getNextIncompleteModule } = useProgress();
  const completed = getCompletedModules(slug);
  const pct = getCourseProgress(slug, totalModules);

  if (completed.length === 0) return null;

  const allDone = completed.length >= totalModules;
  const nextIndex = getNextIncompleteModule(slug, totalModules);

  if (allDone) {
    return (
      <div className="my-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <div>
            <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm">Course complete!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">You&apos;ve finished all {totalModules} modules.</p>
          </div>
        </div>
        <Link
          href={`/courses/${slug}/lessons/0`}
          className="shrink-0 px-4 py-2 text-sm font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
        >
          Review →
        </Link>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
            {completed.length} of {totalModules} modules complete
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{pct}% through this course</p>
        </div>
        <Link
          href={`/courses/${slug}/lessons/${nextIndex}`}
          className="shrink-0 px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors whitespace-nowrap"
        >
          Continue →
        </Link>
      </div>
      <div className="h-2 w-full rounded-full bg-blue-200 dark:bg-blue-900 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

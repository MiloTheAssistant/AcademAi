"use client";

import { useProgress } from "@/hooks/useProgress";

interface ProgressTrackerProps {
  slug: string;
  moduleIndex: number;
}

export function ProgressTracker({ slug, moduleIndex }: ProgressTrackerProps) {
  const { getCompletedModules, markComplete, markIncomplete } = useProgress();
  const isComplete = getCompletedModules(slug).includes(moduleIndex);

  return (
    <button
      type="button"
      onClick={() => {
        if (isComplete) {
          markIncomplete(slug, moduleIndex);
        } else {
          markComplete(slug, moduleIndex);
        }
      }}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
        isComplete
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      {isComplete ? "Completed" : "Mark complete"}
    </button>
  );
}

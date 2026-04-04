"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { courses } from "@/data/courses";

export default function ProgressPage() {
  const { progress, getCourseProgress, getNextIncompleteModule, resetCourse } = useProgress();

  const startedSlugs = Object.keys(progress).filter((s) => (progress[s]?.length ?? 0) > 0);
  const completedSlugs = startedSlugs.filter((s) => {
    const course = courses.find((c) => c.slug === s);
    return course && (progress[s]?.length ?? 0) >= course.modules.length;
  });
  const inProgressSlugs = startedSlugs.filter((s) => !completedSlugs.includes(s));
  const notStartedCourses = courses.filter((c) => !startedSlugs.includes(c.slug));

  const totalModulesDone = startedSlugs.reduce((sum, s) => sum + (progress[s]?.length ?? 0), 0);

  if (startedSlugs.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">No progress yet</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Start a course and your progress will be tracked automatically here.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          Browse Courses →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Progress</h1>
        <p className="text-slate-500 dark:text-slate-400">Your learning journey across all courses.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inProgressSlugs.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">In progress</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{completedSlugs.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Completed</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalModulesDone}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modules done</p>
        </div>
      </div>

      {/* In Progress */}
      {inProgressSlugs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">In Progress</h2>
          <div className="space-y-3">
            {inProgressSlugs.map((slug) => {
              const course = courses.find((c) => c.slug === slug);
              if (!course) return null;
              const pct = getCourseProgress(slug, course.modules.length);
              const completed = progress[slug]?.length ?? 0;
              const nextIndex = getNextIncompleteModule(slug, course.modules.length);
              return (
                <div key={slug} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <Link href={`/courses/${slug}`} className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {course.title}
                      </Link>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {completed} of {course.modules.length} modules · {pct}%
                      </p>
                    </div>
                    <Link
                      href={`/courses/${slug}/lessons/${nextIndex}`}
                      className="shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Continue →
                    </Link>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-500 transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Completed */}
      {completedSlugs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Completed</h2>
          <div className="space-y-3">
            {completedSlugs.map((slug) => {
              const course = courses.find((c) => c.slug === slug);
              if (!course) return null;
              return (
                <div key={slug} className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <div>
                      <Link href={`/courses/${slug}`} className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {course.title}
                      </Link>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-0.5">
                        All {course.modules.length} modules complete
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => resetCourse(slug)}
                    className="shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Not Started — only if some progress exists */}
      {notStartedCourses.length > 0 && startedSlugs.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Not Started</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {notStartedCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-semibold text-slate-400 shrink-0">
                  {course.modules.length}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{course.estimatedHours}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

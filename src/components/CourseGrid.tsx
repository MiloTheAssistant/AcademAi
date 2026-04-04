"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export interface CourseCardData {
  slug: string;
  title: string;
  description: string;
  path: string;
  category: string;
  level: string;
  estimatedHours: string;
  moduleCount: number;
}

const categoryDotColor: Record<string, string> = {
  "claude-code": "bg-blue-500",
  api: "bg-purple-500",
  mcp: "bg-orange-500",
  "ai-fluency": "bg-pink-500",
  foundational: "bg-emerald-500",
};

const levelColors: Record<string, string> = {
  Beginner: "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/50",
  Intermediate: "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/50",
  Advanced: "text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-950/50",
};

function CourseProgressBar({ slug, moduleCount }: { slug: string; moduleCount: number }) {
  const { getCourseProgress, getCompletedModules } = useProgress();
  const completed = getCompletedModules(slug).length;
  const pct = getCourseProgress(slug, moduleCount);

  if (completed === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-1">
        <span>{completed}/{moduleCount} modules</span>
        <span className={pct === 100 ? "text-emerald-500 font-medium" : ""}>{pct}%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface CourseGridProps {
  courses: CourseCardData[];
  showCategoryBadge?: boolean;
}

export function CourseGrid({ courses, showCategoryBadge = false }: CourseGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses.map((course) => (
        <Link
          key={course.slug}
          href={`/courses/${course.slug}`}
          className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              <span className={`w-2 h-2 rounded-full shrink-0 ${categoryDotColor[course.category] ?? "bg-slate-400"}`} />
              {course.path}
            </span>
            {showCategoryBadge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[course.level] ?? ""}`}>
                {course.level}
              </span>
            )}
            {!showCategoryBadge && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[course.level] ?? ""}`}>
                {course.level}
              </span>
            )}
          </div>

          <h2 className="text-base font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
            {course.title}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">
            {course.description}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span>{course.moduleCount} modules</span>
            <span>{course.estimatedHours}</span>
          </div>

          <CourseProgressBar slug={course.slug} moduleCount={course.moduleCount} />
        </Link>
      ))}
    </div>
  );
}

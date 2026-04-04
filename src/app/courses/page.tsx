import Link from "next/link";
import { courses, categories } from "@/data/courses";

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

const filterPillActive =
  "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20";
const filterPillInactive =
  "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-slate-100";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filtered = category
    ? courses.filter((c) => c.category === category)
    : courses;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">All Courses</h1>
        <p className="text-slate-500 dark:text-slate-400">
          {filtered.length} course{filtered.length !== 1 ? "s" : ""}
          {category ? ` in ${categories.find((c) => c.id === category)?.label ?? category}` : ` across ${categories.length} tracks`}
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/courses"
          className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
            !category ? filterPillActive : filterPillInactive
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/courses?category=${cat.id}`}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
              category === cat.id ? filterPillActive : filterPillInactive
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${cat.color}`} />
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Course grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-slate-400 dark:text-slate-500">
          No courses found in this category.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${categoryDotColor[course.category]}`} />
                  {course.path}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
                  {course.level}
                </span>
              </div>

              <h2 className="text-base font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {course.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span>{course.modules.length} modules</span>
                <span>{course.estimatedHours}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

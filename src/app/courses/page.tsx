import Link from "next/link";
import { courses, categories } from "@/data/courses";

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">All Courses</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Explore our complete catalog of {courses.length} courses across {categories.length} categories
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/courses"
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/courses?category=${cat.id}`}
            className={`px-4 py-2 text-sm font-medium rounded-full hover:opacity-80 transition-opacity ${cat.color} text-white`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-3 h-3 rounded-full ${
                course.category === 'claude-code' ? 'bg-blue-500' :
                course.category === 'api' ? 'bg-purple-500' :
                course.category === 'mcp' ? 'bg-orange-500' :
                course.category === 'ai-fluency' ? 'bg-pink-500' :
                'bg-emerald-500'
              }`} />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {course.path}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
              {course.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400'
              }`}>
                {course.level}
              </span>
              <span>{course.estimatedHours}</span>
            </div>
            {course.modules && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {course.modules.length} modules
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
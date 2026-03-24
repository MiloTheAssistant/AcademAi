import Link from "next/link";
import { learningPaths, getCourseBySlug } from "@/data/courses";

export default function PathsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Learning Paths</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Follow structured roadmaps designed for your goals. Each path includes a curated sequence of courses to take you from beginner to advanced level.
        </p>
      </div>

      <div className="space-y-8">
        {learningPaths.map((path, index) => (
          <div
            key={path.title}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-5xl font-bold text-blue-100 dark:text-blue-900/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{path.title}</h2>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      path.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                      path.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400'
                    }`}>
                      {path.level}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{path.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{path.courses.length}</div>
                  <div className="text-sm text-slate-500">courses</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <span className="flex items-center gap-1">
                  <span>⏱</span>
                  <span>{path.estimatedHours}</span>
                </span>
              </div>

              {/* Course List */}
              <div className="flex flex-wrap gap-3">
                {path.courses.map((courseSlug) => {
                  const course = getCourseBySlug(courseSlug);
                  if (!course) return null;
                  return (
                    <Link
                      key={courseSlug}
                      href={`/courses/${courseSlug}`}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                    >
                      <span className={`w-2 h-2 rounded-full ${
                        course.category === 'claude-code' ? 'bg-blue-500' :
                        course.category === 'api' ? 'bg-purple-500' :
                        course.category === 'mcp' ? 'bg-orange-500' :
                        course.category === 'ai-fluency' ? 'bg-pink-500' :
                        'bg-emerald-500'
                      }`} />
                      <span className="text-sm font-medium">{course.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Path Footer */}
            <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800">
              <Link
                href={`/paths/${encodeURIComponent(path.title.toLowerCase().replace(/\s+/g, '-'))}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View detailed path
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-3xl">
          <h2 className="text-2xl font-bold">Not sure where to start?</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md">
            If you&apos;re new to AI, start with the Beginner Path. For developers, try the Claude Code Mastery path.
          </p>
          <div className="flex gap-3">
            <Link
              href="/courses"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              Browse All Courses
            </Link>
            <Link
              href="/courses?category=foundational"
              className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
            >
              Start with Basics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
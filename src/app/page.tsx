import Link from "next/link";
import { courses, learningPaths, categories } from "@/data/courses";

export default function Home() {
  const featuredCourses = courses.slice(0, 6);
  const featuredPaths = learningPaths.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-950 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Master <span className="text-blue-600">Claude AI</span>
            <br />& Anthropic Technologies
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Structured courses, hands-on labs, and learning paths to help you become proficient with Claude, Claude Code, and the AI tools reshaping how we work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-600/25">
              Browse All Courses
            </Link>
            <Link href="/paths" className="px-8 py-4 text-lg font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl transition-all border border-slate-200 dark:border-slate-700">
              View Learning Paths
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">{courses.length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">{learningPaths.length}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Learning Paths</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">7</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Skill Tracks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Start your learning journey with these popular courses</p>
          </div>
          <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${
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
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                {course.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>{course.level}</span>
                <span>•</span>
                <span>{course.estimatedHours}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Learning Paths</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Follow structured roadmaps designed for your goals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPaths.map((path) => (
              <Link
                key={path.title}
                href="/paths"
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    path.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
                    path.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400'
                  }`}>
                    {path.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {path.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {path.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>{path.courses.length} courses</span>
                  <span>•</span>
                  <span>{path.estimatedHours}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/paths" className="text-blue-600 hover:text-blue-700 font-medium">
              View all learning paths →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8">
            Join the growing community of AI-fluent professionals. All courses are free to access.
          </p>
          <Link href="/courses" className="inline-flex px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
            Start Learning Now
          </Link>
        </div>
      </section>
    </div>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/data/courses";
import { CourseResumeBanner } from "@/components/CourseResumeBanner";
import { CourseStartButton } from "@/components/CourseStartButton";

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} - AcademAI`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  
  if (!course) {
    notFound();
  }

  const otherCourses = courses.filter(c => c.slug !== course.slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
        <Link href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">
          Courses
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white">{course.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              course.category === 'claude-code' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
              course.category === 'api' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400' :
              course.category === 'mcp' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400' :
              course.category === 'ai-fluency' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-400' :
              'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400'
            }`}>
              {course.path}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' :
              course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
              'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400'
            }`}>
              {course.level}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-6">{course.title}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{course.description}</p>
          <CourseResumeBanner slug={course.slug} totalModules={course.modules.length} />

          {/* Course Modules */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
            <div className="space-y-3">
              {course.modules.map((module, index) => (
                <Link
                  key={module.title}
                  href={`/courses/${course.slug}/lessons/${index}`}
                  className="group flex items-start gap-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:shadow-blue-500/5 transition-all"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {module.title}
                    </h3>
                    {module.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {module.description}
                      </p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
              <ul className="space-y-2">
                {course.prerequisites.map((prereq) => (
                  <li key={prereq} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-blue-500">✓</span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {course.resources && course.resources.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Resources</h2>
              <ul className="space-y-2">
                {course.resources.map((resource) => (
                  <li key={resource}>
                    <a
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                    >
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Course Info Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold mb-4">Course Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Level</dt>
                  <dd className="font-medium">{course.level}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Est. Time</dt>
                  <dd className="font-medium">{course.estimatedHours}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">Modules</dt>
                  <dd className="font-medium">{course.modules.length}</dd>
                </div>
              </dl>
              <CourseStartButton slug={course.slug} totalModules={course.modules.length} />
            </div>

            {/* Other Courses */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="font-semibold mb-4">Explore Other Courses</h3>
              <div className="space-y-4">
                {otherCourses.map((otherCourse) => (
                  <Link
                    key={otherCourse.slug}
                    href={`/courses/${otherCourse.slug}`}
                    className="block group"
                  >
                    <h4 className="font-medium text-sm group-hover:text-blue-600 transition-colors">
                      {otherCourse.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {otherCourse.level} • {otherCourse.estimatedHours}
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                href="/courses"
                className="block mt-4 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                View all courses →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
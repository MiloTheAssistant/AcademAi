import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug } from "@/data/courses";
import { getLessonContent } from "@/data/lessons";

export async function generateStaticParams() {
  const params: { slug: string; index: string }[] = [];
  for (const course of courses) {
    for (let i = 0; i < course.modules.length; i++) {
      params.push({ slug: course.slug, index: String(i) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; index: string }>;
}) {
  const { slug, index } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Not Found" };
  const moduleIndex = parseInt(index, 10);
  const mod = course.modules[moduleIndex];
  if (!mod) return { title: "Not Found" };
  return {
    title: `${mod.title} — ${course.title}`,
    description: mod.description,
  };
}

const categoryAccent: Record<string, string> = {
  "claude-code": "bg-blue-500",
  api: "bg-purple-500",
  mcp: "bg-orange-500",
  "ai-fluency": "bg-pink-500",
  foundational: "bg-emerald-500",
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; index: string }>;
}) {
  const { slug, index } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const moduleIndex = parseInt(index, 10);
  if (isNaN(moduleIndex) || moduleIndex < 0 || moduleIndex >= course.modules.length) {
    notFound();
  }

  const mod = course.modules[moduleIndex];
  const lesson = getLessonContent(slug, moduleIndex);
  const prevIndex = moduleIndex > 0 ? moduleIndex - 1 : null;
  const nextIndex = moduleIndex < course.modules.length - 1 ? moduleIndex + 1 : null;
  const accent = categoryAccent[course.category] ?? "bg-blue-500";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Top breadcrumb bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Courses
          </Link>
          <span>/</span>
          <Link
            href={`/courses/${slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[160px]"
          >
            {course.title}
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate">{mod.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          {/* Sidebar — module list */}
          <aside className="hidden lg:block w-64 shrink-0">
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
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
                Modules
              </p>
              <nav className="space-y-0.5">
                {course.modules.map((m, i) => {
                  const isActive = i === moduleIndex;
                  const isDone = i < moduleIndex;
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
                        {isDone ? (
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
          </aside>

          {/* Main lesson content */}
          <div className="flex-1 min-w-0 max-w-2xl">
            {/* Lesson header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-3">
                <span>Module {moduleIndex + 1} of {course.modules.length}</span>
                {lesson && (
                  <>
                    <span>·</span>
                    <span>{lesson.estimatedMinutes} min read</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{mod.title}</h1>
              {mod.description && (
                <p className="text-slate-500 dark:text-slate-400">{mod.description}</p>
              )}
            </div>

            {/* Lesson body */}
            {lesson ? (
              <>
                <div
                  className="prose-lesson"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />

                {/* Key Takeaways */}
                <div className="mt-10 p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                  <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-3">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {lesson.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <svg className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="prose-lesson">
                <p>Lesson content coming soon. Check back for the full module!</p>
              </div>
            )}

            {/* Prev / Next navigation */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              {prevIndex !== null ? (
                <Link
                  href={`/courses/${slug}/lessons/${prevIndex}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                    {course.modules[prevIndex].title}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/courses/${slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-slate-500 dark:text-slate-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Course overview
                </Link>
              )}

              {nextIndex !== null ? (
                <Link
                  href={`/courses/${slug}/lessons/${nextIndex}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors group"
                >
                  <span>{course.modules[nextIndex].title}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ) : (
                <Link
                  href={`/courses/${slug}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Course complete!
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

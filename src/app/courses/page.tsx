import Link from "next/link";
import { courses, categories } from "@/data/courses";
import { CourseGrid, type CourseCardData } from "@/components/CourseGrid";

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

  const cardData: CourseCardData[] = filtered.map((c) => ({
    slug: c.slug,
    title: c.title,
    description: c.description,
    path: c.path,
    category: c.category,
    level: c.level,
    estimatedHours: c.estimatedHours,
    moduleCount: c.modules.length,
  }));

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
        <CourseGrid courses={cardData} />
      )}
    </div>
  );
}

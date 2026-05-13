import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { courses, getCourseBySlug } from "@/data/courses";
import { AssessmentForm } from "@/components/AssessmentForm";
import { requireActiveMembership } from "@/lib/entitlements";
import { getAssessmentForCourse } from "@/lib/assessments";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Assessment Not Found" };
  return {
    title: `${course.title} Scenario Test - AcademAI`,
    description: `Practice realistic ${course.title} scenarios and qualify for a completion certificate.`,
  };
}

export default async function AssessmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const { userId } = await auth();
  if (!userId) redirect(`/sign-in?callbackUrl=/courses/${slug}/assessment`);
  await requireActiveMembership(userId);

  const assessment = getAssessmentForCourse(slug);
  if (!assessment) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">
          Courses
        </Link>
        <span>/</span>
        <Link href={`/courses/${slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
          {course.title}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-900 dark:text-white">Scenario Test</span>
      </nav>

      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Paid mastery assessment
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{course.title} Scenario Test</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Prove you can apply the lesson concepts in realistic Claude workflows. Passing this test
          plus completing all modules unlocks an AcademAI certificate.
        </p>
      </div>

      <AssessmentForm assessment={assessment} />
    </div>
  );
}

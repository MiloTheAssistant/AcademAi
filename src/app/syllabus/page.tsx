import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SyllabusBuilder } from "@/components/SyllabusBuilder";
import { hasActiveMembership } from "@/lib/entitlements";
import { listSyllabi, type GeneratedSyllabus } from "@/lib/syllabus";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Syllabus Builder",
  description:
    "Preview AcademAI's AI syllabus builder for personalized Claude study plans, then unlock saved syllabi with an active membership.",
  alternates: {
    canonical: "/syllabus",
  },
};

export default async function SyllabusPage() {
  const { userId } = await auth();
  const activeMember = userId ? await hasActiveMembership(userId) : false;

  if (!activeMember || !userId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Paid planning tool
          </p>
          <h1 className="text-4xl font-bold tracking-tight">AI-generated Claude syllabus</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            AcademAI turns your goal, current skill level, and preferred learning path into a
            structured Claude study plan. Members can generate, save, and revisit personalized
            syllabi tied to their learning progress.
          </p>
        </div>

        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-xl font-bold text-blue-950 dark:text-blue-100">
            What the syllabus builder provides
          </h2>
          <ul className="mt-4 grid gap-3 text-sm text-blue-900 dark:text-blue-100 md:grid-cols-2">
            <li>Goal-specific module sequence for Claude learning.</li>
            <li>Skill-level calibration for novice, slightly skilled, and intermediate learners.</li>
            <li>Practical activities and checkpoints for every module.</li>
            <li>Saved plans available with an active AcademAI membership.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={userId ? "/pricing" : "/sign-in?callbackUrl=/syllabus"}
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {userId ? "Unlock syllabus builder" : "Sign in to build a syllabus"}
            </Link>
            <Link
              href="/courses"
              className="inline-flex rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-100"
            >
              Browse courses
            </Link>
          </div>
        </section>
      </div>
    );
  }

  let syllabi: GeneratedSyllabus[] = [];
  try {
    syllabi = await listSyllabi(userId);
  } catch (err) {
    console.error("Syllabus list failed:", err);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Paid planning tool
        </p>
        <h1 className="text-4xl font-bold tracking-tight">AI-generated Claude syllabus</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Tell AcademAI what you want to accomplish. Ollama is used first when configured
          with a hosted endpoint, with NVIDIA NIM, OpenAI, and a structured template fallback
          so your paid study plan is always saved.
        </p>
      </div>

      <SyllabusBuilder />

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">Saved syllabi</h2>
        {syllabi.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No saved syllabi yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {syllabi.map((syllabus) => (
              <article
                key={syllabus.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{syllabus.path}</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {syllabus.generationStatus === "generating" ? "building" : syllabus.source}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{syllabus.goal}</p>
                <p className="mt-3 text-xs text-slate-400">
                  {syllabus.generationStatus === "generating"
                    ? "AI generation in progress"
                    : `${syllabus.modules.length} modules`}
                  {syllabus.createdAt ? ` · ${new Date(syllabus.createdAt).toLocaleDateString()}` : ""}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

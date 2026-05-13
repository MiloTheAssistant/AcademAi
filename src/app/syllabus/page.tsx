import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { SyllabusBuilder } from "@/components/SyllabusBuilder";
import { requireActiveMembership } from "@/lib/entitlements";
import { listSyllabi, type GeneratedSyllabus } from "@/lib/syllabus";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI Syllabus Builder - AcademAI",
  description: "Generate and save a personalized Claude study syllabus with AcademAI.",
};

export default async function SyllabusPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?callbackUrl=/syllabus");
  await requireActiveMembership(userId);

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
          Tell AcademAI what you want to accomplish. Claude is used first when configured,
          with a structured fallback so your paid study plan is always saved.
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
                    {syllabus.source}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{syllabus.goal}</p>
                <p className="mt-3 text-xs text-slate-400">
                  {syllabus.modules.length} modules
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

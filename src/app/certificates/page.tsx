import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { requireActiveMembership } from "@/lib/entitlements";
import { listCertificates, type Certificate } from "@/lib/certificates";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Certificates - AcademAI",
  description: "View your AcademAI completion certificates.",
};

export default async function CertificatesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?callbackUrl=/certificates");
  await requireActiveMembership(userId);

  let certificates: Certificate[] = [];
  try {
    certificates = await listCertificates(userId);
  } catch (err) {
    console.error("Certificate list failed:", err);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          AcademAI credentials
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Certificates</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Certificates are issued after all course modules are complete and the scenario test is passed.
          These are AcademAI completion certificates, not official Anthropic credentials.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold">No certificates yet</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Complete a paid Claude course and pass its scenario test to issue your first certificate.
          </p>
          <Link
            href="/courses"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {certificates.map((certificate) => (
            <article
              key={certificate.id}
              className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm dark:border-emerald-900 dark:bg-slate-900"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  Completed
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(certificate.issuedAt).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-bold">{certificate.courseTitle}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Scenario mastery score: {certificate.score}%
              </p>
              <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-slate-800">
                Certificate ID: {certificate.id}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

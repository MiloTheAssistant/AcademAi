import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { hasActiveMembership } from "@/lib/entitlements";
import { listCertificates, type Certificate } from "@/lib/certificates";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Preview AcademAI completion certificates for paid course mastery, scenario tests, and saved achievement history.",
  alternates: {
    canonical: "/certificates",
  },
};

export default async function CertificatesPage() {
  const { userId } = await auth();
  const activeMember = userId ? await hasActiveMembership(userId) : false;

  if (!activeMember || !userId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            AcademAI credentials
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Certificates</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            AcademAI completion certificates document course progress, scenario-test mastery,
            and completion history for paid learning paths. They are AcademAI credentials,
            not official Anthropic certifications.
          </p>
        </div>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
          <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-100">
            How certificates are earned
          </h2>
          <ul className="mt-4 grid gap-3 text-sm text-emerald-900 dark:text-emerald-100 md:grid-cols-2">
            <li>Complete the course modules in a paid AcademAI path.</li>
            <li>Pass the course scenario mastery test.</li>
            <li>Keep certificate history tied to your signed-in account.</li>
            <li>Use certificates as independent proof of AcademAI course completion.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={userId ? "/pricing" : "/sign-in?callbackUrl=/certificates"}
              className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {userId ? "Unlock certificates" : "Sign in to view certificates"}
            </Link>
            <Link
              href="/courses"
              className="inline-flex rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
            >
              Browse courses
            </Link>
          </div>
        </section>
      </div>
    );
  }

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

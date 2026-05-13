import { randomUUID } from "node:crypto";
import { getCourseBySlug } from "@/data/courses";
import { getSql } from "@/lib/db";

export type Certificate = {
  id: string;
  provider: "anthropic";
  courseSlug: string;
  courseTitle: string;
  score: number;
  issuedAt: string;
};

export function canIssueCertificate({
  completedModules,
  totalModules,
  bestAssessmentScore,
  passingScore,
}: {
  completedModules: number[];
  totalModules: number;
  bestAssessmentScore: number | null;
  passingScore: number;
}): boolean {
  const uniqueCompleted = new Set(completedModules);
  return (
    totalModules > 0 &&
    uniqueCompleted.size >= totalModules &&
    bestAssessmentScore !== null &&
    bestAssessmentScore >= passingScore
  );
}

function certificateFromRow(row: Record<string, unknown>): Certificate {
  return {
    id: String(row.id),
    provider: "anthropic",
    courseSlug: String(row.course_slug),
    courseTitle: String(row.course_title),
    score: Number(row.score),
    issuedAt: new Date(String(row.issued_at)).toISOString(),
  };
}

export async function getCertificate(
  userId: string,
  courseSlug: string,
): Promise<Certificate | null> {
  const sql = getSql();
  const rows = await sql`
    select id, course_slug, course_title, score, issued_at
    from certificates
    where user_id = ${userId}
      and course_slug = ${courseSlug}
    limit 1
  `;

  return rows[0] ? certificateFromRow(rows[0]) : null;
}

export async function listCertificates(userId: string): Promise<Certificate[]> {
  const sql = getSql();
  const rows = await sql`
    select id, course_slug, course_title, score, issued_at
    from certificates
    where user_id = ${userId}
    order by issued_at desc
  `;

  return rows.map(certificateFromRow);
}

export async function issueCertificate({
  userId,
  courseSlug,
  score,
}: {
  userId: string;
  courseSlug: string;
  score: number;
}): Promise<Certificate | null> {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;

  const existing = await getCertificate(userId, courseSlug);
  if (existing) return existing;

  const sql = getSql();
  const id = randomUUID();
  const rows = await sql`
    insert into certificates (
      id,
      user_id,
      provider,
      course_slug,
      course_title,
      score
    )
    values (
      ${id},
      ${userId},
      ${"anthropic"},
      ${courseSlug},
      ${course.title},
      ${score}
    )
    returning id, course_slug, course_title, score, issued_at
  `;

  return rows[0] ? certificateFromRow(rows[0]) : null;
}

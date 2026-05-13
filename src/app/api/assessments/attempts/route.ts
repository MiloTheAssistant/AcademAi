import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCourseBySlug } from "@/data/courses";
import {
  calculateAssessmentScore,
  getAssessmentForCourse,
  saveAssessmentAttempt,
  type AssessmentAnswers,
} from "@/lib/assessments";
import { canIssueCertificate, issueCertificate } from "@/lib/certificates";
import { hasActiveMembership } from "@/lib/entitlements";
import { getCompletedModules } from "@/lib/progress";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await hasActiveMembership(userId))) {
    return NextResponse.json({ error: "Active membership required." }, { status: 402 });
  }

  const body = await req.json() as {
    courseSlug?: string;
    answers?: AssessmentAnswers;
  };
  if (!body.courseSlug || !body.answers) {
    return NextResponse.json({ error: "Invalid assessment payload." }, { status: 400 });
  }

  const course = getCourseBySlug(body.courseSlug);
  const assessment = getAssessmentForCourse(body.courseSlug);
  if (!course || !assessment) {
    return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
  }

  const result = calculateAssessmentScore(assessment, body.answers);

  try {
    await saveAssessmentAttempt({
      userId,
      assessment,
      answers: body.answers,
      result,
    });

    const progress = await getCompletedModules(userId, body.courseSlug);
    const completedModules = progress[body.courseSlug] ?? [];
    const certificate = canIssueCertificate({
      completedModules,
      totalModules: course.modules.length,
      bestAssessmentScore: result.score,
      passingScore: assessment.passingScore,
    })
      ? await issueCertificate({
          userId,
          courseSlug: body.courseSlug,
          score: result.score,
        })
      : null;

    return NextResponse.json({ ...result, certificate });
  } catch (err) {
    console.error("Assessment submission failed:", err);
    return NextResponse.json({ error: "Assessment could not be saved." }, { status: 503 });
  }
}

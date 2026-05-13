import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { hasActiveMembership } from "@/lib/entitlements";
import {
  generateSyllabus,
  saveSyllabus,
  type SkillLevel,
  type SyllabusProvider,
} from "@/lib/syllabus";

const allowedLevels: SkillLevel[] = ["novice", "slightly-skilled", "intermediate"];

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await hasActiveMembership(userId))) {
    return NextResponse.json({ error: "Active membership required." }, { status: 402 });
  }

  const body = await req.json() as {
    provider?: SyllabusProvider;
    goal?: string;
    skillLevel?: SkillLevel;
    path?: string;
  };

  if (
    body.provider !== "anthropic" ||
    !body.goal ||
    body.goal.trim().length < 12 ||
    !body.skillLevel ||
    !allowedLevels.includes(body.skillLevel) ||
    !body.path
  ) {
    return NextResponse.json({ error: "Invalid syllabus request." }, { status: 400 });
  }

  try {
    const generated = await generateSyllabus({
      provider: "anthropic",
      goal: body.goal.trim(),
      skillLevel: body.skillLevel,
      path: body.path,
    });
    const syllabus = await saveSyllabus(userId, generated);
    return NextResponse.json({ syllabus });
  } catch (err) {
    console.error("Syllabus generation failed:", err);
    return NextResponse.json({ error: "Syllabus could not be generated." }, { status: 503 });
  }
}

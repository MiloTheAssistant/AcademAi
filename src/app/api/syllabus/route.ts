import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { hasActiveMembership } from "@/lib/entitlements";
import {
  completeSyllabus,
  failSyllabus,
  generateSyllabus,
  getSyllabus,
  savePendingSyllabus,
  type SkillLevel,
  type SyllabusProvider,
} from "@/lib/syllabus";

const allowedLevels: SkillLevel[] = ["novice", "slightly-skilled", "intermediate"];

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!(await hasActiveMembership(userId))) {
    return NextResponse.json({ error: "Active membership required." }, { status: 402 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing syllabus id." }, { status: 400 });

  const syllabus = await getSyllabus(userId, id);
  if (!syllabus) return NextResponse.json({ error: "Syllabus not found." }, { status: 404 });

  return NextResponse.json({ syllabus });
}

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
    const request = {
      provider: "anthropic",
      goal: body.goal.trim(),
      skillLevel: body.skillLevel,
      path: body.path,
    } as const;
    const syllabus = await savePendingSyllabus(userId, request);

    after(async () => {
      if (!syllabus.id) return;
      try {
        const generated = await generateSyllabus(request);
        await completeSyllabus(userId, syllabus.id, generated);
      } catch (err) {
        console.error("Background syllabus generation failed:", err);
        await failSyllabus(
          userId,
          syllabus.id,
          err instanceof Error ? err.message : "Syllabus generation failed.",
        );
      }
    });

    return NextResponse.json({ syllabus }, { status: 202 });
  } catch (err) {
    console.error("Syllabus request failed:", err);
    return NextResponse.json({ error: "Syllabus could not be started." }, { status: 503 });
  }
}

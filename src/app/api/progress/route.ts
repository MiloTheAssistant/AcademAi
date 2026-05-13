import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getCompletedModules,
  resetCourseProgress,
  setModuleComplete,
} from "@/lib/progress";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ progress: {} }, { status: 401 });

  try {
    return NextResponse.json({ progress: await getCompletedModules(userId) });
  } catch (err) {
    console.error("Progress load failed:", err);
    return NextResponse.json({ error: "Progress is unavailable." }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as {
    slug?: string;
    moduleIndex?: number;
    completed?: boolean;
  };

  if (!body.slug || typeof body.moduleIndex !== "number" || typeof body.completed !== "boolean") {
    return NextResponse.json({ error: "Invalid progress payload." }, { status: 400 });
  }

  try {
    await setModuleComplete({
      userId,
      courseSlug: body.slug,
      moduleIndex: body.moduleIndex,
      completed: body.completed,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Progress save failed:", err);
    return NextResponse.json({ error: "Progress could not be saved." }, { status: 503 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const course = req.nextUrl.searchParams.get("course");
  if (!course) return NextResponse.json({ error: "Missing course." }, { status: 400 });

  try {
    await resetCourseProgress(userId, course);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Progress reset failed:", err);
    return NextResponse.json({ error: "Progress could not be reset." }, { status: 503 });
  }
}

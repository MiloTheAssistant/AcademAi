import { randomUUID } from "node:crypto";
import { getSql } from "@/lib/db";

export type SyllabusProvider = "anthropic";
export type SkillLevel = "novice" | "slightly-skilled" | "intermediate";

export type SyllabusRequest = {
  provider: SyllabusProvider;
  goal: string;
  skillLevel: SkillLevel;
  path: string;
};

export type SyllabusModule = {
  title: string;
  objective: string;
  activities: string[];
  assessment: string;
};

export type GeneratedSyllabus = SyllabusRequest & {
  id?: string;
  modules: SyllabusModule[];
  source: "claude" | "template";
  createdAt?: string;
};

export function buildSyllabusPrompt(request: SyllabusRequest): string {
  return [
    "Create a practical AcademAI study syllabus for Anthropic and Claude learners.",
    "Audience: novice to intermediate AI enthusiasts who want confidence, not jargon.",
    `Learner goal: ${request.goal}`,
    `Current skill level: ${request.skillLevel}`,
    `Chosen path: ${request.path}`,
    "Return compact JSON only with a modules array.",
    "Each module must include title, objective, activities, and assessment.",
    "Use AcademAI's independent educational voice. Do not copy Anthropic course text.",
  ].join("\n");
}

export function createFallbackSyllabus(request: SyllabusRequest): GeneratedSyllabus {
  return {
    ...request,
    source: "template",
    modules: [
      {
        title: "Claude Confidence Baseline",
        objective:
          "Understand where Claude fits in daily work and build safe habits for asking, checking, and refining.",
        activities: [
          "Write three real prompts for a work, learning, and research task.",
          "Compare a vague prompt against a prompt with role, context, format, and constraints.",
        ],
        assessment: "Explain how you would verify one Claude answer before using it.",
      },
      {
        title: "Projects, Files, And Reusable Context",
        objective:
          "Use Claude as a workspace for ongoing goals rather than a one-off answer box.",
        activities: [
          "Create a reusable project brief for a personal or professional goal.",
          "Upload or paste source material and ask Claude for a structured plan.",
        ],
        assessment: "Identify what belongs in persistent project context versus a single chat.",
      },
      {
        title: "Scenario Prompting And Iteration",
        objective:
          "Improve output quality through examples, constraints, critique, and follow-up turns.",
        activities: [
          "Ask Claude to draft, critique, and revise a deliverable.",
          "Practice asking Claude for assumptions, risks, and missing context.",
        ],
        assessment: "Revise a weak prompt into a scenario-ready prompt.",
      },
      {
        title: "Applied Claude Workflow",
        objective:
          "Complete one useful end-to-end workflow with Claude and document the result.",
        activities: [
          "Choose a research, writing, planning, or learning workflow.",
          "Run the workflow in three passes: plan, draft, verify.",
        ],
        assessment: "Submit a short reflection on what improved and what still required human judgment.",
      },
    ],
  };
}

function normalizeGeneratedModules(value: unknown): SyllabusModule[] | null {
  if (!value || typeof value !== "object" || !("modules" in value)) return null;
  const modules = (value as { modules?: unknown }).modules;
  if (!Array.isArray(modules)) return null;

  const normalized = modules
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const syllabusModule = item as Record<string, unknown>;
      const activities = Array.isArray(syllabusModule.activities)
        ? syllabusModule.activities.map(String).filter(Boolean)
        : [];
      if (!syllabusModule.title || !syllabusModule.objective || !syllabusModule.assessment || activities.length === 0) {
        return null;
      }
      return {
        title: String(syllabusModule.title),
        objective: String(syllabusModule.objective),
        activities,
        assessment: String(syllabusModule.assessment),
      };
    })
    .filter((item): item is SyllabusModule => item !== null);

  return normalized.length > 0 ? normalized : null;
}

export async function generateSyllabus(request: SyllabusRequest): Promise<GeneratedSyllabus> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return createFallbackSyllabus(request);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_SYLLABUS_MODEL ?? "claude-sonnet-4-5",
      max_tokens: 1400,
      messages: [{ role: "user", content: buildSyllabusPrompt(request) }],
    }),
  });

  if (!response.ok) return createFallbackSyllabus(request);

  const payload = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = payload.content?.find((part) => part.type === "text")?.text;
  if (!text) return createFallbackSyllabus(request);

  try {
    const parsed = JSON.parse(text) as unknown;
    const modules = normalizeGeneratedModules(parsed);
    if (!modules) return createFallbackSyllabus(request);
    return { ...request, modules, source: "claude" };
  } catch {
    return createFallbackSyllabus(request);
  }
}

function syllabusFromRow(row: Record<string, unknown>): GeneratedSyllabus {
  const modules = Array.isArray(row.modules)
    ? (row.modules as SyllabusModule[])
    : JSON.parse(String(row.modules)) as SyllabusModule[];

  return {
    id: String(row.id),
    provider: "anthropic",
    goal: String(row.goal),
    skillLevel: String(row.skill_level) as SkillLevel,
    path: String(row.learning_path),
    modules,
    source: row.source === "claude" ? "claude" : "template",
    createdAt: new Date(String(row.created_at)).toISOString(),
  };
}

export async function saveSyllabus(
  userId: string,
  syllabus: GeneratedSyllabus,
): Promise<GeneratedSyllabus> {
  const sql = getSql();
  const id = randomUUID();
  const rows = await sql`
    insert into generated_syllabi (
      id,
      user_id,
      provider,
      goal,
      skill_level,
      learning_path,
      modules,
      source
    )
    values (
      ${id},
      ${userId},
      ${syllabus.provider},
      ${syllabus.goal},
      ${syllabus.skillLevel},
      ${syllabus.path},
      ${JSON.stringify(syllabus.modules)},
      ${syllabus.source}
    )
    returning id, provider, goal, skill_level, learning_path, modules, source, created_at
  `;

  return syllabusFromRow(rows[0]);
}

export async function listSyllabi(userId: string): Promise<GeneratedSyllabus[]> {
  const sql = getSql();
  const rows = await sql`
    select id, provider, goal, skill_level, learning_path, modules, source, created_at
    from generated_syllabi
    where user_id = ${userId}
    order by created_at desc
  `;

  return rows.map(syllabusFromRow);
}

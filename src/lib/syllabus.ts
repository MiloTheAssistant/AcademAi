import { randomUUID } from "node:crypto";
import OpenAI from "openai";
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
  source: "ollama" | "nvidia" | "openai" | "template" | "pending";
  generationStatus?: "generating" | "ready" | "failed";
  generationError?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type SyllabusAIProvider = "ollama" | "nvidia" | "openai";

const OLLAMA_OPENAI_BASE_URL = "http://localhost:11434/v1";
const OLLAMA_CLOUD_API_BASE_URL = "https://ollama.com/api";
const OLLAMA_LOCAL_MODEL = "gpt-oss:20b";
const OLLAMA_CLOUD_MODEL = "deepseek-v4-flash:cloud";
const NVIDIA_NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";
const NVIDIA_NIM_MODEL = "minimaxai/minimax-m2.7";
const OPENAI_MODEL = "gpt-5.5";
const AI_REQUEST_TIMEOUT_MS = 90_000;
const OLLAMA_MAX_TOKENS = 4096;
const OLLAMA_TEMPERATURE = 0.2;
const NVIDIA_NIM_MAX_TOKENS = 4096;
const NVIDIA_NIM_TEMPERATURE = 0.3;
const OPENAI_MAX_OUTPUT_TOKENS = 4096;

const SYLLABUS_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    modules: {
      type: "array",
      minItems: 4,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          objective: { type: "string" },
          activities: {
            type: "array",
            minItems: 2,
            maxItems: 5,
            items: { type: "string" },
          },
          assessment: { type: "string" },
        },
        required: ["title", "objective", "activities", "assessment"],
        additionalProperties: false,
      },
    },
  },
  required: ["modules"],
  additionalProperties: false,
} as const;

export function buildSyllabusPrompt(request: SyllabusRequest): string {
  return [
    `Create a 4-module AcademAI study syllabus for using Claude to accomplish this goal: "${request.goal}".`,
    `Learner skill level: ${request.skillLevel}.`,
    `Learning path: ${request.path}.`,
    "Each module needs a practical title, one objective, 2-3 activities, and one scenario-style assessment.",
    "Use an independent educational voice for novice to intermediate learners.",
    "Return only a JSON object that matches the provided schema. Do not include markdown or commentary.",
  ].join("\n");
}

function getSyllabusAIProvider(): SyllabusAIProvider | null {
  const provider = (process.env.AI_PROVIDER || "ollama").toLowerCase();
  if (provider === "ollama" || provider === "nvidia" || provider === "openai") return provider;
  return null;
}

export function getSyllabusProviderOrder(provider: SyllabusAIProvider | null): SyllabusAIProvider[] {
  if (provider === "ollama") return ["ollama", "nvidia", "openai"];
  if (provider === "nvidia") return ["nvidia", "ollama", "openai"];
  if (provider === "openai") return ["openai", "ollama", "nvidia"];
  return [];
}

function getAIRequestTimeoutMs(): number {
  const value = Number(process.env.AI_REQUEST_TIMEOUT_MS);
  return Number.isFinite(value) && value > 0 ? value : AI_REQUEST_TIMEOUT_MS;
}

function getPositiveNumber(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function getOllamaBaseUrl(): string {
  if (process.env.OLLAMA_BASE_URL) return process.env.OLLAMA_BASE_URL;
  return process.env.OLLAMA_API_KEY ? OLLAMA_CLOUD_API_BASE_URL : OLLAMA_OPENAI_BASE_URL;
}

function isOllamaNativeApiUrl(baseUrl: string): boolean {
  try {
    const url = new URL(baseUrl);
    return url.hostname === "ollama.com" || url.pathname.replace(/\/+$/, "") === "/api";
  } catch {
    return false;
  }
}

function getOllamaNativeApiBaseUrl(baseUrl: string): string {
  const trimmed = baseUrl.replace(/\/+$/, "");
  if (trimmed === "https://ollama.com") return OLLAMA_CLOUD_API_BASE_URL;
  return trimmed;
}

function getOllamaModel(nativeApi: boolean): string {
  if (process.env.OLLAMA_MODEL) return process.env.OLLAMA_MODEL;
  return nativeApi ? OLLAMA_CLOUD_MODEL : OLLAMA_LOCAL_MODEL;
}

export function createFallbackSyllabus(request: SyllabusRequest): GeneratedSyllabus {
  return {
    ...request,
    source: "template",
    generationStatus: "ready",
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

export function createPendingSyllabus(request: SyllabusRequest): GeneratedSyllabus {
  return {
    ...request,
    source: "pending",
    generationStatus: "generating",
    generationError: null,
    modules: [],
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

function hasProviderCredentials(provider: SyllabusAIProvider): boolean {
  if (provider === "nvidia") return Boolean(process.env.NVIDIA_API_KEY);
  if (provider === "openai") return Boolean(process.env.OPENAI_API_KEY);

  const baseUrl = getOllamaBaseUrl();
  if (isOllamaNativeApiUrl(baseUrl) && new URL(baseUrl).hostname === "ollama.com") {
    return Boolean(process.env.OLLAMA_API_KEY);
  }
  if (process.env.VERCEL && baseUrl.includes("localhost")) return false;
  return true;
}

async function generateWithOllamaNativeApi(prompt: string, baseUrl: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), getAIRequestTimeoutMs());

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.OLLAMA_API_KEY) {
      headers.Authorization = `Bearer ${process.env.OLLAMA_API_KEY}`;
    }

    const response = await fetch(`${getOllamaNativeApiBaseUrl(baseUrl)}/chat`, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: getOllamaModel(true),
        stream: false,
        think: false,
        messages: [
          {
            role: "system",
            content:
              "You design practical Claude study plans. Return only a valid JSON object with a modules array.",
          },
          { role: "user", content: prompt },
        ],
        options: {
          num_predict: getPositiveNumber("OLLAMA_MAX_TOKENS", OLLAMA_MAX_TOKENS),
          temperature: getPositiveNumber("OLLAMA_TEMPERATURE", OLLAMA_TEMPERATURE),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API returned ${response.status}`);
    }

    const payload = await response.json() as { message?: { content?: string } };
    return payload.message?.content || null;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateWithOllamaOpenAICompatible(prompt: string, baseUrl: string): Promise<string | null> {
  const client = new OpenAI({
    apiKey: process.env.OLLAMA_API_KEY || "ollama",
    baseURL: baseUrl,
    timeout: getAIRequestTimeoutMs(),
    maxRetries: 0,
  });

  const completion = await client.chat.completions.create({
    model: getOllamaModel(false),
    max_tokens: getPositiveNumber("OLLAMA_MAX_TOKENS", OLLAMA_MAX_TOKENS),
    temperature: getPositiveNumber("OLLAMA_TEMPERATURE", OLLAMA_TEMPERATURE),
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "You design practical Claude study plans. Return only a valid JSON object with a modules array.",
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
  });

  return completion.choices[0]?.message?.content || null;
}

async function generateWithOllama(prompt: string): Promise<string | null> {
  const baseUrl = getOllamaBaseUrl();
  if (isOllamaNativeApiUrl(baseUrl)) {
    return generateWithOllamaNativeApi(prompt, baseUrl);
  }
  return generateWithOllamaOpenAICompatible(prompt, baseUrl);
}

async function generateWithNvidia(prompt: string): Promise<string | null> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return null;

  const client = new OpenAI({
    apiKey,
    baseURL: process.env.NVIDIA_NIM_BASE_URL || NVIDIA_NIM_BASE_URL,
    timeout: getAIRequestTimeoutMs(),
    maxRetries: 0,
  });

  const completion = await client.chat.completions.create({
    model: process.env.NVIDIA_NIM_MODEL || NVIDIA_NIM_MODEL,
    max_tokens: getPositiveNumber("NVIDIA_NIM_MAX_TOKENS", NVIDIA_NIM_MAX_TOKENS),
    temperature: getPositiveNumber("NVIDIA_NIM_TEMPERATURE", NVIDIA_NIM_TEMPERATURE),
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "You design practical Claude study plans. Return only a JSON object that matches the provided schema.",
      },
      { role: "user", content: prompt },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "academai_syllabus",
        schema: SYLLABUS_RESPONSE_SCHEMA,
        strict: true,
      },
    },
  } as Parameters<typeof client.chat.completions.create>[0] & {
    response_format: {
      type: "json_schema";
      json_schema: {
        name: string;
        schema: typeof SYLLABUS_RESPONSE_SCHEMA;
        strict: boolean;
      };
    };
  });

  return "choices" in completion ? completion.choices[0]?.message?.content || null : null;
}

async function generateWithOpenAI(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const client = new OpenAI({
    apiKey,
    timeout: getAIRequestTimeoutMs(),
    maxRetries: 0,
  });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || OPENAI_MODEL,
    max_output_tokens: getPositiveNumber("OPENAI_MAX_OUTPUT_TOKENS", OPENAI_MAX_OUTPUT_TOKENS),
    input: [
      {
        role: "system",
        content:
          "You design practical Claude study plans. Return only a JSON object that matches the provided schema.",
      },
      { role: "user", content: prompt },
    ],
    text: {
      verbosity: "low",
      format: {
        type: "json_schema",
        name: "academai_syllabus",
        schema: SYLLABUS_RESPONSE_SCHEMA,
        strict: true,
      },
    },
  });

  return response.output_text || null;
}

export async function generateSyllabus(request: SyllabusRequest): Promise<GeneratedSyllabus> {
  const provider = getSyllabusAIProvider();
  if (!provider) return createFallbackSyllabus(request);

  const prompt = buildSyllabusPrompt(request);
  const providers = getSyllabusProviderOrder(provider);

  for (const currentProvider of providers) {
    if (!hasProviderCredentials(currentProvider)) continue;

    try {
      const text = currentProvider === "ollama"
        ? await generateWithOllama(prompt)
        : currentProvider === "nvidia"
          ? await generateWithNvidia(prompt)
          : await generateWithOpenAI(prompt);
      if (!text) continue;

      const parsed = JSON.parse(text) as unknown;
      const modules = normalizeGeneratedModules(parsed);
      if (!modules) continue;
      return { ...request, modules, source: currentProvider };
    } catch (err) {
      console.warn("Syllabus AI provider failed; trying next fallback.", {
        provider: currentProvider,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return createFallbackSyllabus(request);
}

function syllabusFromRow(row: Record<string, unknown>): GeneratedSyllabus {
  const modules = Array.isArray(row.modules)
    ? (row.modules as SyllabusModule[])
    : JSON.parse(String(row.modules)) as SyllabusModule[];

  const source = row.source === "ollama" || row.source === "nvidia" || row.source === "openai" || row.source === "pending"
    ? row.source
    : "template";
  const generationStatus = row.generation_status === "generating" || row.generation_status === "failed"
    ? row.generation_status
    : "ready";

  return {
    id: String(row.id),
    provider: "anthropic",
    goal: String(row.goal),
    skillLevel: String(row.skill_level) as SkillLevel,
    path: String(row.learning_path),
    modules,
    source,
    generationStatus,
    generationError: row.generation_error ? String(row.generation_error) : null,
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: row.updated_at ? new Date(String(row.updated_at)).toISOString() : undefined,
  };
}

export async function getSyllabus(userId: string, syllabusId: string): Promise<GeneratedSyllabus | null> {
  const sql = getSql();
  const rows = await sql`
    select id, provider, goal, skill_level, learning_path, modules, source, generation_status, generation_error, created_at, updated_at
    from generated_syllabi
    where user_id = ${userId} and id = ${syllabusId}
    limit 1
  `;

  return rows[0] ? syllabusFromRow(rows[0]) : null;
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
    returning id, provider, goal, skill_level, learning_path, modules, source, generation_status, generation_error, created_at, updated_at
  `;

  return syllabusFromRow(rows[0]);
}

export async function savePendingSyllabus(
  userId: string,
  request: SyllabusRequest,
): Promise<GeneratedSyllabus> {
  const sql = getSql();
  const id = randomUUID();
  const pending = createPendingSyllabus(request);
  const rows = await sql`
    insert into generated_syllabi (
      id,
      user_id,
      provider,
      goal,
      skill_level,
      learning_path,
      modules,
      source,
      generation_status,
      generation_error,
      updated_at
    )
    values (
      ${id},
      ${userId},
      ${pending.provider},
      ${pending.goal},
      ${pending.skillLevel},
      ${pending.path},
      ${JSON.stringify(pending.modules)},
      ${pending.source},
      ${pending.generationStatus},
      ${pending.generationError},
      now()
    )
    returning id, provider, goal, skill_level, learning_path, modules, source, generation_status, generation_error, created_at, updated_at
  `;

  return syllabusFromRow(rows[0]);
}

export async function completeSyllabus(
  userId: string,
  syllabusId: string,
  syllabus: GeneratedSyllabus,
): Promise<GeneratedSyllabus | null> {
  const sql = getSql();
  const rows = await sql`
    update generated_syllabi
    set
      modules = ${JSON.stringify(syllabus.modules)},
      source = ${syllabus.source},
      generation_status = 'ready',
      generation_error = null,
      updated_at = now()
    where user_id = ${userId} and id = ${syllabusId}
    returning id, provider, goal, skill_level, learning_path, modules, source, generation_status, generation_error, created_at, updated_at
  `;

  return rows[0] ? syllabusFromRow(rows[0]) : null;
}

export async function failSyllabus(
  userId: string,
  syllabusId: string,
  message: string,
): Promise<GeneratedSyllabus | null> {
  const existing = await getSyllabus(userId, syllabusId);
  if (!existing) return null;
  const fallback = createFallbackSyllabus({
    provider: existing.provider,
    goal: existing.goal,
    skillLevel: existing.skillLevel,
    path: existing.path,
  });
  const sql = getSql();
  const rows = await sql`
    update generated_syllabi
    set
      modules = ${JSON.stringify(fallback.modules)},
      source = 'template',
      generation_status = 'failed',
      generation_error = ${message},
      updated_at = now()
    where user_id = ${userId} and id = ${syllabusId}
    returning id, provider, goal, skill_level, learning_path, modules, source, generation_status, generation_error, created_at, updated_at
  `;

  return rows[0] ? syllabusFromRow(rows[0]) : null;
}

export async function listSyllabi(userId: string): Promise<GeneratedSyllabus[]> {
  const sql = getSql();
  const rows = await sql`
    select id, provider, goal, skill_level, learning_path, modules, source, generation_status, generation_error, created_at, updated_at
    from generated_syllabi
    where user_id = ${userId}
    order by created_at desc
  `;

  return rows.map(syllabusFromRow);
}

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildSyllabusPrompt,
  createFallbackSyllabus,
  createPendingSyllabus,
  generateSyllabus,
  getSyllabusProviderOrder,
} from "./syllabus";

const originalEnv = process.env;

describe("syllabus generation", () => {
  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("builds a concise Claude prompt with learner goal and level", () => {
    const prompt = buildSyllabusPrompt({
      provider: "anthropic",
      goal: "Use Claude for research and work planning",
      skillLevel: "novice",
      path: "Claude Foundations",
    });

    expect(prompt).toContain("Claude");
    expect(prompt).toContain("Use Claude for research and work planning");
    expect(prompt).toContain("novice");
    expect(prompt).toContain("Claude Foundations");
    expect(prompt).toContain("Return only a JSON object");
  });

  it("creates a structured fallback syllabus when AI generation is not configured", () => {
    const syllabus = createFallbackSyllabus({
      provider: "anthropic",
      goal: "Become confident with Claude",
      skillLevel: "intermediate",
      path: "Claude Foundations",
    });

    expect(syllabus.provider).toBe("anthropic");
    expect(syllabus.source).toBe("template");
    expect(syllabus.modules.length).toBeGreaterThanOrEqual(4);
    expect(syllabus.modules[0]).toHaveProperty("title");
    expect(syllabus.modules[0]).toHaveProperty("activities");
  });

  it("creates a pending syllabus record before background generation completes", () => {
    const syllabus = createPendingSyllabus({
      provider: "anthropic",
      goal: "Use Claude to build a reliable research workflow",
      skillLevel: "slightly-skilled",
      path: "Claude For Work And Study",
    });

    expect(syllabus.source).toBe("pending");
    expect(syllabus.generationStatus).toBe("generating");
    expect(syllabus.modules).toEqual([]);
  });

  it("falls back when the default NVIDIA provider has no API key", async () => {
    process.env = { ...originalEnv, AI_PROVIDER: "nvidia", NVIDIA_API_KEY: "" };

    const syllabus = await generateSyllabus({
      provider: "anthropic",
      goal: "Use Claude to improve weekly planning and research workflows",
      skillLevel: "slightly-skilled",
      path: "Claude For Work And Study",
    });

    expect(syllabus.source).toBe("template");
    expect(syllabus.modules.length).toBeGreaterThanOrEqual(4);
  });

  it("falls back on Vercel when Ollama is selected without a hosted base URL", async () => {
    process.env = {
      ...originalEnv,
      AI_PROVIDER: "ollama",
      VERCEL: "1",
      OLLAMA_BASE_URL: "",
      OLLAMA_API_KEY: "",
    };

    const syllabus = await generateSyllabus({
      provider: "anthropic",
      goal: "Use Claude to create better research briefings",
      skillLevel: "novice",
      path: "Claude Foundations",
    });

    expect(syllabus.source).toBe("template");
    expect(syllabus.modules.length).toBeGreaterThanOrEqual(4);
  });

  it("tries Ollama first when Ollama is selected", () => {
    expect(getSyllabusProviderOrder("ollama")).toEqual(["ollama", "nvidia", "openai"]);
  });

  it("uses Ollama Cloud's native API when configured for ollama.com", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({
      message: {
        content: JSON.stringify({
          modules: [
            {
              title: "Research Workflow",
              objective: "Use Claude to plan and verify research.",
              activities: ["Draft a research brief", "Verify claims against source material"],
              assessment: "Explain how you would validate one source.",
            },
            {
              title: "Prompt Iteration",
              objective: "Improve prompts through critique.",
              activities: ["Write a baseline prompt", "Revise it with constraints"],
              assessment: "Identify the strongest revision.",
            },
            {
              title: "Project Context",
              objective: "Organize reusable context.",
              activities: ["Create a project brief", "Attach useful reference notes"],
              assessment: "Separate reusable context from one-off details.",
            },
            {
              title: "Final Workflow",
              objective: "Run an end-to-end Claude workflow.",
              activities: ["Plan the task", "Draft and verify the output"],
              assessment: "Describe what still needs human review.",
            },
          ],
        }),
      },
    })));
    vi.stubGlobal("fetch", fetchMock);
    process.env = {
      ...originalEnv,
      AI_PROVIDER: "ollama",
      OLLAMA_BASE_URL: "https://ollama.com/api",
      OLLAMA_API_KEY: "test-key",
      OLLAMA_MODEL: "deepseek-v4-flash:cloud",
    };

    const syllabus = await generateSyllabus({
      provider: "anthropic",
      goal: "Use Claude to create better research briefings",
      skillLevel: "novice",
      path: "Claude Foundations",
    });

    expect(syllabus.source).toBe("ollama");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://ollama.com/api/chat",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-key",
        }),
      }),
    );
    const requestBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(requestBody.model).toBe("deepseek-v4-flash:cloud");
    expect(requestBody.stream).toBe(false);
  });
});

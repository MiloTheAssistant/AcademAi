import { describe, expect, it } from "vitest";
import { buildSyllabusPrompt, createFallbackSyllabus } from "./syllabus";

describe("syllabus generation", () => {
  it("builds an Anthropic-first prompt with learner goal and level", () => {
    const prompt = buildSyllabusPrompt({
      provider: "anthropic",
      goal: "Use Claude for research and work planning",
      skillLevel: "novice",
      path: "Claude Foundations",
    });

    expect(prompt).toContain("Anthropic");
    expect(prompt).toContain("Use Claude for research and work planning");
    expect(prompt).toContain("novice");
    expect(prompt).toContain("Claude Foundations");
  });

  it("creates a structured fallback syllabus when Claude generation is not configured", () => {
    const syllabus = createFallbackSyllabus({
      provider: "anthropic",
      goal: "Become confident with Claude",
      skillLevel: "intermediate",
      path: "Claude Foundations",
    });

    expect(syllabus.provider).toBe("anthropic");
    expect(syllabus.modules.length).toBeGreaterThanOrEqual(4);
    expect(syllabus.modules[0]).toHaveProperty("title");
    expect(syllabus.modules[0]).toHaveProperty("activities");
  });
});

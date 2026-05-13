import { describe, expect, it } from "vitest";
import {
  calculateAssessmentScore,
  isAssessmentPassing,
} from "./assessments";

describe("assessment scoring", () => {
  it("scores deterministic scenario answers by matching the answer key", () => {
    const result = calculateAssessmentScore(
      {
        courseSlug: "claude-101",
        passingScore: 80,
        questions: [
          {
            id: "q1",
            prompt: "A learner needs a stronger prompt. What should they do?",
            options: [
              { id: "a", label: "Ask vaguely" },
              { id: "b", label: "Add role, context, output format, and constraints" },
            ],
            correctOptionId: "b",
            explanation: "Specific context and constraints produce better results.",
          },
          {
            id: "q2",
            prompt: "Claude gives an uncertain answer. What is best?",
            options: [
              { id: "a", label: "Ask for sources and verify externally" },
              { id: "b", label: "Use it without checking" },
            ],
            correctOptionId: "a",
            explanation: "Scenario mastery includes verification habits.",
          },
        ],
      },
      { q1: "b", q2: "a" },
    );

    expect(result.correctCount).toBe(2);
    expect(result.score).toBe(100);
    expect(result.passed).toBe(true);
  });

  it("requires the configured passing score", () => {
    expect(isAssessmentPassing(79, 80)).toBe(false);
    expect(isAssessmentPassing(80, 80)).toBe(true);
  });
});

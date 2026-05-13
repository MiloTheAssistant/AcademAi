import { describe, expect, it } from "vitest";
import { canIssueCertificate } from "./certificates";

describe("certificate eligibility", () => {
  it("requires all lessons complete and a passing assessment", () => {
    expect(
      canIssueCertificate({
        completedModules: [0, 1, 2],
        totalModules: 3,
        bestAssessmentScore: 85,
        passingScore: 80,
      }),
    ).toBe(true);

    expect(
      canIssueCertificate({
        completedModules: [0, 1],
        totalModules: 3,
        bestAssessmentScore: 100,
        passingScore: 80,
      }),
    ).toBe(false);

    expect(
      canIssueCertificate({
        completedModules: [0, 1, 2],
        totalModules: 3,
        bestAssessmentScore: 70,
        passingScore: 80,
      }),
    ).toBe(false);
  });
});

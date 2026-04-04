import type { LessonContent } from "../lessons";

import claude101 from "./claude-101";
import claudeCodeInAction from "./claude-code-in-action";
import introductionToClaudeCowork from "./introduction-to-claude-cowork";
import introductionToAgentSkills from "./introduction-to-agent-skills";
import introductionToSubagents from "./introduction-to-subagents";
import buildingWithTheClaudeApi from "./building-with-the-claude-api";
import claudeWithAmazonBedrock from "./claude-with-amazon-bedrock";
import claudeWithGoogleVertex from "./claude-with-google-vertex";
import introductionToModelContextProtocol from "./introduction-to-model-context-protocol";
import modelContextProtocolAdvancedTopics from "./model-context-protocol-advanced-topics";
import aiFluencyFrameworkFoundations from "./ai-fluency-framework-foundations";
import aiFluencyForEducators from "./ai-fluency-for-educators";
import aiFluencyForStudents from "./ai-fluency-for-students";
import teachingAiFluency from "./teaching-ai-fluency";
import aiFluencyForNonprofits from "./ai-fluency-for-nonprofits";

export const allLessons: LessonContent[] = [
  ...claude101,
  ...claudeCodeInAction,
  ...introductionToClaudeCowork,
  ...introductionToAgentSkills,
  ...introductionToSubagents,
  ...buildingWithTheClaudeApi,
  ...claudeWithAmazonBedrock,
  ...claudeWithGoogleVertex,
  ...introductionToModelContextProtocol,
  ...modelContextProtocolAdvancedTopics,
  ...aiFluencyFrameworkFoundations,
  ...aiFluencyForEducators,
  ...aiFluencyForStudents,
  ...teachingAiFluency,
  ...aiFluencyForNonprofits,
];

export function getLessonContent(courseSlug: string, moduleIndex: number): LessonContent | undefined {
  return allLessons.find(
    (l) => l.courseSlug === courseSlug && l.moduleIndex === moduleIndex
  );
}

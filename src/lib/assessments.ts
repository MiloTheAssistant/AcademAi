import { randomUUID } from "node:crypto";
import { getSql } from "@/lib/db";
import { getCourseBySlug } from "@/data/courses";

export type AssessmentOption = {
  id: string;
  label: string;
};

export type ScenarioQuestion = {
  id: string;
  prompt: string;
  options: AssessmentOption[];
  correctOptionId: string;
  explanation: string;
};

export type CourseAssessment = {
  provider: "anthropic";
  courseSlug: string;
  passingScore: number;
  questions: ScenarioQuestion[];
};

export type AssessmentAnswers = Record<string, string>;

export type AssessmentResult = {
  score: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  feedback: Array<{
    questionId: string;
    correct: boolean;
    explanation: string;
  }>;
};

export type AssessmentAttempt = AssessmentResult & {
  id: string;
  provider: "anthropic";
  courseSlug: string;
  answers: AssessmentAnswers;
  createdAt: string;
};

const baseQuestions: Record<string, ScenarioQuestion[]> = {
  foundational: [
    {
      id: "prompt-specificity",
      prompt:
        "A learner asks Claude, 'Help with my presentation,' and gets a generic answer. Which revision is strongest?",
      options: [
        { id: "a", label: "Make it more impressive and professional." },
        {
          id: "b",
          label:
            "Act as a presentation coach. Create a 7-slide outline for a nontechnical leadership team about our Q2 support metrics. Keep each slide to one takeaway.",
        },
        { id: "c", label: "Try again but be better." },
      ],
      correctOptionId: "b",
      explanation:
        "Strong Claude prompts give role, audience, context, format, and constraints so the response can match the real task.",
    },
    {
      id: "verification-habit",
      prompt:
        "Claude summarizes a policy document but one point seems surprising. What should the learner do next?",
      options: [
        { id: "a", label: "Paste the summary into the final document immediately." },
        { id: "b", label: "Ask Claude to rewrite the surprising point with more confidence." },
        {
          id: "c",
          label:
            "Ask Claude to cite the source passage, then verify it against the original document before using it.",
        },
      ],
      correctOptionId: "c",
      explanation:
        "Scenario mastery includes verification. Claude can help locate evidence, but the learner owns the final check.",
    },
    {
      id: "project-context",
      prompt:
        "A learner repeats the same company background in every Claude chat. What workflow should they try?",
      options: [
        { id: "a", label: "Use a Claude Project or saved context area for durable background." },
        { id: "b", label: "Start a new anonymous chat each time." },
        { id: "c", label: "Avoid giving Claude any context." },
      ],
      correctOptionId: "a",
      explanation:
        "Projects and reusable context reduce repeated setup and make Claude more useful across related work.",
    },
  ],
  "claude-code": [
    {
      id: "safe-agent-loop",
      prompt:
        "Claude Code proposes changing several files in a repo. What is the best steering move for a novice learner?",
      options: [
        { id: "a", label: "Let it change everything and inspect only after deployment." },
        {
          id: "b",
          label:
            "Ask for a short plan, constrain the file scope, require tests, and review diffs before continuing.",
        },
        { id: "c", label: "Avoid all terminal-based AI tools." },
      ],
      correctOptionId: "b",
      explanation:
        "Effective Claude Code use combines clear scope, checkpoints, tests, and review instead of blind automation.",
    },
    {
      id: "mcp-fit",
      prompt:
        "A learner wants Claude Code to read tickets and update project tasks. Which concept matters most?",
      options: [
        { id: "a", label: "Model Context Protocol connections to approved external tools." },
        { id: "b", label: "Increasing font size in the terminal." },
        { id: "c", label: "Starting every task from scratch." },
      ],
      correctOptionId: "a",
      explanation:
        "MCP is the standard way to connect Claude Code to external tools, data, and workflows.",
    },
    {
      id: "subagent-fit",
      prompt:
        "A project needs separate code review, test repair, and docs passes. What is the best use of subagents?",
      options: [
        { id: "a", label: "Create focused agents with distinct responsibilities and clear handoffs." },
        { id: "b", label: "Give every agent the same vague task." },
        { id: "c", label: "Use subagents only for chat summaries." },
      ],
      correctOptionId: "a",
      explanation:
        "Subagents are useful when work can be delegated to specialized roles with bounded context and outputs.",
    },
  ],
  api: [
    {
      id: "api-secret-handling",
      prompt:
        "A learner is building a Claude API demo. Where should the API key live?",
      options: [
        { id: "a", label: "In a public client component." },
        { id: "b", label: "In a server-side environment variable or secret manager." },
        { id: "c", label: "Committed to the repo for convenience." },
      ],
      correctOptionId: "b",
      explanation:
        "Provider API keys must stay server-side and out of source control.",
    },
    {
      id: "streaming-fit",
      prompt:
        "A chat UI feels slow because the learner waits for the whole answer before showing anything. What should they add?",
      options: [
        { id: "a", label: "Streaming responses." },
        { id: "b", label: "A bigger submit button." },
        { id: "c", label: "More hidden prompts." },
      ],
      correctOptionId: "a",
      explanation:
        "Streaming improves perceived speed by rendering response tokens as they arrive.",
    },
    {
      id: "tool-use-fit",
      prompt:
        "Claude needs to look up order status from your app before answering. Which API pattern fits?",
      options: [
        { id: "a", label: "Tool use with a server-side function Claude can call through your app." },
        { id: "b", label: "Ask Claude to guess the order status." },
        { id: "c", label: "Paste all customer records into every prompt." },
      ],
      correctOptionId: "a",
      explanation:
        "Tool use lets Claude request structured operations while your server controls access and execution.",
    },
  ],
  mcp: [
    {
      id: "mcp-purpose",
      prompt:
        "A learner asks what MCP is for. Which answer is most accurate?",
      options: [
        { id: "a", label: "A way to connect AI applications to tools, data, prompts, and workflows through a standard protocol." },
        { id: "b", label: "A replacement for learning prompt design." },
        { id: "c", label: "A Claude-only payment product." },
      ],
      correctOptionId: "a",
      explanation:
        "MCP is an open standard for connecting AI systems to external context and actions.",
    },
    {
      id: "mcp-security",
      prompt:
        "A team wants to share an MCP server config. What should stay out of the committed file?",
      options: [
        { id: "a", label: "Server names." },
        { id: "b", label: "Secrets and private tokens." },
        { id: "c", label: "Non-sensitive command arguments." },
      ],
      correctOptionId: "b",
      explanation:
        "Shared MCP configuration can describe connections, but credentials belong in environment variables or secret stores.",
    },
    {
      id: "mcp-approval",
      prompt:
        "Claude asks for permission before using a newly shared MCP tool. What should the learner infer?",
      options: [
        { id: "a", label: "The approval step is part of safe tool use." },
        { id: "b", label: "The tool can never be used." },
        { id: "c", label: "They should disable all confirmations." },
      ],
      correctOptionId: "a",
      explanation:
        "Approvals help learners control external tool access and avoid unintended actions.",
    },
  ],
  "ai-fluency": [
    {
      id: "fluency-discernment",
      prompt:
        "Claude writes a polished fundraising email, but the claims are too strong. Which AI fluency skill is most relevant?",
      options: [
        { id: "a", label: "Discernment: evaluating output quality, fit, and risk before using it." },
        { id: "b", label: "Typing speed." },
        { id: "c", label: "Memorizing model names." },
      ],
      correctOptionId: "a",
      explanation:
        "AI fluency depends on judgment, not just generating content quickly.",
    },
    {
      id: "human-accountability",
      prompt:
        "A learner uses Claude for a school or workplace assignment. Who remains accountable for the final work?",
      options: [
        { id: "a", label: "The learner." },
        { id: "b", label: "Claude." },
        { id: "c", label: "No one." },
      ],
      correctOptionId: "a",
      explanation:
        "Responsible AI use keeps the human accountable for accuracy, ethics, and context.",
    },
    {
      id: "iteration",
      prompt:
        "A first Claude answer is close but not useful enough. What is the best next step?",
      options: [
        { id: "a", label: "Iterate with specific feedback about what to change." },
        { id: "b", label: "Assume Claude cannot help." },
        { id: "c", label: "Copy the answer unchanged." },
      ],
      correctOptionId: "a",
      explanation:
        "Strong AI collaborators refine outputs through clear feedback and successive passes.",
    },
  ],
};

export function getAssessmentForCourse(courseSlug: string): CourseAssessment | null {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;

  const questions = baseQuestions[course.category] ?? baseQuestions.foundational;

  return {
    provider: "anthropic",
    courseSlug,
    passingScore: 80,
    questions,
  };
}

export function isAssessmentPassing(score: number, passingScore: number): boolean {
  return score >= passingScore;
}

export function calculateAssessmentScore(
  assessment: Pick<CourseAssessment, "passingScore" | "questions">,
  answers: AssessmentAnswers,
): AssessmentResult {
  const feedback = assessment.questions.map((question) => {
    const correct = answers[question.id] === question.correctOptionId;
    return {
      questionId: question.id,
      correct,
      explanation: question.explanation,
    };
  });
  const correctCount = feedback.filter((item) => item.correct).length;
  const totalQuestions = assessment.questions.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    score,
    correctCount,
    totalQuestions,
    passed: isAssessmentPassing(score, assessment.passingScore),
    feedback,
  };
}

export async function saveAssessmentAttempt({
  userId,
  assessment,
  answers,
  result,
}: {
  userId: string;
  assessment: CourseAssessment;
  answers: AssessmentAnswers;
  result: AssessmentResult;
}): Promise<AssessmentAttempt> {
  const sql = getSql();
  const id = randomUUID();
  const rows = await sql`
    insert into assessment_attempts (
      id,
      user_id,
      provider,
      course_slug,
      score,
      correct_count,
      total_questions,
      passed,
      answers,
      feedback
    )
    values (
      ${id},
      ${userId},
      ${assessment.provider},
      ${assessment.courseSlug},
      ${result.score},
      ${result.correctCount},
      ${result.totalQuestions},
      ${result.passed},
      ${JSON.stringify(answers)},
      ${JSON.stringify(result.feedback)}
    )
    returning id, created_at
  `;

  return {
    id: String(rows[0].id),
    provider: assessment.provider,
    courseSlug: assessment.courseSlug,
    answers,
    ...result,
    createdAt: new Date(String(rows[0].created_at)).toISOString(),
  };
}

export async function getBestAssessmentScore(
  userId: string,
  courseSlug: string,
): Promise<number | null> {
  const sql = getSql();
  const rows = await sql`
    select max(score)::integer as best_score
    from assessment_attempts
    where user_id = ${userId}
      and course_slug = ${courseSlug}
  `;

  const bestScore = rows[0]?.best_score;
  return typeof bestScore === "number" ? bestScore : null;
}

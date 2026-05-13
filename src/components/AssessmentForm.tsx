"use client";

import { useState } from "react";
import type { CourseAssessment } from "@/lib/assessments";
import type { Certificate } from "@/lib/certificates";

type SubmitResult = {
  score: number;
  correctCount: number;
  totalQuestions: number;
  passed: boolean;
  feedback: Array<{
    questionId: string;
    correct: boolean;
    explanation: string;
  }>;
  certificate: Certificate | null;
};

export function AssessmentForm({ assessment }: { assessment: CourseAssessment }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function submitAssessment() {
    setStatus("submitting");
    setResult(null);
    try {
      const res = await fetch("/api/assessments/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: assessment.courseSlug, answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Assessment could not be submitted.");
      setResult(data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  const complete = assessment.questions.every((question) => answers[question.id]);

  return (
    <div className="space-y-6">
      {assessment.questions.map((question, index) => (
        <section
          key={question.id}
          className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4 flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {index + 1}
            </span>
            <h2 className="text-base font-semibold leading-relaxed">{question.prompt}</h2>
          </div>
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer gap-3 rounded-xl border border-slate-200 p-4 text-sm transition-colors hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-700"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={answers[question.id] === option.id}
                  onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
                  className="mt-1"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {result && (
            <p
              className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                result.feedback.find((item) => item.questionId === question.id)?.correct
                  ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
              }`}
            >
              {question.explanation}
            </p>
          )}
        </section>
      ))}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
        {result ? (
          <div className="space-y-3">
            <p className="text-2xl font-bold">
              {result.score}%{" "}
              <span className={result.passed ? "text-emerald-600" : "text-amber-600"}>
                {result.passed ? "passed" : "keep practicing"}
              </span>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {result.correctCount} of {result.totalQuestions} scenarios matched the mastery rubric.
              {result.certificate
                ? ` Certificate issued for ${result.certificate.courseTitle}.`
                : " Complete all lessons and pass this assessment to unlock the certificate."}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Answer every scenario. A score of {assessment.passingScore}% or higher counts as mastery.
          </p>
        )}

        <button
          type="button"
          onClick={submitAssessment}
          disabled={!complete || status === "submitting"}
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Scoring..." : "Submit scenario test"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">
            Assessment could not be saved. Check your account and database configuration.
          </p>
        )}
      </div>
    </div>
  );
}

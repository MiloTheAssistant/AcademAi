"use client";

import { useState } from "react";
import type { GeneratedSyllabus, SkillLevel } from "@/lib/syllabus";

const levels: Array<{ value: SkillLevel; label: string }> = [
  { value: "novice", label: "Novice" },
  { value: "slightly-skilled", label: "Slightly skilled" },
  { value: "intermediate", label: "Intermediate" },
];

export function SyllabusBuilder() {
  const [goal, setGoal] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("novice");
  const [path, setPath] = useState("Claude Foundations");
  const [syllabus, setSyllabus] = useState<GeneratedSyllabus | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function generate() {
    setStatus("loading");
    setSyllabus(null);
    try {
      const res = await fetch("/api/syllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "anthropic",
          goal,
          skillLevel,
          path,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not generate syllabus.");
      setSyllabus(data.syllabus);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="md:col-span-3">
          <span className="mb-2 block text-sm font-medium">What do you want Claude to help you master?</span>
          <textarea
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Example: I want to use Claude for research, planning, and better daily work output."
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium">Skill level</span>
          <select
            value={skillLevel}
            onChange={(event) => setSkillLevel(event.target.value as SkillLevel)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          >
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-medium">Learning path</span>
          <select
            value={path}
            onChange={(event) => setPath(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          >
            <option>Claude Foundations</option>
            <option>Claude For Work And Study</option>
            <option>Claude Code Starter</option>
            <option>AI Fluency For Everyday Practice</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={generate}
        disabled={goal.trim().length < 12 || status === "loading"}
        className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Building syllabus..." : "Generate my syllabus"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          Syllabus generation could not be saved. Check your membership and database configuration.
        </p>
      )}

      {syllabus && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Your Claude study plan</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {syllabus.source === "claude" ? "Claude generated" : "Template fallback"}
            </span>
          </div>
          {syllabus.modules.map((module, index) => (
            <article
              key={`${module.title}-${index}`}
              className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Module {index + 1}
              </p>
              <h3 className="font-semibold">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{module.objective}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {module.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-slate-900 dark:text-slate-100">
                Checkpoint: {module.assessment}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

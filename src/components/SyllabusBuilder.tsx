"use client";

import { useState } from "react";
import type { GeneratedSyllabus, SkillLevel } from "@/lib/syllabus";

const levels: Array<{ value: SkillLevel; label: string }> = [
  { value: "novice", label: "Novice" },
  { value: "slightly-skilled", label: "Slightly skilled" },
  { value: "intermediate", label: "Intermediate" },
];

const sourceLabels: Record<GeneratedSyllabus["source"], string> = {
  ollama: "Ollama generated",
  nvidia: "NVIDIA NIM generated",
  openai: "OpenAI generated",
  template: "Template fallback",
  pending: "Building with AI",
};

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export function SyllabusBuilder() {
  const [goal, setGoal] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("novice");
  const [path, setPath] = useState("Claude Foundations");
  const [syllabus, setSyllabus] = useState<GeneratedSyllabus | null>(null);
  const [status, setStatus] = useState<"idle" | "starting" | "generating" | "error">("idle");

  async function pollSyllabus(id: string) {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      await wait(3000);
      const res = await fetch(`/api/syllabus?id=${encodeURIComponent(id)}`);
      if (!res.ok) continue;

      const data = await res.json() as { syllabus?: GeneratedSyllabus };
      if (!data.syllabus) continue;

      setSyllabus(data.syllabus);
      if (data.syllabus.generationStatus !== "generating") {
        setStatus(data.syllabus.generationStatus === "failed" ? "error" : "idle");
        return;
      }
    }

    setStatus("idle");
  }

  async function generate() {
    setStatus("starting");
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
      const nextSyllabus = data.syllabus as GeneratedSyllabus;
      setSyllabus(nextSyllabus);
      if (nextSyllabus.generationStatus === "generating" && nextSyllabus.id) {
        setStatus("generating");
        void pollSyllabus(nextSyllabus.id);
        return;
      }
      setStatus(nextSyllabus.generationStatus === "failed" ? "error" : "idle");
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
        disabled={goal.trim().length < 12 || status === "starting" || status === "generating"}
        className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "starting" ? "Saving request..." : status === "generating" ? "Building syllabus..." : "Generate my syllabus"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          Syllabus generation used the safe fallback or could not be refreshed. Your saved plan remains available below.
        </p>
      )}

      {status === "generating" && (
        <p className="mt-3 text-sm text-blue-700 dark:text-blue-300">
          Your syllabus request is saved. AcademAI is building the full plan in the background.
        </p>
      )}

      {syllabus && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Your Claude study plan</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {sourceLabels[syllabus.source]}
            </span>
          </div>
          {syllabus.generationStatus === "generating" && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
              Your saved syllabus is being generated. You can stay on this page or come back later.
            </div>
          )}
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

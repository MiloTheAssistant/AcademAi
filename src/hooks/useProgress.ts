"use client";

import { useState, useEffect, useCallback } from "react";

type ProgressMap = Record<string, number[]>;

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    let active = true;
    async function hydrate() {
      try {
        const res = await fetch("/api/progress", { cache: "no-store" });
        if (!active || !res.ok) return;
        const data = await res.json() as { progress?: ProgressMap };
        setProgress(data.progress ?? {});
      } catch {
        if (active) setProgress({});
      }
    }

    void hydrate();
    return () => {
      active = false;
    };
  }, []);

  const markComplete = useCallback((slug: string, moduleIndex: number) => {
    setProgress((prev) => {
      const existing = prev[slug] ?? [];
      if (existing.includes(moduleIndex)) return prev;
      return { ...prev, [slug]: [...existing, moduleIndex].sort((a, b) => a - b) };
    });
    void fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, moduleIndex, completed: true }),
    });
  }, []);

  const markIncomplete = useCallback((slug: string, moduleIndex: number) => {
    setProgress((prev) => {
      const existing = prev[slug] ?? [];
      const next = { ...prev, [slug]: existing.filter((i) => i !== moduleIndex) };
      if (next[slug].length === 0) delete next[slug];
      return next;
    });
    void fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, moduleIndex, completed: false }),
    });
  }, []);

  const resetCourse = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = { ...prev };
      delete next[slug];
      return next;
    });
    void fetch(`/api/progress?course=${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
  }, []);

  const getCompletedModules = useCallback(
    (slug: string): number[] => progress[slug] ?? [],
    [progress]
  );

  const getCourseProgress = useCallback(
    (slug: string, totalModules: number): number => {
      const completed = (progress[slug] ?? []).length;
      return totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0;
    },
    [progress]
  );

  const getNextIncompleteModule = useCallback(
    (slug: string, totalModules: number): number => {
      const completed = new Set(progress[slug] ?? []);
      for (let i = 0; i < totalModules; i++) {
        if (!completed.has(i)) return i;
      }
      return 0; // all done, go back to start
    },
    [progress]
  );

  return {
    progress,
    markComplete,
    markIncomplete,
    resetCourse,
    getCompletedModules,
    getCourseProgress,
    getNextIncompleteModule,
  };
}

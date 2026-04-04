"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "academai-progress";

type ProgressMap = Record<string, number[]>;

function readStorage(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeStorage(map: ProgressMap) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});

  // Hydrate from localStorage on mount
  useEffect(() => {
    setProgress(readStorage());

    // Sync across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setProgress(readStorage());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const markComplete = useCallback((slug: string, moduleIndex: number) => {
    setProgress((prev) => {
      const existing = prev[slug] ?? [];
      if (existing.includes(moduleIndex)) return prev;
      const next = { ...prev, [slug]: [...existing, moduleIndex].sort((a, b) => a - b) };
      writeStorage(next);
      return next;
    });
  }, []);

  const markIncomplete = useCallback((slug: string, moduleIndex: number) => {
    setProgress((prev) => {
      const existing = prev[slug] ?? [];
      const next = { ...prev, [slug]: existing.filter((i) => i !== moduleIndex) };
      if (next[slug].length === 0) delete next[slug];
      writeStorage(next);
      return next;
    });
  }, []);

  const resetCourse = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = { ...prev };
      delete next[slug];
      writeStorage(next);
      return next;
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

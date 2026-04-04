"use client";

import { useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";

interface ProgressTrackerProps {
  slug: string;
  moduleIndex: number;
}

export function ProgressTracker({ slug, moduleIndex }: ProgressTrackerProps) {
  const { markComplete } = useProgress();

  useEffect(() => {
    markComplete(slug, moduleIndex);
  }, [slug, moduleIndex, markComplete]);

  return null;
}

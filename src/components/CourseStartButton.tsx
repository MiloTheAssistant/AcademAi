"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

interface CourseStartButtonProps {
  slug: string;
  totalModules: number;
}

export function CourseStartButton({ slug, totalModules }: CourseStartButtonProps) {
  const { getCompletedModules, getNextIncompleteModule } = useProgress();
  const completed = getCompletedModules(slug);
  const allDone = completed.length >= totalModules && totalModules > 0;
  const nextIndex = getNextIncompleteModule(slug, totalModules);

  if (allDone) {
    return (
      <Link
        href={`/courses/${slug}/lessons/0`}
        className="block w-full mt-6 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors text-center"
      >
        ✓ Review Course
      </Link>
    );
  }

  if (completed.length > 0) {
    return (
      <Link
        href={`/courses/${slug}/lessons/${nextIndex}`}
        className="block w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-center"
      >
        Continue Course →
      </Link>
    );
  }

  return (
    <Link
      href={`/courses/${slug}/lessons/0`}
      className="block w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors text-center"
    >
      Start Course
    </Link>
  );
}

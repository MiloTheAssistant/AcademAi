import { MetadataRoute } from "next";
import { courses } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://academai.app";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/paths`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/syllabus`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/certificates`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${base}/courses/${course.slug}`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const previewLessonRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${base}/courses/${course.slug}/lessons/0`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...staticRoutes, ...courseRoutes, ...previewLessonRoutes];
}

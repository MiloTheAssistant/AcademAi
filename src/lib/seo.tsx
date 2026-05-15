import type { Course } from "@/data/courses";

export const siteUrl = "https://academai.app";
export const siteName = "AcademAI";
export const defaultDescription =
  "Free intro previews and paid mastery paths for Claude AI, Claude Code, the Anthropic API, and practical AI fluency.";
export const defaultOgImage = "/brand/x/post-background.png";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/brand/website/profile-stamp.png"),
    description:
      "AcademAI is an independent AI learning platform with free course previews and paid mastery tools for Claude AI, Claude Code, the Anthropic API, Model Context Protocol, and practical AI fluency.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    description: defaultDescription,
    inLanguage: "en-US",
  };
}

export function courseSchema(course: Course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${siteUrl}/courses/${course.slug}#course`,
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/courses/${course.slug}`),
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    educationalLevel: course.level,
    timeRequired: course.estimatedHours,
    teaches: course.modules.map((module) => module.title),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.estimatedHours,
      url: absoluteUrl(`/courses/${course.slug}`),
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

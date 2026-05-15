import type { Metadata } from "next";
import { defaultOgImage, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Compare AcademAI membership options for paid mastery tools, scenario tests, durable progress, AI-generated syllabi, and certificates.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: `Pricing - ${siteName}`,
    description:
      "Compare AcademAI membership options for paid mastery tools, scenario tests, durable progress, AI-generated syllabi, and certificates.",
    url: "/pricing",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Pricing - ${siteName}`,
    description:
      "Compare AcademAI membership options for paid mastery tools, scenario tests, durable progress, AI-generated syllabi, and certificates.",
    images: [defaultOgImage],
  },
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

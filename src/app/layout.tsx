import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { NavClient } from "@/components/NavClient";
import {
  JsonLd,
  defaultDescription,
  defaultOgImage,
  organizationSchema,
  siteName,
  siteUrl,
  websiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — Premium AI Training Console`,
    template: "%s — AcademAI",
  },
  description: defaultDescription,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} — Premium AI Training Console`,
    description: defaultDescription,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: defaultOgImage,
        width: 1600,
        height: 900,
        alt: "AcademAI Human Learning Lab workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Premium AI Training Console`,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2.5 shrink-0">
                <Image
                  src="/brand/website/profile-stamp.png"
                  alt="AcademAI profile stamp"
                  width={36}
                  height={36}
                  priority
                  className="rounded-full border border-blue-100 shadow-sm shadow-blue-950/10"
                />
                <span className="font-bold text-lg tracking-tight">AcademAI</span>
              </Link>

              <NavClient />
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-3">
                  <Image
                    src="/brand/website/profile-stamp.png"
                    alt="AcademAI profile stamp"
                    width={30}
                    height={30}
                    className="rounded-full border border-blue-100 shadow-sm shadow-blue-950/10"
                  />
                  <span className="font-bold">AcademAI</span>
                </Link>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  Independent premium training for mastering Claude AI, Claude Code, and Anthropic technologies. Source-informed by{" "}
                  <a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Anthropic&apos;s official training platform
                  </a>.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Learn</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/courses" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Courses</Link></li>
                  <li><Link href="/paths" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Learning Paths</Link></li>
                  <li><Link href="/syllabus" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Syllabus</Link></li>
                  <li><Link href="/certificates" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Certificates</Link></li>
                  <li><Link href="/courses?category=foundational" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Start Here</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://anthropic.skilljar.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Official Anthropic Training</a></li>
                  <li><a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Anthropic Docs</a></li>
                  <li><a href="https://github.com/anthropics/courses" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub Courses</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
              <p>© {new Date().getFullYear()} AcademAI. Independent educational project.</p>
              <p>Not affiliated with or endorsed by Anthropic PBC.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}

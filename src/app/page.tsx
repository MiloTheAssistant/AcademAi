import Link from "next/link";
import Image from "next/image";
import { courses, learningPaths } from "@/data/courses";
import { CourseGrid, type CourseCardData } from "@/components/CourseGrid";

const levelColors: Record<string, string> = {
  Beginner: "text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/50",
  Intermediate: "text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-950/50",
  Advanced: "text-purple-700 bg-purple-50 dark:text-purple-300 dark:bg-purple-950/50",
};

export default function Home() {
  const featuredPaths = learningPaths.slice(0, 3);
  const featuredCardData: CourseCardData[] = courses.slice(0, 6).map((c) => ({
    slug: c.slug,
    title: c.title,
    description: c.description,
    path: c.path,
    category: c.category,
    level: c.level,
    estimatedHours: c.estimatedHours,
    moduleCount: c.modules.length,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white">
        <Image
          src="/brand/website/profile-background.png"
          alt="AcademAI learning workspace with AI training visuals"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/18" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/92" />
        <div className="absolute left-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_18%_30%,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_34%_74%,rgba(124,58,237,0.10),transparent_32%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 min-h-[calc(100vh-4rem)] flex items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-blue-100 text-blue-700 text-sm font-medium mb-8 shadow-sm shadow-blue-950/5 backdrop-blur">
              <Image
                src="/brand/website/profile-stamp.png"
                alt="AcademAI profile stamp"
                width={22}
                height={22}
                className="rounded-full"
              />
              Free intro previews — paid mastery console for Claude
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance text-slate-950">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Claude AI
              </span>
              <br />& Anthropic Technologies
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mb-8 leading-relaxed">
              Start with open previews, then unlock durable progress, scenario tests,
              AI-generated syllabi, and AcademAI certificates for Claude mastery.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-xl mb-10">
              {[
                ["Practice", "Scenario tests"],
                ["Progress", "Durable tracking"],
                ["Proof", "Certificates"],
              ].map(([label, detail]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white/82 px-4 py-3 shadow-sm shadow-slate-950/5 backdrop-blur">
                  <div className="text-sm font-bold text-slate-950">{label}</div>
                  <div className="text-xs text-slate-500 mt-1">{detail}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
              >
                Browse All Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/paths"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold bg-white/88 hover:bg-white text-slate-900 rounded-xl transition-all border border-slate-200 shadow-sm backdrop-blur"
              >
                View Learning Paths
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: courses.length, label: "Courses" },
              { value: learningPaths.length, label: "Learning Paths" },
              { value: "5", label: "Skill Tracks" },
              { value: "24h", label: "Trial" },
            ].map(({ value, label }) => (
              <div key={label} className="py-2">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 tabular-nums">{value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
              Directly inspired by{" "}
              <a
                href="https://anthropic.skilljar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Anthropic&apos;s official platform
              </a>
            </p>
          </div>
          <Link href="/courses" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors shrink-0">
            View all →
          </Link>
        </div>

        <CourseGrid courses={featuredCardData} showCategoryBadge={true} />
      </section>

      {/* Learning Paths */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Learning Paths</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Structured roadmaps that guide you from first lesson to mastery, built for your role and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {featuredPaths.map((path, i) => (
              <Link
                key={path.title}
                href="/paths"
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-3xl font-black text-slate-100 dark:text-slate-800 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[path.level]}`}>
                    {path.level}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {path.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {path.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                  <span>{path.courses.length} courses</span>
                  <span>·</span>
                  <span>{path.estimatedHours}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/paths" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              View all {learningPaths.length} learning paths →
            </Link>
          </div>
        </div>
      </section>

      {/* Track categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Five skill tracks</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Whether you&apos;re a developer integrating Claude into products, a teacher bringing AI into your classroom, or someone exploring AI for the first time — there&apos;s a track for you.
            </p>
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all">
              Explore all courses
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { color: "bg-emerald-500", label: "Foundational", desc: "New to Claude? Start here." },
              { color: "bg-blue-500", label: "Claude Code & Development", desc: "Coding with AI as your co-pilot." },
              { color: "bg-purple-500", label: "API & Cloud Integrations", desc: "Build production AI apps." },
              { color: "bg-orange-500", label: "Model Context Protocol", desc: "Extend Claude with custom tools." },
              { color: "bg-pink-500", label: "AI Fluency", desc: "For educators, students & nonprofits." },
            ].map((track) => (
              <div key={track.label} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className={`w-3 h-3 rounded-full shrink-0 ${track.color}`} />
                <div>
                  <div className="text-sm font-semibold">{track.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{track.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08),transparent)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-3">Ready to get started?</h2>
              <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
                Preview the first module free, then unlock the paid mastery tools:
                saved progress, scenario tests, AI syllabi, and certificates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

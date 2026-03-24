import Link from "next/link";
import { courses, learningPaths } from "@/data/courses";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">About AcademAI</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            AcademAI is a free educational platform providing structured courses, hands-on labs, and learning paths to help you master Claude AI, Claude Code, and Anthropic technologies.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            We believe AI fluency should be accessible to everyone. Our courses are designed to take you from beginner to advanced, with practical skills you can apply immediately in your work.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Content Source</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            This platform features educational content inspired by Anthropic&apos;s official Skilljar training materials at{' '}
            <a 
              href="https://anthropic.skilljar.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              anthropic.skilljar.com
            </a>. 
            We&apos;ve organized and presented this content in an accessible format for self-paced learning.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-bold text-lg mb-2">{courses.length} Courses</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                From Claude 101 basics to advanced Model Context Protocol development
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="text-3xl mb-4">🛤️</div>
              <h3 className="font-bold text-lg mb-2">{learningPaths.length} Learning Paths</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Structured roadmaps for beginners, developers, educators, and more
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">Course Categories</h2>
          <ul className="space-y-3 mb-12">
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <div>
                <strong>Foundational</strong> — Core concepts and basics for newcomers to AI
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <strong>Claude Code & Development</strong> — Hands-on coding with Claude
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-1.5 rounded-full bg-purple-500 flex-shrink-0" />
              <div>
                <strong>API & Cloud Integrations</strong> — Building with Claude API and cloud platforms
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-1.5 rounded-full bg-orange-500 flex-shrink-0" />
              <div>
                <strong>Model Context Protocol</strong> — Extending Claude with custom tools
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-3 h-3 mt-1.5 rounded-full bg-pink-500 flex-shrink-0" />
              <div>
                <strong>AI Fluency Framework</strong> — Effective, ethical AI collaboration
              </div>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Get Started</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Ready to begin your AI learning journey? Check out our courses or follow a learning path tailored to your goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/courses"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              href="/paths"
              className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
            >
              View Learning Paths
            </Link>
          </div>

          <h2 className="text-2xl font-bold mt-16 mb-4">Disclaimer</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            AcademAI is an independent educational project and is not affiliated with, endorsed by, or connected to Anthropic PBC or its products. All course content is provided for educational purposes only. For official Anthropic training and certifications, please visit{' '}
            <a 
              href="https://anthropic.skilljar.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              anthropic.skilljar.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
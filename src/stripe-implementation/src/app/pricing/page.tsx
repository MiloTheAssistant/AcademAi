'use client';

/**
 * /pricing — AcademAI Members landing + pricing page.
 *
 * Sections:
 *   1. Hero
 *   2. Stats bar
 *   3. Feature highlights
 *   4. Pricing cards (Weekly / Monthly / Annual)
 *   5. Trust signals / FAQ
 *   6. Final CTA
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --------------------------------------------------------------------------
// Plan data
// --------------------------------------------------------------------------
const PLANS = [
  {
    key: 'weekly',
    name: 'Weekly',
    badge: null,
    price: 4.99,
    unit: 'week',
    equivalent: '~$21.62 / mo',
    tagline: 'Perfect for a focused sprint.',
    cta: 'Try free for 24 hours',
    features: [
      'Full access to all courses',
      'All learning paths',
      'Skill track library',
      'Progress tracking',
      'Cancel anytime',
    ],
    highlight: false,
    gradient: 'from-slate-700 to-slate-800',
    border: 'border-slate-700',
    badgeBg: '',
  },
  {
    key: 'monthly',
    name: 'Monthly',
    badge: 'Most Popular',
    price: 14.99,
    unit: 'month',
    equivalent: null,
    tagline: 'The best balance of value and flexibility.',
    cta: 'Try free for 24 hours',
    features: [
      'Everything in Weekly',
      'Priority content updates',
      'All new courses as they launch',
      'Progress tracking',
      'Cancel anytime',
    ],
    highlight: true,
    gradient: 'from-blue-600 to-purple-600',
    border: 'border-blue-500',
    badgeBg: 'bg-blue-500',
  },
  {
    key: 'yearly',
    name: 'Annual',
    badge: 'Best Value',
    price: 99,
    unit: 'year',
    equivalent: '$8.25 / mo — save 45%',
    tagline: 'Commit to mastery. Save the most.',
    cta: 'Try free for 24 hours',
    features: [
      'Everything in Monthly',
      'Lowest price guaranteed',
      'All future courses included',
      'Progress tracking',
      'Cancel anytime',
    ],
    highlight: false,
    gradient: 'from-slate-700 to-slate-800',
    border: 'border-emerald-600',
    badgeBg: 'bg-emerald-600',
  },
] as const;

// --------------------------------------------------------------------------
// Feature highlights
// --------------------------------------------------------------------------
const FEATURES = [
  {
    icon: '🎓',
    title: 'Structured Courses',
    description:
      'From zero to production-ready — every course is thoughtfully sequenced with real-world examples.',
  },
  {
    icon: '🗺️',
    title: 'Learning Paths',
    description:
      'Follow curated paths designed around specific goals: Claude API, Claude Code, MCP, and more.',
  },
  {
    icon: '⚡',
    title: 'Skill Tracks',
    description:
      'Bite-sized tracks that drill into a single competency — perfect for filling gaps quickly.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description:
      'Your progress is saved automatically across every device. Pick up exactly where you left off.',
  },
  {
    icon: '🔄',
    title: 'Always Up to Date',
    description:
      'Content is continuously updated as Claude, the API, and the Anthropic ecosystem evolve.',
  },
  {
    icon: '🔒',
    title: 'Cancel Anytime',
    description:
      'No contracts, no lock-ins. Manage or cancel your subscription at any time from your account.',
  },
];

// --------------------------------------------------------------------------
// FAQ
// --------------------------------------------------------------------------
const FAQ = [
  {
    q: 'What happens during the free trial?',
    a: "You get full access to every course, path, and skill track for 24 hours — completely free. You won't be charged until the trial ends. A valid payment method is required to start the trial.",
  },
  {
    q: 'What information do I need to provide?',
    a: 'To start your trial you\'ll provide your name, billing address, mobile number, and email through our secure Stripe checkout. This is the same form used for millions of subscriptions worldwide.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes. You can upgrade or downgrade between Weekly, Monthly, and Annual plans at any time from your account settings. Changes take effect at the start of your next billing period.',
  },
  {
    q: 'How do I cancel?',
    a: "You can cancel any time from your account — no questions asked. If you cancel during your trial, you won't be charged at all.",
  },
  {
    q: 'Is AcademAI affiliated with Anthropic?',
    a: 'AcademAI is an independent educational project. It is not affiliated with or endorsed by Anthropic PBC.',
  },
];

// --------------------------------------------------------------------------
// Component
// --------------------------------------------------------------------------
export default function PricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleCheckout(planKey: string) {
    setLoadingPlan(planKey);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();

      if (res.status === 401) {
        // Not signed in — send to sign-in with a callbackUrl to come back here
        router.push(`/sign-in?callbackUrl=/pricing`);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      if (data.url) window.location.href = data.url;
    } catch (err: any) {
      console.error(err);
      alert(err.message ?? 'Failed to start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ================================================================== */}
      {/* HERO                                                                 */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden py-24 px-6">
        {/* Gradient blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-600/15 text-blue-400 border border-blue-500/30">
            24-Hour Free Trial — No Risk
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Master Claude AI.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build smarter.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Structured courses, guided learning paths, and focused skill tracks for Claude AI,
            the Anthropic API, Claude Code, and the Model Context Protocol — all in one membership.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base shadow-lg shadow-blue-700/30 hover:opacity-90 transition-opacity"
            >
              See Plans & Start Free Trial →
            </button>
            <a
              href="/courses"
              className="px-8 py-4 rounded-xl border border-slate-700 text-slate-300 font-semibold text-base hover:border-slate-500 transition-colors"
            >
              Browse Courses
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* STATS BAR                                                            */}
      {/* ================================================================== */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '30+', label: 'Courses' },
            { value: '10+', label: 'Learning Paths' },
            { value: '5', label: 'Skill Tracks' },
            { value: '24h', label: 'Free Trial' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-white">{value}</div>
              <div className="text-sm text-slate-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* FEATURE HIGHLIGHTS                                                   */}
      {/* ================================================================== */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">
            Everything you need to become a Claude AI expert
          </h2>
          <p className="text-center text-slate-400 mb-14 max-w-xl mx-auto">
            One membership unlocks the full library — every course, path, and track, updated continuously.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition-colors"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PRICING CARDS                                                        */}
      {/* ================================================================== */}
      <section id="pricing-cards" className="py-20 px-6 bg-slate-950/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">
            Choose the plan that works for you
          </h2>
          <p className="text-center text-slate-400 mb-4 max-w-xl mx-auto">
            All plans include a <strong className="text-white">24-hour free trial</strong>.
            Your payment method is required to start — you won't be charged until the trial ends.
          </p>
          <p className="text-center text-xs text-slate-500 mb-14">
            Name, billing address, and mobile number are collected at checkout.
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.key}
                className={`relative rounded-2xl border ${plan.border} ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-blue-950/80 to-purple-950/80 shadow-2xl shadow-blue-700/20 scale-[1.03]'
                    : 'bg-slate-900/60'
                } p-8 flex flex-col`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${plan.badgeBg} text-white text-xs font-bold px-4 py-1 rounded-full`}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">
                  {plan.name}
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">
                    ${plan.price % 1 === 0 ? plan.price : plan.price.toFixed(2)}
                  </span>
                  <span className="text-slate-400 text-sm mb-2">/ {plan.unit}</span>
                </div>
                {plan.equivalent && (
                  <div className="text-xs text-slate-400 mb-4">{plan.equivalent}</div>
                )}

                <p className="text-sm text-slate-300 mb-6">{plan.tagline}</p>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout(plan.key)}
                  disabled={loadingPlan !== null}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-blue-700/25'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {loadingPlan === plan.key ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Redirecting…
                    </span>
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Fine print */}
          <p className="text-center text-xs text-slate-500 mt-8">
            🔒 Payments secured by{' '}
            <a href="https://stripe.com" target="_blank" rel="noreferrer" className="underline hover:text-slate-400">
              Stripe
            </a>
            . Cancel anytime from your account — no questions asked.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TRUST SIGNALS                                                        */}
      {/* ================================================================== */}
      <section className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: '🔒', title: 'Secure Checkout', desc: 'Payments handled by Stripe — your card data never touches our servers.' },
            { icon: '🎯', title: 'Cancel Anytime', desc: 'No long-term commitments. Cancel in seconds from your account settings.' },
            { icon: '✉️', title: '24hr Free Trial', desc: 'Explore the full library risk-free. You won't be charged until the trial ends.' },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* FAQ                                                                  */}
      {/* ================================================================== */}
      <section className="py-20 px-6 bg-slate-950/40">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map(({ q, a }, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-sm hover:bg-slate-800/40 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <span className="ml-4 shrink-0 text-slate-400">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FINAL CTA                                                            */}
      {/* ================================================================== */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative rounded-3xl border border-slate-700 bg-gradient-to-br from-blue-950/60 to-purple-950/60 p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
            <div className="relative">
              <h2 className="text-3xl font-extrabold mb-4">
                Ready to level up with Claude AI?
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                Join AcademAI and start your 24-hour free trial today.
                No risk — cancel before the trial ends and pay nothing.
              </p>
              <button
                onClick={() => {
                  document.getElementById('pricing-cards')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base shadow-lg shadow-blue-700/30 hover:opacity-90 transition-opacity"
              >
                Start Your Free Trial →
              </button>
              <p className="text-xs text-slate-500 mt-4">
                Payment info required · Billed after 24 hours · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

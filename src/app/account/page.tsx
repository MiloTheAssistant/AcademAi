import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { getSubscription, isSubscriptionActive } from '@/lib/subscription';
import {
  getMicrosoftGraphProfile,
  MicrosoftGraphError,
  type MicrosoftGraphProfile,
} from '@/lib/microsoft-graph';
import { ManageSubscriptionButton } from '@/components/ManageSubscriptionButton';

function formatDate(timestamp?: number) {
  if (!timestamp) return 'Not available';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(timestamp * 1000));
}

function GraphStatus({ profile, error }: { profile: MicrosoftGraphProfile | null; error: string | null }) {
  if (profile) {
    return (
      <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        <p>
          <span className="font-medium text-slate-900 dark:text-white">Name:</span>{' '}
          {profile.displayName ?? 'Not available'}
        </p>
        <p>
          <span className="font-medium text-slate-900 dark:text-white">Microsoft account:</span>{' '}
          {profile.userPrincipalName ?? profile.mail ?? 'Not available'}
        </p>
        {profile.jobTitle && (
          <p>
            <span className="font-medium text-slate-900 dark:text-white">Title:</span>{' '}
            {profile.jobTitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Microsoft Graph is configured in the app, but no Graph profile could be loaded for this session.
      </p>
      {error && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          {error}
        </p>
      )}
      <Link
        href="/sign-in"
        className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
      >
        Sign in with Microsoft
      </Link>
    </div>
  );
}

export default async function AccountPage() {
  const { userId } = await auth.protect();
  const [user, subscription] = await Promise.all([
    currentUser(),
    getSubscription(userId),
  ]);

  let graphProfile: MicrosoftGraphProfile | null = null;
  let graphError: string | null = null;

  try {
    graphProfile = await getMicrosoftGraphProfile(userId);
  } catch (err) {
    if (err instanceof MicrosoftGraphError) {
      graphError = err.message;
    } else {
      graphError = 'Unable to load Microsoft Graph profile.';
    }
  }

  const active = isSubscriptionActive(subscription);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage your AcademAI membership and connected Microsoft identity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Clerk user</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-medium text-slate-900 dark:text-white">Name:</span>{' '}
              {user?.fullName ?? 'Not available'}
            </p>
            <p>
              <span className="font-medium text-slate-900 dark:text-white">Email:</span>{' '}
              {user?.emailAddresses[0]?.emailAddress ?? 'Not available'}
            </p>
            <p>
              <span className="font-medium text-slate-900 dark:text-white">User ID:</span>{' '}
              <span className="break-all">{userId}</span>
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Stripe membership</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-medium text-slate-900 dark:text-white">Status:</span>{' '}
              <span className={active ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                {subscription?.status ?? 'No subscription'}
              </span>
            </p>
            <p>
              <span className="font-medium text-slate-900 dark:text-white">Plan interval:</span>{' '}
              {subscription?.planInterval ?? 'Not available'}
            </p>
            <p>
              <span className="font-medium text-slate-900 dark:text-white">Current period ends:</span>{' '}
              {formatDate(subscription?.currentPeriodEnd)}
            </p>
          </div>
          <div className="mt-5">
            {subscription?.stripeCustomerId ? (
              <ManageSubscriptionButton />
            ) : (
              <Link
                href="/pricing"
                className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Choose a plan
              </Link>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:col-span-2">
          <h2 className="text-lg font-semibold">Microsoft Graph</h2>
          <div className="mt-4">
            <GraphStatus profile={graphProfile} error={graphError} />
          </div>
        </section>
      </div>
    </div>
  );
}


/**
 * POST /api/stripe/portal
 *
 * Creates a Stripe Customer Portal session so subscribers can:
 *   - View and change their plan (weekly → monthly → yearly)
 *   - Update their payment method
 *   - Cancel their subscription
 *   - Download invoices
 *
 * Returns: { url: string }
 *
 * Setup:
 *   In Stripe Dashboard → Customer Portal → activate and configure the features you want to expose.
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { stripe } from '@/lib/stripe';
import { getSubscription } from '@/lib/subscription';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sub = await getSubscription(session.user.id);

  if (!sub?.stripeCustomerId) {
    return NextResponse.json({ error: 'No subscription found.' }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${appUrl}/courses`,
  });

  return NextResponse.json({ url: portalSession.url });
}

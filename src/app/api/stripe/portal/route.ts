/**
 * POST /api/stripe/portal
 * Uses Clerk's auth() instead of NextAuth's session.
 */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getStripe } from '@/lib/stripe';
import { getSubscription } from '@/lib/subscription';

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sub = await getSubscription(userId);

  if (!sub?.stripeCustomerId) {
    return NextResponse.json({ error: 'No subscription found.' }, { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${appUrl}/courses`,
  });

  return NextResponse.json({ url: portalSession.url });
}

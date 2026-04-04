/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for the selected plan.
 * Uses Clerk's auth() instead of NextAuth's session.
 *
 * Body: { plan: 'weekly' | 'monthly' | 'yearly' }
 * Returns: { url: string }
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { stripe, STRIPE_PRICES, TRIAL_PERIOD_DAYS } from '@/lib/stripe';
import type { PlanKey } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'You must be signed in to start a subscription.' }, { status: 401 });
  }

  // Fetch user details from Clerk to pre-fill email in Stripe checkout
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const body = await req.json();
  const plan = body.plan as PlanKey;
  const priceId = STRIPE_PRICES[plan];

  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],

    // Collect full billing address and phone as required by the free trial terms
    billing_address_collection: 'required',
    phone_number_collection: { enabled: true },

    // Pre-fill email from Clerk
    ...(email ? { customer_email: email } : {}),

    line_items: [{ price: priceId, quantity: 1 }],

    subscription_data: {
      trial_period_days: TRIAL_PERIOD_DAYS, // 24-hour free trial
      metadata: { userId },                 // Clerk user ID for webhook lookup
    },

    metadata: { userId },

    success_url: `${appUrl}/courses?subscription=success`,
    cancel_url:  `${appUrl}/pricing?canceled=true`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}

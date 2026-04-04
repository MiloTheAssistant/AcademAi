/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for the selected plan.
 * The user must be signed in before reaching checkout.
 *
 * Body: { plan: 'weekly' | 'monthly' | 'yearly' }
 * Returns: { url: string }  — redirect the browser to this URL.
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { stripe, STRIPE_PRICES, TRIAL_PERIOD_DAYS } from '@/lib/stripe';
import type { PlanKey } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'You must be signed in to start a subscription.' }, { status: 401 });
  }

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

    // Collect full billing address and phone number as required by the free trial terms.
    billing_address_collection: 'required',
    phone_number_collection: { enabled: true },

    // Pre-fill the email if we have it from the auth session.
    ...(session.user.email ? { customer_email: session.user.email } : {}),

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    subscription_data: {
      // 24-hour free trial — payment method is required upfront.
      trial_period_days: TRIAL_PERIOD_DAYS,
      // Pass the internal user ID so the webhook can link back.
      metadata: {
        userId: session.user.id,
      },
    },

    // Pass userId in session metadata as a backup.
    metadata: {
      userId: session.user.id,
    },

    // Redirect URLs
    success_url: `${appUrl}/courses?subscription=success`,
    cancel_url:  `${appUrl}/pricing?canceled=true`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}

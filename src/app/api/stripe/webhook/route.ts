/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events to keep subscription status in sync.
 * This route is intentionally excluded from auth middleware (see middleware.ts).
 *
 * Events handled:
 *   - checkout.session.completed       → subscription started (or trial started)
 *   - customer.subscription.updated    → plan changed, status changed, trial ended
 *   - customer.subscription.deleted    → cancelled or expired
 *
 * Setup:
 *   1. In Stripe Dashboard → Webhooks → Add endpoint
 *      URL: https://your-domain.com/api/stripe/webhook
 *      Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
 *   2. Copy the Signing Secret → STRIPE_WEBHOOK_SECRET env var
 */
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import {
  setSubscription,
  deleteSubscription,
  setCustomerMapping,
  getUserIdByCustomer,
} from '@/lib/subscription';
import type Stripe from 'stripe';

// Next.js needs the raw body to verify Stripe's signature.
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('⚠️  Stripe webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      // -----------------------------------------------------------------------
      // A checkout completed — subscription (or trial) is now active.
      // -----------------------------------------------------------------------
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId || !session.subscription || !session.customer) break;

        // Fetch the full subscription object so we have all the details.
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        const priceInterval = subscription.items.data[0]?.price?.recurring?.interval as 'week' | 'month' | 'year';

        await setCustomerMapping(session.customer as string, userId);
        await setSubscription(userId, {
          stripeCustomerId:     session.customer as string,
          stripeSubscriptionId: subscription.id,
          status:               subscription.status as any,
          planInterval:         priceInterval,
          currentPeriodEnd:     subscription.current_period_end,
          ...(subscription.trial_end ? { trialEnd: subscription.trial_end } : {}),
        });

        console.log(`✅ Subscription created for user ${userId} (${subscription.status})`);
        break;
      }

      // -----------------------------------------------------------------------
      // Subscription updated — status changed, plan changed, trial converted.
      // -----------------------------------------------------------------------
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const userId = await getUserIdByCustomer(customerId);

        if (!userId) {
          console.warn(`No userId found for Stripe customer ${customerId}`);
          break;
        }

        const priceInterval = subscription.items.data[0]?.price?.recurring?.interval as 'week' | 'month' | 'year';

        await setSubscription(userId, {
          stripeCustomerId:     customerId,
          stripeSubscriptionId: subscription.id,
          status:               subscription.status as any,
          planInterval:         priceInterval,
          currentPeriodEnd:     subscription.current_period_end,
          ...(subscription.trial_end ? { trialEnd: subscription.trial_end } : {}),
        });

        console.log(`🔄 Subscription updated for user ${userId} → ${subscription.status}`);
        break;
      }

      // -----------------------------------------------------------------------
      // Subscription deleted — user cancelled or it expired.
      // -----------------------------------------------------------------------
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const userId = await getUserIdByCustomer(customerId);

        if (!userId) break;

        // Mark as canceled rather than deleting, so the UI can show a message.
        await setSubscription(userId, {
          stripeCustomerId:     customerId,
          stripeSubscriptionId: subscription.id,
          status:               'canceled',
          planInterval:         subscription.items.data[0]?.price?.recurring?.interval as 'week' | 'month' | 'year',
          currentPeriodEnd:     subscription.current_period_end,
        });

        console.log(`❌ Subscription canceled for user ${userId}`);
        break;
      }

      default:
        // Unhandled event types are silently ignored.
        break;
    }
  } catch (err) {
    console.error('Error processing webhook event:', err);
    return NextResponse.json({ error: 'Webhook handler error.' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

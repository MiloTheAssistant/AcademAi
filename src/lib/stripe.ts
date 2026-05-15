import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-03-31.basil',
    });
  }

  return stripeClient;
}

const DEFAULT_STRIPE_PRICES = {
  weekly:  'price_1TINCbHYoNGH7WzgYNFDjvnZ',
  monthly: 'price_1TINCaHYoNGH7WzgLeESzvJJ',
  yearly:  'price_1TINCZHYoNGH7WzgxaLLj2Ap',
} as const;

function getConfiguredPriceId(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

// Price IDs created in Stripe.
// Product: AcademAI Members
export const STRIPE_PRICES = {
  weekly:  getConfiguredPriceId('STRIPE_PRICE_WEEKLY', DEFAULT_STRIPE_PRICES.weekly),
  monthly: getConfiguredPriceId('STRIPE_PRICE_MONTHLY', DEFAULT_STRIPE_PRICES.monthly),
  yearly:  getConfiguredPriceId('STRIPE_PRICE_YEARLY', DEFAULT_STRIPE_PRICES.yearly),
} as const;

export type PlanKey = keyof typeof STRIPE_PRICES;

// How long the free trial lasts (in days).
// 1 day = 24 hours — users must provide a payment method to start the trial.
export const TRIAL_PERIOD_DAYS = 1;

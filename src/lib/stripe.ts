import Stripe from 'stripe';

// Initialize the Stripe client with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// Price IDs created in Stripe (sandbox)
// Product: AcademAI Members (prod_UGtbfZnAcw1ae8)
export const STRIPE_PRICES = {
  weekly:  'price_1TILp5Heg8aT6eIyucrGc6S4', // $4.99 / week
  monthly: 'price_1TILp5Heg8aT6eIymsvm8kcW', // $14.99 / month
  yearly:  'price_1TILp6Heg8aT6eIycvLkpjSy', // $99.00 / year
} as const;

export type PlanKey = keyof typeof STRIPE_PRICES;

// How long the free trial lasts (in days).
// 1 day = 24 hours — users must provide a payment method to start the trial.
export const TRIAL_PERIOD_DAYS = 1;

/**
 * Subscription helpers using Vercel KV (Redis-backed).
 *
 * Setup:
 *   1. In your Vercel project, go to Storage → Create KV Database
 *   2. Link the database to your project (env vars are auto-added)
 *   3. npm install @vercel/kv
 */
import { kv } from '@vercel/kv';

export interface SubscriptionData {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'paused';
  planInterval: 'week' | 'month' | 'year';
  currentPeriodEnd: number; // Unix timestamp (seconds)
  trialEnd?: number;        // Unix timestamp (seconds), present during trial
}

/** Fetch the subscription record for a given internal user ID. */
export async function getSubscription(userId: string): Promise<SubscriptionData | null> {
  return kv.get<SubscriptionData>(`sub:${userId}`);
}

/** Persist / update a subscription record. */
export async function setSubscription(userId: string, data: SubscriptionData): Promise<void> {
  await kv.set(`sub:${userId}`, data);
}

/** Remove a subscription record (e.g. after full cancellation). */
export async function deleteSubscription(userId: string): Promise<void> {
  await kv.del(`sub:${userId}`);
}

/**
 * Look up a user ID from a Stripe customer ID.
 * Stored as a reverse-lookup key during checkout.
 */
export async function getUserIdByCustomer(stripeCustomerId: string): Promise<string | null> {
  return kv.get<string>(`cust:${stripeCustomerId}`);
}

/** Persist the customerId → userId reverse mapping. */
export async function setCustomerMapping(stripeCustomerId: string, userId: string): Promise<void> {
  await kv.set(`cust:${stripeCustomerId}`, userId);
}

/**
 * Returns true if the subscription is currently active (trialing or paid).
 * Also verifies the period hasn't expired on our side as a safety net.
 */
export function isSubscriptionActive(sub: SubscriptionData | null): boolean {
  if (!sub) return false;
  const now = Math.floor(Date.now() / 1000);
  const activeStatuses: SubscriptionData['status'][] = ['active', 'trialing'];
  return activeStatuses.includes(sub.status) && sub.currentPeriodEnd > now;
}

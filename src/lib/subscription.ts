import { getSql } from '@/lib/db';

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
  const sql = getSql();
  const rows = await sql`
    select
      stripe_customer_id,
      stripe_subscription_id,
      status,
      plan_interval,
      current_period_end,
      trial_end
    from subscriptions
    where user_id = ${userId}
    limit 1
  `;

  const row = rows[0];
  if (!row) return null;

  return {
    stripeCustomerId: String(row.stripe_customer_id),
    stripeSubscriptionId: String(row.stripe_subscription_id),
    status: row.status as SubscriptionData['status'],
    planInterval: row.plan_interval as SubscriptionData['planInterval'],
    currentPeriodEnd: Number(row.current_period_end),
    ...(row.trial_end ? { trialEnd: Number(row.trial_end) } : {}),
  };
}

/** Persist / update a subscription record. */
export async function setSubscription(userId: string, data: SubscriptionData): Promise<void> {
  const sql = getSql();
  await sql`
    insert into subscriptions (
      user_id,
      stripe_customer_id,
      stripe_subscription_id,
      status,
      plan_interval,
      current_period_end,
      trial_end,
      updated_at
    )
    values (
      ${userId},
      ${data.stripeCustomerId},
      ${data.stripeSubscriptionId},
      ${data.status},
      ${data.planInterval},
      ${data.currentPeriodEnd},
      ${data.trialEnd ?? null},
      now()
    )
    on conflict (user_id)
    do update set
      stripe_customer_id = excluded.stripe_customer_id,
      stripe_subscription_id = excluded.stripe_subscription_id,
      status = excluded.status,
      plan_interval = excluded.plan_interval,
      current_period_end = excluded.current_period_end,
      trial_end = excluded.trial_end,
      updated_at = now()
  `;
}

/** Remove a subscription record (e.g. after full cancellation). */
export async function deleteSubscription(userId: string): Promise<void> {
  const sql = getSql();
  await sql`delete from subscriptions where user_id = ${userId}`;
}

/**
 * Look up a user ID from a Stripe customer ID.
 * Stored as a reverse-lookup key during checkout.
 */
export async function getUserIdByCustomer(stripeCustomerId: string): Promise<string | null> {
  const sql = getSql();
  const rows = await sql`
    select user_id
    from subscriptions
    where stripe_customer_id = ${stripeCustomerId}
    limit 1
  `;

  return rows[0]?.user_id ? String(rows[0].user_id) : null;
}

/** Persist the customerId → userId reverse mapping. */
export async function setCustomerMapping(stripeCustomerId: string, userId: string): Promise<void> {
  const existing = await getSubscription(userId);
  if (!existing) return;
  await setSubscription(userId, {
    ...existing,
    stripeCustomerId,
  });
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

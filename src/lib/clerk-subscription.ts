import { clerkClient } from '@clerk/nextjs/server';
import type { SubscriptionData } from '@/lib/subscription';

type ClerkSubscriptionMetadata = {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: SubscriptionData['status'];
  planInterval: SubscriptionData['planInterval'];
  currentPeriodEnd: number;
  trialEnd?: number;
  updatedAt: string;
};

export async function updateClerkSubscriptionMetadata(
  userId: string,
  subscription: SubscriptionData,
): Promise<void> {
  const client = await clerkClient();
  const metadata: ClerkSubscriptionMetadata = {
    stripeCustomerId: subscription.stripeCustomerId,
    stripeSubscriptionId: subscription.stripeSubscriptionId,
    status: subscription.status,
    planInterval: subscription.planInterval,
    currentPeriodEnd: subscription.currentPeriodEnd,
    ...(subscription.trialEnd ? { trialEnd: subscription.trialEnd } : {}),
    updatedAt: new Date().toISOString(),
  };

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      stripe: metadata,
    },
  });
}


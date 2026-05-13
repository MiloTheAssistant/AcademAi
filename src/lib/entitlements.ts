import { redirect } from "next/navigation";
import { getSubscription, isSubscriptionActive } from "@/lib/subscription";

export async function hasActiveMembership(userId: string): Promise<boolean> {
  try {
    return isSubscriptionActive(await getSubscription(userId));
  } catch (err) {
    console.error("Membership lookup failed:", err);
    return false;
  }
}

export async function requireActiveMembership(userId: string): Promise<void> {
  if (!(await hasActiveMembership(userId))) {
    redirect("/pricing");
  }
}

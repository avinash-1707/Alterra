import { and, eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";
import { db } from "@/lib/db";
import { subscriptions, user } from "@/db";

type SubscriptionStatus = InferSelectModel<typeof subscriptions>["status"];

export type CachedSubscriptionUser = Pick<
  InferSelectModel<typeof user>,
  "subscriptionStatus" | "subscriptionEndsAt"
>;

export type RazorpaySubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing";

export type RazorpaySubscriptionWebhookPayload = {
  userId: string;
  planId: string;
  providerSubscriptionId: string;
  status: RazorpaySubscriptionStatus;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
};

const RAZORPAY_TO_DB_STATUS: Record<
  RazorpaySubscriptionStatus,
  SubscriptionStatus
> = {
  active: "ACTIVE",
  canceled: "CANCELED",
  past_due: "PAST_DUE",
  trialing: "TRIALING",
};

export function isUserPremium(userRecord: CachedSubscriptionUser): boolean {
  return (
    userRecord.subscriptionStatus === "active" &&
    !!userRecord.subscriptionEndsAt &&
    userRecord.subscriptionEndsAt.getTime() > Date.now()
  );
}

// Example webhook sync: update source-of-truth subscription, then update user cache.
export async function applyRazorpaySubscriptionWebhookUpdate(
  payload: RazorpaySubscriptionWebhookPayload,
): Promise<void> {
  const now = new Date();
  const mappedStatus = RAZORPAY_TO_DB_STATUS[payload.status];

  await db.transaction(async (tx) => {
    const existing = await tx
      .select({ id: subscriptions.id })
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.paymentProvider, "RAZORPAY"),
          eq(
            subscriptions.providerSubscriptionId,
            payload.providerSubscriptionId,
          ),
        ),
      )
      .limit(1);

    if (existing.length > 0) {
      await tx
        .update(subscriptions)
        .set({
          userId: payload.userId,
          planId: payload.planId,
          status: mappedStatus,
          currentPeriodStart: payload.currentPeriodStart,
          currentPeriodEnd: payload.currentPeriodEnd,
          cancelAtPeriodEnd: payload.cancelAtPeriodEnd,
          updatedAt: now,
        })
        .where(eq(subscriptions.id, existing[0].id));
    } else {
      await tx.insert(subscriptions).values({
        userId: payload.userId,
        planId: payload.planId,
        status: mappedStatus,
        currentPeriodStart: payload.currentPeriodStart,
        currentPeriodEnd: payload.currentPeriodEnd,
        cancelAtPeriodEnd: payload.cancelAtPeriodEnd,
        paymentProvider: "RAZORPAY",
        providerSubscriptionId: payload.providerSubscriptionId,
        createdAt: now,
        updatedAt: now,
      });
    }

    await tx
      .update(user)
      .set({
        subscriptionStatus: payload.status,
        subscriptionEndsAt: payload.currentPeriodEnd,
        updatedAt: now,
      })
      .where(eq(user.id, payload.userId));
  });
}

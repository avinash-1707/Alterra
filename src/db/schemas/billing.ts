import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "ACTIVE",
  "CANCELED",
  "PAST_DUE",
  "TRIALING",
]);

export const paymentProviderEnum = pgEnum("payment_provider", [
  "STRIPE",
  "RAZORPAY",
]);

export const plans = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  priceMonthly: numeric("price_monthly", { precision: 10, scale: 2 }).notNull(),
  priceYearly: numeric("price_yearly", { precision: 10, scale: 2 }),

  creditsPerMonth: integer("credits_per_month").notNull(),

  maxImageSizeMb: integer("max_image_size_mb").notNull(),
  priorityQueue: boolean("priority_queue").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  planId: uuid("plan_id")
    .references(() => plans.id)
    .notNull(),

  status: subscriptionStatusEnum("status").notNull(),

  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),

  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),

  paymentProvider: paymentProviderEnum("payment_provider").notNull(),
  providerSubscriptionId: varchar("provider_subscription_id", {
    length: 255,
  }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

export const webhookProviderEnum = pgEnum("webhook_provider", [
  "STRIPE",
  "RAZORPAY",
]);

export const webhookEvents = pgTable("webhook_events", {
  id: uuid("id").defaultRandom().primaryKey(),

  provider: webhookProviderEnum("provider").notNull(),

  eventType: text("event_type").notNull(),
  payload: jsonb("payload").notNull(),

  processed: boolean("processed").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

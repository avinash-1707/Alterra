import { pgTable, uuid, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const creditTransactionTypeEnum = pgEnum("credit_transaction_type", [
  "PURCHASE",
  "MONTHLY_RESET",
  "IMAGE_PROCESS",
]);

export const creditTransactions = pgTable("credit_transactions", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  amount: integer("amount").notNull(), // + or -

  type: creditTransactionTypeEnum("type").notNull(),

  referenceId: uuid("reference_id"), // e.g. imageId

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

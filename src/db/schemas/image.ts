import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const imageStatusEnum = pgEnum("image_status", [
  "PROCESSING",
  "COMPLETED",
  "FAILED",
]);

export const images = pgTable("images", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),

  originalUrl: text("original_url").notNull(),
  transformedUrl: text("transformed_url"),

  prompt: text("prompt"),
  modelUsed: text("model_used"),

  status: imageStatusEnum("status").default("PROCESSING").notNull(),

  processingTimeMs: integer("processing_time_ms"),

  metadata: jsonb("metadata"), // model params, seed, resolution, etc.

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

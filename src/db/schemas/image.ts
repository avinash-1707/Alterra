import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const imageStatusEnum = pgEnum("image_status", [
  "PROCESSING",
  "COMPLETED",
  "FAILED",
]);

export const images = pgTable("images", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
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

export const imagesRelations = relations(images, ({ one }) => ({
  user: one(user, {
    fields: [images.userId],
    references: [user.id],
  }),
}));

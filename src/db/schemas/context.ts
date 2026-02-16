import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const contexts = pgTable("contexts", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  name: text("name").notNull(), // user-friendly label like "Cyberpunk Portrait Style"

  // 🔥 AI-Optimized Structured Data
  structuredData: jsonb("structured_data").notNull(),

  // 🔥 Preformatted AI Prompt Block
  aiPromptBlock: text("ai_prompt_block").notNull(),

  // Optional tagging system
  tags: jsonb("tags"), // ["cyberpunk", "neon", "portrait"]

  usageCount: integer("usage_count").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contextsRelations = relations(contexts, ({ one }) => ({
  user: one(user, {
    fields: [contexts.userId],
    references: [user.id],
  }),
}));

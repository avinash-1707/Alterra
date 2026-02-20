ALTER TABLE "user"
ADD COLUMN IF NOT EXISTS "subscription_status" text NOT NULL DEFAULT 'canceled';

ALTER TABLE "user"
ADD COLUMN IF NOT EXISTS "subscription_ends_at" timestamp;

WITH latest_subscription AS (
  SELECT DISTINCT ON (s.user_id)
    s.user_id,
    s.status,
    s.current_period_end
  FROM subscriptions s
  ORDER BY s.user_id, s.current_period_end DESC NULLS LAST, s.updated_at DESC
)
UPDATE "user" u
SET
  subscription_status = lower(ls.status::text),
  subscription_ends_at = ls.current_period_end
FROM latest_subscription ls
WHERE u.id = ls.user_id;

CREATE INDEX IF NOT EXISTS "user_subscription_status_idx"
  ON "user" ("subscription_status");

CREATE INDEX IF NOT EXISTS "user_subscription_ends_at_idx"
  ON "user" ("subscription_ends_at");

CREATE INDEX IF NOT EXISTS "user_subscription_status_ends_at_idx"
  ON "user" ("subscription_status", "subscription_ends_at");

CREATE INDEX IF NOT EXISTS "plans_name_idx"
  ON "plans" ("name");

CREATE INDEX IF NOT EXISTS "subscriptions_user_id_idx"
  ON "subscriptions" ("user_id");

CREATE INDEX IF NOT EXISTS "subscriptions_plan_id_idx"
  ON "subscriptions" ("plan_id");

CREATE INDEX IF NOT EXISTS "subscriptions_provider_subscription_id_idx"
  ON "subscriptions" ("provider_subscription_id");

CREATE INDEX IF NOT EXISTS "subscriptions_user_status_period_end_idx"
  ON "subscriptions" ("user_id", "status", "current_period_end");

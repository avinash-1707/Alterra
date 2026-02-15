import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "@/db/index";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_BASE_URL!,
  advanced: {
    database: {
      generateId: "uuid",
    },
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  trustedOrigins: ["http://localhost:3000", process.env.NEXT_PUBLIC_APP_URL!],
});

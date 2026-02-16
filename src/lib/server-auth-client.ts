import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const authClient = {
  async getSession() {
    return auth.api.getSession({ headers: await headers() });
  },
};

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AuthOverlay from "@/components/auth/AuthOverlay";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ? <DashboardLayout /> : <AuthOverlay />;
}

import AuthOverlay from "@/components/auth/AuthOverlay";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { resolveDashboardTab } from "@/components/dashboard/dashboard-tabs";
import { authClient } from "@/lib/server-auth-client";

interface DashboardPageProps {
  searchParams?:
    | {
        tab?: string;
      }
    | Promise<{
        tab?: string;
      }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await Promise.resolve(searchParams ?? {});
  const activeTab = resolveDashboardTab(params.tab);
  const session = await authClient.getSession();

  if (!session) {
    return <AuthOverlay />;
  }

  return <DashboardLayout activeTab={activeTab} session={session} />;
}

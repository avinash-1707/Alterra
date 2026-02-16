export interface DashboardSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

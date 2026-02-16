export const DASHBOARD_TABS = ["overview", "generate", "hub", "context"] as const;

export type DashboardTab = (typeof DASHBOARD_TABS)[number];

export const DASHBOARD_TAB_LABELS: Record<DashboardTab, string> = {
  overview: "Dashboard",
  generate: "Generate",
  hub: "Hub",
  context: "Context Manager",
};

export function isDashboardTab(value: string | undefined): value is DashboardTab {
  return typeof value === "string" && DASHBOARD_TABS.includes(value as DashboardTab);
}

export function resolveDashboardTab(value: string | undefined): DashboardTab {
  return isDashboardTab(value) ? value : "overview";
}

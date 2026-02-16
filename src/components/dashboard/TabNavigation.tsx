"use client";

import Link from "next/link";
import {
  DASHBOARD_TAB_LABELS,
  DASHBOARD_TABS,
  type DashboardTab,
} from "./dashboard-tabs";

interface TabNavigationProps {
  activeTab: DashboardTab;
}

export default function TabNavigation({ activeTab }: TabNavigationProps) {
  return (
    <nav className="overflow-x-auto">
      <div className="inline-flex min-w-full gap-2 rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-1">
        {DASHBOARD_TABS.map((tab) => {
          const isActive = tab === activeTab;

          return (
            <Link
              key={tab}
              href={`/dashboard?tab=${tab}`}
              className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-zinc-200 text-zinc-900"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              {DASHBOARD_TAB_LABELS[tab]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

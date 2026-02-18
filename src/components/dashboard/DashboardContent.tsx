import type { ReactNode } from "react";
import TabNavigation from "./TabNavigation";
import type { DashboardTab } from "./dashboard-tabs";
import type { DashboardSession } from "./types";
import OverviewSection from "./sections/OverviewSection";
import GenerateSection from "./sections/GenerateSection";
import ContextManagerSection from "./sections/ContextManagerSection";
import GallerySection from "./sections/GallerySection";

interface DashboardContentProps {
  activeTab: DashboardTab;
  session: DashboardSession | null;
}

const TAB_CONTENT: Record<DashboardTab, ReactNode> = {
  overview: <OverviewSection />,
  generate: <GenerateSection />,
  hub: <GallerySection />,
  context: <ContextManagerSection />,
};

const TAB_HEADING: Record<DashboardTab, string> = {
  overview: "Dashboard",
  generate: "",
  hub: "",
  context: "Context Manager",
};

export default function DashboardContent({
  activeTab,
  session,
}: DashboardContentProps) {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="h-16 md:hidden" />

      <div className="space-y-6 p-6 md:p-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-100 md:text-4xl mb-8">
            {TAB_HEADING[activeTab]}
          </h1>
        </header>

        <section>{TAB_CONTENT[activeTab]}</section>
      </div>
    </main>
  );
}

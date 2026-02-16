"use client";

import { useState } from "react";
import GradientBlob from "../common/GradientBlog";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";
import type { DashboardTab } from "./dashboard-tabs";
import type { DashboardSession } from "./types";

interface DashboardLayoutProps {
  activeTab: DashboardTab;
  session: DashboardSession | null;
}

export default function DashboardLayout({ activeTab, session }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <GradientBlob
        className="top-0 right-0 h-200 w-200"
        colors="from-orange-500/20 via-pink-500/10 to-purple-500/5"
        blur="blur-3xl"
      />
      <GradientBlob
        className="bottom-0 left-0 h-175 w-175"
        colors="from-indigo-500/15 via-violet-500/10 to-transparent"
        blur="blur-3xl"
      />

      <div className="relative z-10 flex h-screen">
        <DashboardSidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          activeTab={activeTab}
          session={session}
        />
        <DashboardContent activeTab={activeTab} session={session} />
      </div>
    </div>
  );
}

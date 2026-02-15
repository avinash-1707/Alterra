"use client";

import { useState } from "react";
import GradientBlob from "../common/GradientBlog";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Gradient Blobs */}
      <GradientBlob
        className="top-0 right-0 w-200 h-200"
        colors="from-orange-500/20 via-pink-500/10 to-purple-500/5"
        blur="blur-3xl"
      />
      <GradientBlob
        className="bottom-0 left-0 w-175 h-175"
        colors="from-indigo-500/15 via-violet-500/10 to-transparent"
        blur="blur-3xl"
      />

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content */}
        <DashboardContent sidebarOpen={sidebarOpen} />
      </div>
    </div>
  );
}

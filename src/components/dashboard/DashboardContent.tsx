"use client";

import GlassCard from "../common/GlassCard";
import LandingButton from "../landing/LandingButton";

interface DashboardContentProps {
  sidebarOpen: boolean;
}

export default function DashboardContent({
  sidebarOpen,
}: DashboardContentProps) {
  const stats = [
    {
      label: "Images Generated",
      value: "1,247",
      change: "+12%",
      trend: "up",
    },
    {
      label: "Saved Contexts",
      value: "24",
      change: "+3",
      trend: "up",
    },
    {
      label: "API Calls",
      value: "3,421",
      change: "+18%",
      trend: "up",
    },
    {
      label: "Credits Remaining",
      value: "8,750",
      change: "-250",
      trend: "down",
    },
  ];

  const recentGenerations = [
    { id: 1, prompt: "Futuristic cityscape at sunset", time: "2 min ago" },
    { id: 2, prompt: "Portrait of a cyberpunk character", time: "15 min ago" },
    { id: 3, prompt: "Abstract geometric patterns", time: "1 hour ago" },
    { id: 4, prompt: "Mountain landscape with aurora", time: "3 hours ago" },
  ];

  return (
    <main className="flex-1 overflow-y-auto">
      {/* Mobile Header Spacer */}
      <div className="h-16 md:hidden" />

      <div className="p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome back
            </h1>
            <p className="text-zinc-400">
              Here's what's happening with your creations today.
            </p>
          </div>
          <LandingButton variant="primary" size="lg">
            Create New
          </LandingButton>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <GlassCard key={index}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      stat.trend === "up" ? "text-green-400" : "text-orange-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Generations */}
          <div className="lg:col-span-2">
            <GlassCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Generations</h2>
                  <button className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                    View All
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {recentGenerations.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-square bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer"
                    >
                      {/* Placeholder Image */}
                      <div className="w-full h-full bg-linear-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-zinc-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="text-sm font-medium line-clamp-2 mb-1">
                          {item.prompt}
                        </p>
                        <span className="text-xs text-zinc-400">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Usage This Month */}
            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Usage This Month</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-400">Generations</span>
                      <span className="font-medium">247 / 500</span>
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full w-[49%] bg-linear-to-r from-orange-500 to-pink-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-zinc-400">API Calls</span>
                      <span className="font-medium">3,421 / 10,000</span>
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full w-[34%] bg-linear-to-r from-indigo-500 to-purple-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Quick Links */}
            <GlassCard>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900/50 hover:bg-zinc-900 rounded-xl transition-all text-left">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm font-medium">New Generation</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900/50 hover:bg-zinc-900 rounded-xl transition-all text-left">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm font-medium">Upload Context</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-zinc-900/50 hover:bg-zinc-900 rounded-xl transition-all text-left">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">View API Docs</span>
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Activity Feed */}
        <GlassCard>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                {
                  action: "Generated image",
                  detail: "Futuristic cityscape",
                  time: "2 min ago",
                  icon: "🎨",
                },
                {
                  action: "Uploaded context",
                  detail: "Character reference",
                  time: "1 hour ago",
                  icon: "📤",
                },
                {
                  action: "Updated settings",
                  detail: "Changed resolution to 2048x2048",
                  time: "3 hours ago",
                  icon: "⚙️",
                },
                {
                  action: "API call made",
                  detail: "Batch generation completed",
                  time: "5 hours ago",
                  icon: "🔌",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}

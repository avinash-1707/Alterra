"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import type { DashboardTab } from "./dashboard-tabs";
import type { DashboardSession } from "./types";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";

interface DashboardSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeTab: DashboardTab;
  session: DashboardSession | null;
}

export default function DashboardSidebar({
  open,
  setOpen,
  activeTab,
  session,
}: DashboardSidebarProps) {
  const router = useRouter();
  const navItems: Array<{
    label: string;
    tab: DashboardTab;
    href: string;
    icon: ReactNode;
  }> = [
    {
      label: "Dashboard",
      tab: "overview",
      href: "/dashboard?tab=overview",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Generate",
      tab: "generate",
      href: "/dashboard?tab=generate",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      label: "Gallery",
      tab: "gallery",
      href: "/dashboard?tab=gallery",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Context Manager",
      tab: "context",
      href: "/dashboard?tab=context",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); // redirect to login page
          },
        },
      });
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <>
      <aside
        className={`hidden border-r border-zinc-800/50 bg-zinc-950/40 backdrop-blur-xl transition-all duration-300 md:flex md:flex-col ${
          open ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex h-full flex-col p-4">
          <Link href="/" className="mt-4 mb-10 flex items-center gap-3 px-2">
            <Image
              src="/alterra-logo.png"
              alt="Alterra Logo"
              width={32}
              height={20}
              className="rounded-md invert"
            />
            {open && (
              <span className="font-bebas text-2xl font-bold text-white">
                Alterra
              </span>
            )}
          </Link>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = item.tab === activeTab;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                    isActive
                      ? "bg-linear-to-r from-orange-500/20 to-pink-500/20 text-orange-400"
                      : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {open && (
                    <span className="whitespace-nowrap text-sm font-medium transition-transform duration-200 group-hover:translate-x-0.5">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2 border-t border-zinc-800/50 pt-4">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-zinc-400 transition-all duration-200 hover:bg-zinc-900/50 hover:text-red-400"
            >
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {open && (
                <span className="whitespace-nowrap text-sm font-medium">
                  Sign Out
                </span>
              )}
            </button>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-zinc-400 transition-all duration-200 hover:bg-zinc-900/50 hover:text-white"
            >
              <Image
                src={session?.user?.image || "/images/avatar_placeholder.png"}
                alt="User"
                width={32}
                height={32}
                className="rounded-full border border-zinc-800/50 bg-zinc-900/50"
              />
              {open && (
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-white">
                    {session?.user?.name || "Account"}
                  </span>
                  <span className="truncate text-xs text-zinc-500">
                    {session?.user?.email || "No email"}
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </aside>

      <div className="fixed top-0 right-0 left-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-pink-500">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-xl font-bold text-transparent">
              Alterra
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-zinc-400 transition-colors hover:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

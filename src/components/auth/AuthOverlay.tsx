"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GlassCard from "../common/GlassCard";
import LandingButton from "../landing/LandingButton";

export default function AuthOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-md">
        <GlassCard glow>
          <div className="p-8 md:p-10 text-center">
            {/* Lock Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-2xl -z-10" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Authentication required!
            </h2>

            {/* Description */}
            <p className="text-2xl font-serif text-zinc-400 mb-8 leading-relaxed">
              Please sign in to access your dashboard and start creating amazing
              AI images.
            </p>

            {/* Action Buttons */}
            <Link href="/sign-in">
              <LandingButton variant="primary" size="lg" fullWidth>
                Sign In
              </LandingButton>
            </Link>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-zinc-950/40 text-zinc-500 uppercase tracking-wider">
                  or
                </span>
              </div>
            </div>

            {/* Back to Home */}
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-orange-400 transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </GlassCard>

        {/* Decorative Gradient Lines */}
        <div className="mt-8 space-y-2">
          <div className="h-px w-full bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="h-px w-3/4 mx-auto bg-linear-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

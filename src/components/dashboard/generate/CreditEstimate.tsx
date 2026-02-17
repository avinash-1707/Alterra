"use client";

import { useState } from "react";

interface CreditEstimateProps {
  smartExpansion: boolean;
  hasImage: boolean;
  hasContext: boolean;
}

export default function CreditEstimate({
  smartExpansion,
  hasImage,
  hasContext,
}: CreditEstimateProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const base = 2;
  const smart = smartExpansion ? 2 : 0;
  const media = hasImage || hasContext ? 3 : 0;
  const total = base + smart + media;

  const breakdown = [
    { label: "Base generation", credits: base, always: true },
    { label: "Smart Prompt Expansion", credits: smart, active: smartExpansion },
    {
      label: hasImage ? "Attached image" : "Saved context",
      credits: media,
      active: hasImage || hasContext,
    },
  ];

  return (
    <div className="flex justify-end">
      <div className="relative">
        <button
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors group"
          onMouseEnter={() => setShowBreakdown(true)}
          onMouseLeave={() => setShowBreakdown(false)}
        >
          <svg
            className="w-3.5 h-3.5 text-zinc-600 group-hover:text-orange-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Estimated credits:
          <span
            className={`font-semibold tabular-nums transition-colors ${total > 2 ? "text-orange-400" : "text-white"}`}
          >
            {total}
          </span>
        </button>

        {/* Breakdown tooltip */}
        {showBreakdown && (
          <div className="absolute bottom-full right-0 mb-2 w-52 bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/60 rounded-xl p-3 shadow-2xl z-20">
            <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Credit Breakdown
            </p>
            <div className="space-y-1.5">
              {breakdown.map((item) => (
                <div
                  key={item.label}
                  className={`flex justify-between items-center text-xs ${
                    item.always || item.active
                      ? "text-zinc-300"
                      : "text-zinc-700"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`font-mono ${item.always || item.active ? "text-orange-400" : "text-zinc-700"}`}
                  >
                    +{item.credits}
                  </span>
                </div>
              ))}
              <div className="border-t border-zinc-800 pt-1.5 flex justify-between text-xs font-semibold">
                <span className="text-zinc-300">Total</span>
                <span className="text-orange-400">{total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

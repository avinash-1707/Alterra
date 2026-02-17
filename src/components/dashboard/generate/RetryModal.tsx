"use client";

import { useEffect } from "react";

interface RetryModalProps {
  onConfirm: (editContext: boolean) => void;
  onClose: () => void;
}

export default function RetryModal({ onConfirm, onClose }: RetryModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/60 rounded-3xl shadow-2xl overflow-hidden">
        {/* Glow top */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent" />

        <div className="p-7">
          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/30 flex items-center justify-center mb-5">
            <svg
              className="w-6 h-6 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold mb-2">Retry Generation</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-7">
            Would you like to edit the context and prompt before regenerating,
            or retry immediately with the same settings?
          </p>

          <div className="space-y-3">
            {/* Edit then retry */}
            <button
              onClick={() => onConfirm(true)}
              className="w-full text-left flex items-center gap-4 p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-zinc-700 transition-colors">
                <svg
                  className="w-4.5 h-4.5 text-zinc-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Edit then retry
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Adjust context or prompt first
                </p>
              </div>
            </button>

            {/* Retry immediately */}
            <button
              onClick={() => onConfirm(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
                bg-linear-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold
                hover:shadow-lg hover:shadow-orange-500/40 hover:brightness-110 transition-all duration-300"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Retry immediately
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full text-center text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

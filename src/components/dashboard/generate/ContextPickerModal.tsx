"use client";

import { useEffect } from "react";
import { Context } from "@/types/context";

interface ContextPickerModalProps {
  contexts: Context[];
  selected: Context | null;
  onSelect: (ctx: Context) => void;
  onClose: () => void;
}

export default function ContextPickerModal({
  contexts,
  selected,
  onSelect,
  onClose,
}: ContextPickerModalProps) {
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

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/60 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
          <div>
            <h3 className="text-xl font-bold text-white">Select Context</h3>
            <p className="text-sm text-zinc-500 mt-0.5">
              Choose a saved context to guide your generation
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Context list */}
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {contexts.length === 0 && (
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 text-sm text-zinc-500">
              No saved contexts available yet.
            </div>
          )}
          {contexts.map((ctx) => {
            const isSelected = selected?.id === ctx.id;
            return (
              <button
                key={ctx.id}
                onClick={() => onSelect(ctx)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "border-orange-500/50 bg-linear-to-r from-orange-500/10 to-pink-500/10"
                    : "border-zinc-800/50 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-orange-500 bg-orange-500"
                        : "border-zinc-600"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-sm ${isSelected ? "text-orange-300" : "text-white"}`}
                    >
                      {ctx.name}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {ctx.aiPromptBlock}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(ctx.tags ?? []).slice(0, 3).map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 bg-zinc-800 rounded-md text-xs text-zinc-400"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            disabled={!selected}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white
              bg-linear-to-r from-orange-500 to-pink-500
              hover:shadow-lg hover:shadow-orange-500/40 hover:brightness-110
              disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Use Context
          </button>
        </div>
      </div>
    </div>
  );
}

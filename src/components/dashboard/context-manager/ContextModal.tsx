"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/common/GlassCard";
import { Context } from "@/types/context";

interface ContextModalProps {
  context: Context;
  onClose: () => void;
  onUseInGeneration?: (context: Context) => void;
}

export default function ContextModal({
  context,
  onClose,
  onUseInGeneration,
}: ContextModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <GlassCard glow>
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-bold mb-2">{context.name}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                  <span>Created {formatDate(context.createdAt)}</span>
                  {context.usageCount > 0 && (
                    <>
                      <span>•</span>
                      <span>
                        Used {context.usageCount}{" "}
                        {context.usageCount === 1 ? "time" : "times"}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-lg transition-all"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
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

            <div className="space-y-6">
              {/* Metadata Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {context.model && (
                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">
                      Model
                    </div>
                    <div className="text-sm text-white font-medium">
                      {context.model}
                    </div>
                  </div>
                )}
                {context.aspectRatio && (
                  <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">
                      Aspect Ratio
                    </div>
                    <div className="text-sm text-white font-medium">
                      {context.aspectRatio}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Prompt Block */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                    AI Prompt Block
                  </label>
                  <button
                    onClick={() =>
                      copyToClipboard(context.aiPromptBlock, "prompt")
                    }
                    className="text-xs text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1"
                  >
                    {copiedField === "prompt" ? (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 max-h-60 overflow-y-auto">
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                    {context.aiPromptBlock}
                  </p>
                </div>
              </div>

              {/* Structured Data */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                    Structured Data
                  </label>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(context.structuredData, null, 2),
                        "structured",
                      )
                    }
                    className="text-xs text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1"
                  >
                    {copiedField === "structured" ? (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy JSON
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 max-h-96 overflow-y-auto">
                  <pre className="text-zinc-300 font-mono text-xs whitespace-pre-wrap">
                    {JSON.stringify(context.structuredData, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Tags */}
              {context.tags && context.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                    Tags ({context.tags.length})
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {context.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-lg text-sm font-medium text-orange-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-zinc-800/50">
                {onUseInGeneration && (
                  <button
                    onClick={() => onUseInGeneration(context)}
                    className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Use in Generation
                  </button>
                )}
                <button
                  onClick={() =>
                    copyToClipboard(context.aiPromptBlock, "share")
                  }
                  className="px-6 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-xl font-medium hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center gap-2"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {copiedField === "share" ? "Copied!" : "Copy Prompt"}
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

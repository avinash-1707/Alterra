"use client";

import GlassCard from "@/components/common/GlassCard";
import { useEffect } from "react";

interface Context {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  imageUrl?: string;
}

interface ContextModalProps {
  context: Context;
  onClose: () => void;
}

export default function ContextModal({ context, onClose }: ContextModalProps) {
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <GlassCard glow>
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-bold mb-2">{context.name}</h2>
                <p className="text-sm text-zinc-500">
                  Created {formatDate(context.createdAt)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-lg transition-all"
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
              {/* Image Preview */}
              {context.imageUrl && (
                <div>
                  <label className="block text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                    Reference Image
                  </label>
                  <div className="aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/50">
                    <img
                      src={context.imageUrl}
                      alt={context.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                  Description
                </label>
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
                  <p className="text-zinc-300 leading-relaxed">
                    {context.description}
                  </p>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                  Keywords ({context.keywords.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {context.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-lg text-sm font-medium text-orange-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-zinc-800/50">
                <button className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Use in Generation
                </button>
                <button className="px-6 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-xl font-medium hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center gap-2">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

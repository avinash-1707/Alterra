"use client";

import { useEffect } from "react";
import { HubImage } from "./Hub";

interface HubImageModalProps {
  image: HubImage;
  onClose: () => void;
}

export default function HubImageModal({ image, onClose }: HubImageModalProps) {
  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
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
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center mb-6 overflow-hidden">
          <img
            src={image.url}
            alt={image.prompt}
            className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Info Card */}
        <div className="bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/60 rounded-3xl p-6">
          <div className="flex flex-col gap-6">
            {/* Top: Author + Stats */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-800/50">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-pink-400 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-white">
                    {image.author.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {image.author.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(image.createdAt)}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-pink-400">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-semibold tabular-nums">
                    {image.likes.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="font-medium tabular-nums">
                    {image.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: Prompt */}
            <div>
              <p className="text-lg font-medium text-white leading-relaxed">
                {image.prompt}
              </p>
            </div>

            {/* Bottom: Tags + Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Tags */}
              {image.tags && image.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-lg text-xs font-medium text-orange-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white font-medium text-sm transition-all">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Like
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/40 hover:brightness-110 transition-all">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

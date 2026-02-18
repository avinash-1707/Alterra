"use client";

import { useEffect } from "react";
import { GalleryImage } from "../sections/GallerySection";

interface ImageModalProps {
  image: GalleryImage;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ImageModal({
  image,
  onClose,
  onToggleFavorite,
  onDelete,
}: ImageModalProps) {
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

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `alterra-${image.id}.jpg`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
      />

      {/* Close button (top right) */}
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
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Prompt & metadata */}
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-white leading-relaxed mb-3">
                {image.prompt}
              </p>

              {/* Tags */}
              {image.tags && image.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
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

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(image.createdAt)}
                </span>
                <span>•</span>
                <span>
                  {image.width} × {image.height}px
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex md:flex-col gap-2">
              {/* Favorite */}
              <button
                onClick={() => onToggleFavorite(image.id)}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                  image.favorite
                    ? "bg-pink-500/20 border border-pink-500/40 text-pink-300 hover:bg-pink-500/30"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={image.favorite ? "currentColor" : "none"}
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
                <span className="hidden md:inline">
                  {image.favorite ? "Favorited" : "Favorite"}
                </span>
              </button>

              {/* Download */}
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/40 hover:brightness-110 transition-all"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="hidden md:inline">Download</span>
              </button>

              {/* Delete */}
              <button
                onClick={() => onDelete(image.id)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 font-medium text-sm transition-all"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span className="hidden md:inline">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

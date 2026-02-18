"use client";

import { useState } from "react";
import { GalleryImage } from "../sections/GallerySection";

interface GalleryMasonryProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
  onToggleFavorite: (id: string) => void;
}

export default function GalleryMasonry({
  images,
  onImageClick,
  onToggleFavorite,
}: GalleryMasonryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image) => {
        const isLoaded = loadedImages.has(image.id);

        return (
          <div key={image.id} className="break-inside-avoid group relative">
            {/* Image Card */}
            <div
              onClick={() => onImageClick(image)}
              className="relative rounded-2xl overflow-hidden bg-zinc-950/30 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
            >
              {/* Loading skeleton */}
              {!isLoaded && (
                <div
                  className="w-full animate-pulse bg-zinc-900"
                  style={{ aspectRatio: `${image.width}/${image.height}` }}
                />
              )}

              {/* Actual image */}
              <img
                src={image.url}
                alt={image.prompt}
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
                className={`w-full h-auto transition-opacity duration-300 ${
                  isLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {/* Prompt */}
                <p className="text-sm text-white font-medium line-clamp-2 leading-snug mb-2">
                  {image.prompt}
                </p>

                {/* Tags */}
                {image.tags && image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {image.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-md text-xs text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Date */}
                <p className="text-xs text-zinc-400">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(image.createdAt)}
                </p>
              </div>

              {/* Favorite button (always visible) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(image.id);
                }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-xl bg-black/40 border border-white/10 flex items-center justify-center hover:bg-black/60 transition-all z-10"
              >
                <svg
                  className={`w-4.5 h-4.5 transition-colors ${
                    image.favorite
                      ? "text-pink-400 fill-pink-400"
                      : "text-white/60"
                  }`}
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
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

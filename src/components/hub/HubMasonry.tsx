"use client";

import { useState } from "react";
import { HubImage } from "./Hub";

interface HubMasonryProps {
  images: HubImage[];
  onImageClick: (image: HubImage) => void;
}

export default function HubMasonry({ images, onImageClick }: HubMasonryProps) {
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
                <p className="text-sm text-white font-medium line-clamp-2 leading-snug mb-3">
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
                    {image.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs text-zinc-500">
                        +{image.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {image.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
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
                    {image.views.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Author badge (always visible) */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 backdrop-blur-xl bg-black/40 border border-white/10 rounded-full">
                {/* Avatar */}
                <div className="w-5 h-5 rounded-full bg-linear-to-br from-orange-400 to-pink-400 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-white">
                    {image.author.avatar}
                  </span>
                </div>
                <span className="text-xs font-medium text-white/90">
                  {image.author.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

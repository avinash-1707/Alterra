"use client";

import { GenerationState } from "../sections/GenerateSection";

interface GeneratedResultProps {
  generationState: GenerationState;
  imageUrl: string | null;
  onRetry: () => void;
  onSave: () => void;
}

export default function GeneratedResult({
  generationState,
  imageUrl,
  onRetry,
  onSave,
}: GeneratedResultProps) {
  const isGenerating = generationState === "generating";

  return (
    <div className="space-y-4">
      {/* Result card */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-950/30">
        {isGenerating ? (
          /* Loading skeleton */
          <div className="aspect-square md:aspect-video w-full animate-pulse bg-linear-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center gap-4 min-h-75">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
              <div className="absolute inset-0 rounded-full border-t-2 border-orange-500 animate-spin" />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-sm text-zinc-400 font-medium">
                Generating your image…
              </p>
              <p className="text-xs text-zinc-600">
                This may take a few seconds
              </p>
            </div>

            {/* Animated lines */}
            <div className="absolute inset-x-8 bottom-6 space-y-2">
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-orange-500/40 to-pink-500/40 rounded-full animate-[shimmer_1.5s_ease-in-out_infinite] w-2/3" />
              </div>
            </div>
          </div>
        ) : imageUrl ? (
          /* Generated image */
          <div className="relative group">
            <img
              src={imageUrl}
              alt="Generated image"
              className="w-full object-cover rounded-3xl"
            />
            {/* Overlay gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent rounded-b-3xl" />
          </div>
        ) : null}
      </div>

      {/* Action buttons */}
      {!isGenerating && imageUrl && (
        <div className="flex gap-3">
          {/* Retry */}
          <button
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl
              bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-medium
              hover:bg-zinc-800 hover:border-zinc-700 hover:text-white transition-all duration-200"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Retry
          </button>

          {/* Save */}
          <button
            onClick={onSave}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl
              bg-linear-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold
              hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110 transition-all duration-300"
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
            Save to Gallery
          </button>
        </div>
      )}
    </div>
  );
}

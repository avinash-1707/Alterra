"use client";

import { useRef, useCallback } from "react";
import {
  AttachedImage,
  GenerationState,
  SavedContext,
} from "../sections/GenerateSection";
import ImageThumbnail from "./ImageThumbnail";
import SmartToggle from "./SmartToggle";

interface PromptCardProps {
  prompt: string;
  setPrompt: (v: string) => void;
  smartExpansion: boolean;
  setSmartExpansion: (v: boolean) => void;
  attachedImage: AttachedImage | null;
  setAttachedImage: (v: AttachedImage | null) => void;
  selectedContext: SavedContext | null;
  setSelectedContext: (v: SavedContext | null) => void;
  generationState: GenerationState;
  onGenerate: () => void;
  onOpenContextModal: () => void;
}

export default function PromptCard({
  prompt,
  setPrompt,
  smartExpansion,
  setSmartExpansion,
  attachedImage,
  setAttachedImage,
  selectedContext,
  setSelectedContext,
  generationState,
  onGenerate,
  onOpenContextModal,
}: PromptCardProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isGenerating = generationState === "generating";
  const canGenerate =
    (prompt.trim().length > 0 || !!attachedImage) && !isGenerating;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const attachFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const previewUrl = URL.createObjectURL(file);
      setAttachedImage({ file, previewUrl });
    },
    [setAttachedImage],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = Array.from(e.clipboardData.items);
      const imageItem = items.find((item) => item.type.startsWith("image/"));
      if (imageItem) {
        e.preventDefault();
        const file = imageItem.getAsFile();
        if (file) attachFile(file);
      }
    },
    [attachFile],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (canGenerate) onGenerate();
    }
  };

  // Card glow when smart expansion is on
  const cardGlow = smartExpansion
    ? "shadow-[0_0_40px_-4px] shadow-orange-500/30 border-orange-500/30"
    : "border-zinc-800/50";

  return (
    <div
      className={`relative rounded-3xl bg-zinc-950/50 backdrop-blur-xl border transition-all duration-500 ${cardGlow}`}
    >
      {/* Smart mode label */}
      {smartExpansion && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-linear-to-r from-orange-500 to-pink-500 rounded-full text-xs font-semibold tracking-wide">
          Smart Mode Active
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Attached image thumbnail */}
        {attachedImage && (
          <ImageThumbnail
            previewUrl={attachedImage.previewUrl}
            fileName={attachedImage.file.name}
            onRemove={() => setAttachedImage(null)}
          />
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handleTextareaChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want to create... or paste an image"
          rows={4}
          className="w-full bg-transparent text-white placeholder:text-zinc-600 resize-none outline-none text-base leading-relaxed min-h-24 max-h-70 overflow-y-auto"
          disabled={isGenerating}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-800/50">
          {/* Left controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <SmartToggle
              enabled={smartExpansion}
              onChange={setSmartExpansion}
            />

            {/* Context button */}
            <button
              onClick={onOpenContextModal}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 disabled:opacity-40
                bg-zinc-900/60 border-zinc-700/50 text-zinc-300 hover:text-white hover:border-zinc-600"
            >
              {selectedContext ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                  <span className="max-w-25 truncate">
                    {selectedContext.name}
                  </span>
                  <span
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContext(null);
                    }}
                    className="ml-0.5 text-lg text-zinc-500 hover:text-white transition-colors"
                  >
                    ×
                  </span>
                </>
              ) : (
                <>
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Add Context
                </>
              )}
            </button>
          </div>

          {/* Generate button */}
          <button
            onClick={onGenerate}
            disabled={!canGenerate}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300
              bg-linear-to-r from-orange-500 to-pink-500 text-white
              hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110
              disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:brightness-100"
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating…
              </>
            ) : (
              <>
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
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Inner glow overlay when smart is on */}
      {smartExpansion && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-orange-500/5 to-pink-500/5" />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 sm:px-0">
      {/* Glass Container */}
      <div
        className="relative bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl sm:rounded-full px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-5 shadow-2xl"
      >
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <input
            type="text"
            placeholder="a serene mountain landscape..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm sm:text-base lg:text-lg"
          />

          <button
            className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-2.5 lg:px-7 lg:py-3 text-sm sm:text-base bg-linear-to-r from-orange-500 to-pink-500 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 active:scale-95"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 bg-linear-to-r from-orange-500/10 to-purple-500/10 rounded-2xl sm:rounded-full blur-xl -z-10"
      />
    </div>
  );
}

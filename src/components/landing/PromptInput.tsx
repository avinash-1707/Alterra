"use client";

import { useState } from "react";

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Glass Container */}
      <div className="relative bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 rounded-full px-8 py-5 shadow-2xl">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="a serene mountain landscape..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-lg"
          />
          <button className="px-6 py-2.5 bg-linear-to-r from-orange-500 to-pink-500 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300">
            Generate
          </button>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 to-purple-500/10 rounded-full blur-xl -z-10" />
    </div>
  );
}

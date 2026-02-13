"use client";

import { useState } from "react";

export default function Hero() {
  const [prompt, setPrompt] = useState("");

  const examplePrompts = [
    "A cozy coffee shop on a rainy day",
    "Mountain landscape at sunset",
    "Futuristic city skyline",
  ];

  const handleExample = () => {
    const random =
      examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPrompt(random);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-neutral-800">
      {/* Subtle background linear */}
      <div className="absolute inset-0 bg-linear-to-b from-neutral-800 via-neutral-800 to-neutral-900/50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-100 leading-[1.1]">
                Create Stunning AI Images
                <span className="block mt-2 bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">
                  With Just Simple Words
                </span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-xl font-light leading-relaxed">
                Describe your idea simply. We handle the complexity.
              </p>
            </div>

            {/* Prompt input */}
            <div
              className="space-y-4 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500/20 to-violet-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A peaceful zen garden with cherry blossoms..."
                  className="relative w-full px-8 py-5 bg-neutral-700 border border-neutral-600 rounded-3xl text-lg text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500/40 shadow-lg transition-all duration-300"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="px-8 py-4 bg-linear-to-br from-indigo-500 to-violet-500 text-white rounded-2xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                  Generate Image
                </button>
                <button
                  onClick={handleExample}
                  className="px-8 py-4 bg-neutral-700 border border-neutral-600 text-neutral-100 rounded-2xl font-medium shadow-lg hover:bg-neutral-600 hover:border-indigo-500/30 transition-all duration-200"
                >
                  Try an Example
                </button>
              </div>
            </div>

            <div
              className="flex items-center gap-6 text-sm text-neutral-400 pt-4 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Free to start</span>
              </div>
            </div>
          </div>

          {/* Right preview grid */}
          <div
            className="relative animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-linear-to-br from-neutral-700 to-neutral-800 border border-neutral-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
                  style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-indigo-400/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

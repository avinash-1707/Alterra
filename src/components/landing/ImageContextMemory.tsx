"use client";

export default function ImageContextMemory() {
  const scenes = [
    { id: 1, title: "At the cafe", desc: "Morning coffee routine" },
    { id: 2, title: "In the park", desc: "Weekend relaxation" },
    { id: 3, title: "At the office", desc: "Creative work session" },
    { id: 4, title: "Evening walk", desc: "Golden hour stroll" },
  ];

  return (
    <section className="relative py-32 px-6 bg-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light text-neutral-100 tracking-tight">
            Keep Your Creations{" "}
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">
              Consistent
            </span>
          </h2>
          <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto">
            Upload an image once, use it across unlimited generations. Perfect
            for characters, products, or any visual element you want to reuse.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Upload Context Card */}
          <div className="lg:col-span-1 space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-full text-sm text-neutral-400 shadow-lg">
              <svg
                className="w-4 h-4 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Step 1: Upload
            </div>

            <div className="bg-neutral-700 rounded-3xl p-6 shadow-lg border border-neutral-600 space-y-4 hover:shadow-xl transition-all duration-300">
              <div className="aspect-square rounded-2xl bg-linear-to-br from-indigo-500/10 to-violet-500/10 border-2 border-dashed border-indigo-500/30 flex items-center justify-center group cursor-pointer hover:border-indigo-500/50 transition-colors">
                <div className="text-center space-y-3 p-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-neutral-800 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-indigo-400"
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
                  <div>
                    <p className="text-sm font-medium text-neutral-200">
                      Upload your character
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Context name</span>
                  <span className="text-neutral-200 font-medium">
                    Character_01
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-indigo-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Multiple Scenes Grid */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up-delayed">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 rounded-full text-sm text-indigo-400 shadow-lg">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Step 2: Reuse Anywhere
            </div>

            <div className="grid grid-cols-2 gap-4">
              {scenes.map((scene, idx) => (
                <div
                  key={scene.id}
                  className="group bg-neutral-700 rounded-2xl p-4 shadow-lg border border-neutral-600 hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 space-y-3 animate-scale-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="aspect-4/3 rounded-xl bg-linear-to-br from-neutral-600 to-neutral-700 border border-neutral-600 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    <div className="text-center space-y-2 p-4">
                      <div className="w-12 h-12 mx-auto rounded-full bg-linear-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-indigo-400/60"
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
                      <p className="text-xs text-neutral-500">Same character</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-200">
                      {scene.title}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {scene.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-500/10 rounded-full text-sm text-neutral-300">
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="font-light">
              Upload once, use unlimited times across all your creations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

export default function SmartPromptExpansion() {
  return (
    <section className="relative py-32 px-6 bg-linear-to-b from-neutral-900/50 to-neutral-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light text-neutral-100 tracking-tight">
            You Write Simple.{" "}
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">
              We Think in Detail.
            </span>
          </h2>
          <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto">
            Our AI transforms your simple ideas into rich, detailed prompts that
            generate stunning results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Simple Input */}
          <div className="space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-full text-sm text-neutral-400 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Your Input
            </div>
            <div className="bg-neutral-700 rounded-3xl p-8 shadow-lg border border-neutral-600 space-y-6 hover:shadow-xl transition-all duration-300">
              <div className="space-y-3">
                <div className="text-sm text-neutral-400 font-medium">
                  You type:
                </div>
                <p className="text-2xl font-light text-neutral-100 leading-relaxed">
                  "A cozy coffee shop"
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>2 seconds to write</span>
              </div>
            </div>
          </div>

          {/* Detailed Output */}
          <div className="space-y-4 animate-slide-up md:animate-slide-up-delayed">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 rounded-full text-sm text-indigo-400 shadow-lg">
              <svg
                className="w-4 h-4 animate-spin-slow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              AI Enhanced
            </div>
            <div className="bg-linear-to-br from-neutral-700 to-neutral-800 rounded-3xl p-8 shadow-xl shadow-indigo-500/10 border border-indigo-500/20 space-y-6 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
              <div className="space-y-3">
                <div className="text-sm text-indigo-400 font-medium">
                  We generate:
                </div>
                <p className="text-base text-neutral-300 leading-relaxed font-light">
                  "A warm, inviting coffee shop interior with exposed brick
                  walls, soft pendant lighting casting a golden glow, wooden
                  tables with vintage chairs, steam rising from ceramic mugs,
                  large windows revealing a rainy street outside, plants hanging
                  from the ceiling, and a barista crafting latte art behind a
                  marble counter, photorealistic, cozy ambiance, 8k quality"
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-indigo-400">
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span>Enhanced automatically</span>
              </div>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-light">
              No prompt engineering skills required
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

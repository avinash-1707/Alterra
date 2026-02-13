"use client";

export default function ExampleGallery() {
  const examples = [
    { id: 1, prompt: "Sunset over mountains", size: "large" },
    { id: 2, prompt: "Modern architecture", size: "small" },
    { id: 3, prompt: "Abstract watercolor", size: "medium" },
    { id: 4, prompt: "Vintage photograph", size: "small" },
    { id: 5, prompt: "Minimalist interior", size: "large" },
    { id: 6, prompt: "Nature landscape", size: "medium" },
    { id: 7, prompt: "Urban photography", size: "small" },
    { id: 8, prompt: "Product design", size: "medium" },
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-2";
      default:
        return "";
    }
  };

  return (
    <section className="relative py-32 px-6 bg-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light text-neutral-100 tracking-tight">
            Explore What's{" "}
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">
              Possible
            </span>
          </h2>
          <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto">
            From simple prompts to stunning results
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid md:grid-cols-4 gap-4 auto-rows-[200px]">
          {examples.map((example, idx) => (
            <div
              key={example.id}
              className={`group relative rounded-2xl bg-linear-to-br from-neutral-700 to-neutral-800 border border-neutral-600 overflow-hidden hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 cursor-pointer animate-scale-in ${getSizeClasses(example.size)}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Placeholder for actual image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-10 h-10 text-indigo-400/60"
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

              {/* Overlay with prompt on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white border border-white/20">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Prompt
                  </div>
                  <p className="text-white font-light text-sm">
                    {example.prompt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="font-light">
              All generated from simple, one-sentence prompts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

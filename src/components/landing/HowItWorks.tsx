"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Type a Simple Idea",
      description:
        "Describe what you want in plain language. No technical jargon needed.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Upload or Select Context",
      description:
        "Add your own images to maintain consistency across generations.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Generate & Download",
      description:
        "Get professional-quality images in seconds. Download and use anywhere.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-linear-to-b from-neutral-900/50 to-neutral-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-light text-neutral-100 tracking-tight">
            Three Simple Steps to{" "}
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">
              Beautiful Images
            </span>
          </h2>
          <p className="text-lg text-neutral-400 font-light max-w-2xl mx-auto">
            Start creating professional AI images in minutes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Connector line (hidden on mobile, last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-px bg-linear-to-r from-indigo-500/20 to-transparent" />
              )}

              <div className="relative bg-neutral-700 rounded-3xl p-8 shadow-lg border border-neutral-600 hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 space-y-6 h-full">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-indigo-400">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-all duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-medium text-neutral-100">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-linear-to-br from-indigo-500 to-violet-500 text-white rounded-2xl font-medium shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-2">
            Get Started Free
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

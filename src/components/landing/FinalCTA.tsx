"use client";

export default function FinalCTA() {
  return (
    <section className="relative py-32 px-6 bg-linear-to-b from-neutral-900/50 via-neutral-800 to-neutral-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-linear-to-br from-indigo-500/10 to-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-linear-to-br from-violet-500/10 to-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-12">
        {/* Main content */}
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-light text-neutral-100 tracking-tight leading-[1.1]">
            Start Creating Without
            <span className="block mt-2 bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-normal">
              Prompt Engineering
            </span>
          </h2>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who've simplified their AI image
            workflow. No technical skills required.
          </p>
        </div>

        {/* CTA Button */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <button className="group px-10 py-5 bg-linear-to-br from-indigo-500 to-violet-500 text-white rounded-2xl font-medium text-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-3">
            Start Free
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
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
          <button className="px-10 py-5 bg-neutral-700 border border-neutral-600 text-neutral-100 rounded-2xl font-medium text-lg shadow-lg hover:bg-neutral-600 hover:border-indigo-500/30 transition-all duration-200">
            View Examples
          </button>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 pt-8 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center gap-2 text-sm text-neutral-400">
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
          <div className="flex items-center gap-2 text-sm text-neutral-400">
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
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
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
            <span>Cancel anytime</span>
          </div>
        </div>

        {/* Social proof */}
        <div
          className="pt-12 space-y-4 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500/20 to-violet-500/20 border-2 border-neutral-800 flex items-center justify-center text-xs text-indigo-400 font-medium"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-neutral-400 font-light">
            Trusted by over{" "}
            <span className="text-neutral-200 font-medium">
              10,000+ creators
            </span>{" "}
            worldwide
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-32 pt-12 border-t border-neutral-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="font-medium text-neutral-200">Alterra</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" className="hover:text-neutral-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-neutral-200 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-neutral-200 transition-colors">
              Contact
            </a>
          </div>
          <p className="font-light">© 2024 Alterra. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}

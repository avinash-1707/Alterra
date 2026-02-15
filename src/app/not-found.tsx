import GradientBlob from "@/components/common/GradientBlog";
import LandingButton from "@/components/landing/LandingButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6">
      {/* Gradient Blobs Background */}
      <GradientBlob
        className="top-1/4 right-0 w-200 h-200"
        colors="from-orange-500/30 via-pink-500/20 to-purple-500/10"
        blur="blur-3xl"
      />
      <GradientBlob
        className="bottom-1/4 left-0 w-175 h-175"
        colors="from-indigo-500/20 via-violet-500/20 to-purple-500/10"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none bg-linear-to-br from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Glitch Effect Line */}
        <div className="relative mb-8">
          <div className="h-px w-full bg-linear-to-r from-transparent via-orange-500 to-transparent opacity-50" />
          <div className="absolute inset-0 h-px bg-linear-to-r from-transparent via-pink-500 to-transparent opacity-30 blur-sm" />
        </div>

        {/* Error Message */}
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          page not found
        </h2>

        <p className="text-lg md:text-xl text-zinc-400 font-light mb-12 leading-relaxed max-w-xl mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/">
            <LandingButton variant="primary" size="lg">
              Go Home
            </LandingButton>
          </Link>
          <Link href="/dashboard">
            <LandingButton variant="secondary" size="lg">
              Dashboard
            </LandingButton>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-zinc-800/50">
          <p className="text-sm text-zinc-500 mb-4 uppercase tracking-wider">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/pricing"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/signin"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/#features"
              className="text-zinc-400 hover:text-orange-400 transition-colors"
            >
              Features
            </Link>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

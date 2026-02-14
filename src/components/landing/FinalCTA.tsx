import GradientBlob from "../common/GradientBlog";
import LandingButton from "./LandingButton";

export default function FinalCTA() {
  return (
    <section className="relative py-40 px-6">
      {/* Dramatic Background Glow */}
      <GradientBlob
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-200"
        colors="from-orange-500/30 via-pink-500/20 to-purple-500/20"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none">
          Start Creating
          <br />
          <span className="text-5xl md:text-7xl lg:text-8xl font-serif   text-zinc-400">
            without limits
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          No prompt engineering required. No creative constraints. Just your
          ideas, elevated by AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <LandingButton variant="primary" size="lg">
            Get Started Free
          </LandingButton>
          <LandingButton variant="secondary" size="lg">
            View Pricing
          </LandingButton>
        </div>

        {/* Caption */}
        <p className="text-xs text-zinc-600 tracking-wider uppercase">
          Join thousands of creators
        </p>
      </div>
    </section>
  );
}

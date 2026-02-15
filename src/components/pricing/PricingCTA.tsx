import GlassCard from "../common/GlassCard";
import GradientBlob from "../common/GradientBlog";
import LandingButton from "../landing/LandingButton";

export default function PricingCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-32">
      {/* Dramatic Background Glow */}
      <GradientBlob
        className="top-1/2 left-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2 sm:h-56 sm:w-96 md:h-72 md:w-136 lg:h-96 lg:w-4xl"
        colors="from-orange-500/20 via-pink-500/15 to-purple-500/10"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <GlassCard glow>
          <div className="p-6 text-center sm:p-10 md:p-12 lg:p-16">
            {/* Headline */}
            <h2 className="mb-4 text-3xl leading-tight font-bold sm:mb-5 sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl xl:text-7xl">
              Ready to create?
            </h2>

            {/* Supporting Text */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed font-serif text-zinc-400 sm:text-lg md:mb-10 md:text-xl lg:text-2xl">
              Start with our free plan. No credit card required. Upgrade when
              you&apos;re ready.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <LandingButton variant="primary" size="lg">
                Start Free
              </LandingButton>
              <LandingButton variant="secondary" size="lg">
                Talk to Sales
              </LandingButton>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-zinc-800/50 pt-6 sm:mt-12 sm:gap-8 sm:pt-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-1 text-xl font-bold text-orange-400 sm:text-2xl">
                  50K+
                </div>
                <div className="text-[10px] tracking-wider text-zinc-500 uppercase sm:text-xs">
                  Active Users
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-xl font-bold text-orange-400 sm:text-2xl">
                  10M+
                </div>
                <div className="text-[10px] tracking-wider text-zinc-500 uppercase sm:text-xs">
                  Images Generated
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-xl font-bold text-orange-400 sm:text-2xl">
                  99.9%
                </div>
                <div className="text-[10px] tracking-wider text-zinc-500 uppercase sm:text-xs">
                  Uptime
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-xl font-bold text-orange-400 sm:text-2xl">
                  4.9/5
                </div>
                <div className="text-[10px] tracking-wider text-zinc-500 uppercase sm:text-xs">
                  User Rating
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

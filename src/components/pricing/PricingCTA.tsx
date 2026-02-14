import GlassCard from "../common/GlassCard";
import GradientBlob from "../common/GradientBlog";
import LandingButton from "../landing/LandingButton";

export default function PricingCTA() {
  return (
    <section className="relative py-32 px-6">
      {/* Dramatic Background Glow */}
      <GradientBlob
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-150"
        colors="from-orange-500/20 via-pink-500/15 to-purple-500/10"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <GlassCard glow>
          <div className="p-12 md:p-16 text-center">
            {/* Headline */}
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Ready to create?
            </h2>

            {/* Supporting Text */}
            <p className="text-2xl text-zinc-400 font-serif max-w-2xl mx-auto mb-10 leading-relaxed">
              Start with our free plan. No credit card required. Upgrade when
              you're ready.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <LandingButton variant="primary" size="lg">
                Start Free
              </LandingButton>
              <LandingButton variant="secondary" size="lg">
                Talk to Sales
              </LandingButton>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-zinc-800/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  50K+
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                  Active Users
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  10M+
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                  Images Generated
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  99.9%
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                  Uptime
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  4.9/5
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
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

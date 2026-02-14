import Image from "next/image";
import GlassCard from "../common/GlassCard";
import GradientBlob from "../common/GradientBlog";

export default function SmartPromptExpansion() {
  return (
    <section className="relative py-32 px-6">
      {/* Background Glow */}
      <GradientBlob
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-150"
        colors="from-violet-500/10 via-purple-500/10 to-transparent"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            You write simple.
            <br />
            <span className="text-5xl md:text-7xl font-serif text-zinc-400">
              We think in detail.
            </span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Our AI automatically expands your prompts with intelligent details,
            lighting, composition, and style cues.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Simple Input */}
          <GlassCard>
            <div className="p-8">
              <div className="inline-block px-4 py-1.5 bg-zinc-800/50 rounded-full text-xs uppercase tracking-wider text-zinc-400 mb-6">
                Your Input
              </div>
              <p className="text-2xl md:text-3xl font-light text-zinc-300 mb-8">
                "a cat in a garden"
              </p>
              <div className="relative h-64 bg-zinc-900/50 rounded-2xl overflow-hidden">
                <Image
                  src="/images/no_enhancement.png"
                  alt="Simple prompt result"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </GlassCard>

          {/* AI Enhanced */}
          <GlassCard glow>
            <div className="p-8">
              <div className="inline-block px-4 py-1.5 bg-lienar-to-r from-orange-500/20 to-pink-500/20 rounded-full text-xs uppercase tracking-wider text-orange-300 mb-6">
                AI Enhanced
              </div>
              <p className="text-lg md:text-xl font-light text-zinc-400 mb-8 leading-relaxed">
                "A majestic tabby cat sitting gracefully in a lush English
                garden, golden hour sunlight filtering through rose bushes, soft
                bokeh background, cinematic composition, shallow depth of field"
              </p>
              <div className="relative h-64 bg-linear-to-br from-orange-500/10 to-purple-500/10 rounded-2xl overflow-hidden border border-orange-500/20">
                <Image
                  src="/images/with_enhancement.png"
                  alt="Cinematic enhanced result"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

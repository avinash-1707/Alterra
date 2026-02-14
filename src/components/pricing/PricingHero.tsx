import GradientBlob from "../common/GradientBlog";

export default function PricingHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-6 py-32 pt-40">
      {/* Gradient Blobs Background */}
      <GradientBlob
        className="top-0 right-0 w-200 h-200"
        colors="from-orange-500/30 via-pink-500/20 to-purple-500/10"
        blur="blur-3xl"
      />
      <GradientBlob
        className="bottom-20 left-0 w-150 h-150"
        colors="from-indigo-500/20 via-violet-500/20 to-purple-500/10"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Hero Headline */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-8">
          Simple pricing
          <br />
          <span className="text-6xl md:text-7xl lg:text-8xl text-zinc-400">
            for everyone
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-2xl md:text-3xl font-serif text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Start free. Scale as you grow. No hidden fees.
        </p>

        {/* Pricing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-zinc-500">Monthly</span>
          <button className="relative w-14 h-7 bg-zinc-800 rounded-full transition-colors">
            <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform" />
          </button>
          <span className="text-white font-medium">Annual</span>
          <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full font-medium">
            Save 20%
          </span>
        </div>
      </div>
    </section>
  );
}

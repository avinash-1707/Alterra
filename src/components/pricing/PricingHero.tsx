import GradientBlob from "../common/GradientBlog";

export default function PricingHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-6 pt-40">
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

      </div>
    </section>
  );
}

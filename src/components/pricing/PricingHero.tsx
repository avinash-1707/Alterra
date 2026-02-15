import GradientBlob from "../common/GradientBlog";

export default function PricingHero() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 pt-28 sm:min-h-[55vh] sm:px-6 sm:pt-32 md:min-h-[60vh] md:pt-36">
      {/* Gradient Blobs Background */}
      <GradientBlob
        className="right-0 top-0 h-36 w-36 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80"
        colors="from-orange-500/30 via-pink-500/20 to-purple-500/10"
        blur="blur-3xl"
      />
      <GradientBlob
        className="bottom-6 left-0 h-28 w-28 sm:bottom-12 sm:h-44 sm:w-44 md:bottom-20 md:h-60 md:w-60"
        colors="from-indigo-500/20 via-violet-500/20 to-purple-500/10"
        blur="blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        {/* Hero Headline */}
        <h1 className="mb-6 text-4xl leading-none font-bold tracking-tight sm:mb-8 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          Simple pricing
          <br />
          <span className="text-3xl text-zinc-400 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            for everyone
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mx-auto mb-8 max-w-2xl px-2 text-lg leading-relaxed font-serif text-zinc-400 sm:mb-10 sm:px-0 sm:text-xl md:mb-12 md:text-2xl lg:text-3xl">
          Start free. Scale as you grow. No hidden fees.
        </p>
      </div>
    </section>
  );
}

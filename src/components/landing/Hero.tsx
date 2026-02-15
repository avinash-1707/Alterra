import { Link } from "next-view-transitions";
import GradientBlob from "../common/GradientBlog";
import LandingButton from "./LandingButton";
import PromptInput from "./PromptInput";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-32 pt-40">
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
          You don't need
          <br />
          <span className="text-6xl md:text-7xl lg:text-8xl">
            to master prompts
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-xl md:text-2xl font-serif text-zinc-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Alterra handles the complexity. You write simple. We think in detail.
        </p>

        {/* Glass Prompt Input */}
        <div className="mb-10">
          <PromptInput />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <LandingButton variant="primary" size="lg">
            Start Creating Free
          </LandingButton>
          <Link href="#gallery">
            <LandingButton variant="secondary" size="lg">
              See Examples
            </LandingButton>
          </Link>
        </div>

        {/* Small Caption */}
        <p className="text-xs text-zinc-600 mt-8 tracking-wider uppercase">
          No credit card required
        </p>
      </div>
    </section>
  );
}

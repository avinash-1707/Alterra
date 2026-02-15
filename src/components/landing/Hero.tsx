"use client";

import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import GradientBlob from "../common/GradientBlog";
import LandingButton from "./LandingButton";
import PromptInput from "./PromptInput";

const premiumEasing = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32 pt-28 sm:pt-40">
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

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Hero Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none mb-6 sm:mb-8"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: premiumEasing }}
        >
          You don't need
          <br />
          <motion.span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl inline-block"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: premiumEasing, delay: 0.1 }}
          >
            to master prompts
          </motion.span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-serif text-zinc-400 font-light max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-4"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.7, ease: premiumEasing, delay: 0.2 }}
        >
          Alterra handles the complexity. You write simple. We think in detail.
        </motion.p>

        {/* Glass Prompt Input */}
        <motion.div
          className="mb-8 sm:mb-10"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.7, ease: premiumEasing, delay: 0.3 }}
        >
          <PromptInput />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: premiumEasing, delay: 0.4 }}
        >
          <LandingButton variant="primary" size="lg">
            Start Creating Free
          </LandingButton>
          <Link href="#gallery">
            <LandingButton variant="secondary" size="lg">
              See Examples
            </LandingButton>
          </Link>
        </motion.div>

        {/* Small Caption */}
        <motion.p
          className="text-xs text-zinc-600 mt-6 sm:mt-8 tracking-wider uppercase"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: premiumEasing, delay: 0.5 }}
        >
          No credit card required
        </motion.p>
      </div>
    </section>
  );
}

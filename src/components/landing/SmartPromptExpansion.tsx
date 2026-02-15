"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import GlassCard from "../common/GlassCard";
import GradientBlob from "../common/GradientBlog";

const premiumEasing = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function SmartPromptExpansion() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Trigger animation when section enters viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.4,
  });

  // Track scroll progress for image unblur effect
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  });

  // Unblur images when scrolled halfway through the component
  const imageBlur = useTransform(scrollYProgress, [0.6, 0.8], [10, 0]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Glow */}
      <GradientBlob
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-150"
        colors="from-violet-500/10 via-purple-500/10 to-transparent"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
          transition={{ duration: 0.7, ease: premiumEasing }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4">
            You write simple.
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-zinc-400">
              We think in detail.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto px-4">
            Our AI automatically expands your prompts with intelligent details,
            lighting, composition, and style cues.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div
          ref={imageContainerRef}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {/* Simple Input */}
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: premiumEasing, delay: 0.2 }}
          >
            <GlassCard>
              <div className="p-6 sm:p-8">
                <div className="inline-block px-3 sm:px-4 py-1.5 bg-zinc-800/50 rounded-full text-xs uppercase tracking-wider text-zinc-400 mb-4 sm:mb-6">
                  Your Input
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 mb-6 sm:mb-8">
                  "a cat in a garden"
                </p>
                <motion.div
                  className="relative h-48 sm:h-56 md:h-64 bg-zinc-900/50 rounded-2xl overflow-hidden"
                  style={{ filter: `blur(${imageBlur}px)` }}
                  transition={{ duration: 0.6, ease: premiumEasing }}
                >
                  <Image
                    src="/images/prompt-expansion/no_enhancement.png"
                    alt="Simple prompt result"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Enhanced */}
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: premiumEasing, delay: 0.3 }}
          >
            <GlassCard glow>
              <div className="p-6 sm:p-8">
                <div className="inline-block px-3 sm:px-4 py-1.5 bg-linear-to-r from-orange-500/20 to-pink-500/20 rounded-full text-xs uppercase tracking-wider text-orange-300 mb-4 sm:mb-6">
                  AI Enhanced
                </div>
                <p className="text-base sm:text-lg md:text-xl font-light text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
                  "A majestic tabby cat sitting gracefully in a lush English
                  garden, golden hour sunlight filtering through rose bushes,
                  soft bokeh background, cinematic composition, shallow depth of
                  field"
                </p>
                <motion.div
                  className="relative h-48 sm:h-56 md:h-64 bg-linear-to-br from-orange-500/10 to-purple-500/10 rounded-2xl overflow-hidden border border-orange-500/20"
                  style={{ filter: `blur(${imageBlur}px)` }}
                  transition={{ duration: 0.6, ease: premiumEasing }}
                >
                  <Image
                    src="/images/prompt-expansion/with_enhancement.png"
                    alt="Cinematic enhanced result"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

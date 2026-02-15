"use client";

import { Link } from "next-view-transitions";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import GradientBlob from "../common/GradientBlog";
import LandingButton from "./LandingButton";

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

const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
};

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-8"
    >
      {/* Dramatic Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 1.2, ease: premiumEasing }}
      >
        <GradientBlob
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-300 h-200"
          colors="from-orange-500/30 via-pink-500/20 to-purple-500/20"
          blur="blur-3xl"
        />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-none px-4"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
          transition={{ duration: 0.8, ease: premiumEasing }}
        >
          Start Creating
          <br />
          <motion.span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-zinc-400 inline-block"
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: premiumEasing, delay: 0.1 }}
          >
            without limits
          </motion.span>
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
          transition={{ duration: 0.7, ease: premiumEasing, delay: 0.2 }}
        >
          No prompt engineering required. No creative constraints. Just your
          ideas, elevated by AI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={scaleIn}
          transition={{ duration: 0.7, ease: premiumEasing, delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: premiumEasing }}
          >
            <LandingButton variant="primary" size="lg">
              Get Started Free
            </LandingButton>
          </motion.div>
          <Link href="/pricing">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: premiumEasing }}
            >
              <LandingButton variant="secondary" size="lg">
                View Pricing
              </LandingButton>
            </motion.div>
          </Link>
        </motion.div>

        {/* Caption */}
        <motion.p
          className="text-xs text-zinc-600 tracking-wider uppercase"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: premiumEasing, delay: 0.4 }}
        >
          Join thousands of creators
        </motion.p>
      </div>
    </section>
  );
}

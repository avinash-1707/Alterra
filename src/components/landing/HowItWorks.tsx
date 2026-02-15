"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import GlassCard from "../common/GlassCard";

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
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const steps = [
    {
      number: "01",
      title: "Write Simple",
      description:
        "Type what you want in plain language. No complex formatting or technical prompts needed.",
    },
    {
      number: "02",
      title: "AI Enhances",
      description:
        "Our AI automatically expands your idea with cinematic details and professional composition.",
    },
    {
      number: "03",
      title: "Generate & Refine",
      description:
        "Get high-quality results instantly. Use context memory to maintain consistency across projects.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: premiumEasing }}
          >
            How it works?
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-serif text-zinc-500 max-w-2xl mx-auto px-4"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: premiumEasing, delay: 0.1 }}
          >
            Three steps to professional AI imagery.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={scaleIn}
              transition={{
                duration: 0.7,
                ease: premiumEasing,
                delay: 0.2 + index * 0.1,
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3, ease: premiumEasing },
              }}
            >
              <GlassCard>
                <div className="p-6 sm:p-8">
                  {/* Step Number */}
                  <motion.div
                    className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 mb-4 sm:mb-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={
                      isInView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0.8, opacity: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      ease: premiumEasing,
                      delay: 0.3 + index * 0.1,
                    }}
                  >
                    <span className="text-xl sm:text-2xl font-bold text-orange-300">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Step Title */}
                  <motion.h3
                    className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={fadeInUp}
                    transition={{
                      duration: 0.6,
                      ease: premiumEasing,
                      delay: 0.4 + index * 0.1,
                    }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Step Description */}
                  <motion.p
                    className="text-sm sm:text-base text-zinc-400 leading-relaxed"
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={fadeInUp}
                    transition={{
                      duration: 0.6,
                      ease: premiumEasing,
                      delay: 0.5 + index * 0.1,
                    }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

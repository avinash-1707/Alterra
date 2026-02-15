"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
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

export default function ContextMemory() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/30"
    >
      {/* Background Aurora */}
      <GradientBlob
        className="top-0 right-1/4 w-35 h-35 sm:w-43.75 sm:h-43.75 lg:w-50 lg:h-50"
        colors="from-indigo-500/20 via-purple-500/15 to-transparent"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: premiumEasing }}
          >
            Keep your creations
            <br />
            <motion.span
              className="text-4xl sm:text-5xl font-bebas md:text-6xl lg:text-7xl text-zinc-400 inline-block"
              variants={fadeInUp}
              transition={{ duration: 0.7, ease: premiumEasing, delay: 0.1 }}
            >
              CONSISTENT.
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-zinc-500 max-w-2xl mx-auto px-4"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: premiumEasing, delay: 0.2 }}
          >
            Upload images as reusable context. Maintain character consistency
            across unlimited generations.
          </motion.p>
        </div>

        {/* Context Demo */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={scaleIn}
          transition={{ duration: 0.8, ease: premiumEasing, delay: 0.3 }}
        >
          <GlassCard>
            <div className="p-6 sm:p-8">
              {/* Upload Zone */}
              <motion.div
                className="mb-6 sm:mb-8"
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: premiumEasing, delay: 0.4 }}
              >
                <div className="inline-block px-3 sm:px-4 py-1.5 bg-zinc-800/50 rounded-full text-xs uppercase tracking-wider text-zinc-400 mb-3 sm:mb-4">
                  Saved Context
                </div>
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
                  {["angle-1.png", "angle-2.png"].map((imageName, i) => (
                    <motion.div
                      key={imageName}
                      className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden"
                      initial="initial"
                      animate={isInView ? "animate" : "initial"}
                      variants={scaleIn}
                      transition={{
                        duration: 0.6,
                        ease: premiumEasing,
                        delay: 0.5 + i * 0.1,
                      }}
                    >
                      <Image
                        src={`/images/context/${imageName}`}
                        alt={`Context angle ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-zinc-900/30 border-2 border-dashed border-zinc-700 rounded-xl flex items-center justify-center hover:border-zinc-600 transition-colors cursor-pointer"
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    variants={scaleIn}
                    transition={{
                      duration: 0.6,
                      ease: premiumEasing,
                      delay: 0.7,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-zinc-600 text-xl sm:text-2xl">+</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Generated Variations */}
              <motion.div
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={fadeInUp}
                transition={{ duration: 0.6, ease: premiumEasing, delay: 0.5 }}
              >
                <div className="inline-block px-3 sm:px-4 py-1.5 bg-linear-to-r from-orange-500/20 to-pink-500/20 rounded-full text-xs uppercase tracking-wider text-orange-300 mb-3 sm:mb-4">
                  Consistent Generations
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { scene: "Beach", src: "/images/context/beach.png" },
                    { scene: "Forest", src: "/images/context/forest.png" },
                    { scene: "City", src: "/images/context/city.png" },
                    { scene: "Studio", src: "/images/context/studio.png" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.scene}
                      className="relative group"
                      initial="initial"
                      animate={isInView ? "animate" : "initial"}
                      variants={scaleIn}
                      transition={{
                        duration: 0.7,
                        ease: premiumEasing,
                        delay: 0.6 + i * 0.1,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="relative aspect-square bg-linear-to-br from-zinc-900/80 to-zinc-950/80 rounded-xl border border-zinc-800/50 overflow-hidden">
                        <Image
                          src={item.src}
                          alt={`${item.scene} scene`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end p-2 sm:p-3">
                        <span className="text-xs text-white font-medium">
                          {item.scene} scene
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

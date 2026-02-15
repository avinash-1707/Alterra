"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

// Creative entrance animation for gallery items
const galleryItemVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    filter: "blur(10px)",
    rotateX: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
  },
};

const getAspectClass = (size: string) => {
  switch (size) {
    case "large":
      return "aspect-[4/5]";
    case "medium":
      return "aspect-[3/4]";
    default:
      return "aspect-square";
  }
};

export default function ExampleGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
  });

  const isGalleryInView = useInView(galleryRef, {
    once: true,
    amount: 0.1,
  });

  const examples = [
    {
      title: "Portrait",
      category: "Character",
      size: "large",
      src: "/images/examples/portrait.png",
    },
    {
      title: "Landscape",
      category: "Nature",
      size: "medium",
      src: "/images/examples/landscape.png",
    },
    {
      title: "Architecture",
      category: "Urban",
      size: "small",
      src: "/images/examples/architecture.png",
    },
    {
      title: "Abstract",
      category: "Art",
      size: "medium",
      src: "/images/examples/abstract.png",
    },
    {
      title: "Product",
      category: "Commercial",
      size: "small",
      src: "/images/examples/product.png",
    },
    {
      title: "Fantasy",
      category: "Concept",
      size: "large",
      src: "/images/examples/fantasy.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zinc-950/30"
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
            Crafted by Alterra
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-serif text-zinc-500 max-w-2xl mx-auto px-4"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: premiumEasing, delay: 0.1 }}
          >
            From simple prompts to stunning visuals.
          </motion.p>
        </div>

        {/* Masonry Gallery Grid */}
        <div
          ref={galleryRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
        >
          {examples.map((example, index) => (
            <motion.div
              key={index}
              className="group relative break-inside-avoid mb-4 sm:mb-6"
              initial="initial"
              animate={isGalleryInView ? "animate" : "initial"}
              variants={galleryItemVariants}
              transition={{
                duration: 0.8,
                ease: premiumEasing,
                delay: 0.1 + index * 0.08, // Staggered cascade
              }}
              whileHover={{
                scale: 1.02,
                y: -8,
                transition: { duration: 0.4, ease: premiumEasing },
              }}
            >
              <div
                className={`relative ${getAspectClass(example.size)} bg-zinc-900/50 rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer`}
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={isGalleryInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{
                    duration: 0.8,
                    ease: premiumEasing,
                    delay: 0.1 + index * 0.08,
                  }}
                  className="w-full h-full"
                >
                  <Image
                    src={example.src}
                    alt={example.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                  <span className="text-xs uppercase tracking-wider text-orange-300 mb-1 sm:mb-2">
                    {example.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {example.title}
                  </h3>
                </div>

                {/* Subtle Glow on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

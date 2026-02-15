import Image from "next/image";
import GlassCard from "../common/GlassCard";
import GradientBlob from "../common/GradientBlog";

export default function ContextMemory() {
  return (
    <section className="relative py-32 px-6 bg-zinc-950/30">
      {/* Background Aurora */}
      <GradientBlob
        className="top-0 right-1/4 w-175 h-175"
        colors="from-indigo-500/20 via-purple-500/15 to-transparent"
        blur="blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Keep your creations
            <br />
            <span className="text-5xl font-bebas md:text-7xl text-zinc-400">
              CONSISTENT.
            </span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Upload images as reusable context. Maintain character consistency
            across unlimited generations.
          </p>
        </div>

        {/* Context Demo */}
        <div className="max-w-6xl mx-auto">
          <GlassCard>
            <div className="p-8">
              {/* Upload Zone */}
              <div className="mb-8">
                <div className="inline-block px-4 py-1.5 bg-zinc-800/50 rounded-full text-xs uppercase tracking-wider text-zinc-400 mb-4">
                  Saved Context
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {["angle-1.png", "angle-2.png"].map((imageName, i) => (
                    <div
                      key={imageName}
                      className="relative shrink-0 w-32 h-32 bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden"
                    >
                      <Image
                        src={`/images/context/${imageName}`}
                        alt={`Context angle ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="shrink-0 w-32 h-32 bg-zinc-900/30 border-2 border-dashed border-zinc-700 rounded-xl flex items-center justify-center hover:border-zinc-600 transition-colors cursor-pointer">
                    <span className="text-zinc-600 text-2xl">+</span>
                  </div>
                </div>
              </div>

              {/* Generated Variations */}
              <div>
                <div className="inline-block px-4 py-1.5 bg-linear-to-r from-orange-500/20 to-pink-500/20 rounded-full text-xs uppercase tracking-wider text-orange-300 mb-4">
                  Consistent Generations
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { scene: "Beach", src: "/images/context/beach.png" },
                    { scene: "Forest", src: "/images/context/forest.png" },
                    { scene: "City", src: "/images/context/city.png" },
                    { scene: "Studio", src: "/images/context/studio.png" },
                  ].map((item) => (
                    <div key={item.scene} className="relative group">
                      <div className="relative aspect-square bg-linear-to-br from-zinc-900/80 to-zinc-950/80 rounded-xl border border-zinc-800/50 overflow-hidden">
                        <Image
                          src={item.src}
                          alt={`${item.scene} scene`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end p-3">
                        <span className="text-xs text-white font-medium">
                          {item.scene} scene
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

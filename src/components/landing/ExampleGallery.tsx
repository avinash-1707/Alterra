const getAspectClass = (size: string) => {
  switch (size) {
    case "large":
      return "aspect-4/5";
    case "medium":
      return "aspect-3/4";
    default:
      return "aspect-square";
  }
};

export default function ExampleGallery() {
  const examples = [
    { title: "Portrait", category: "Character", size: "large" },
    { title: "Landscape", category: "Nature", size: "medium" },
    { title: "Architecture", category: "Urban", size: "small" },
    { title: "Abstract", category: "Art", size: "medium" },
    { title: "Product", category: "Commercial", size: "small" },
    { title: "Fantasy", category: "Concept", size: "large" },
  ];

  return (
    <section className="relative py-32 px-6 bg-zinc-950/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Crafted by Alterra
          </h2>
          <p className="text-3xl font-serif text-zinc-500 max-w-2xl mx-auto">
            From simple prompts to stunning visuals.
          </p>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {examples.map((example, index) => (
            <div key={index} className="group relative break-inside-avoid mb-6">
              <div
                className={`relative ${getAspectClass(example.size)} bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 cursor-pointer`}
              >
                {/* Placeholder */}
                <div className="w-full h-full bg-linear-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                  <span className="text-zinc-700 text-sm">{example.title}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs uppercase tracking-wider text-orange-300 mb-2">
                    {example.category}
                  </span>
                  <h3 className="text-xl font-bold">{example.title}</h3>
                </div>

                {/* Subtle Glow on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/0 to-purple-500/0 group-hover:from-orange-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

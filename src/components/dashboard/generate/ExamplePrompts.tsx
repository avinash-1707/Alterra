interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const EXAMPLES = [
  {
    label: "Cinematic Portrait",
    prompt:
      "A close-up cinematic portrait of a woman in golden hour light, shallow depth of field, film grain, shot on 35mm",
    icon: "🎬",
  },
  {
    label: "Futuristic City",
    prompt:
      "A rain-soaked futuristic megacity at night, neon reflections, flying vehicles, ultra-detailed, cyberpunk aesthetic",
    icon: "🌆",
  },
  {
    label: "Product Mockup",
    prompt:
      "Minimalist perfume bottle floating on white background, studio lighting, luxury brand aesthetic, photorealistic",
    icon: "✦",
  },
  {
    label: "Cosmic Abstract",
    prompt:
      "Abstract cosmic nebula in deep space, swirling gas clouds, vivid purples and blues, award-winning digital art",
    icon: "🌌",
  },
  {
    label: "Architecture",
    prompt:
      "A stunning brutalist concrete building photographed at dusk, dramatic shadows, award-winning architecture photography",
    icon: "🏛",
  },
  {
    label: "Character Design",
    prompt:
      "Full-body concept art of an ethereal warrior princess wearing crystal armor, hand-painted digital illustration",
    icon: "⚔",
  },
];

export default function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-widest text-zinc-600 text-center">
        Try an example
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {EXAMPLES.map((example) => (
          <button
            key={example.label}
            onClick={() => onSelect(example.prompt)}
            className="group text-left p-4 rounded-2xl bg-zinc-950/30 border border-zinc-800/40
              hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg leading-none">{example.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                {example.label}
              </span>
            </div>
            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed group-hover:text-zinc-400 transition-colors">
              {example.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

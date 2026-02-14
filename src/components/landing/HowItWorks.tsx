import GlassCard from "./GlassCard";

export default function HowItWorks() {
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
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            How it works?
          </h2>
          <p className="text-2xl font-serif text-zinc-500 max-w-2xl mx-auto">
            Three steps to professional AI imagery.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <GlassCard key={index}>
              <div className="p-8">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 mb-6">
                  <span className="text-2xl font-bold text-orange-300">
                    {step.number}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>

                {/* Step Description */}
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

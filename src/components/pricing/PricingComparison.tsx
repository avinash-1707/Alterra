import GlassCard from "../landing/GlassCard";

export default function PricingComparison() {
  const features = [
    {
      category: "Generation Limits",
      items: [
        {
          name: "Monthly generations",
          free: "50",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Queue priority",
          free: "Standard",
          pro: "High",
          enterprise: "Highest",
        },
        {
          name: "Generation speed",
          free: "Standard",
          pro: "Fast",
          enterprise: "Fastest",
        },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Prompt enhancement", free: true, pro: true, enterprise: true },
        {
          name: "Context memory",
          free: "3 saved",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Resolution",
          free: "1024x1024",
          pro: "2048x2048",
          enterprise: "Custom",
        },
        { name: "Image variations", free: false, pro: true, enterprise: true },
        { name: "Batch generation", free: false, pro: true, enterprise: true },
      ],
    },
    {
      category: "Advanced",
      items: [
        { name: "API access", free: false, pro: true, enterprise: true },
        {
          name: "Commercial license",
          free: false,
          pro: true,
          enterprise: true,
        },
        {
          name: "Custom model training",
          free: false,
          pro: false,
          enterprise: true,
        },
        {
          name: "Team collaboration",
          free: false,
          pro: false,
          enterprise: true,
        },
        { name: "SSO / SAML", free: false, pro: false, enterprise: true },
      ],
    },
    {
      category: "Support",
      items: [
        {
          name: "Support type",
          free: "Community",
          pro: "Priority email",
          enterprise: "Dedicated",
        },
        {
          name: "Response time",
          free: "Best effort",
          pro: "24 hours",
          enterprise: "4 hours",
        },
        { name: "SLA guarantee", free: false, pro: false, enterprise: true },
      ],
    },
  ];

  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <svg
          className="w-5 h-5 text-orange-400 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-zinc-700 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
    return <span className="text-sm text-zinc-300">{value}</span>;
  };

  return (
    <section className="relative py-20 px-6 bg-zinc-950/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Compare plans</h2>
          <p className="text-lg text-zinc-500">
            Detailed feature comparison across all tiers
          </p>
        </div>

        {/* Comparison Table */}
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Feature
                  </th>
                  <th className="text-center p-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Free
                  </th>
                  <th className="text-center p-6 text-sm font-semibold uppercase tracking-wider text-orange-400">
                    Pro
                  </th>
                  <th className="text-center p-6 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, catIndex) => (
                  <>
                    <tr key={`cat-${catIndex}`} className="bg-zinc-900/30">
                      <td
                        colSpan={4}
                        className="p-4 text-sm font-semibold text-white uppercase tracking-wider"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr
                        key={`item-${catIndex}-${itemIndex}`}
                        className="border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors"
                      >
                        <td className="p-4 text-sm text-zinc-300">
                          {item.name}
                        </td>
                        <td className="p-4 text-center">
                          {renderValue(item.free)}
                        </td>
                        <td className="p-4 text-center bg-zinc-900/20">
                          {renderValue(item.pro)}
                        </td>
                        <td className="p-4 text-center">
                          {renderValue(item.enterprise)}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

import { Fragment } from "react";
import GlassCard from "../common/GlassCard";

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
    <section className="relative bg-zinc-950/30 px-4 py-14 sm:px-6 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="mb-3 text-3xl font-bold sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">Compare plans</h2>
          <p className="text-base text-zinc-500 sm:text-lg">
            Detailed feature comparison across all tiers
          </p>
        </div>

        {/* Comparison Table */}
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="p-4 text-left text-xs font-semibold tracking-wider text-zinc-400 uppercase sm:p-6 sm:text-sm">
                    Feature
                  </th>
                  <th className="p-4 text-center text-xs font-semibold tracking-wider text-zinc-400 uppercase sm:p-6 sm:text-sm">
                    Free
                  </th>
                  <th className="p-4 text-center text-xs font-semibold tracking-wider text-orange-400 uppercase sm:p-6 sm:text-sm">
                    Pro
                  </th>
                  <th className="p-4 text-center text-xs font-semibold tracking-wider text-zinc-400 uppercase sm:p-6 sm:text-sm">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, catIndex) => (
                  <Fragment key={`cat-${catIndex}`}>
                    <tr className="bg-zinc-900/30">
                      <td
                        colSpan={4}
                        className="p-3 text-xs font-semibold tracking-wider text-white uppercase sm:p-4 sm:text-sm"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr
                        key={`item-${catIndex}-${itemIndex}`}
                        className="border-b border-zinc-900/50 transition-colors hover:bg-zinc-900/20"
                      >
                        <td className="p-3 text-xs text-zinc-300 sm:p-4 sm:text-sm">
                          {item.name}
                        </td>
                        <td className="p-3 text-center sm:p-4">
                          {renderValue(item.free)}
                        </td>
                        <td className="bg-zinc-900/20 p-3 text-center sm:p-4">
                          {renderValue(item.pro)}
                        </td>
                        <td className="p-3 text-center sm:p-4">
                          {renderValue(item.enterprise)}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

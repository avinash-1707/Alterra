"use client";

import { useState } from "react";
import GlassCard from "../common/GlassCard";
import LandingButton from "../landing/LandingButton";
import { Switch } from "../ui/switch";

type BillingCycle = "monthly" | "annual";

export default function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const plans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      annualPrice: "$0",
      monthlyPeriod: "forever",
      annualPeriod: "forever",
      description: "Perfect for trying out Alterra",
      features: [
        "50 generations per month",
        "Basic prompt enhancement",
        "Standard resolution",
        "Community support",
        "3 saved contexts",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Pro",
      monthlyPrice: "$29",
      annualPrice: "$23",
      monthlyPeriod: "per month",
      annualPeriod: "per month, billed annually",
      description: "For serious creators",
      features: [
        "Unlimited generations",
        "Advanced prompt AI",
        "High resolution exports",
        "Priority support",
        "Unlimited saved contexts",
        "Commercial license",
        "API access",
      ],
      cta: "Start Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      monthlyPeriod: "contact us",
      annualPeriod: "contact us",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Custom model training",
        "Dedicated support",
        "SLA guarantee",
        "Team collaboration",
        "Advanced security",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="relative pb-20 pt-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span
            className={
              billingCycle === "monthly" ? "text-white" : "text-zinc-500"
            }
          >
            Monthly
          </span>
          <Switch
            aria-label="Toggle billing cycle"
            checked={billingCycle === "annual"}
            onCheckedChange={(checked) =>
              setBillingCycle(checked ? "annual" : "monthly")
            }
            className="h-10 w-20 border-zinc-700 data-[state=unchecked]:bg-zinc-800 data-[state=checked]:bg-linear-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-pink-500"
          />
          <span
            className={
              billingCycle === "annual"
                ? "text-white font-medium"
                : "text-zinc-500"
            }
          >
            Annual
          </span>
          <span className="px-3 py-1 bg-linear-to-r from-orange-500/20 to-pink-500/20 text-orange-300 text-xs rounded-full font-medium border border-orange-500/30">
            Save 20%
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const price =
              billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
            const period =
              billingCycle === "annual"
                ? plan.annualPeriod
                : plan.monthlyPeriod;

            return (
              <div key={index} className="relative">
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-1.5 bg-linear-to-r from-orange-500 to-pink-500 rounded-full text-xs font-medium uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <GlassCard glow={plan.popular} className="h-full">
                  <div className="p-8 flex flex-col h-full">
                    {/* Plan Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-sm text-zinc-500">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">{price}</span>
                        {period !== "contact us" && period !== "forever" && (
                          <span className="text-zinc-500">/mo</span>
                        )}
                      </div>
                      {(period === "contact us" || period === "forever") && (
                        <span className="text-sm text-zinc-500">{period}</span>
                      )}
                      {billingCycle === "annual" && plan.name === "Pro" && (
                        <span className="mt-2 block text-xs text-orange-300">
                          Billed annually
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8 grow">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-orange-400 shrink-0 mt-0.5"
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
                          <span className="text-zinc-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <LandingButton
                      variant={plan.popular ? "primary" : "secondary"}
                      size="lg"
                    >
                      {plan.cta}
                    </LandingButton>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

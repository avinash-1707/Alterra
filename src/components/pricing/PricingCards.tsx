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
    <section className="relative px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:mb-10 sm:gap-4">
          <span
            className={`text-sm sm:text-base ${
              billingCycle === "monthly" ? "text-white" : "text-zinc-500"
            }`}
          >
            Monthly
          </span>
          <Switch
            aria-label="Toggle billing cycle"
            checked={billingCycle === "annual"}
            onCheckedChange={(checked) =>
              setBillingCycle(checked ? "annual" : "monthly")
            }
            className="h-9 w-16 border-zinc-700 sm:h-10 sm:w-20 data-[state=unchecked]:bg-zinc-800 data-[state=checked]:bg-linear-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-pink-500"
          />
          <span
            className={`text-sm sm:text-base ${
              billingCycle === "annual"
                ? "text-white font-medium"
                : "text-zinc-500"
            }`}
          >
            Annual
          </span>
          <span className="rounded-full border border-orange-500/30 bg-linear-to-r from-orange-500/20 to-pink-500/20 px-2.5 py-1 text-[11px] font-medium text-orange-300 sm:px-3 sm:text-xs">
            Save 20%
          </span>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
                  <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 sm:-top-4">
                    <span className="rounded-full bg-linear-to-r from-orange-500 to-pink-500 px-3 py-1 text-[10px] font-medium tracking-wider uppercase sm:px-4 sm:py-1.5 sm:text-xs">
                      Most Popular
                    </span>
                  </div>
                )}

                <GlassCard glow={plan.popular} className="h-full">
                  <div className="flex h-full flex-col p-5 sm:p-6 lg:p-8">
                    {/* Plan Header */}
                    <div className="mb-6 sm:mb-8">
                      <h3 className="mb-2 text-xl font-bold sm:text-2xl">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold sm:text-5xl">
                          {price}
                        </span>
                        {period !== "contact us" && period !== "forever" && (
                          <span className="text-sm text-zinc-500 sm:text-base">
                            /mo
                          </span>
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
                    <ul className="mb-6 grow space-y-3 sm:mb-8 sm:space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-orange-400 sm:h-5 sm:w-5"
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
                          <span className="text-sm leading-relaxed text-zinc-300">
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

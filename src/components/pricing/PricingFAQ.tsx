"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import GlassCard from "../common/GlassCard";

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Can I switch plans at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the charges accordingly.",
    },
    {
      question: "What happens when I hit my generation limit?",
      answer:
        "On the Free plan, you'll need to wait until your monthly limit resets or upgrade to Pro for unlimited generations. Pro and Enterprise plans have no limits.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact our support team for a full refund.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for Enterprise plans.",
    },
    {
      question: "Can I use generated images commercially?",
      answer:
        "Pro and Enterprise plans include full commercial licensing. Free plan images are for personal use only.",
    },
    {
      question: "Is there a discount for annual billing?",
      answer:
        "Yes! Annual billing saves you 20% compared to monthly billing on both Pro and Enterprise plans.",
    },
    {
      question: "What's included in custom model training?",
      answer:
        "Enterprise customers can train custom models on their own datasets, creating specialized AI models tailored to their brand and style.",
    },
    {
      question: "How does team collaboration work?",
      answer:
        "Enterprise plans include team workspaces where multiple users can share contexts, collaborate on projects, and manage permissions.",
    },
  ];

  return (
    <section className="relative px-4 py-14 sm:px-6 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="mb-3 text-3xl font-bold sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Frequently Asked
          </h2>
          <p className="text-base text-zinc-500 sm:text-lg">
            Everything you need to know about pricing
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <GlassCard key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-zinc-900/20 sm:gap-4 sm:p-6"
              >
                <span className="text-base font-semibold sm:text-lg">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-5 w-5 shrink-0 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                      <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-10 text-center sm:mt-12">
          <p className="mb-4 text-zinc-500">Still have questions?</p>
          <a
            href="#contact"
            className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            Contact our sales team →
          </a>
        </div>
      </div>
    </section>
  );
}

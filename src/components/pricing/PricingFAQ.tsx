"use client";

import { useState } from "react";
import GlassCard from "../landing/GlassCard";

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
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Frequently Asked
          </h2>
          <p className="text-lg text-zinc-500">
            Everything you need to know about pricing
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <GlassCard key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/20 transition-colors"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
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
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 mb-4">Still have questions?</p>
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

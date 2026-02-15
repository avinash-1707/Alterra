"use client";

import { useState } from "react";
import LandingButton from "../landing/LandingButton";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Gallery", href: "#gallery" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Glass Container */}
        <div className="relative bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 rounded-full px-6 py-3 pl-8 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/alterra-logo.png"
                alt="Alterra Logo"
                width={36}
                height={24}
                className="invert"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#login"
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 px-4"
              >
                Sign In
              </a>
              <LandingButton variant="primary" size="md">
                Get Started
              </LandingButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-zinc-800/50">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800/50">
                  <Link
                    href="#login"
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <LandingButton variant="primary" size="md">
                    Get Started
                  </LandingButton>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 to-purple-500/5 rounded-full blur-xl -z-10 pointer-events-none" />
      </div>
    </nav>
  );
}

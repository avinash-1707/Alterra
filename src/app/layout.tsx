import type { Metadata } from "next";
import { Bebas_Neue, Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { View } from "drizzle-orm";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alterra - Create Stunning AI Images With Simple Words",
  description:
    "Generate high-quality AI images from simple prompts. No prompt engineering required. Upload and reuse image context for consistent results.",
  keywords: [
    "alterra",
    "AI images",
    "image generation",
    "AI art",
    "simple prompts",
    "image consistency",
  ],
  icons: {
    icon: "/alterra-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${manrope.variable} ${instrumentSerif.variable} ${bebasNeue.variable}`}
      >
        <body className={`${manrope.className} antialiased`}>
          <Toaster />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}

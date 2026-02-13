import Hero from "@/components/landing/Hero";
import SmartPromptExpansion from "@/components/landing/SmartPromptExpansion";
import ImageContextMemory from "@/components/landing/ImageContextMemory";
import HowItWorks from "@/components/landing/HowItWorks";
import ExampleGallery from "@/components/landing/ExampleGallery";
import FinalCTA from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-warmWhite">
      <Hero />
      <SmartPromptExpansion />
      <ImageContextMemory />
      <HowItWorks />
      <ExampleGallery />
      <FinalCTA />
    </main>
  );
}

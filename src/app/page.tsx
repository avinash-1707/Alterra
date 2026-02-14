import ContextMemory from "@/components/landing/ContextMemory";
import ExampleGallery from "@/components/landing/ExampleGallery";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/layout/Navbar";
import SmartPromptExpansion from "@/components/landing/SmartPromptExpansion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <SmartPromptExpansion />
      <ContextMemory />
      <HowItWorks />
      <ExampleGallery />
      <FinalCTA />
      <Footer />
    </main>
  );
}

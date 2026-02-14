import PricingHero from "@/components/pricing/PricingHero";
import PricingCards from "@/components/pricing/PricingCards";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingComparison from "@/components/pricing/PricingComparison";
import PricingCTA from "@/components/pricing/PricingCTA";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <PricingHero />
      <PricingCards />
      <PricingComparison />
      <PricingFAQ />
      <PricingCTA />
      <Footer />
    </main>
  );
}

import { Cta } from "@/components/Cta";
import { FeatureSection } from "@/components/FeatureSection";
import { FooterSection } from "@/components/FooterSection";
import { HeroSection } from "@/components/HeroSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <HeroSection />
      <FeatureSection />
      <Cta />
      <FooterSection />
    </main>
  );
}

import { DecisionsSection } from "@/features/landing/components/sections/DecisionsSection";
import { HeroSection } from "@/features/landing/components/sections/HeroSection";
import { IntegrationSection } from "@/features/landing/components/sections/IntegrationSection";
import { RiskSection } from "@/features/landing/components/sections/RiskSection";

export default function Home() {
  return (
    <div className="relative bg-surface">
      <HeroSection />
      <IntegrationSection />
      <RiskSection />
      <DecisionsSection />
    </div>
  );
}

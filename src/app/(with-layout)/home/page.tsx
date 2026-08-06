import { CtaSection } from "@/features/landing/components/sections/CtaSection";
import { DecisionsSection } from "@/features/landing/components/sections/DecisionsSection";
import { DemoSection } from "@/features/landing/components/sections/DemoSection";
import { FeaturesSection } from "@/features/landing/components/sections/FeaturesSection";
import { FlowSection } from "@/features/landing/components/sections/FlowSection";
import { HeroSection } from "@/features/landing/components/sections/HeroSection";
import { IntegrationSection } from "@/features/landing/components/sections/IntegrationSection";
import { RiskSection } from "@/features/landing/components/sections/RiskSection";
import { RoadmapSection } from "@/features/landing/components/sections/RoadmapSection";
import { ScenariosSection } from "@/features/landing/components/sections/ScenariosSection";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-surface">
      {/* Ambient aura layer — keeps the deep background from reading flat */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[8%] h-160 w-160 rounded-full bg-[radial-gradient(circle,rgba(92,0,225,0.20)_0%,transparent_70%)]" />
        <div className="absolute right-[-12%] top-[24%] h-180 w-180 rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.16)_0%,transparent_70%)]" />
        <div className="absolute left-[-6%] top-[42%] h-150 w-150 rounded-full bg-[radial-gradient(circle,rgba(125,51,231,0.15)_0%,transparent_70%)]" />
        <div className="absolute right-[2%] top-[58%] h-140 w-140 rounded-full bg-[radial-gradient(circle,rgba(146,84,235,0.14)_0%,transparent_70%)]" />
        <div className="absolute left-[-8%] top-[74%] h-155 w-155 rounded-full bg-[radial-gradient(circle,rgba(92,0,225,0.16)_0%,transparent_70%)]" />
        <div className="absolute right-[-6%] top-[90%] h-140 w-140 rounded-full bg-[radial-gradient(circle,rgba(146,84,235,0.14)_0%,transparent_70%)]" />
      </div>

      <div className="relative">
        <HeroSection />
        <IntegrationSection />
        <RiskSection />
        <DecisionsSection />
        <DemoSection />
        <FeaturesSection />
        <FlowSection />
        <ScenariosSection />
        <RoadmapSection />
        <CtaSection />
      </div>
    </div>
  );
}

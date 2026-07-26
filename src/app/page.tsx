import { DecisionsSection } from "@/features/landing/components/sections/DecisionsSection";
import { HeroSection } from "@/features/landing/components/sections/HeroSection";
import { IntegrationSection } from "@/features/landing/components/sections/IntegrationSection";
import { RiskSection } from "@/features/landing/components/sections/RiskSection";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[18%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(92,0,225,0.20)_0%,transparent_70%)]" />
        <div className="absolute right-[-12%] top-[42%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(129,51,241,0.16)_0%,transparent_70%)]" />
        <div className="absolute left-[-6%] top-[70%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(125,51,231,0.15)_0%,transparent_70%)]" />
        <div className="absolute right-[4%] top-[88%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(146,84,235,0.14)_0%,transparent_70%)]" />
      </div>

      <div className="relative">
        <HeroSection />
        <IntegrationSection />
        <RiskSection />
        <DecisionsSection />
      </div>
    </div>
  );
}

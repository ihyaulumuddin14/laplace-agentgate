import Image from "next/image";
import logo from "@/assets/logo.png";

type BrandWordmarkProps = {
  logoSize?: number;
  textClassName?: string;
  className?: string;
};

export function BrandWordmark({
  logoSize = 32,
  textClassName = "text-xl",
  className = "",
}: BrandWordmarkProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={logo}
        alt="AgentGate logo"
        width={logoSize}
        height={logoSize}
        priority
        className="shrink-0"
        style={{ width: logoSize, height: "auto" }}
      />
      <span
        className={`brand-gradient-text font-poppins font-bold tracking-tight ${textClassName}`}
      >
        AgentGate
      </span>
    </span>
  );
}

import type { IconType } from "react-icons";
import { BsOpenai } from "react-icons/bs";
import { LiaTelegram } from "react-icons/lia";
import { MdOutlineCalendarMonth, MdOutlineMail } from "react-icons/md";
import { PiCodesandboxLogoLight } from "react-icons/pi";
import { SiAsana } from "react-icons/si";
import { TbSparkles2 } from "react-icons/tb";
import { VscClaude } from "react-icons/vsc";
import {
  OrbitCanvas,
  type OrbitRing,
  type OrbitTraveller,
} from "@/features/landing/components/misc/OrbitCanvas";
import { Reveal } from "@/shared/components/ui/Reveal";

const ORBIT_ICONS: IconType[] = [
  LiaTelegram,
  VscClaude,
  PiCodesandboxLogoLight,
  BsOpenai,
  TbSparkles2,
  MdOutlineMail,
  MdOutlineCalendarMonth,
  SiAsana,
];

const DECISION_LABELS = [
  "allow",
  "ask_user",
  "sanitize",
  "need_approval",
  "block",
];

function IconChip({ Icon, size }: { Icon: IconType; size: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center border border-white/15 bg-white/[0.07] text-white shadow-[0_6px_24px_-8px_rgba(129,51,241,0.7)] backdrop-blur-md"
      style={{ width: size, height: size, borderRadius: size * 0.32 }}
    >
      <Icon size={Math.round(size * 0.46)} />
    </div>
  );
}

function LabelChip({ label, fontSize }: { label: string; fontSize: number }) {
  return (
    <span
      className="whitespace-nowrap rounded-full border border-white/20 bg-white/12 font-poppins font-light text-white backdrop-blur-md"
      style={{
        fontSize,
        lineHeight: 1.6,
        padding: `${fontSize * 0.4}px ${fontSize * 1.2}px`,
      }}
    >
      {label}
    </span>
  );
}

function Core({
  fontSize,
  paddingX,
  paddingY,
}: {
  fontSize: number;
  paddingX: number;
  paddingY: number;
}) {
  return (
    <div
      className="rounded-full border border-white/25 bg-white/8 shadow-[0_20px_70px_-20px_rgba(146,84,235,0.95)] backdrop-blur-md"
      style={{ padding: `${paddingY}px ${paddingX}px` }}
    >
      <span
        className="font-poppins font-semibold text-white"
        style={{ fontSize, lineHeight: 1.2 }}
      >
        Integration
      </span>
    </div>
  );
}

type IconRingConfig = { ring: number; icons: IconType[]; from: number };

type TravellerSizing = {
  iconSize: number;
  labelFontSize: number;
  labelBox: { w: number; h: number };
};

function buildTravellers(
  iconRings: IconRingConfig[],
  labelRing: number,
  { iconSize, labelFontSize, labelBox }: TravellerSizing,
): OrbitTraveller[] {
  const iconTravellers = iconRings.flatMap(({ ring, icons, from }) =>
    icons.map((Icon, index) => ({
      id: `icon-${ring}-${index}`,
      ring,
      offset: (((from + index / icons.length) % 1) + 1) % 1,
      w: iconSize + 12,
      h: iconSize + 12,
      node: <IconChip Icon={Icon} size={iconSize} />,
    })),
  );

  const labelTravellers = DECISION_LABELS.map((label, index) => ({
    id: `label-${label}`,
    ring: labelRing,
    offset: index / DECISION_LABELS.length,
    w: labelBox.w,
    h: labelBox.h,
    node: <LabelChip label={label} fontSize={labelFontSize} />,
  }));

  return [...iconTravellers, ...labelTravellers];
}

const DESKTOP_RINGS: OrbitRing[] = [
  { w: 1120, h: 676, r: 112, duration: 92 }, // border 1 — icons
  { w: 940, h: 562, r: 96, duration: 78 }, // border 2 — icons
  { w: 760, h: 448, r: 82, duration: 64 }, // border 3 — icons
  { w: 580, h: 334, r: 68, duration: 52 }, // border 4 — icons
  { w: 468, h: 276, r: 60, duration: 44 }, // border 5 — empty
  { w: 372, h: 224, r: 54, duration: 36 }, // border 6 — labels (clears core)
];

const MOBILE_RINGS: OrbitRing[] = [
  { w: 372, h: 370, r: 28, duration: 92 },
  { w: 328, h: 322, r: 26, duration: 78 },
  { w: 282, h: 272, r: 24, duration: 64 },
  { w: 232, h: 226, r: 22, duration: 52 },
  { w: 186, h: 170, r: 20, duration: 44 },
  { w: 142, h: 114, r: 18, duration: 36 },
];

const ICON_RINGS: IconRingConfig[] = [
  { ring: 0, icons: ORBIT_ICONS.slice(0, 2), from: 0 },
  { ring: 1, icons: ORBIT_ICONS.slice(2, 4), from: 0.12 },
  { ring: 2, icons: ORBIT_ICONS.slice(4, 6), from: 0.24 },
  { ring: 3, icons: ORBIT_ICONS.slice(6, 8), from: 0.36 },
];

export function IntegrationSection() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-8 lg:py-20">
      <Reveal className="relative mx-auto max-w-[1680px]">
        <OrbitCanvas
          className="hidden sm:block"
          width={1200}
          height={744}
          rings={DESKTOP_RINGS}
          travellers={buildTravellers(ICON_RINGS, 5, {
            iconSize: 50,
            labelFontSize: 10,
            labelBox: { w: 116, h: 38 },
          })}
          center={<Core fontSize={24} paddingX={36} paddingY={19} />}
          centerW={196}
          centerH={84}
        />

        <OrbitCanvas
          className="sm:hidden"
          width={400}
          height={400}
          rings={MOBILE_RINGS}
          travellers={buildTravellers(ICON_RINGS, 5, {
            iconSize: 26,
            labelFontSize: 6,
            labelBox: { w: 60, h: 16 },
          })}
          center={<Core fontSize={12} paddingX={20} paddingY={8} />}
          centerW={104}
          centerH={36}
        />
      </Reveal>
    </section>
  );
}

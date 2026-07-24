import type { IconType } from "react-icons";
import {
  MdOutlineAutoAwesome,
  MdOutlineCalendarMonth,
  MdOutlineGridView,
  MdOutlineMail,
  MdOutlineSend,
  MdOutlineSettings,
  MdOutlineShare,
  MdOutlineTune,
} from "react-icons/md";
import {
  OrbitCanvas,
  type OrbitRing,
  type OrbitTraveller,
} from "@/features/landing/components/misc/OrbitCanvas";

const ORBIT_ICONS: IconType[] = [
  MdOutlineSend,
  MdOutlineMail,
  MdOutlineCalendarMonth,
  MdOutlineSettings,
  MdOutlineAutoAwesome,
  MdOutlineGridView,
  MdOutlineShare,
  MdOutlineTune,
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
      className="grid shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/[0.07] text-purple-100 shadow-[0_6px_24px_-8px_rgba(129,51,241,0.7)]"
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.46)} />
    </div>
  );
}

function LabelChip({ label, fontSize }: { label: string; fontSize: number }) {
  return (
    <span
      className="whitespace-nowrap rounded-full border border-white/20 bg-white/[0.12] px-3 py-1 font-poppins font-medium text-white"
      style={{ fontSize, lineHeight: 1.6 }}
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
      className="rounded-2xl border border-white/20 bg-white/[0.10] shadow-[0_10px_50px_-12px_rgba(146,84,235,0.95)]"
      style={{ padding: `${paddingY}px ${paddingX}px` }}
    >
      <span
        className="font-poppins font-semibold text-white"
        style={{ fontSize, lineHeight: 1.3 }}
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
  { w: 960, h: 580, r: 92, duration: 72 },
  { w: 780, h: 460, r: 78, duration: 58 },
  { w: 600, h: 340, r: 62, duration: 48 },
  { w: 430, h: 212, r: 46, duration: 38 },
];

const MOBILE_RINGS: OrbitRing[] = [
  { w: 364, h: 556, r: 80, duration: 62 },
  { w: 296, h: 444, r: 68, duration: 52 },
  { w: 236, h: 340, r: 56, duration: 44 },
  { w: 200, h: 220, r: 46, duration: 34 },
];

export function IntegrationSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-4 pb-16 sm:px-8 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[min(900px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(92,0,225,0.28)_0%,transparent_68%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Desktop / tablet */}
        <OrbitCanvas
          className="hidden sm:block"
          width={1000}
          height={620}
          rings={DESKTOP_RINGS}
          travellers={buildTravellers(
            [
              { ring: 0, icons: ORBIT_ICONS.slice(0, 4), from: 0 },
              { ring: 1, icons: ORBIT_ICONS.slice(4, 8), from: 0.12 },
            ],
            3,
            {
              iconSize: 56,
              labelFontSize: 15,
              labelBox: { w: 190, h: 46 },
            },
          )}
          center={<Core fontSize={28} paddingX={34} paddingY={16} />}
          centerW={320}
          centerH={96}
        />

        {/* Mobile */}
        <OrbitCanvas
          className="sm:hidden"
          width={380}
          height={580}
          rings={MOBILE_RINGS}
          travellers={buildTravellers(
            [
              { ring: 0, icons: ORBIT_ICONS.slice(0, 4), from: 0 },
              { ring: 1, icons: ORBIT_ICONS.slice(4, 6), from: 0.2 },
            ],
            3,
            {
              iconSize: 38,
              labelFontSize: 11,
              labelBox: { w: 140, h: 34 },
            },
          )}
          center={<Core fontSize={18} paddingX={20} paddingY={10} />}
          centerW={210}
          centerH={62}
        />
      </div>
    </section>
  );
}

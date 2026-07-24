import type { CSSProperties, ReactNode } from "react";

export type OrbitRing = {
  w: number;
  h: number;
  r: number;
  duration: number;
};

export type OrbitTraveller = {
  id: string;
  ring: number;
  offset: number;
  w: number;
  h: number;
  node: ReactNode;
};

type OrbitCanvasProps = {
  width: number;
  height: number;
  rings: OrbitRing[];
  travellers: OrbitTraveller[];
  center: ReactNode;
  centerW: number;
  centerH: number;
  className?: string;
};

function roundedRectPath(
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number,
) {
  const x = cx - w / 2;
  const y = cy - h / 2;

  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    "Z",
  ].join(" ");
}

const RING_SURFACE = [
  { fill: "rgba(255,255,255,0.012)", stroke: "rgba(255,255,255,0.07)" },
  { fill: "rgba(255,255,255,0.028)", stroke: "rgba(255,255,255,0.10)" },
  { fill: "rgba(255,255,255,0.05)", stroke: "rgba(255,255,255,0.14)" },
  { fill: "rgba(255,255,255,0.075)", stroke: "rgba(255,255,255,0.18)" },
];

export function OrbitCanvas({
  width,
  height,
  rings,
  travellers,
  center,
  centerW,
  centerH,
  className = "",
}: OrbitCanvasProps) {
  const cx = width / 2;
  const cy = height / 2;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-3/5 w-3/5 -translate-x-1/2 -translate-y-1/2 animate-[pulse-glow_6s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(146,84,235,0.5)_0%,rgba(92,0,225,0.16)_45%,transparent_72%)]"
      />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="relative block h-auto w-full overflow-visible"
        role="presentation"
      >
        <title>AgentGate integration orbit</title>

        {/* Concentric orbit tracks */}
        {rings.map((ring, index) => {
          const surface = RING_SURFACE[index] ?? RING_SURFACE.at(-1);

          return (
            <rect
              key={`ring-${ring.w}-${ring.h}`}
              x={cx - ring.w / 2}
              y={cy - ring.h / 2}
              width={ring.w}
              height={ring.h}
              rx={ring.r}
              fill={surface?.fill}
              stroke={surface?.stroke}
              strokeWidth={1.5}
            />
          );
        })}

        {travellers.map((traveller) => {
          const ring = rings[traveller.ring];
          if (!ring) return null;

          const path = roundedRectPath(cx, cy, ring.w, ring.h, ring.r);

          return (
            <g
              key={traveller.id}
              className="orbit-item"
              style={
                {
                  offsetPath: `path("${path}")`,
                  "--orbit-duration": `${ring.duration}s`,
                  "--orbit-delay": `${-ring.duration * traveller.offset}s`,
                  "--orbit-static": `${(1 - traveller.offset) * 100}%`,
                } as CSSProperties
              }
            >
              <foreignObject
                x={-traveller.w / 2}
                y={-traveller.h / 2}
                width={traveller.w}
                height={traveller.h}
                overflow="visible"
              >
                <div className="flex h-full w-full items-center justify-center">
                  {traveller.node}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Core */}
        <foreignObject
          x={cx - centerW / 2}
          y={cy - centerH / 2}
          width={centerW}
          height={centerH}
          overflow="visible"
        >
          <div className="flex h-full w-full items-center justify-center">
            {center}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

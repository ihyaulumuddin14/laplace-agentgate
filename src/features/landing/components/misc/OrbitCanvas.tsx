import type { CSSProperties, ReactNode } from "react";

export type OrbitRing = {
  w: number;
  h: number;
  r: number;
  duration: number;
  draw?: boolean;
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

const EMITTER_SPARKS = [
  { sx: "26px", sy: "-20px", delay: "0s", dur: "1.25s" },
  { sx: "-22px", sy: "18px", delay: "0.55s", dur: "1.5s" },
];

const SPARK_EMITTERS = [0, 0.3, 0.58, 0.85];

const RING_SURFACE = [
  { fill: "rgba(255,255,255,0.014)", stroke: "rgba(255,255,255,0.07)" },
  { fill: "rgba(255,255,255,0.024)", stroke: "rgba(255,255,255,0.095)" },
  { fill: "rgba(255,255,255,0.034)", stroke: "rgba(255,255,255,0.115)" },
  { fill: "rgba(255,255,255,0.046)", stroke: "rgba(255,255,255,0.14)" },
  { fill: "rgba(255,255,255,0.06)", stroke: "rgba(255,255,255,0.165)" },
  { fill: "rgba(255,255,255,0.076)", stroke: "rgba(255,255,255,0.2)" },
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

        {rings.map((ring, index) => {
          if (ring.draw === false) return null;
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
          const motionVars = {
            "--orbit-duration": `${ring.duration}s`,
            "--orbit-delay": `${-ring.duration * traveller.offset}s`,
          } as CSSProperties;

          const perimeter =
            2 * ring.w + 2 * ring.h + ring.r * (2 * Math.PI - 8);
          const glowFraction = Math.min(0.14, 52 / perimeter);
          const travelStyle = {
            ...motionVars,
            offsetPath: `path("${path}")`,
            "--orbit-static": `${(1 - traveller.offset) * 100}%`,
          } as CSSProperties;

          return (
            <g key={traveller.id}>
              {ring.draw !== false && (
                <path
                  className="orbit-glow"
                  d={path}
                  pathLength={1}
                  fill="none"
                  stroke="rgba(200,170,252,0.95)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray={`${glowFraction} ${1 - glowFraction}`}
                  style={motionVars}
                />
              )}

              {ring.draw !== false &&
                SPARK_EMITTERS.map((frac) => (
                  <g
                    key={`spark-${frac}`}
                    className="orbit-item"
                    style={
                      {
                        ...motionVars,
                        offsetPath: `path("${path}")`,
                        "--orbit-delay": `${-ring.duration * traveller.offset + ring.duration * glowFraction * frac}s`,
                      } as CSSProperties
                    }
                  >
                    <foreignObject
                      x={-30}
                      y={-30}
                      width={60}
                      height={60}
                      overflow="visible"
                    >
                      <div className="relative h-full w-full">
                        {EMITTER_SPARKS.map((s) => (
                          <span
                            key={`${s.sx}-${s.sy}`}
                            className="orbit-spark"
                            style={
                              {
                                "--sx": s.sx,
                                "--sy": s.sy,
                                "--spark-delay": s.delay,
                                "--spark-duration": s.dur,
                              } as CSSProperties
                            }
                          />
                        ))}
                      </div>
                    </foreignObject>
                  </g>
                ))}

              <g className="orbit-item" style={travelStyle}>
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

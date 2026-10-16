import type React from "react";

// ---------- Geometry helpers ----------
export type Pt = [number, number];

export const bezier = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, n = 40): Pt[] => {
  const out: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    out.push([
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ]);
  }
  return out;
};

export const polyLen = (pts: Pt[]) =>
  pts.reduce((a, p, i) => (i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

export const along = (pts: Pt[], d: number) => {
  let rest = Math.max(0, d);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (rest <= len) {
      const t = len === 0 ? 0 : rest / len;
      return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, a: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI };
    }
    rest -= len;
  }
  const n = pts.length;
  return {
    x: pts[n - 1][0],
    y: pts[n - 1][1],
    a: (Math.atan2(pts[n - 1][1] - pts[n - 2][1], pts[n - 1][0] - pts[n - 2][0]) * 180) / Math.PI,
  };
};

export const ptsD = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

// Deterministic pseudo-random
export const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ---------- Characters ----------
export type Look = { skin: string; hair: string; shirt: string; hairStyle?: "short" | "long" | "bun" | "cap" };

export const Head: React.FC<{ look: Look; mood?: "happy" | "tired" | "neutral"; tilt?: number }> = ({
  look,
  mood = "neutral",
  tilt = 0,
}) => (
  <g transform={`rotate(${tilt})`}>
    {look.hairStyle === "long" ? <path d="M -30 -10 Q -34 -46 0 -48 Q 34 -46 30 -10 L 34 40 Q 0 30 -34 40 Z" fill={look.hair} /> : null}
    <rect x={-9} y={18} width={18} height={20} fill={look.skin} />
    <ellipse cx={0} cy={0} rx={26} ry={29} fill={look.skin} />
    {look.hairStyle === "bun" ? <circle cx={-6} cy={-38} r={13} fill={look.hair} /> : null}
    {look.hairStyle === "cap" ? (
      <path d="M -28 -8 Q -28 -36 0 -36 Q 28 -36 28 -8 L 44 -6 L 44 -2 L -28 -2 Z" fill={look.hair} />
    ) : (
      <path d="M -27 -4 Q -30 -34 0 -34 Q 30 -34 27 -4 Q 14 -20 -8 -18 Q -20 -14 -27 -4 Z" fill={look.hair} />
    )}
    <circle cx={9} cy={2} r={3} fill="#1d1d2b" />
    {mood === "happy" ? (
      <path d="M 4 12 Q 12 20 20 12" stroke="#1d1d2b" strokeWidth={3} fill="none" strokeLinecap="round" />
    ) : mood === "tired" ? (
      <>
        <path d="M 4 -4 L 14 -2" stroke="#1d1d2b" strokeWidth={3} strokeLinecap="round" />
        <path d="M 6 16 Q 12 12 18 16" stroke="#1d1d2b" strokeWidth={3} fill="none" strokeLinecap="round" />
      </>
    ) : (
      <path d="M 6 14 L 17 14" stroke="#1d1d2b" strokeWidth={3} strokeLinecap="round" />
    )}
    <ellipse cx={-4} cy={6} rx={6} ry={4} fill="#000" opacity={0.08} />
  </g>
);

// Standing / walking person seen from the side, origin at feet
export const Person: React.FC<{
  x: number;
  y: number;
  look: Look;
  s?: number;
  walk?: number; // phase; undefined = standing
  flip?: boolean;
  phone?: boolean;
}> = ({ x, y, look, s = 1, walk, flip, phone }) => {
  const sw = walk === undefined ? 0 : Math.sin(walk) * 22;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={34} ry={6} fill="#000" opacity={0.15} />
      <path d={`M -6 -110 L ${-10 + sw} -4`} stroke="#2b2d42" strokeWidth={20} strokeLinecap="round" />
      <path d={`M 6 -110 L ${10 - sw} -4`} stroke="#3a3d57" strokeWidth={20} strokeLinecap="round" />
      <path d="M -26 -200 Q -30 -230 0 -232 Q 30 -230 26 -200 L 22 -104 L -22 -104 Z" fill={look.shirt} />
      {phone ? (
        <>
          <path d="M 8 -196 L 30 -150 L 40 -172" stroke={look.shirt} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={34} y={-196} width={14} height={24} rx={3} fill="#1d1d2b" />
        </>
      ) : (
        <path d={`M 0 -200 L ${-sw * 0.8} -120`} stroke={look.shirt} strokeWidth={16} strokeLinecap="round" />
      )}
      <g transform="translate(2 -262)">
        <Head look={look} />
      </g>
    </g>
  );
};

// ---------- Vehicles ----------
export type Rider = { look: Look; mood?: "happy" | "tired" | "neutral"; wave?: number };

// Side-view hatchback, facing right, origin at ground under the car centre.
export const SideCar: React.FC<{
  x: number;
  y: number;
  body: string;
  s?: number;
  flip?: boolean;
  dist?: number; // distance driven -> wheel spin
  driver?: Rider;
  passenger?: Rider;
  glass?: string;
  brake?: boolean;
}> = ({ x, y, body, s = 1, flip, dist = 0, driver, passenger, glass = "#E8F4F8", brake }) => {
  const spin = (dist / (2 * Math.PI * 36)) * 360;
  const wheel = (cx: number) => (
    <g transform={`translate(${cx} -36)`}>
      <circle r={38} fill="#23263a" />
      <circle r={20} fill="#E9EEF2" />
      <g transform={`rotate(${spin})`}>
        <rect x={-3} y={-18} width={6} height={36} fill="#9aa3b2" />
        <rect x={-18} y={-3} width={36} height={6} fill="#9aa3b2" />
      </g>
      <circle r={7} fill="#23263a" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx={0} cy={0} rx={200} ry={12} fill="#000" opacity={0.18} />
      {/* windows + riders */}
      <path d="M -112 -122 Q -86 -186 -24 -190 L 74 -190 Q 112 -186 142 -122 Z" fill={glass} />
      {passenger ? (
        <g transform="translate(-60 -136)">
          <Head look={passenger.look} mood={passenger.mood} />
          {passenger.wave !== undefined ? (
            <path
              d={`M 0 40 L -40 ${0 - Math.abs(Math.sin(passenger.wave)) * 30} L ${-60 + Math.sin(passenger.wave) * 14} ${-60 - Math.abs(Math.sin(passenger.wave)) * 20}`}
              stroke={passenger.look.shirt}
              strokeWidth={16}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <path d="M -30 34 Q 0 18 30 34 L 30 60 L -30 60 Z" fill={passenger.look.shirt} />
        </g>
      ) : null}
      {driver ? (
        <g transform="translate(46 -136)">
          <Head look={driver.look} mood={driver.mood} />
          <path d="M -30 34 Q 0 18 30 34 L 30 60 L -30 60 Z" fill={driver.look.shirt} />
        </g>
      ) : null}
      <path d="M -112 -122 Q -86 -186 -24 -190 L -10 -190 L -16 -122 Z" fill="#fff" opacity={0.25} />
      {/* body */}
      <path
        d="M -196 -54 Q -200 -112 -160 -120 L -118 -124 Q -92 -196 -22 -200 L 78 -200 Q 120 -196 152 -126 L 182 -114 Q 204 -106 202 -70 L 200 -52 Q 198 -36 184 -36 L -182 -36 Q -196 -36 -196 -54 Z M -100 -128 L 136 -128 Q 108 -180 74 -182 L -22 -182 Q -76 -178 -100 -128 Z"
        fill={body}
        fillRule="evenodd"
      />
      <rect x={-10} y={-188} width={14} height={64} fill={body} />
      <path d="M -194 -86 L 200 -86" stroke="#fff" strokeOpacity={0.25} strokeWidth={6} />
      <path d="M -6 -122 L -6 -46" stroke="#000" strokeOpacity={0.12} strokeWidth={3} />
      <rect x={10} y={-110} width={26} height={6} rx={3} fill="#000" opacity={0.18} />
      <rect x={-96} y={-110} width={26} height={6} rx={3} fill="#000" opacity={0.18} />
      <path d="M 184 -104 Q 200 -100 200 -86 L 184 -86 Z" fill="#FFF3C4" />
      <rect x={-198} y={-104} width={12} height={22} rx={4} fill={brake ? "#FF3B3B" : "#C7414B"} />
      {brake ? <circle cx={-204} cy={-93} r={26} fill="#FF3B3B" opacity={0.25} /> : null}
      {wheel(-118)}
      {wheel(122)}
    </g>
  );
};

// Top-down car, facing +x, origin at centre
export const TopCar: React.FC<{
  x: number;
  y: number;
  body: string;
  a?: number;
  s?: number;
  roof?: string;
  lights?: boolean;
  brake?: boolean;
}> = ({ x, y, body, a = 0, s = 1, roof, lights, brake }) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <rect x={-40} y={-17} width={84} height={42} rx={12} fill="#000" opacity={0.22} transform="translate(5 4)" />
    {lights ? <path d="M 40 -14 L 130 -40 L 130 40 L 40 14 Z" fill="#FFF1B8" opacity={0.18} /> : null}
    <rect x={-42} y={-20} width={84} height={40} rx={12} fill={body} />
    <rect x={-18} y={-15} width={40} height={30} rx={7} fill={roof ?? "#fff"} opacity={roof ? 1 : 0.28} />
    <rect x={14} y={-15} width={10} height={30} rx={3} fill="#1E2240" opacity={0.75} />
    <rect x={-26} y={-15} width={8} height={30} rx={3} fill="#1E2240" opacity={0.6} />
    <rect x={36} y={-17} width={6} height={8} rx={2} fill="#FFF3C4" />
    <rect x={36} y={9} width={6} height={8} rx={2} fill="#FFF3C4" />
    <rect x={-42} y={-17} width={4} height={8} rx={2} fill={brake ? "#FF3B3B" : "#B23A48"} />
    <rect x={-42} y={9} width={4} height={8} rx={2} fill={brake ? "#FF3B3B" : "#B23A48"} />
    {brake ? <circle cx={-46} cy={0} r={22} fill="#FF3B3B" opacity={0.3} /> : null}
  </g>
);

// Top-down building with fake height (roof offset), origin at footprint top-left
export const TopBuilding: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  roof: string;
  side: string;
  lift?: number;
  detail?: string;
}> = ({ x, y, w, h, roof, side, lift = 26, detail }) => (
  <g>
    <rect x={x + lift * 0.9} y={y + lift * 0.9} width={w} height={h} fill="#000" opacity={0.18} />
    <path d={`M ${x} ${y + h} L ${x + w} ${y + h} L ${x + w + lift * 0.6} ${y + h + lift * 0.6} L ${x + lift * 0.6} ${y + h + lift * 0.6} Z`} fill={side} />
    <path d={`M ${x + w} ${y} L ${x + w + lift * 0.6} ${y + lift * 0.6} L ${x + w + lift * 0.6} ${y + h + lift * 0.6} L ${x + w} ${y + h} Z`} fill={side} opacity={0.85} />
    <rect x={x} y={y} width={w} height={h} fill={roof} />
    {detail ? (
      <>
        <rect x={x + w * 0.12} y={y + h * 0.15} width={w * 0.3} height={h * 0.22} fill={detail} />
        <rect x={x + w * 0.55} y={y + h * 0.55} width={w * 0.3} height={h * 0.25} fill={detail} />
        <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} fill="none" stroke={detail} strokeWidth={4} opacity={0.6} />
      </>
    ) : null}
  </g>
);

export const TreeTop: React.FC<{ x: number; y: number; r: number; c: string; shade: string }> = ({ x, y, r, c, shade }) => (
  <g>
    <circle cx={x + r * 0.25} cy={y + r * 0.25} r={r} fill="#000" opacity={0.18} />
    <circle cx={x} cy={y} r={r} fill={c} />
    <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.45} fill={shade} opacity={0.5} />
  </g>
);

// Tone-on-tone facade for side-view streets. Origin bottom-left at ground.
export const Facade: React.FC<{
  x: number;
  ground: number;
  w: number;
  h: number;
  fill: string;
  line: string;
  lit?: string;
  seed?: number;
  arches?: boolean;
}> = ({ x, ground, w, h, fill, line, lit, seed = 0, arches }) => {
  const top = ground - h;
  const cols = Math.max(2, Math.floor(w / 70));
  const rows = Math.max(2, Math.floor((h - 60) / 90));
  const cw = w / cols;
  const win = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = lit && rnd(seed * 100 + r * 13 + c) > 0.55;
      const wx = x + c * cw + cw * 0.22;
      const wy = top + 40 + r * 90;
      win.push(
        arches && r === rows - 1 ? (
          <path
            key={`${r}-${c}`}
            d={`M ${wx} ${wy + 70} L ${wx} ${wy + 24} Q ${wx + cw * 0.28} ${wy - 4} ${wx + cw * 0.56} ${wy + 24} L ${wx + cw * 0.56} ${wy + 70}`}
            fill={on ? lit : "none"}
            stroke={line}
            strokeWidth={5}
          />
        ) : (
          <g key={`${r}-${c}`}>
            <rect x={wx} y={wy} width={cw * 0.56} height={56} fill={on ? lit : "none"} stroke={line} strokeWidth={5} />
            <line x1={wx + cw * 0.28} y1={wy} x2={wx + cw * 0.28} y2={wy + 56} stroke={line} strokeWidth={3} />
          </g>
        ),
      );
    }
  }
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={fill} />
      <rect x={x - 6} y={top - 14} width={w + 12} height={14} fill={line} opacity={0.7} />
      {win}
    </g>
  );
};

export const TrafficLight: React.FC<{
  x: number;
  y: number;
  state: "red" | "yellow" | "green";
  s?: number;
  pole?: string;
  housing?: string;
}> = ({ x, y, state, s = 1, pole = "#2B2F45", housing = "#23263a" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={900} fill={pole} />
    <rect x={-80} y={-330} width={160} height={350} rx={44} fill={housing} />
    <rect x={-80} y={-330} width={30} height={350} rx={15} fill="#fff" opacity={0.06} />
    {(["red", "yellow", "green"] as const).map((c, i) => {
      const on = state === c;
      const col = c === "red" ? "#FF4D4D" : c === "yellow" ? "#FFC93C" : "#3DDC84";
      const off = c === "red" ? "#4A2630" : c === "yellow" ? "#4A3F26" : "#244A33";
      const cy = -260 + i * 105;
      return (
        <g key={c}>
          {on ? <circle cx={0} cy={cy} r={90} fill={col} opacity={0.22} /> : null}
          <circle cx={0} cy={cy} r={44} fill={on ? col : off} />
          <path d={`M -50 ${cy - 40} Q 0 ${cy - 70} 50 ${cy - 40}`} stroke={housing} strokeWidth={16} fill="none" />
        </g>
      );
    })}
  </g>
);

export const Palm: React.FC<{ x: number; ground: number; h: number; c: string }> = ({ x, ground, h, c }) => (
  <g>
    <path d={`M ${x - 7} ${ground} Q ${x + 14} ${ground - h / 2} ${x + 4} ${ground - h} L ${x + 14} ${ground - h} Q ${x + 26} ${ground - h / 2} ${x + 9} ${ground} Z`} fill={c} />
    {[-160, -125, -90, -55, -20, 15].map((a, i) => (
      <path
        key={i}
        d={`M 0 0 Q 50 -26 110 ${8 + (i % 2) * 10} Q 52 -6 0 0 Z`}
        fill={c}
        transform={`translate(${x + 9} ${ground - h}) rotate(${a + 35})`}
      />
    ))}
  </g>
);

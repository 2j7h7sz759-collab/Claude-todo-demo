import type React from "react";
import { C } from "./theme";

// All elements are SVG <g> groups drawn in the 1920x1080 scene space.

export const Car: React.FC<{
  x: number;
  y: number; // ground line (wheel bottom)
  color: string;
  s?: number;
  flip?: boolean;
  lights?: boolean;
}> = ({ x, y, color, s = 1, flip = false, lights = false }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <ellipse cx={0} cy={2} rx={105} ry={8} fill="rgba(30,42,63,0.15)" />
    <path d="M -58 -66 L -38 -104 L 42 -104 L 68 -66 Z" fill={color} />
    <rect x={-100} y={-72} width={200} height={52} rx={18} fill={color} />
    <path d="M -46 -68 L -32 -96 L -4 -96 L -4 -68 Z" fill={C.skyLight} />
    <path d="M 4 -68 L 4 -96 L 36 -96 L 54 -68 Z" fill={C.skyLight} />
    <rect x={-100} y={-50} width={200} height={6} fill="rgba(0,0,0,0.12)" />
    <rect x={86} y={-64} width={14} height={11} rx={4} fill={C.mustard} />
    <rect x={-100} y={-64} width={9} height={11} rx={3} fill={C.red} />
    {lights ? (
      <path d="M 100 -60 L 190 -84 L 190 -36 Z" fill="rgba(233,196,106,0.35)" />
    ) : null}
    <circle cx={-56} cy={-20} r={21} fill={C.ink} />
    <circle cx={-56} cy={-20} r={8} fill={C.grey} />
    <circle cx={56} cy={-20} r={21} fill={C.ink} />
    <circle cx={56} cy={-20} r={8} fill={C.grey} />
  </g>
);

// Top-down car for map / plan views
export const TopCar: React.FC<{
  x: number;
  y: number;
  color: string;
  rot?: number;
  s?: number;
}> = ({ x, y, color, rot = 0, s = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-30} y={-16} width={60} height={32} rx={9} fill={color} />
    <rect x={8} y={-12} width={12} height={24} rx={3} fill={C.skyLight} />
    <rect x={-20} y={-12} width={9} height={24} rx={3} fill={C.skyLight} />
  </g>
);

export const Road: React.FC<{
  y: number;
  h?: number;
  offset?: number;
  color?: string;
}> = ({ y, h = 190, offset = 0, color = C.road }) => {
  const dashes = [];
  const o = ((offset % 160) + 160) % 160;
  for (let i = -1; i < 14; i++) {
    dashes.push(
      <rect
        key={i}
        x={i * 160 + o}
        y={y + h / 2 - 5}
        width={80}
        height={10}
        rx={5}
        fill={C.cream}
        opacity={0.8}
      />,
    );
  }
  return (
    <g>
      <rect x={0} y={y - 14} width={1920} height={14} fill={C.sandDark} />
      <rect x={0} y={y} width={1920} height={h} fill={color} />
      {dashes}
      <rect x={0} y={y + h} width={1920} height={14} fill={C.sandDark} />
    </g>
  );
};

export const Building: React.FC<{
  x: number;
  w: number;
  h: number;
  ground: number;
  color: string;
  win?: string;
  rise?: number; // 0..1
}> = ({ x, w, h, ground, color, win = C.cream, rise = 1 }) => {
  const hh = h * rise;
  const top = ground - hh;
  const windows = [];
  const cols = Math.max(1, Math.floor((w - 20) / 34));
  const rows = Math.floor((hh - 30) / 46);
  const gap = (w - cols * 18) / (cols + 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      windows.push(
        <rect
          key={`${r}-${c}`}
          x={x + gap + c * (18 + gap)}
          y={top + 26 + r * 46}
          width={18}
          height={26}
          rx={3}
          fill={win}
          opacity={(r * 7 + c * 3) % 5 === 0 ? 0.35 : 0.85}
        />,
      );
    }
  }
  return (
    <g>
      <rect x={x} y={top} width={w} height={hh} fill={color} rx={4} />
      {windows}
    </g>
  );
};

export const Skyline: React.FC<{ ground: number; rise?: number }> = ({
  ground,
  rise = 1,
}) => {
  const specs: [number, number, number, string][] = [
    [40, 150, 300, C.sky],
    [200, 120, 420, C.teal],
    [330, 170, 260, C.mustard],
    [510, 110, 500, C.inkSoft],
    [630, 150, 340, C.coral],
    [790, 130, 450, C.sky],
    [930, 180, 280, C.teal],
    [1120, 120, 520, C.lavender],
    [1250, 160, 360, C.mustard],
    [1420, 110, 460, C.inkSoft],
    [1540, 170, 300, C.coral],
    [1720, 160, 400, C.teal],
  ];
  return (
    <g>
      {specs.map(([x, w, h, color], i) => (
        <Building
          key={i}
          x={x}
          w={w}
          h={h}
          ground={ground}
          color={color}
          rise={Math.max(0, Math.min(1, rise * 1.6 - (i % 4) * 0.2))}
        />
      ))}
    </g>
  );
};

export const TrafficLight: React.FC<{
  x: number;
  y: number;
  state: "red" | "yellow" | "green";
  s?: number;
}> = ({ x, y, state, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-12} y={0} width={24} height={360} fill={C.inkSoft} />
    <rect x={-70} y={-300} width={140} height={330} rx={36} fill={C.ink} />
    <circle cx={0} cy={-220} r={42} fill={state === "red" ? C.red : "#4a2a30"} />
    <circle
      cx={0}
      cy={-130}
      r={42}
      fill={state === "yellow" ? C.mustard : "#4a4230"}
    />
    <circle cx={0} cy={-40} r={42} fill={state === "green" ? C.green : "#2c4a30"} />
    {state === "green" ? (
      <circle cx={0} cy={-40} r={62} fill={C.green} opacity={0.25} />
    ) : null}
    {state === "red" ? (
      <circle cx={0} cy={-220} r={62} fill={C.red} opacity={0.25} />
    ) : null}
  </g>
);

export const Puff: React.FC<{
  x: number;
  y: number;
  r: number;
  opacity: number;
}> = ({ x, y, r, opacity }) => (
  <g opacity={opacity}>
    <circle cx={x} cy={y} r={r} fill={C.grey} />
    <circle cx={x + r * 0.8} cy={y + r * 0.2} r={r * 0.75} fill={C.grey} />
    <circle cx={x - r * 0.7} cy={y + r * 0.3} r={r * 0.6} fill={C.grey} />
  </g>
);

export const Palm: React.FC<{ x: number; ground: number; h?: number }> = ({
  x,
  ground,
  h = 220,
}) => (
  <g>
    <path
      d={`M ${x - 8} ${ground} Q ${x + 10} ${ground - h / 2} ${x} ${ground - h} L ${x + 10} ${ground - h} Q ${x + 22} ${ground - h / 2} ${x + 8} ${ground} Z`}
      fill="#8a6a4a"
    />
    {[-170, -135, -100, -70, -40, -5].map((a, i) => (
      <ellipse
        key={i}
        cx={x + 5 + 52}
        cy={ground - h}
        rx={58}
        ry={15}
        fill={i % 2 ? C.tealDark : C.green}
        transform={`rotate(${a + 20} ${x + 5} ${ground - h})`}
      />
    ))}
  </g>
);

// ---------- Icons (drawn in a 120x120 box centered on 0,0) ----------

export const ClockIcon: React.FC<{ angle?: number; color?: string }> = ({
  angle = 0,
  color = C.coral,
}) => (
  <g>
    <circle r={52} fill={color} />
    <circle r={40} fill={C.cream} />
    <line x1={0} y1={0} x2={0} y2={-28} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${angle})`} />
    <line x1={0} y1={0} x2={18} y2={0} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${angle / 12})`} />
    <circle r={6} fill={C.ink} />
  </g>
);

export const FuelIcon: React.FC<{ level?: number }> = ({ level = 1 }) => (
  <g>
    <rect x={-38} y={-48} width={56} height={96} rx={10} fill={C.mustard} />
    <rect x={-28} y={-38} width={36} height={28} rx={4} fill={C.cream} />
    <rect
      x={-28}
      y={-10 + 50 * (1 - level)}
      width={36}
      height={50 * level}
      rx={4}
      fill={C.ink}
      opacity={0.25}
    />
    <path d="M 18 -30 L 36 -18 L 36 30 Q 36 40 28 40" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
  </g>
);

export const FactoryIcon: React.FC = () => (
  <g>
    <path d="M -52 50 L -52 -6 L -22 12 L -22 -6 L 8 12 L 8 -40 L 26 -40 L 26 -10 L 52 -10 L 52 50 Z" fill={C.inkSoft} />
    <rect x={-40} y={20} width={14} height={14} fill={C.mustard} />
    <rect x={-12} y={20} width={14} height={14} fill={C.mustard} />
    <rect x={16} y={20} width={14} height={14} fill={C.mustard} />
    <circle cx={20} cy={-54} r={12} fill={C.grey} />
    <circle cx={36} cy={-64} r={9} fill={C.grey} />
  </g>
);

export const CameraIcon: React.FC = () => (
  <g>
    <rect x={-6} y={0} width={12} height={50} fill={C.inkSoft} />
    <rect x={-50} y={-38} width={84} height={44} rx={10} fill={C.ink} transform="rotate(12)" />
    <rect x={30} y={-34} width={22} height={30} rx={4} fill={C.inkSoft} transform="rotate(12)" />
    <circle cx={-30} cy={-20} r={7} fill={C.red} />
  </g>
);

export const SensorIcon: React.FC<{ t?: number }> = ({ t = 0 }) => (
  <g>
    <rect x={-22} y={0} width={44} height={44} rx={8} fill={C.ink} />
    <circle cx={0} cy={22} r={9} fill={C.green} />
    {[0, 1, 2].map((i) => {
      const p = (t + i / 3) % 1;
      return (
        <path
          key={i}
          d={`M ${-20 - p * 30} ${-10 - p * 20} Q 0 ${-34 - p * 40} ${20 + p * 30} ${-10 - p * 20}`}
          stroke={C.teal}
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
          opacity={1 - p}
        />
      );
    })}
  </g>
);

export const ChipIcon: React.FC<{ glow?: number }> = ({ glow = 0 }) => (
  <g>
    <circle r={170 + glow * 30} fill={C.lavender} opacity={0.12 + glow * 0.1} />
    {[-60, -20, 20, 60].map((p) => (
      <g key={p}>
        <rect x={p - 7} y={-150} width={14} height={40} rx={4} fill={C.ink} />
        <rect x={p - 7} y={110} width={14} height={40} rx={4} fill={C.ink} />
        <rect x={-150} y={p - 7} width={40} height={14} rx={4} fill={C.ink} />
        <rect x={110} y={p - 7} width={40} height={14} rx={4} fill={C.ink} />
      </g>
    ))}
    <rect x={-115} y={-115} width={230} height={230} rx={34} fill={C.ink} />
    <rect x={-85} y={-85} width={170} height={170} rx={22} fill={C.lavender} />
    <text
      x={0}
      y={26}
      textAnchor="middle"
      fontSize={78}
      fontWeight={900}
      fill={C.white}
      fontFamily="Cairo, sans-serif"
    >
      AI
    </text>
  </g>
);

export const ChartIcon: React.FC = () => (
  <g>
    <rect x={-52} y={-48} width={104} height={96} rx={12} fill={C.cream} stroke={C.ink} strokeWidth={6} />
    <rect x={-34} y={4} width={16} height={30} fill={C.teal} />
    <rect x={-8} y={-16} width={16} height={50} fill={C.coral} />
    <rect x={18} y={-30} width={16} height={64} fill={C.mustard} />
  </g>
);

export const BulbIcon: React.FC = () => (
  <g>
    <circle cx={0} cy={-12} r={40} fill={C.mustard} />
    <rect x={-20} y={22} width={40} height={14} rx={4} fill={C.inkSoft} />
    <rect x={-16} y={38} width={32} height={10} rx={4} fill={C.ink} />
    <path d="M -12 -10 L -2 6 L 8 -16" stroke={C.cream} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

export const LeafIcon: React.FC = () => (
  <g>
    <path d="M -40 40 Q -50 -40 44 -46 Q 46 40 -40 40 Z" fill={C.green} />
    <path d="M -40 40 Q 0 0 30 -30" stroke={C.tealDark} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

export const ShieldIcon: React.FC = () => (
  <g>
    <path d="M 0 -60 L 50 -40 L 50 4 Q 50 44 0 64 Q -50 44 -50 4 L -50 -40 Z" fill={C.teal} />
    <rect x={-20} y={-6} width={40} height={32} rx={6} fill={C.cream} />
    <path d="M -12 -6 L -12 -18 Q 0 -34 12 -18 L 12 -6" stroke={C.cream} strokeWidth={7} fill="none" />
    <circle cx={0} cy={10} r={5} fill={C.teal} />
  </g>
);

export const PatternIcon: React.FC = () => (
  <g>
    <rect x={-52} y={-48} width={104} height={96} rx={12} fill={C.cream} stroke={C.ink} strokeWidth={6} />
    <polyline points="-38,24 -18,0 0,14 18,-20 38,-8" stroke={C.coral} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const RouteIcon: React.FC = () => (
  <g>
    <path d="M -36 40 Q -36 0 0 0 Q 36 0 36 -36" stroke={C.green} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray="1 22" />
    <circle cx={-36} cy={40} r={12} fill={C.ink} />
    <path d="M 36 -60 Q 58 -60 58 -38 Q 58 -20 36 4 Q 14 -20 14 -38 Q 14 -60 36 -60 Z" fill={C.coral} />
    <circle cx={36} cy={-38} r={8} fill={C.cream} />
  </g>
);

export const PinIcon: React.FC<{ color?: string }> = ({ color = C.red }) => (
  <g>
    <path d="M 0 -56 Q 30 -56 30 -26 Q 30 -4 0 24 Q -30 -4 -30 -26 Q -30 -56 0 -56 Z" fill={color} />
    <circle cx={0} cy={-26} r={11} fill={C.cream} />
  </g>
);

export const Check: React.FC<{ color?: string }> = ({ color = C.green }) => (
  <g>
    <circle r={34} fill={color} />
    <path d="M -15 0 L -4 12 L 16 -12" stroke={C.white} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

// Point at distance d along a polyline
export const pointAt = (pts: [number, number][], d: number) => {
  let rest = d;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (rest <= len) {
      const t = rest / len;
      return {
        x: x1 + (x2 - x1) * t,
        y: y1 + (y2 - y1) * t,
        angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
      };
    }
    rest -= len;
  }
  const [x, y] = pts[pts.length - 1];
  const [px, py] = pts[pts.length - 2];
  return { x, y, angle: (Math.atan2(y - py, x - px) * 180) / Math.PI };
};

export const polyLength = (pts: [number, number][]) =>
  pts.reduce(
    (acc, p, i) =>
      i === 0 ? 0 : acc + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]),
    0,
  );

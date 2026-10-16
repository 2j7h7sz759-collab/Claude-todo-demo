import type React from "react";
import { TopBuilding, TopCar, TreeTop, rnd } from "../kit/props";

// Reusable top-down intersection world (used by opening + outro)
export type AerialPalette = {
  ground: string;
  road: string;
  lane: string;
  walk: string;
  roofA: string;
  roofB: string;
  roofC: string;
  side: string;
  detail: string;
  tree: string;
  treeShade: string;
  cars: string[];
};

export const DUSK: AerialPalette = {
  ground: "#2C2F66",
  road: "#353A7D",
  lane: "#6E78D6",
  walk: "#4A50A0",
  roofA: "#F2789F",
  roofB: "#4FD6DC",
  roofC: "#F7F0FF",
  side: "#5B3A9E",
  detail: "#C9548A",
  tree: "#2EC4B6",
  treeShade: "#9FF5EC",
  cars: ["#4FD6DC", "#FFFFFF", "#F2789F", "#2B2F7A", "#FFC4D6", "#7C5CFF"],
};

export const NIGHT: AerialPalette = {
  ground: "#0E1130",
  road: "#181C46",
  lane: "#3B4290",
  walk: "#22275A",
  roofA: "#3A2E78",
  roofB: "#1F4E73",
  roofC: "#2A2F66",
  side: "#090B22",
  detail: "#FFD166",
  tree: "#123F4A",
  treeShade: "#2E7C80",
  cars: ["#4FD6DC", "#FFFFFF", "#F2789F", "#7C5CFF", "#FFD166", "#9BE7FF"],
};

const RH = [400, 690]; // horizontal road (y range)
const RV = [810, 1110]; // vertical road (x range)

export const AerialCity: React.FC<{ p: AerialPalette; t: number; speed?: number; glow?: boolean }> = ({
  p,
  t,
  speed = 1,
  glow = false,
}) => {
  const laneH = [440, 510, 580, 650];
  const laneV = [850, 920, 1000, 1070];
  const cars: React.ReactNode[] = [];
  // horizontal traffic: top two lanes go left, bottom two go right
  laneH.forEach((y, li) => {
    const dir = li < 2 ? -1 : 1;
    for (let k = 0; k < 5; k++) {
      const v = (110 + rnd(li * 10 + k) * 60) * speed;
      const span = 2600;
      const x0 = k * 520 + rnd(li + k * 3) * 200;
      const x = (((x0 + dir * t * v) % span) + span) % span - 340;
      cars.push(
        <TopCar key={`h${li}-${k}`} x={x} y={y} a={dir < 0 ? 180 : 0} body={p.cars[(li + k) % p.cars.length]} lights={glow} brake={glow && dir > 0} />,
      );
    }
  });
  laneV.forEach((x, li) => {
    const dir = li < 2 ? 1 : -1;
    for (let k = 0; k < 3; k++) {
      const v = (90 + rnd(li * 7 + k) * 50) * speed;
      const span = 1600;
      const y0 = k * 540 + rnd(li * 5 + k) * 160;
      const y = (((y0 + dir * t * v) % span) + span) % span - 260;
      // keep vertical cars out of the crossing box to avoid overlaps
      if (y > RH[0] - 60 && y < RH[1] + 60) continue;
      cars.push(
        <TopCar key={`v${li}-${k}`} x={x} y={y} a={dir > 0 ? 90 : -90} body={p.cars[(li + k + 2) % p.cars.length]} lights={glow} />,
      );
    }
  });
  const block = (x: number, y: number, w: number, h: number, i: number) => {
    const roofs = [p.roofA, p.roofB, p.roofC];
    return <TopBuilding key={`b${i}`} x={x} y={y} w={w} h={h} roof={roofs[i % 3]} side={p.side} lift={30 + (i % 3) * 14} detail={p.detail} />;
  };
  return (
    <g>
      <rect x={-400} y={-400} width={2720} height={1880} fill={p.ground} />
      {/* sidewalks */}
      <rect x={-400} y={RH[0] - 30} width={2720} height={RH[1] - RH[0] + 60} fill={p.walk} />
      <rect x={RV[0] - 30} y={-400} width={RV[1] - RV[0] + 60} height={1880} fill={p.walk} />
      <rect x={-400} y={RH[0]} width={2720} height={RH[1] - RH[0]} fill={p.road} />
      <rect x={RV[0]} y={-400} width={RV[1] - RV[0]} height={1880} fill={p.road} />
      {/* lane marks */}
      {Array.from({ length: 30 }).map((_, i) => (
        <g key={i}>
          <rect x={-400 + i * 100} y={474} width={50} height={6} fill={p.lane} />
          <rect x={-400 + i * 100} y={614} width={50} height={6} fill={p.lane} />
          <rect x={884} y={-400 + i * 100} width={6} height={50} fill={p.lane} />
          <rect x={1034} y={-400 + i * 100} width={6} height={50} fill={p.lane} />
        </g>
      ))}
      <rect x={-400} y={543} width={2720} height={4} fill={p.lane} />
      <rect x={958} y={-400} width={4} height={1880} fill={p.lane} />
      {/* crossing box + zebra */}
      <rect x={RV[0]} y={RH[0]} width={RV[1] - RV[0]} height={RH[1] - RH[0]} fill={p.road} />
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={`z${i}`} fill={p.lane} opacity={0.9}>
          <rect x={RV[0] + 14 + i * 42} y={RH[0] - 70} width={24} height={56} />
          <rect x={RV[0] + 14 + i * 42} y={RH[1] + 14} width={24} height={56} />
          <rect x={RV[0] - 70} y={RH[0] + 14 + i * 40} width={56} height={22} />
          <rect x={RV[1] + 14} y={RH[0] + 14 + i * 40} width={56} height={22} />
        </g>
      ))}
      {cars}
      {/* city blocks */}
      {block(120, 40, 300, 220, 0)}
      {block(470, -120, 250, 360, 1)}
      {block(-200, 120, 260, 200, 2)}
      {block(1200, 60, 240, 260, 3)}
      {block(1500, -100, 330, 300, 4)}
      {block(1860, 120, 260, 240, 5)}
      {block(140, 790, 280, 260, 6)}
      {block(500, 760, 220, 380, 7)}
      {block(-220, 800, 280, 300, 8)}
      {block(1200, 780, 360, 240, 9)}
      {block(1620, 820, 260, 300, 10)}
      {[
        [700, 330],
        [1150, 330],
        [760, 760],
        [1170, 770],
        [1470, 760],
        [440, 330],
      ].map(([x, y], i) => (
        <TreeTop key={i} x={x} y={y} r={30 + (i % 3) * 8} c={p.tree} shade={p.treeShade} />
      ))}
    </g>
  );
};

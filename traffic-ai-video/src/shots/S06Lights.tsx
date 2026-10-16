import { Interactive } from "remotion";
import { Camera, FilmFinish, Kicker, Stage, Subtitles } from "../kit/film";
import { Facade, Person, SideCar, TrafficLight } from "../kit/props";
import { fontFamily, useAnim } from "../theme";

// Warm mustard street; an AI traffic light stretches its green phase for a long queue
const M = {
  skyTop: "#FFE7B0",
  skyBot: "#FCD27E",
  far: "#F5C860",
  farLine: "#E8AE3C",
  near: "#EDB447",
  nearLine: "#D49326",
  walk: "#F3D9A0",
  road: "#4A4E69",
  lane: "#F3E9D2",
};
const GREEN = 5;
const bodies = ["#E2574C", "#3E8ED0", "#FFFFFF", "#2C3E73", "#6CC1B8", "#C65A7A"];
const riders = [
  { skin: "#F2C3A0", hair: "#3A2A2A", shirt: "#2F6FB0", hairStyle: "short" as const },
  { skin: "#C98B62", hair: "#1E1A1A", shirt: "#E6E1D6", hairStyle: "cap" as const },
  { skin: "#F5D0B5", hair: "#D65A31", shirt: "#3BA676", hairStyle: "long" as const },
];

const LightsInner = () => {
  const { sec, tw, pop } = useAnim();
  const state = sec < GREEN - 0.5 ? "red" : sec < GREEN ? "yellow" : "green";
  const extend = tw(3, 4.8, [0.3, 0.8]);
  const ringOn = tw(2.6, 3.2);
  return (
    <>
      <Camera from={{ scale: 1.08, x: 30, y: 20 }} to={{ scale: 1.0, x: -40, y: 0 }} end={12.5}>
        <Stage>
          <defs>
            <linearGradient id="mSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={M.skyTop} />
              <stop offset="1" stopColor={M.skyBot} />
            </linearGradient>
          </defs>
          <rect width={1920} height={1080} fill="url(#mSky)" />
          <circle cx={420} cy={250} r={110} fill="#FFF4D6" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Facade key={i} x={-80 + i * 360} ground={660} w={330} h={380 + (i % 3) * 70} fill={M.far} line={M.farLine} seed={i + 30} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Facade key={`n${i}`} x={-160 + i * 560} ground={700} w={430} h={260 + (i % 2) * 60} fill={M.near} line={M.nearLine} seed={i + 40} arches />
          ))}
          <rect x={0} y={690} width={1920} height={70} fill={M.walk} />
          <rect x={0} y={760} width={1920} height={320} fill={M.road} />
          {Array.from({ length: 13 }).map((_, i) => (
            <rect key={i} x={i * 160} y={950} width={90} height={8} rx={4} fill={M.lane} opacity={0.6} />
          ))}
          {/* stop line + zebra */}
          <rect x={1340} y={770} width={12} height={170} fill={M.lane} />
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} x={1370} y={776 + i * 36} width={150} height={20} fill={M.lane} opacity={0.85} />
          ))}
          {/* queued cars: arrive, wait, then flow when the light turns green */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const arrive = tw(0.2 + i * 0.4, 1.5 + i * 0.4);
            const go = Math.max(0, sec - GREEN - 0.25 - i * 0.22);
            const dist = go * go * 140 + go * 160;
            const x = 1170 - i * 330 - (1 - arrive) * 1600 + dist;
            const waiting = sec > 1.5 + i * 0.4 && sec < GREEN + 0.3 + i * 0.22;
            return (
              <g key={i}>
                <SideCar x={x} y={930} s={0.78} body={bodies[i]} dist={x} brake={waiting} driver={i < 3 ? { look: riders[i], mood: sec > GREEN + 0.5 ? "happy" : "neutral" } : undefined} />
                {/* density sensor ping above each waiting car */}
                <g opacity={tw(1.4 + i * 0.25, 1.8 + i * 0.25) * (1 - tw(GREEN + 1, GREEN + 1.5))} transform={`translate(${x} 760)`}>
                  <circle r={16} fill="#FF8A3D" />
                  <circle r={16 + ((sec * 30 + i * 8) % 24)} fill="none" stroke="#FF8A3D" strokeWidth={3} opacity={1 - ((sec * 30 + i * 8) % 24) / 24} />
                </g>
              </g>
            );
          })}
          <Person x={1650} y={740} look={{ skin: "#E8B48F", hair: "#2B1D16", shirt: "#7A5CC2", hairStyle: "bun" }} s={0.75} phone flip />
          <TrafficLight x={1560} y={560} s={1.0} state={state} />
          {/* AI timing ring around the light */}
          <g transform="translate(1560 460)" opacity={ringOn}>
            <circle r={230} fill="none" stroke="#3B2F14" strokeOpacity={0.15} strokeWidth={14} />
            <circle
              r={230}
              fill="none"
              stroke="#3DDC84"
              strokeWidth={14}
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 230 * extend} 4000`}
              transform="rotate(-90)"
            />
            <circle cx={230 * Math.cos(2 * Math.PI * extend - Math.PI / 2)} cy={230 * Math.sin(2 * Math.PI * extend - Math.PI / 2)} r={14} fill="#3DDC84" />
          </g>
          <g transform={`translate(1250 300) scale(${pop(4.6)})`}>
            <rect x={-110} y={-50} width={220} height={100} rx={50} fill="#3DDC84" />
            <text y={20} textAnchor="middle" fontSize={54} fontWeight={900} fill="#123821" fontFamily={fontFamily} direction="rtl">
              +25 ث
            </text>
          </g>
        </Stage>
      </Camera>
      <FilmFinish />
      <Kicker color="#3B2F14">أولًا: إشارات مرور ذكية</Kicker>
      <Subtitles
        lines={[
          { text: "إشارات مرور ذكية تعدّل مدة الإشارة الخضراء وفقًا لكثافة المركبات", from: 0.6, to: 6.6 },
          { text: "مما يساعد على تقليل الانتظار وتحسين انسيابية السير", from: 6.6, to: 12 },
        ]}
      />
    </>
  );
};

export const S06Lights = Interactive.create({ Component: LightsInner, layout: "absolute-fill" });

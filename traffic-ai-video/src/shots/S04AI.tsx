import { Interactive } from "remotion";
import { Camera, FilmFinish, Stage, Subtitles } from "../kit/film";
import { TopCar, TreeTop, along, bezier, polyLen, ptsD, type Pt } from "../kit/props";
import { fontFamily, useAnim } from "../theme";

// Top-down teal city (BluBlu-style) gradually overlaid with an AI data layer
const T = {
  ground: "#2A9D8F",
  park: "#B8F0E2",
  road: "#7EDCCB",
  lane: "#E9FFF9",
  dark: "#0E5E62",
  roof: "#F1FFF9",
  side: "#1F7A70",
  purple: "#5B3E96",
};

const roadA: Pt[] = bezier([-200, 820], [500, 760], [700, 300], [1300, 260], 50).concat(bezier([1300, 260], [1700, 230], [1900, 120], [2200, 60], 30).slice(1));
const roadB: Pt[] = bezier([380, -200], [460, 300], [900, 500], [1000, 760], 50).concat(bezier([1000, 760], [1060, 920], [1050, 1100], [1120, 1300], 30).slice(1));
const roadC: Pt[] = bezier([-200, 470], [600, 520], [1300, 620], [2200, 560], 60);
const roads = [roadA, roadB, roadC];
const HUB: Pt = [960, 520];

const cams: Pt[] = [
  [560, 420],
  [1400, 420],
  [1180, 760],
];
const sensors: Pt[] = [
  [300, 480],
  [1650, 575],
  [960, 820],
  [760, 380],
];
const hot: Pt[] = [
  [1300, 262],
  [430, 480],
];

const AIInner = () => {
  const { sec, tw, pop } = useAnim();
  const carsOn = tw(3.6, 4.4);
  const camOn = tw(4.8, 5.6);
  const senOn = tw(5.8, 6.6);
  const hubOn = pop(9, 12);
  const linkOn = tw(9.2, 10.4);
  const heat = tw(12.8, 13.8);
  const bypass = tw(14.2, 15.6);
  const cars = roads.flatMap((r, ri) => {
    const L = polyLen(r);
    return [0, 1, 2, 3, 4].map((k) => {
      const d = ((k / 5) * L + sec * (150 + ri * 30)) % L;
      const p = along(r, d);
      return { ...p, key: `${ri}-${k}`, ri, k };
    });
  });
  const bypassPath: Pt[] = bezier([700, 520], [700, 360], [1000, 360], [1180, 330], 40);
  return (
    <>
      <Camera from={{ scale: 1.18, x: 40, y: 20, rotate: -3 }} to={{ scale: 1.04, x: 0, y: 0, rotate: 1 }} end={16.5}>
        <Stage>
          <rect x={-300} y={-300} width={2520} height={1680} fill={T.ground} />
          <path d="M 1150 650 Q 1500 620 1700 760 Q 1760 1000 1400 1080 Q 1150 1060 1120 900 Z" fill={T.park} />
          <path d="M 80 -40 Q 360 -60 420 160 Q 300 320 60 280 Z" fill={T.park} />
          <circle cx={1450} cy={860} r={90} fill="none" stroke={T.road} strokeWidth={22} />
          {roads.map((r, i) => (
            <g key={i}>
              <path d={ptsD(r)} stroke={T.dark} strokeOpacity={0.25} strokeWidth={150} fill="none" strokeLinecap="round" />
              <path d={ptsD(r)} stroke={T.road} strokeWidth={130} fill="none" strokeLinecap="round" />
              <path d={ptsD(r)} stroke={T.lane} strokeWidth={6} strokeDasharray="34 30" fill="none" />
            </g>
          ))}
          {/* buildings */}
          {[
            [1450, 40, 220, 140],
            [1720, 300, 200, 180],
            [80, 620, 180, 140],
            [620, 860, 240, 160],
            [-60, 900, 240, 200],
            [1560, 980, 260, 140],
            [700, 40, 200, 160],
          ].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x + 22} y={y + 22} width={w} height={h} fill={T.side} />
              <rect x={x} y={y} width={w} height={h} fill={i % 3 === 1 ? T.purple : T.roof} />
              <rect x={x + 18} y={y + 18} width={w - 36} height={h - 36} fill="none" stroke={i % 3 === 1 ? "#7C5CC4" : "#BDEBDF"} strokeWidth={6} />
            </g>
          ))}
          {[
            [250, 300],
            [1100, 120],
            [1600, 470],
            [820, 640],
            [450, 1000],
            [1820, 860],
            [1250, 950],
          ].map(([x, y], i) => (
            <TreeTop key={i} x={x} y={y} r={26 + (i % 3) * 12} c={T.dark} shade="#2FB5A3" />
          ))}
          {/* heat zones: predicted congestion */}
          {hot.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={(150 + Math.sin(sec * 3 + i) * 12) * heat} fill="#FF7A59" opacity={0.35 * (1 - bypass * 0.6)} />
          ))}
          {/* AI suggested bypass */}
          <path d={ptsD(bypassPath)} stroke="#B6FF6C" strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={`${polyLen(bypassPath) * bypass} 4000`} />
          {/* cars + vehicle data pings */}
          {cars.map((c) => (
            <g key={c.key}>
              <TopCar x={c.x} y={c.y} a={c.a} body={(c.k + c.ri) % 2 ? T.purple : "#FFFFFF"} s={0.9} />
              <circle cx={c.x} cy={c.y} r={(30 + ((sec * 40 + c.k * 9) % 30)) * carsOn} fill="none" stroke="#FFFFFF" strokeWidth={3} opacity={0.6 * carsOn * (1 - ((sec * 40 + c.k * 9) % 30) / 30)} />
              <line x1={c.x} y1={c.y} x2={HUB[0]} y2={HUB[1]} stroke="#FFFFFF" strokeOpacity={0.12 * linkOn} strokeWidth={2} />
            </g>
          ))}
          {/* traffic cameras with sweeping view cones */}
          {cams.map(([x, y], i) => {
            const a = Math.sin(sec * 0.8 + i) * 25 + i * 120;
            return (
              <g key={i} opacity={camOn}>
                <path d={`M ${x} ${y} L ${x + 260} ${y - 90} A 280 280 0 0 1 ${x + 260} ${y + 90} Z`} fill="#FFFFFF" opacity={0.16} transform={`rotate(${a} ${x} ${y})`} />
                <circle cx={x} cy={y} r={22} fill="#14324A" />
                <circle cx={x} cy={y} r={8} fill="#FF5A5A" />
              </g>
            );
          })}
          {/* road sensors */}
          {sensors.map(([x, y], i) => (
            <g key={i} opacity={senOn}>
              {[0, 1].map((k) => {
                const p = (sec * 0.7 + k * 0.5 + i * 0.2) % 1;
                return <circle key={k} cx={x} cy={y} r={20 + p * 70} fill="none" stroke="#FFE66D" strokeWidth={4} opacity={1 - p} />;
              })}
              <circle cx={x} cy={y} r={12} fill="#FFE66D" />
            </g>
          ))}
          {/* data links to hub */}
          {[...cams, ...sensors].map(([x, y], i) => {
            const p = (sec * 0.6 + i * 0.17) % 1;
            return (
              <g key={i} opacity={linkOn}>
                <line x1={x} y1={y} x2={HUB[0]} y2={HUB[1]} stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={3} strokeDasharray="6 10" />
                <circle cx={x + (HUB[0] - x) * p} cy={y + (HUB[1] - y) * p} r={7} fill="#FFFFFF" />
              </g>
            );
          })}
          {/* AI hub */}
          <g transform={`translate(${HUB[0]} ${HUB[1]}) scale(${hubOn})`}>
            <circle r={150 + Math.sin(sec * 3) * 10} fill="#FFFFFF" opacity={0.12} />
            <circle r={96} fill="#FFFFFF" opacity={0.25} />
            <circle r={70} fill="#FFFFFF" />
            <circle r={70} fill="none" stroke={T.purple} strokeWidth={8} strokeDasharray="30 14" transform={`rotate(${sec * 40})`} />
            <text y={20} textAnchor="middle" fontSize={58} fontWeight={900} fill={T.purple} fontFamily={fontFamily}>
              AI
            </text>
          </g>
        </Stage>
      </Camera>
      <FilmFinish />
      <Subtitles
        lines={[
          { text: "هنا يأتي دور الذكاء الاصطناعي!", from: 0.6, to: 3.6 },
          { text: "فمن خلال تحليل بيانات حركة المركبات، وكاميرات المرور، وأجهزة الاستشعار", from: 3.6, to: 9 },
          { text: "يستطيع الذكاء الاصطناعي اكتشاف أنماط الازدحام", from: 9, to: 12.6 },
          { text: "والتنبؤ بالأوقات والطرق الأكثر ازدحامًا، واقتراح حلول تساعد على تحسين حركة المرور", from: 12.6, to: 16 },
        ]}
      />
    </>
  );
};

export const S04AI = Interactive.create({ Component: AIInner, layout: "absolute-fill" });

import { Interactive } from "remotion";
import { Camera, FilmFinish, Kicker, Shot, Stage, Subtitles } from "../kit/film";
import { SideCar, TopBuilding, TopCar, TreeTop, along, bezier, polyLen, ptsD, rnd, type Pt } from "../kit/props";
import { useAnim } from "../theme";

// Shot A: top-down blue/pink city, the hero car is rerouted around a predicted jam.
// Shot B: side view at sunset, the same car cruising on a free road.
const P = {
  ground: "#2D3A8C",
  road: "#3C4BA8",
  walk: "#5263C4",
  lane: "#8FA0F0",
  pink: "#FF8FB1",
  cyan: "#5FE1E8",
  white: "#F4F2FF",
  side: "#1F276B",
};

const line = (a: Pt, b: Pt, n = 10): Pt[] => Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
const heroPath: Pt[] = [
  ...line([-200, 575], [620, 575]),
  ...bezier([620, 575], [700, 575], [700, 575], [700, 495], 12).slice(1),
  ...line([700, 495], [700, 340]).slice(1),
  ...bezier([700, 340], [700, 260], [700, 260], [780, 260], 12).slice(1),
  ...line([780, 260], [1420, 260]).slice(1),
  ...bezier([1420, 260], [1500, 260], [1500, 260], [1500, 340], 12).slice(1),
  ...line([1500, 340], [1500, 495]).slice(1),
  ...bezier([1500, 495], [1500, 575], [1500, 575], [1580, 575], 12).slice(1),
  ...line([1580, 575], [2600, 575]).slice(1),
];
const TURN_AT = 820; // distance where the reroute starts

const RerouteMap = () => {
  const { sec, tw } = useAnim();
  const d = tw(0, 3.4, [0, 760]) + tw(3.9, 6.6, [0, 1500]);
  const hero = along(heroPath, d);
  const jam = tw(1.4, 2.2);
  const draw = tw(2.8, 3.8);
  const routeLen = polyLen(heroPath);
  // camera follows the hero car
  const cx = 960 + (hero.x - 960) * 0.55;
  const cy = 540 + (hero.y - 540) * 0.55;
  return (
    <Stage>
      <g transform={`translate(960 540) scale(1.25) translate(${-cx} ${-cy})`}>
        <rect x={-600} y={-500} width={3200} height={2100} fill={P.ground} />
        {/* streets */}
        <rect x={-600} y={460} width={3200} height={160} fill={P.walk} />
        <rect x={-600} y={480} width={3200} height={120} fill={P.road} />
        {[700, 1500].map((x) => (
          <g key={x}>
            <rect x={x - 70} y={-500} width={140} height={2100} fill={P.walk} />
            <rect x={x - 55} y={-500} width={110} height={2100} fill={P.road} />
          </g>
        ))}
        <rect x={-600} y={200} width={3200} height={120} fill={P.walk} />
        <rect x={-600} y={210} width={3200} height={100} fill={P.road} />
        {Array.from({ length: 34 }).map((_, i) => (
          <g key={i} fill={P.lane}>
            <rect x={-600 + i * 100} y={538} width={50} height={5} />
            <rect x={-600 + i * 100} y={258} width={50} height={4} />
          </g>
        ))}
        {/* blocks */}
        {[
          [-500, -300, 380, 420],
          [60, -320, 520, 440],
          [820, -330, 560, 450],
          [1620, -300, 480, 420],
          [-500, 360, 420, 70],
          [60, 360, 520, 70],
          [820, 360, 560, 70],
          [1620, 360, 480, 70],
          [-480, 700, 420, 360],
          [60, 690, 520, 380],
          [820, 690, 560, 380],
          [1620, 700, 480, 360],
        ].map(([x, y, w, h], i) => (
          <TopBuilding key={i} x={x} y={y} w={w} h={h} roof={[P.pink, P.cyan, P.white][i % 3]} side={P.side} lift={h > 100 ? 40 : 14} detail={h > 100 ? "#00000022" : undefined} />
        ))}
        {[
          [300, 380],
          [1100, 380],
          [1800, 395],
          [400, 680],
          [1300, 690],
        ].map(([x, y], i) => (
          <TreeTop key={i} x={x} y={y} r={26} c="#2EC4B6" shade="#9FF5EC" />
        ))}
        {/* predicted jam glow on the avenue */}
        <rect x={800} y={480} width={680} height={120} fill="#FF4D6D" opacity={jam * (0.25 + Math.sin(sec * 5) * 0.08)} />
        {/* jammed cars */}
        {Array.from({ length: 7 }).map((_, i) => (
          <TopCar key={`j${i}`} x={850 + i * 98 + Math.sin(sec * 2 + i) * 2} y={575} body={[P.white, P.pink, P.cyan, "#7C5CFF"][i % 4]} brake />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <TopCar key={`k${i}`} x={1440 - i * 98} y={505} a={180} body={[P.cyan, P.white, "#7C5CFF", P.pink][i % 4]} brake />
        ))}
        {/* light traffic on side streets */}
        {[0, 1, 2].map((i) => {
          const x = ((rnd(i) * 3000 + sec * 160) % 3000) - 500;
          return <TopCar key={`t${i}`} x={x} y={235} a={0} body={[P.white, P.cyan, P.pink][i]} />;
        })}
        {/* green reroute line */}
        <path
          d={ptsD(heroPath)}
          stroke="#B6FF6C"
          strokeWidth={16}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray={`0 ${TURN_AT - 40} ${(routeLen - TURN_AT) * draw} 9999`}
          opacity={0.9}
        />
        {/* hero car */}
        <circle cx={hero.x} cy={hero.y} r={70} fill="#FFD166" opacity={0.25} />
        <TopCar x={hero.x} y={hero.y} a={hero.a} body="#FFD166" s={1.25} lights />
      </g>
    </Stage>
  );
};

const SunsetDrive = () => {
  const { sec } = useAnim();
  const t = sec - 6.3;
  const v = 420;
  return (
    <Stage>
      <defs>
        <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF9A8B" />
          <stop offset="0.6" stopColor="#FFC3A0" />
          <stop offset="1" stopColor="#FFE0B5" />
        </linearGradient>
      </defs>
      <rect width={1920} height={1080} fill="url(#sunset)" />
      <circle cx={1350} cy={470} r={150} fill="#FFF1D6" />
      <g transform={`translate(${-((t * 30) % 1920)} 0)`}>
        {[0, 1].map((k) => (
          <path key={k} transform={`translate(${k * 1920} 0)`} d="M 0 640 Q 240 520 480 600 T 960 590 T 1440 560 T 1920 640 L 1920 1080 L 0 1080 Z" fill="#F08A7E" />
        ))}
      </g>
      <g transform={`translate(${-((t * 80) % 1920)} 0)`}>
        {[0, 1].map((k) => (
          <g key={k} transform={`translate(${k * 1920} 0)`}>
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={i * 160} y={660 - (80 + rnd(i + 40) * 160)} width={120} height={400} fill="#D9676B" />
            ))}
          </g>
        ))}
      </g>
      <rect x={0} y={720} width={1920} height={360} fill="#B9545F" />
      <rect x={0} y={760} width={1920} height={240} fill="#5A3A5E" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={i * 160 - ((t * v) % 160)} y={876} width={90} height={8} rx={4} fill="#FFD7B5" opacity={0.7} />
      ))}
      {/* roadside trees whizzing by */}
      {Array.from({ length: 5 }).map((_, i) => {
        const x = (((i * 520 - t * v * 1.3) % 2600) + 2600) % 2600 - 300;
        return (
          <g key={i}>
            <rect x={x - 8} y={620} width={16} height={110} fill="#7A3B4F" />
            <circle cx={x} cy={600} r={70} fill="#8E4A63" />
          </g>
        );
      })}
      <SideCar
        x={820 + Math.sin(t * 1.4) * 10}
        y={960}
        s={1.05}
        body="#FFD166"
        dist={t * v}
        glass="#FFF4E6"
        driver={{ look: { skin: "#C98B62", hair: "#1E1A1A", shirt: "#2F6FB0", hairStyle: "short" }, mood: "happy" }}
        passenger={{ look: { skin: "#F5D0B5", hair: "#D65A31", shirt: "#3BA676", hairStyle: "long" }, mood: "happy", wave: t * 6 }}
      />
      {/* speed lines */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={360 - ((t * 900 + i * 120) % 300)} y={830 + i * 34} width={120} height={5} rx={3} fill="#FFFFFF" opacity={0.5} />
      ))}
    </Stage>
  );
};

const RoutingInner = () => (
  <>
    <Shot from={0} to={6.3}>
      <RerouteMap />
    </Shot>
    <Shot from={6.3} to={13}>
      <Camera from={{ scale: 1.06, x: 0, y: 10 }} to={{ scale: 1.0, x: 0, y: 0 }} start={6.3} end={12.5}>
        <SunsetDrive />
      </Camera>
    </Shot>
    <FilmFinish />
    <Kicker>ثانيًا: توجيه ذكي للسائقين</Kicker>
    <Subtitles
      lines={[
        { text: "أنظمة ذكية تتنبأ بالازدحام وتوجّه السائقين إلى طرق بديلة أقل ازدحامًا", from: 0.6, to: 6.6 },
        { text: "مما يساعد على توفير الوقت وتقليل التكدس المروري", from: 6.6, to: 12 },
      ]}
    />
  </>
);

export const S07Routing = Interactive.create({ Component: RoutingInner, layout: "absolute-fill" });

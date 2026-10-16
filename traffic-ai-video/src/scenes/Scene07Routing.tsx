import { Interactive } from "remotion";
import { PinIcon, TopCar, pointAt, polyLength } from "../elements";
import { C, fontFamily, useAnim } from "../theme";
import { Captions, SectionTag, Svg } from "../ui";

type P = [number, number];
const A: P = [420, 780];
const B: P = [1500, 330];
const direct: P[] = [A, [1100, 780], [1100, 330], B];
const alt: P[] = [A, [420, 500], [1500, 500], B];
const toD = (pts: P[]) => pts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");

const streetsV = [420, 760, 1100, 1500];
const streetsH = [330, 500, 640, 780];

const RoutingInner = () => {
  const { tw, pop } = useAnim();
  const mapIn = tw(0, 0.8);
  const directLen = polyLength(direct);
  const altLen = polyLength(alt);
  const directDraw = tw(0.8, 2.2);
  const jam = tw(2.4, 3.2);
  const altDraw = tw(3.6, 5.2);
  const carD = tw(5.4, 10.6, [0, altLen]);
  const car = pointAt(alt, carD);
  return (
    <>
      <Svg>
        <g opacity={mapIn} transform={`translate(0 ${(1 - mapIn) * 40})`}>
          <rect x={220} y={220} width={1480} height={660} rx={40} fill={C.paper} />
          {/* blocks */}
          <rect x={460} y={540} width={260} height={80} rx={14} fill={C.green} opacity={0.35} />
          <rect x={800} y={370} width={260} height={100} rx={14} fill={C.sky} opacity={0.6} />
          <rect x={1140} y={540} width={320} height={80} rx={14} fill={C.mustard} opacity={0.4} />
          <rect x={800} y={680} width={260} height={70} rx={14} fill={C.coral} opacity={0.25} />
          <rect x={1140} y={680} width={320} height={70} rx={14} fill={C.green} opacity={0.35} />
          <g stroke={C.sand} strokeWidth={34} strokeLinecap="round">
            {streetsV.map((x) => (
              <line key={x} x1={x} y1={270} x2={x} y2={830} />
            ))}
            {streetsH.map((y) => (
              <line key={y} x1={270} y1={y} x2={1650} y2={y} />
            ))}
          </g>
          {/* direct route turns red */}
          <path
            d={toD(direct)}
            stroke={jam > 0 ? C.red : C.inkSoft}
            strokeWidth={20}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={directLen}
            strokeDashoffset={directLen * (1 - directDraw)}
            opacity={1 - tw(5.5, 6.5, [0, 0.55])}
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} opacity={jam}>
              <TopCar x={1100} y={720 - i * 72} color={[C.coral, C.ink, C.mustard, C.lavender, C.teal][i]} rot={90} s={0.9} />
            </g>
          ))}
          <g transform={`translate(1180 600) scale(${pop(2.8)})`}>
            <path d="M 0 -46 L 44 32 L -44 32 Z" fill={C.mustard} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
            <rect x={-4} y={-18} width={8} height={28} rx={3} fill={C.ink} />
            <circle cx={0} cy={20} r={5} fill={C.ink} />
          </g>
          {/* alternative route */}
          <path
            d={toD(alt)}
            stroke={C.green}
            strokeWidth={22}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={altLen}
            strokeDashoffset={altLen * (1 - altDraw)}
          />
          <g transform={`translate(${A[0]} ${A[1]})`}>
            <circle r={26} fill={C.ink} />
            <circle r={11} fill={C.cream} />
          </g>
          <g transform={`translate(${B[0]} ${B[1] - 10}) scale(1.2)`}>
            <PinIcon color={C.coral} />
          </g>
          <g opacity={tw(5.2, 5.5)}>
            <circle cx={car.x} cy={car.y} r={40} fill={C.green} opacity={0.3} />
            <TopCar x={car.x} y={car.y} color={C.teal} rot={car.angle} s={1.1} />
          </g>
        </g>
        {/* time-saved badge */}
        <g transform={`translate(330 330) scale(${pop(10.4)})`}>
          <rect x={-170} y={-66} width={340} height={132} rx={30} fill={C.green} />
          <text x={0} y={22} textAnchor="middle" fontSize={64} fontWeight={900} fill={C.white} fontFamily={fontFamily} direction="rtl">
            وقت أقل
          </text>
        </g>
        <g opacity={jam * (1 - tw(5.5, 6))}>
          <rect x={1210} y={680} width={340} height={70} rx={20} fill={C.red} />
          <text x={1380} y={728} textAnchor="middle" fontSize={38} fontWeight={700} fill={C.white} fontFamily={fontFamily} direction="rtl">
            ازدحام متوقع
          </text>
        </g>
      </Svg>
      <SectionTag num="٢" label="طرق بديلة أذكى" color={C.coral} />
      <Captions
        chunks={[
          {
            text: "أنظمة ذكية تتنبأ بالازدحام وتوجّه السائقين إلى طرق بديلة أقل ازدحامًا",
            from: 0.6,
            to: 6.6,
          },
          {
            text: "مما يساعد على توفير الوقت وتقليل التكدس المروري",
            from: 6.6,
            to: 12,
          },
        ]}
      />
    </>
  );
};

export const Scene07Routing = Interactive.create({
  Component: RoutingInner,
  layout: "absolute-fill",
});

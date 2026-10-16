import { Interactive } from "remotion";
import { Building, Palm, ShieldIcon, TopCar } from "../elements";
import { C, fontFamily, useAnim } from "../theme";
import { Captions, Svg } from "../ui";

const GROUND = 720;
// Smart-city network nodes on rooftops
const nodes: [number, number][] = [
  [420, 350],
  [700, 440],
  [960, 120],
  [1250, 420],
  [1430, 190],
  [1685, 360],
];

const SaudiInner = () => {
  const { sec, tw, pop } = useAnim();
  const rise = tw(0, 1.8);
  const net = tw(5, 6.5);
  return (
    <>
      <Svg>
        <circle cx={1210} cy={180} r={90} fill={C.mustard} opacity={0.9} />
        <g>
          <Building x={330} w={180} h={370} ground={GROUND} color={C.teal} rise={rise} />
          <Building x={620} w={160} h={280} ground={GROUND} color={C.mustard} rise={rise} />
          <Building x={1160} w={180} h={300} ground={GROUND} color={C.coral} rise={rise} />
          <Building x={1600} w={170} h={360} ground={GROUND} color={C.sky} rise={rise} />
          {/* Kingdom-centre-style tower */}
          <g transform={`translate(960 ${GROUND}) scale(1 ${rise})`}>
            <path d="M -110 0 L -82 -600 L -58 -600 Q 0 -400 58 -600 L 82 -600 L 110 0 Z" fill={C.inkSoft} />
            <rect x={-62} y={-515} width={124} height={16} fill={C.inkSoft} />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <rect key={i} x={-70 + i * 0.5} y={-380 + i * 42} width={140 - i} height={8} fill={C.cream} opacity={0.35} />
            ))}
          </g>
          {/* Faisaliah-style tower */}
          <g transform={`translate(1430 ${GROUND}) scale(1 ${rise})`}>
            <path d="M -80 0 L 0 -520 L 80 0 Z" fill={C.lavender} />
            <path d="M -40 0 L 0 -260 L 40 0" stroke={C.cream} strokeWidth={6} fill="none" opacity={0.5} />
            <circle cx={0} cy={-330} r={30} fill={C.mustard} />
            <rect x={-3} y={-600} width={6} height={90} fill={C.inkSoft} />
          </g>
        </g>
        {/* network overlay */}
        <g opacity={net}>
          {nodes.slice(1).map(([x, y], i) => {
            const [px, py] = nodes[i];
            return (
              <line key={i} x1={px} y1={py} x2={x} y2={y} stroke={C.ink} strokeWidth={5} strokeDasharray="10 12" strokeDashoffset={-sec * 40} />
            );
          })}
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={22 + Math.sin(sec * 4 + i) * 4} fill={C.green} opacity={0.35} />
              <circle cx={x} cy={y} r={12} fill={C.green} />
            </g>
          ))}
        </g>
        <rect x={0} y={GROUND} width={1920} height={280} fill={C.sand} />
        <rect x={0} y={GROUND + 24} width={1920} height={90} fill={C.road} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <TopCar key={i} x={((i * 380 + sec * 220) % 2300) - 150} y={GROUND + 69} color={[C.coral, C.teal, C.mustard, C.lavender, C.sky, C.orange][i]} s={1.2} />
        ))}
        <Palm x={180} ground={GROUND} h={240} />
        <Palm x={1780} ground={GROUND} h={260} />
        <Palm x={560} ground={GROUND} h={180} />
        <Palm x={1110} ground={GROUND} h={170} />
        {/* privacy shield */}
        <g transform={`translate(1700 170) scale(${1.15 * pop(9.6)})`}>
          <circle r={88} fill={C.paper} />
          <ShieldIcon />
        </g>
      </Svg>
      {/* Vision 2030 badge */}
      <div
        dir="rtl"
        style={{
          position: "absolute",
          top: 70,
          left: 110,
          opacity: tw(4.8, 5.4),
          scale: String(0.8 + 0.2 * pop(4.8)),
        }}
      >
        <div
          style={{
            fontFamily,
            fontWeight: 900,
            fontSize: 64,
            color: C.white,
            backgroundColor: C.tealDark,
            borderRadius: 60,
            padding: "8px 56px 18px",
          }}
        >
          رؤية السعودية 2030
        </div>
      </div>
      <Captions
        chunks={[
          {
            text: "وفي المملكة العربية السعودية، تزداد أهمية توظيف التقنيات الحديثة",
            from: 0.6,
            to: 4.8,
          },
          {
            text: "لبناء مدن أكثر ذكاءً واستدامة، بما ينسجم مع مستهدفات رؤية السعودية 2030",
            from: 4.8,
            to: 9.2,
          },
          {
            text: "ويمكن للذكاء الاصطناعي أن يسهم في تطوير أنظمة النقل وتحسين جودة الحياة",
            from: 9.2,
            to: 11.8,
          },
          {
            text: "مع الحرص على حماية خصوصية مستخدمي الطرق ودقة البيانات",
            from: 11.8,
            to: 14,
          },
        ]}
      />
    </>
  );
};

export const Scene09Saudi = Interactive.create({
  Component: SaudiInner,
  layout: "absolute-fill",
});

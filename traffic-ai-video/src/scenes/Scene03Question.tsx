import { Interactive } from "remotion";
import { C, useAnim } from "../theme";
import { Headline, Svg } from "../ui";

// Radar sweeping over a road grid, spotting jams before they happen
const hotspots: [number, number, number][] = [
  [830, 500, 1.2],
  [1150, 640, 2.4],
  [920, 780, 3.6],
  [1240, 470, 5.0],
  [760, 690, 6.4],
];

const QuestionInner = () => {
  const { sec, tw, pop } = useAnim();
  const cx = 960;
  const cy = 630;
  const sweep = sec * 90;
  const q2 = tw(5.2, 5.8);
  return (
    <>
      <Svg>
        <g opacity={tw(0, 0.8)}>
          <circle cx={cx} cy={cy} r={330} fill={C.ink} />
          {[110, 220, 330].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.inkSoft} strokeWidth={4} />
          ))}
          {/* streets inside radar */}
          <g stroke={C.inkSoft} strokeWidth={22} strokeLinecap="round" opacity={0.9}>
            <line x1={700} y1={500} x2={1220} y2={500} />
            <line x1={660} y1={700} x2={1260} y2={700} />
            <line x1={850} y1={330} x2={850} y2={930} />
            <line x1={1120} y1={350} x2={1120} y2={910} />
          </g>
          <path
            d={`M ${cx} ${cy} L ${cx + 330} ${cy} A 330 330 0 0 0 ${cx + 330 * Math.cos(-Math.PI / 4)} ${cy + 330 * Math.sin(-Math.PI / 4)} Z`}
            fill={C.teal}
            opacity={0.45}
            transform={`rotate(${sweep} ${cx} ${cy})`}
          />
          <line
            x1={cx}
            y1={cy}
            x2={cx + 330}
            y2={cy}
            stroke={C.green}
            strokeWidth={6}
            transform={`rotate(${sweep} ${cx} ${cy})`}
          />
          {hotspots.map(([x, y, at], i) => {
            const p = pop(at);
            return (
              <g key={i} transform={`translate(${x} ${y}) scale(${p})`}>
                <circle r={34 + ((sec * 30) % 20)} fill={C.coral} opacity={0.25} />
                <circle r={18} fill={C.coral} />
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r={14} fill={C.green} />
        </g>
        {/* question bubbles */}
        <g transform={`translate(330 520) scale(${pop(0.8)}) rotate(-8)`}>
          <circle r={110} fill={C.mustard} />
          <text x={0} y={52} fontSize={170} fontWeight={900} textAnchor="middle" fill={C.ink} fontFamily="Cairo">
            ؟
          </text>
        </g>
        <g transform={`translate(1600 720) scale(${pop(5.4)}) rotate(10)`}>
          <circle r={90} fill={C.coral} />
          <text x={0} y={44} fontSize={140} fontWeight={900} textAnchor="middle" fill={C.white} fontFamily="Cairo">
            ؟
          </text>
        </g>
      </Svg>
      <div style={{ position: "absolute", top: 70, left: 120, right: 120 }}>
        <Headline
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            fontSize: 82,
            opacity: tw(0.5, 1) * (1 - q2),
            translate: `0 ${(1 - tw(0.5, 1.1)) * 30}px`,
          }}
        >
          ولكن، ماذا لو استطعنا التنبؤ بالزحام قبل حدوثه؟
        </Headline>
        <Headline
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            fontSize: 82,
            opacity: q2,
            translate: `0 ${(1 - q2) * 30}px`,
          }}
        >
          وهل يمكن للذكاء الاصطناعي أن يجعل طرقنا أكثر انسيابية؟
        </Headline>
      </div>
    </>
  );
};

export const Scene03Question = Interactive.create({
  Component: QuestionInner,
  layout: "absolute-fill",
});

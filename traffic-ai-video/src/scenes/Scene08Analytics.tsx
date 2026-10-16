import { Interactive } from "remotion";
import { Check, PinIcon } from "../elements";
import { C, fontFamily, useAnim } from "../theme";
import { Captions, SectionTag, Svg } from "../ui";

const bars = [0.35, 0.55, 0.9, 0.6, 0.45, 0.8, 0.3];
const line: [number, number][] = [
  [380, 730], [460, 690], [540, 710], [620, 630], [700, 650], [780, 580], [860, 600], [920, 565],
];
const hotspots: [number, number][] = [
  [1130, 380],
  [1380, 520],
  [1220, 650],
];

const AnalyticsInner = () => {
  const { sec, tw, pop } = useAnim();
  const screen = tw(0, 0.8);
  const lineDraw = tw(2, 4.5);
  const lineLen = 700;
  return (
    <>
      <Svg>
        <g opacity={screen} transform={`translate(0 ${(1 - screen) * 50})`}>
          {/* monitor */}
          <rect x={900} y={820} width={120} height={50} fill={C.inkSoft} />
          <rect x={780} y={860} width={360} height={24} rx={12} fill={C.ink} />
          <rect x={300} y={220} width={1320} height={610} rx={36} fill={C.ink} />
          <rect x={330} y={250} width={1260} height={550} rx={22} fill={C.paper} />
          {/* bar chart */}
          <text x={940} y={300} textAnchor="start" fontSize={34} fontWeight={700} fill={C.ink} fontFamily={fontFamily} direction="rtl">
            أوقات الذروة
          </text>
          {bars.map((b, i) => {
            const h = 150 * b * tw(0.8 + i * 0.12, 1.8 + i * 0.12);
            return (
              <rect key={i} x={380 + i * 80} y={470 - h} width={50} height={h} rx={8} fill={b > 0.7 ? C.coral : C.teal} />
            );
          })}
          <rect x={370} y={470} width={570} height={5} fill={C.ink} opacity={0.3} />
          {/* line chart */}
          <text x={940} y={530} textAnchor="start" fontSize={34} fontWeight={700} fill={C.ink} fontFamily={fontFamily} direction="rtl">
            حجم الحركة
          </text>
          <polyline
            points={line.map((p) => p.join(",")).join(" ")}
            stroke={C.lavender}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={lineLen}
            strokeDashoffset={lineLen * (1 - lineDraw)}
          />
          <rect x={370} y={760} width={570} height={5} fill={C.ink} opacity={0.3} />
          {/* city map panel */}
          <rect x={990} y={280} width={570} height={490} rx={20} fill={C.inkSoft} />
          <g stroke={C.road} strokeWidth={26} strokeLinecap="round">
            <line x1={1020} y1={380} x2={1530} y2={380} />
            <line x1={1020} y1={520} x2={1530} y2={520} />
            <line x1={1020} y1={650} x2={1530} y2={650} />
            <line x1={1130} y1={300} x2={1130} y2={750} />
            <line x1={1380} y1={300} x2={1380} y2={750} />
            <line x1={1220} y1={520} x2={1220} y2={750} />
          </g>
          {hotspots.map(([x, y], i) => {
            const appear = pop(6.8 + i * 0.5);
            const fixed = tw(9.8 + i * 0.4, 10.3 + i * 0.4);
            const pulse = 50 + ((sec * 40 + i * 15) % 30);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={pulse * appear} fill={fixed > 0.5 ? C.green : C.red} opacity={0.3} />
                <g transform={`translate(${x} ${y}) scale(${appear * (1 - fixed)})`}>
                  <PinIcon color={C.red} />
                </g>
                <g transform={`translate(${x} ${y - 20}) scale(${pop(9.8 + i * 0.4)})`}>
                  <Check />
                </g>
              </g>
            );
          })}
        </g>
      </Svg>
      <SectionTag num="٣" label="تحليل البيانات المرورية" color={C.mustard} />
      <Captions
        chunks={[
          {
            text: "تحليل البيانات المرورية لمساعدة الجهات المختصة على التخطيط للطرق",
            from: 0.6,
            to: 6.6,
          },
          {
            text: "وتحديد مواقع الاختناقات المتكررة، والعمل على معالجتها بطرق أكثر كفاءة",
            from: 6.6,
            to: 12,
          },
        ]}
      />
    </>
  );
};

export const Scene08Analytics = Interactive.create({
  Component: AnalyticsInner,
  layout: "absolute-fill",
});

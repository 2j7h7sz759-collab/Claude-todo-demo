import type React from "react";
import { Interactive } from "remotion";
import { BulbIcon, ClockIcon, LeafIcon, TopCar } from "../elements";
import { C, fontFamily, useAnim } from "../theme";
import { Captions, Label, Svg } from "../ui";

const carColors = [C.coral, C.teal, C.mustard, C.lavender, C.sky, C.orange];

// Top-down road panel: lanes, cars, flowing or stuck
const RoadPanel: React.FC<{
  cx: number;
  lanes: number;
  flow: number;
  smart: boolean;
}> = ({ cx, lanes, flow, smart }) => {
  const { sec } = useAnim();
  const laneW = 70;
  const w = lanes * laneW;
  const top = 300;
  const h = 470;
  return (
    <g>
      <rect x={cx - w / 2 - 14} y={top} width={w + 28} height={h} fill={C.sandDark} />
      <rect x={cx - w / 2} y={top} width={w} height={h} fill={C.road} />
      {Array.from({ length: lanes - 1 }).map((_, i) => (
        <line key={i} x1={cx - w / 2 + (i + 1) * laneW} y1={top} x2={cx - w / 2 + (i + 1) * laneW} y2={top + h} stroke={C.cream} strokeWidth={5} strokeDasharray="24 22" opacity={0.7} />
      ))}
      <clipPath id={`clip-${cx}`}>
        <rect x={cx - w / 2} y={top} width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#clip-${cx})`}>
        {Array.from({ length: lanes }).map((_, l) =>
          [0, 1, 2, 3, 4, 5].map((k) => {
            const spacing = smart ? 150 : 78;
            const base = top + 40 + k * spacing + (l % 2) * 30;
            const y = ((base - sec * flow * (smart ? 1 : 0.08) - top) % (h + 80) + h + 80) % (h + 80) + top - 40;
            return (
              <TopCar key={`${l}-${k}`} x={cx - w / 2 + laneW / 2 + l * laneW} y={y} color={carColors[(l * 3 + k) % 6]} rot={-90} s={0.95} />
            );
          }),
        )}
      </g>
      {smart ? (
        <g opacity={0.9}>
          <circle cx={cx} cy={top + 40} r={36} fill={C.lavender} />
          <text x={cx} y={top + 52} textAnchor="middle" fontSize={32} fontWeight={900} fill={C.white} fontFamily={fontFamily}>
            AI
          </text>
        </g>
      ) : null}
    </g>
  );
};

const ConclusionInner = () => {
  const { sec, tw, pop } = useAnim();
  const part2 = tw(5.6, 6.2);
  const lanes = sec < 1.6 ? 2 : sec < 2.6 ? 3 : 4;
  const benefits = [
    { x: 1440, label: "قرارات أفضل", at: 6.4 },
    { x: 960, label: "توفير الوقت", at: 7.6 },
    { x: 480, label: "وقود وتلوث أقل", at: 8.8 },
  ];
  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - part2 }}>
        <Svg>
          <g opacity={tw(0.2, 0.8)}>
            <RoadPanel cx={1360} lanes={lanes} flow={200} smart={false} />
            <RoadPanel cx={560} lanes={2} flow={220} smart />
            <path d="M 1050 520 L 880 520" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
            <path d="M 910 490 L 870 520 L 910 550" stroke={C.ink} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* not enough */}
          <g transform={`translate(1360 520) scale(${pop(3)})`} opacity={1}>
            <circle r={60} fill={C.red} />
            <path d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke={C.white} strokeWidth={12} strokeLinecap="round" />
          </g>
          <g transform={`translate(560 520) scale(${pop(4)})`}>
            <g transform="scale(1.7)">
              <circle r={36} fill={C.white} opacity={0.6} />
            </g>
            <g transform="scale(1.7)">
              <path d="M -15 0 L -4 12 L 16 -12" stroke={C.green} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </Svg>
        <Label style={{ position: "absolute", top: 170, left: 1060, width: 600, fontSize: 52, fontWeight: 900, opacity: tw(0.4, 0.9) }}>
          توسيع الطرق فقط
        </Label>
        <Label style={{ position: "absolute", top: 170, left: 160, width: 800, fontSize: 52, fontWeight: 900, color: C.tealDark, opacity: tw(3.5, 4) }}>
          البيانات والتقنيات بذكاء
        </Label>
      </div>
      <Svg>
        {benefits.map((b, i) => {
          const p = pop(b.at) * part2;
          return (
            <g key={i} transform={`translate(${b.x} 480) scale(${p})`}>
              <circle r={170} fill={C.paper} />
              <circle r={170} fill="none" stroke={[C.mustard, C.coral, C.green][i]} strokeWidth={12} />
              <g transform="scale(1.9)">
                {i === 0 ? <BulbIcon /> : null}
                {i === 1 ? <ClockIcon angle={sec * 200} color={C.coral} /> : null}
                {i === 2 ? <LeafIcon /> : null}
              </g>
            </g>
          );
        })}
      </Svg>
      {benefits.map((b, i) => (
        <Label key={i} style={{ position: "absolute", top: 680, left: b.x - 250, width: 500, fontSize: 56, fontWeight: 900, opacity: tw(b.at + 0.2, b.at + 0.6) * part2 }}>
          {b.label}
        </Label>
      ))}
      <Captions
        chunks={[
          {
            text: "إن حل مشكلة الزحام المروري لا يعتمد على توسيع الطرق فقط، بل على استخدام البيانات والتقنيات بذكاء",
            from: 0.6,
            to: 5.6,
          },
          {
            text: "فالذكاء الاصطناعي يمكن أن يساعدنا على اتخاذ قرارات أفضل، وتوفير الوقت، وتقليل استهلاك الوقود والتلوث",
            from: 5.6,
            to: 11,
          },
        ]}
      />
    </>
  );
};

export const Scene10Conclusion = Interactive.create({
  Component: ConclusionInner,
  layout: "absolute-fill",
});

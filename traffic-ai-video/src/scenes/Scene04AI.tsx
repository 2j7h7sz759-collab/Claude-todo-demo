import type React from "react";
import { Interactive } from "remotion";
import {
  BulbIcon,
  CameraIcon,
  ChipIcon,
  PatternIcon,
  SensorIcon,
  TopCar,
} from "../elements";
import { C, useAnim } from "../theme";
import { Captions, Label, Svg } from "../ui";

const CHIP: [number, number] = [960, 390];
// Inputs on the right (RTL start), outputs on the left
const inputs = [
  { y: 150, label: "حركة المركبات", at: 3.8 },
  { y: 390, label: "كاميرات المرور", at: 4.8 },
  { y: 630, label: "أجهزة الاستشعار", at: 5.8 },
];
const outputs = [
  { y: 150, label: "أنماط الازدحام", at: 9.2 },
  { y: 390, label: "التنبؤ بالذروة", at: 12.8 },
  { y: 630, label: "حلول مقترحة", at: 14.2 },
];
const IN_X = 1560;
const OUT_X = 360;

const Packets: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  start: number;
  color: string;
}> = ({ x1, y1, x2, y2, start, color }) => {
  const { sec, tw } = useAnim();
  const vis = tw(start, start + 0.6);
  return (
    <g opacity={vis}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.ink} strokeOpacity={0.15} strokeWidth={8} strokeDasharray="4 18" strokeLinecap="round" />
      {[0, 1, 2].map((i) => {
        const p = (sec * 0.6 + i / 3) % 1;
        return (
          <circle key={i} cx={x1 + (x2 - x1) * p} cy={y1 + (y2 - y1) * p} r={12} fill={color} />
        );
      })}
    </g>
  );
};

const AIInner = () => {
  const { frame, sec, tw, pop } = useAnim();
  const chipP = pop(0.5, 9);
  return (
    <>
      <Svg>
        {inputs.map((inp, i) => (
          <Packets key={i} x1={IN_X - 95} y1={inp.y} x2={CHIP[0] + 160} y2={CHIP[1]} start={inp.at} color={C.teal} />
        ))}
        {outputs.map((o, i) => (
          <Packets key={i} x1={CHIP[0] - 160} y1={CHIP[1]} x2={OUT_X + 95} y2={o.y} start={o.at} color={C.coral} />
        ))}
        <g transform={`translate(${CHIP[0]} ${CHIP[1]}) scale(${chipP * (1 + Math.sin(frame / 8) * 0.015)})`}>
          <ChipIcon glow={(Math.sin(frame / 9) + 1) / 2} />
        </g>
        {inputs.map((inp, i) => {
          const p = pop(inp.at);
          return (
            <g key={i} transform={`translate(${IN_X} ${inp.y}) scale(${p * 0.85})`}>
              <circle r={95} fill={C.paper} stroke={C.teal} strokeWidth={8} />
              {i === 0 ? (
                <g>
                  <TopCar x={-10} y={-22} color={C.coral} s={1.3} rot={((sec * 60) % 20) - 10} />
                  <TopCar x={14} y={26} color={C.mustard} s={1.3} />
                </g>
              ) : null}
              {i === 1 ? <CameraIcon /> : null}
              {i === 2 ? (
                <g transform="translate(0 4)">
                  <SensorIcon t={sec * 0.8} />
                </g>
              ) : null}
            </g>
          );
        })}
        {outputs.map((o, i) => {
          const p = pop(o.at);
          return (
            <g key={i} transform={`translate(${OUT_X} ${o.y}) scale(${p * 0.85})`}>
              <circle r={95} fill={C.paper} stroke={C.coral} strokeWidth={8} />
              {i === 0 ? <PatternIcon /> : null}
              {i === 1 ? (
                <g transform="scale(0.9)">
                  <circle r={52} fill={C.mustard} />
                  <circle r={40} fill={C.cream} />
                  <path d={`M 0 0 L 0 -30`} stroke={C.ink} strokeWidth={7} strokeLinecap="round" transform={`rotate(${sec * 120})`} />
                  <circle r={6} fill={C.ink} />
                </g>
              ) : null}
              {i === 2 ? <BulbIcon /> : null}
            </g>
          );
        })}
      </Svg>
      {inputs.map((inp, i) => (
        <Label
          key={`il${i}`}
          style={{ position: "absolute", left: IN_X - 200, width: 400, top: inp.y + 78, fontSize: 40, opacity: tw(inp.at + 0.2, inp.at + 0.6) }}
        >
          {inp.label}
        </Label>
      ))}
      {outputs.map((o, i) => (
        <Label
          key={`ol${i}`}
          style={{ position: "absolute", left: OUT_X - 200, width: 400, top: o.y + 78, fontSize: 40, opacity: tw(o.at + 0.2, o.at + 0.6) }}
        >
          {o.label}
        </Label>
      ))}
      <Captions
        chunks={[
          { text: "هنا يأتي دور الذكاء الاصطناعي!", from: 0.6, to: 3.6 },
          {
            text: "فمن خلال تحليل بيانات حركة المركبات، وكاميرات المرور، وأجهزة الاستشعار",
            from: 3.6,
            to: 9,
          },
          {
            text: "يستطيع الذكاء الاصطناعي اكتشاف أنماط الازدحام",
            from: 9,
            to: 12.6,
          },
          {
            text: "والتنبؤ بالأوقات والطرق الأكثر ازدحامًا، واقتراح حلول تساعد على تحسين حركة المرور",
            from: 12.6,
            to: 16,
          },
        ]}
      />
    </>
  );
};

export const Scene04AI = Interactive.create({
  Component: AIInner,
  layout: "absolute-fill",
});

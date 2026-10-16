import { Interactive } from "remotion";
import { ChartIcon, RouteIcon, TrafficLight } from "../elements";
import { C, fontFamily, useAnim } from "../theme";
import { Captions, Headline, Svg } from "../ui";

const cards = [
  { x: 1440, num: "١", label: "إشارات ذكية", color: C.teal, at: 0.9 },
  { x: 960, num: "٢", label: "طرق بديلة", color: C.coral, at: 1.3 },
  { x: 480, num: "٣", label: "تحليل البيانات", color: C.mustard, at: 1.7 },
];

const SolutionsInner = () => {
  const { tw, pop } = useAnim();
  return (
    <>
      <Headline
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          fontSize: 110,
          opacity: tw(0.3, 0.8),
          translate: `0 ${(1 - tw(0.3, 0.9)) * 40}px`,
        }}
      >
        ثلاثة حلول رئيسية
      </Headline>
      <Svg>
        {cards.map((c, i) => {
          const p = pop(c.at);
          return (
            <g key={i} transform={`translate(${c.x} 560) scale(${p})`}>
              <rect x={-200} y={-210} width={400} height={420} rx={40} fill={C.paper} />
              <rect x={-200} y={-210} width={400} height={420} rx={40} fill="none" stroke={c.color} strokeWidth={10} />
              <circle cx={0} cy={-210} r={56} fill={c.color} />
              <text x={0} y={-186} textAnchor="middle" fontSize={72} fontWeight={900} fill={C.white} fontFamily={fontFamily}>
                {c.num}
              </text>
              <g transform="translate(0 -10)">
                {i === 0 ? (
                  <g transform="translate(0 50) scale(0.42)">
                    <TrafficLight x={0} y={0} state="green" />
                  </g>
                ) : null}
                {i === 1 ? (
                  <g transform="scale(1.4)">
                    <RouteIcon />
                  </g>
                ) : null}
                {i === 2 ? (
                  <g transform="scale(1.4)">
                    <ChartIcon />
                  </g>
                ) : null}
              </g>
              <text x={0} y={160} textAnchor="middle" fontSize={50} fontWeight={900} fill={C.ink} fontFamily={fontFamily} direction="rtl">
                {c.label}
              </text>
            </g>
          );
        })}
      </Svg>
      <Captions
        chunks={[
          {
            text: "ويمكن تطبيق هذه التقنية من خلال ثلاثة حلول رئيسية",
            from: 0.5,
            to: 4,
          },
        ]}
      />
    </>
  );
};

export const Scene05Solutions = Interactive.create({
  Component: SolutionsInner,
  layout: "absolute-fill",
});

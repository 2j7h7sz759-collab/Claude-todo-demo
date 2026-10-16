import { Interactive } from "remotion";
import { Car, Road, TrafficLight } from "../elements";
import { C, fontFamily, useAnim } from "../theme";
import { Captions, SectionTag, Svg } from "../ui";

const colors = [C.coral, C.teal, C.mustard, C.lavender, C.sky, C.orange];
const GREEN_AT = 5.2;

const SmartLightsInner = () => {
  const { sec, tw } = useAnim();
  const state = sec < GREEN_AT - 0.6 ? "red" : sec < GREEN_AT ? "yellow" : "green";
  const density = tw(0.8, 4.2, [0, 0.86]) - tw(7.5, 11, [0, 0.6]);
  const greenSecs = Math.round(tw(3.2, 5, [20, 45]));
  const greenBar = tw(3.2, 5, [0.35, 0.8]);
  return (
    <>
      <Svg>
        <rect x={0} y={560} width={1920} height={520} fill={C.sand} />
        <Road y={600} h={250} />
        {/* stop line + crosswalk */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={1460} y={612 + i * 40} width={90} height={22} rx={4} fill={C.cream} opacity={0.85} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const arrive = tw(0.4 + i * 0.45, 1.6 + i * 0.45);
          const go = Math.max(0, sec - GREEN_AT - 0.2 - i * 0.18);
          const x = 1330 - i * 225 - (1 - arrive) * 1400 + go * go * 160 + go * 120;
          return <Car key={i} x={x} y={760} color={colors[i]} s={0.9} />;
        })}
        {/* opposite lane flowing */}
        {[0, 1, 2].map((i) => (
          <Car key={`o${i}`} x={((2400 - sec * 260 - i * 700) % 2600) - 200} y={840} color={colors[(i + 2) % 6]} s={0.75} flip />
        ))}
        <TrafficLight x={1640} y={540} state={state} s={0.9} />
        {/* AI eye on the light */}
        <g transform="translate(1790 300)">
          <circle r={34} fill={C.lavender} />
          <text y={12} textAnchor="middle" fontSize={32} fontWeight={900} fill={C.white} fontFamily={fontFamily}>
            AI
          </text>
        </g>
        {/* dashboard panel */}
        <g opacity={tw(0.6, 1.2)}>
          <rect x={120} y={210} width={760} height={300} rx={34} fill={C.paper} />
          <text x={830} y={280} textAnchor="start" fontSize={40} fontWeight={700} fill={C.ink} fontFamily={fontFamily} direction="rtl">
            كثافة المركبات
          </text>
          <rect x={170} y={300} width={660} height={40} rx={20} fill={C.sand} />
          <rect x={830 - 660 * density} y={300} width={660 * density} height={40} rx={20} fill={density > 0.6 ? C.coral : C.teal} />
          <text x={830} y={410} textAnchor="start" fontSize={40} fontWeight={700} fill={C.ink} fontFamily={fontFamily} direction="rtl">
            مدة الإشارة الخضراء
          </text>
          <text x={170} y={410} fontSize={44} fontWeight={900} fill={C.green} fontFamily={fontFamily}>
            {`${greenSecs} ث`}
          </text>
          <rect x={170} y={432} width={660} height={40} rx={20} fill={C.sand} />
          <rect x={830 - 660 * greenBar} y={432} width={660 * greenBar} height={40} rx={20} fill={C.green} />
        </g>
      </Svg>
      <SectionTag num="١" label="إشارات مرور ذكية" color={C.teal} />
      <Captions
        chunks={[
          {
            text: "إشارات مرور ذكية تعدّل مدة الإشارة الخضراء وفقًا لكثافة المركبات",
            from: 0.6,
            to: 6.6,
          },
          {
            text: "مما يساعد على تقليل الانتظار وتحسين انسيابية السير",
            from: 6.6,
            to: 12,
          },
        ]}
      />
    </>
  );
};

export const Scene06SmartLights = Interactive.create({
  Component: SmartLightsInner,
  layout: "absolute-fill",
});

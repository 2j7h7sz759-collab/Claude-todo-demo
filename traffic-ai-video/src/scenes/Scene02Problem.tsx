import { Interactive } from "remotion";
import {
  Car,
  ClockIcon,
  FactoryIcon,
  FuelIcon,
  Puff,
  Road,
  Skyline,
} from "../elements";
import { C, useAnim } from "../theme";
import { Captions, Label, Svg } from "../ui";

const colors = [C.coral, C.teal, C.mustard, C.lavender, C.sky, C.orange, C.inkSoft];

const ProblemInner = () => {
  const { frame, sec, tw, pop } = useAnim();
  // Cars roll in and get stuck bumper-to-bumper
  const arrive = tw(0, 2.5);
  const badges = [
    { at: 7.2, label: "إهدار الوقت", color: C.coral, x: 1420 },
    { at: 9.2, label: "استهلاك الوقود", color: C.mustard, x: 960 },
    { at: 11.2, label: "ارتفاع التلوث", color: C.inkSoft, x: 500 },
  ];
  return (
    <>
      <Svg>
        <g opacity={0.45}>
          <Skyline ground={560} />
        </g>
        <rect x={0} y={560} width={1920} height={520} fill={C.sand} />
        <Road y={600} h={300} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const jitter = Math.sin(frame / 3 + i) * (sec > 2.5 ? 1.5 : 0);
          return (
            <Car
              key={`a${i}`}
              x={-260 + i * 235 + (1 - arrive) * -900 + jitter}
              y={715}
              color={colors[i % colors.length]}
              s={0.95}
            />
          );
        })}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Car
            key={`b${i}`}
            x={2160 - i * 235 + (1 - arrive) * 900}
            y={865}
            color={colors[(i + 3) % colors.length]}
            s={0.95}
            flip
          />
        ))}
        {/* exhaust smoke rising from the jam */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const p = ((sec * 0.35 + i / 6) % 1) * tw(2, 4);
          return (
            <Puff
              key={i}
              x={150 + i * 320 + p * 40}
              y={640 - p * 260}
              r={18 + p * 40}
              opacity={(1 - p) * 0.7 * tw(2, 4)}
            />
          );
        })}
        {/* honk marks */}
        {sec > 3 && Math.floor(sec * 2) % 3 === 0 ? (
          <g stroke={C.red} strokeWidth={8} strokeLinecap="round">
            <line x1={1010} y1={590} x2={1040} y2={560} />
            <line x1={1030} y1={604} x2={1070} y2={596} />
            <line x1={640} y1={590} x2={610} y2={560} />
          </g>
        ) : null}
        {badges.map((b, i) => {
          const p = pop(b.at);
          return (
            <g key={i} transform={`translate(${b.x} 260) scale(${p})`}>
              <circle r={120} fill={C.paper} />
              <circle r={120} fill="none" stroke={b.color} strokeWidth={10} />
              <g transform="scale(1.2)">
                {i === 0 ? <ClockIcon angle={sec * 240} /> : null}
                {i === 1 ? <FuelIcon level={Math.max(0.1, 1 - tw(9.2, 14))} /> : null}
                {i === 2 ? <FactoryIcon /> : null}
              </g>
            </g>
          );
        })}
      </Svg>
      {badges.map((b, i) => (
        <Label
          key={i}
          style={{
            position: "absolute",
            top: 395,
            left: b.x - 220,
            width: 440,
            fontSize: 48,
            fontWeight: 900,
            opacity: tw(b.at + 0.2, b.at + 0.6),
          }}
        >
          {b.label}
        </Label>
      ))}
      <Captions
        chunks={[
          {
            text: "في كل يوم، يواجه آلاف الأشخاص مشكلة الزحام المروري",
            from: 0.6,
            to: 6.6,
          },
          {
            text: "التي تؤدي إلى إهدار الوقت، وزيادة استهلاك الوقود، وارتفاع مستويات التلوث",
            from: 6.6,
            to: 15,
          },
        ]}
      />
    </>
  );
};

export const Scene02Problem = Interactive.create({
  Component: ProblemInner,
  layout: "absolute-fill",
});

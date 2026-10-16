import { Interactive } from "remotion";
import { Car, ChipIcon, Road, Skyline } from "../elements";
import { C, useAnim } from "../theme";
import { Headline, Svg } from "../ui";

const OutroInner = () => {
  const { frame, tw, pop } = useAnim();
  const p1 = pop(0.4);
  const p2 = pop(1.4);
  return (
    <>
      <Svg>
        <Skyline ground={760} />
        <rect x={0} y={760} width={1920} height={320} fill={C.sand} />
        <Road y={800} h={200} offset={-frame * 9} />
        {[0, 1, 2, 3].map((i) => (
          <Car key={i} x={((i * 520 + frame * 10) % 2400) - 240} y={880} color={[C.coral, C.teal, C.mustard, C.lavender][i]} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <Car key={`b${i}`} x={2160 - ((i * 560 + frame * 9) % 2400)} y={985} color={[C.sky, C.orange, C.green, C.inkSoft][i]} flip />
        ))}
        <g transform={`translate(960 210) scale(${0.5 * pop(0.1)})`}>
          <ChipIcon glow={(Math.sin(frame / 9) + 1) / 2} />
        </g>
      </Svg>
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: C.paper,
            borderRadius: 44,
            padding: "20px 80px 36px",
            boxShadow: "0 14px 0 rgba(30,42,63,0.15)",
            scale: String(0.7 + 0.3 * p1),
            opacity: Math.min(1, p1 * 1.5),
          }}
        >
          <Headline style={{ fontSize: 120, color: C.coral }}>
            الذكاء الاصطناعي…
          </Headline>
          <Headline
            style={{
              fontSize: 84,
              opacity: Math.min(1, p2 * 1.5),
              translate: `0 ${(1 - p2) * 30}px`,
            }}
          >
            نحو تنقّل أذكى، ومدن أفضل.
          </Headline>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: C.cream,
          opacity: tw(6.2, 7),
        }}
      />
    </>
  );
};

export const Scene11Outro = Interactive.create({
  Component: OutroInner,
  layout: "absolute-fill",
});

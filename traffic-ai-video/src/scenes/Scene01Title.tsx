import { Interactive } from "remotion";
import { Car, ChipIcon, Road, Skyline } from "../elements";
import { C, useAnim } from "../theme";
import { Headline, Svg } from "../ui";

const TitleInner = () => {
  const { frame, tw, pop } = useAnim();
  const p1 = pop(0.6);
  const p2 = pop(1.1);
  return (
    <>
      <Svg>
        <circle cx={1760} cy={170} r={120} fill={C.mustard} opacity={tw(0, 1.2)} />
        <g opacity={0.9}>
          <Skyline ground={760} rise={tw(0, 2)} />
        </g>
        <rect x={0} y={760} width={1920} height={320} fill={C.sand} />
        <Road y={800} h={200} offset={-frame * 4} />
        <Car x={-200 + frame * 6} y={880} color={C.coral} />
        <Car x={500 + frame * 5} y={880} color={C.teal} />
        <Car x={1200 + frame * 5.5} y={880} color={C.mustard} />
        <Car x={2100 - frame * 6} y={985} color={C.lavender} flip />
        <Car x={1300 - frame * 5} y={985} color={C.sky} flip />
        <Car x={600 - frame * 5.5} y={985} color={C.orange} flip />
        <g
          transform={`translate(1760 170) scale(${0.42 * pop(1.6)}) rotate(${Math.sin(frame / 20) * 4})`}
        >
          <ChipIcon glow={(Math.sin(frame / 10) + 1) / 2} />
        </g>
      </Svg>
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: C.paper,
            padding: "30px 80px 44px",
            borderRadius: 44,
            boxShadow: "0 14px 0 rgba(30,42,63,0.15)",
            scale: String(0.6 + 0.4 * p1),
            opacity: Math.min(1, p1 * 1.5),
          }}
        >
          <Headline style={{ fontSize: 140, color: C.coral }}>
            الذكاء الاصطناعي
          </Headline>
          <Headline
            style={{
              fontSize: 90,
              opacity: Math.min(1, p2 * 1.5),
              translate: `0 ${(1 - p2) * 30}px`,
            }}
          >
            في مواجهة الزحام المروري
          </Headline>
        </div>
      </div>
    </>
  );
};

export const Scene01Title = Interactive.create({
  Component: TitleInner,
  layout: "absolute-fill",
});

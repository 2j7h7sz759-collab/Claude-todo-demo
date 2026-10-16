import { Interactive } from "remotion";
import { FilmFinish, Stage, Subtitles } from "../kit/film";
import { TopCar, TrafficLight, bezier, along, ptsD, polyLen } from "../kit/props";
import { fontFamily, useAnim } from "../theme";

// Three full-height poster panels wiping in (RTL: first panel on the right)
const panels = [
  { x: 1280, bg: "#F2C14E", ink: "#3B2F14", num: "١", label: "إشارات ذكية", at: 0.3 },
  { x: 640, bg: "#EE6C4D", ink: "#3A1710", num: "٢", label: "طرق بديلة", at: 0.6 },
  { x: 0, bg: "#3D348B", ink: "#F4F1FF", num: "٣", label: "تحليل البيانات", at: 0.9 },
];

const curve = bezier([100, 1100], [120, 700], [520, 600], [540, 200], 40);

const ThreeInner = () => {
  const { sec, tw } = useAnim();
  return (
    <>
      <Stage>
        <rect width={1920} height={1080} fill="#1B1B3A" />
        {panels.map((p, i) => {
          const wipe = tw(p.at, p.at + 0.7);
          return (
            <g key={i}>
              <clipPath id={`pclip${i}`}>
                <rect x={p.x + 640 * (1 - wipe)} y={0} width={640 * wipe} height={1080} />
              </clipPath>
              <g clipPath={`url(#pclip${i})`}>
                <rect x={p.x} y={0} width={640} height={1080} fill={p.bg} />
                <g transform={`translate(${p.x} ${(1 - wipe) * 60})`}>
                  {i === 0 ? (
                    <>
                      <circle cx={320} cy={360} r={230} fill="#FFFFFF" opacity={0.18} />
                      <TrafficLight x={320} y={560} s={0.9} state={sec > 2 ? "green" : "red"} />
                    </>
                  ) : null}
                  {i === 1 ? (
                    <>
                      <path d={ptsD(curve)} stroke="#3A1710" strokeOpacity={0.35} strokeWidth={150} fill="none" />
                      <path d={ptsD(curve)} stroke="#FFFFFF" strokeWidth={8} strokeDasharray="30 26" fill="none" />
                      {(() => {
                        const c = along(curve, (sec * 260) % polyLen(curve));
                        return <TopCar x={c.x} y={c.y} a={c.a} body="#FFD166" s={1.4} />;
                      })()}
                      <path d="M 450 120 Q 500 120 500 170 Q 500 210 450 260 Q 400 210 400 170 Q 400 120 450 120 Z" fill="#FFFFFF" />
                      <circle cx={450} cy={170} r={18} fill="#EE6C4D" />
                    </>
                  ) : null}
                  {i === 2 ? (
                    <>
                      {[0, 1, 2, 3, 4].map((b) => {
                        const h = [160, 260, 380, 300, 460][b] * tw(p.at + 0.4 + b * 0.1, p.at + 1.2 + b * 0.1);
                        return <rect key={b} x={110 + b * 90} y={640 - h} width={60} height={h} rx={10} fill={b === 4 ? "#FFD166" : "#8F86E0"} />;
                      })}
                      <rect x={90} y={640} width={460} height={8} fill="#F4F1FF" opacity={0.5} />
                    </>
                  ) : null}
                  <text x={320} y={790} textAnchor="middle" fontSize={130} fontWeight={900} fill={p.ink} fontFamily={fontFamily}>
                    {p.num}
                  </text>
                  <text x={320} y={880} textAnchor="middle" fontSize={64} fontWeight={900} fill={p.ink} fontFamily={fontFamily} direction="rtl">
                    {p.label}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </Stage>
      <FilmFinish vignette={0.25} />
      <Subtitles lines={[{ text: "ويمكن تطبيق هذه التقنية من خلال ثلاثة حلول رئيسية", from: 0.5, to: 4 }]} />
    </>
  );
};

export const S05Three = Interactive.create({ Component: ThreeInner, layout: "absolute-fill" });

import { Interactive } from "remotion";
import { Camera, FilmFinish, Kicker, Stage, Subtitles } from "../kit/film";
import { useAnim } from "../theme";

// Traffic control room: planners in front of a wall of screens
const R = {
  wall: "#1E1C46",
  wallDark: "#16143A",
  floor: "#2A2760",
  desk: "#383484",
  deskTop: "#4A45A8",
  screen: "#0F2A4A",
  glow: "#57E1E6",
  hot: "#FF5A6E",
  ok: "#7CFFB2",
};

const hotspots: [number, number][] = [
  [820, 300],
  [1080, 430],
  [940, 520],
  [1170, 260],
];

const Planner = ({ x, look, point }: { x: number; look: { skin: string; hair: string; shirt: string; hairStyle?: "short" | "long" | "bun" | "cap" }; point: number }) => (
  <g transform={`translate(${x} 900)`}>
    {/* chair back */}
    <rect x={-70} y={-120} width={140} height={150} rx={30} fill="#141238" />
    {/* body from behind */}
    <path d="M -64 -10 Q -70 -150 0 -160 Q 70 -150 64 -10 Z" fill={look.shirt} />
    {/* pointing arm */}
    <path
      d={`M 40 -130 L ${80 + point * 60} ${-180 - point * 120}`}
      stroke={look.shirt}
      strokeWidth={26}
      strokeLinecap="round"
      opacity={point > 0.02 ? 1 : 0}
    />
    <circle cx={86 + point * 60} cy={-190 - point * 122} r={15} fill={look.skin} opacity={point > 0.02 ? 1 : 0} />
    {/* back of head */}
    <g transform="translate(0 -200) scale(1.25)">
      <ellipse rx={28} ry={30} fill={look.hair} />
      {look.hairStyle === "bun" ? <circle cx={0} cy={-30} r={14} fill={look.hair} /> : null}
      <ellipse cx={-27} cy={4} rx={5} ry={9} fill={look.skin} />
      <ellipse cx={27} cy={4} rx={5} ry={9} fill={look.skin} />
    </g>
  </g>
);

const ControlInner = () => {
  const { sec, tw } = useAnim();
  const point = tw(6.6, 7.4) * (1 - tw(11, 11.8));
  const scanY = 180 + ((sec * 160) % 440);
  return (
    <>
      <Camera from={{ scale: 1.0, x: 0, y: 0 }} to={{ scale: 1.14, x: 0, y: 60 }} end={12.5}>
        <Stage>
          <rect width={1920} height={1080} fill={R.wall} />
          <rect x={0} y={760} width={1920} height={320} fill={R.floor} />
          {/* screen glow on floor */}
          <ellipse cx={960} cy={800} rx={800} ry={70} fill={R.glow} opacity={0.12} />
          {/* side screens */}
          {[
            [130, 200, 440, 300],
            [1350, 200, 440, 300],
            [130, 530, 440, 190],
            [1350, 530, 440, 190],
          ].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x - 12} y={y - 12} width={w + 24} height={h + 24} rx={14} fill="#0B0A26" />
              <rect x={x} y={y} width={w} height={h} rx={6} fill={R.screen} />
              {i === 0
                ? [0, 1, 2, 3, 4, 5].map((b) => {
                    const hh = [80, 140, 210, 120, 180, 230][b] * tw(0.6 + b * 0.1, 1.6 + b * 0.1);
                    return <rect key={b} x={x + 40 + b * 66} y={y + h - 30 - hh} width={40} height={hh} rx={6} fill={b === 2 || b === 5 ? R.hot : R.glow} />;
                  })
                : null}
              {i === 1 ? (
                <polyline
                  points={[0, 1, 2, 3, 4, 5, 6, 7].map((k) => `${x + 30 + k * 54},${y + h - 60 - Math.abs(Math.sin(k * 1.3)) * 160}`).join(" ")}
                  stroke={R.glow}
                  strokeWidth={8}
                  fill="none"
                  strokeLinejoin="round"
                  strokeDasharray={`${tw(1, 3.5) * 520} 999`}
                />
              ) : null}
              {i >= 2
                ? [0, 1, 2].map((r) => (
                    <rect key={r} x={x + 30} y={y + 30 + r * 48} width={(w - 60) * (0.4 + 0.5 * Math.abs(Math.sin(sec * 0.6 + r + i)))} height={22} rx={11} fill={r === 1 ? R.ok : R.glow} opacity={0.75} />
                  ))
                : null}
            </g>
          ))}
          {/* main wall: live city map */}
          <rect x={628} y={148} width={664} height={584} rx={18} fill="#0B0A26" />
          <rect x={640} y={160} width={640} height={560} rx={8} fill={R.screen} />
          <g stroke="#1F4F7A" strokeWidth={22} strokeLinecap="round">
            <line x1={660} y1={300} x2={1260} y2={300} />
            <line x1={660} y1={430} x2={1260} y2={430} />
            <line x1={660} y1={560} x2={1260} y2={560} />
            <line x1={820} y1={180} x2={820} y2={700} />
            <line x1={1080} y1={180} x2={1080} y2={700} />
            <line x1={940} y1={430} x2={940} y2={700} />
            <line x1={1170} y1={180} x2={1170} y2={430} />
          </g>
          <rect x={640} y={scanY} width={640} height={4} fill={R.glow} opacity={0.5} />
          {hotspots.map(([x, y], i) => {
            const show = tw(6.8 + i * 0.4, 7.2 + i * 0.4);
            const fixed = tw(9.6 + i * 0.4, 10.2 + i * 0.4);
            const pulse = (sec * 1.2 + i * 0.3) % 1;
            const col = fixed > 0.5 ? R.ok : R.hot;
            return (
              <g key={i} opacity={show}>
                <circle cx={x} cy={y} r={20 + pulse * 50} fill="none" stroke={col} strokeWidth={4} opacity={1 - pulse} />
                <circle cx={x} cy={y} r={18} fill={col} />
              </g>
            );
          })}
          {/* desk + monitors */}
          <rect x={200} y={820} width={1520} height={40} rx={10} fill={R.deskTop} />
          <rect x={200} y={860} width={1520} height={220} fill={R.desk} />
          {[560, 960, 1360].map((x, i) => (
            <g key={i}>
              <rect x={x - 120} y={690} width={240} height={130} rx={10} fill="#0B0A26" />
              <rect x={x - 108} y={702} width={216} height={106} rx={6} fill={R.screen} />
              <rect x={x - 90} y={720 + (i * 17) % 30} width={120} height={10} rx={5} fill={R.glow} opacity={0.6} />
              <rect x={x - 90} y={750} width={170} height={10} rx={5} fill={R.glow} opacity={0.35} />
            </g>
          ))}
          <Planner x={700} point={0} look={{ skin: "#E8B48F", hair: "#2B1D16", shirt: "#E07A5F", hairStyle: "bun" }} />
          <Planner x={1220} point={point} look={{ skin: "#C98B62", hair: "#1E1A1A", shirt: "#3D85C6", hairStyle: "short" }} />
          {/* rim light from the screens */}
          <rect width={1920} height={1080} fill={R.glow} opacity={0.04 + Math.sin(sec * 2) * 0.01} />
        </Stage>
      </Camera>
      <FilmFinish vignette={0.55} />
      <Kicker>ثالثًا: تحليل البيانات المرورية</Kicker>
      <Subtitles
        lines={[
          { text: "تحليل البيانات المرورية لمساعدة الجهات المختصة على التخطيط للطرق", from: 0.6, to: 6.6 },
          { text: "وتحديد مواقع الاختناقات المتكررة، والعمل على معالجتها بطرق أكثر كفاءة", from: 6.6, to: 12 },
        ]}
      />
    </>
  );
};

export const S08Control = Interactive.create({ Component: ControlInner, layout: "absolute-fill" });

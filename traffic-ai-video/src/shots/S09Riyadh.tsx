import { Interactive } from "remotion";
import { BigType, Camera, FilmFinish, Stage, Subtitles } from "../kit/film";
import { Palm, rnd } from "../kit/props";
import { useAnim } from "../theme";

// Riyadh at golden hour turning into a connected smart city at dusk
const GROUND = 760;

const Towers = ({ c, cLine }: { c: string; cLine: string }) => (
  <g>
    {/* generic mid-rise towers */}
    {[
      [120, 300],
      [300, 220],
      [430, 360],
      [600, 260],
      [1260, 300],
      [1560, 240],
      [1700, 360],
      [1850, 280],
    ].map(([x, h], i) => (
      <g key={i}>
        <rect x={x} y={GROUND - h} width={120} height={h} fill={c} />
        {Array.from({ length: Math.floor(h / 36) }).map((_, r) => (
          <rect key={r} x={x + 14} y={GROUND - h + 18 + r * 36} width={92} height={6} fill={cLine} opacity={0.5} />
        ))}
      </g>
    ))}
    {/* Kingdom-Centre-style tower with its sky-bridge opening */}
    <g transform={`translate(900 ${GROUND})`}>
      <path d="M -120 0 L -86 -640 L -62 -640 Q 0 -430 62 -640 L 86 -640 L 120 0 Z" fill={c} />
      <rect x={-66} y={-560} width={132} height={18} fill={c} />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-78 + i * 0.6} y={-400 + i * 32} width={156 - i} height={6} fill={cLine} opacity={0.45} />
      ))}
    </g>
    {/* Faisaliah-style tower with its golden globe */}
    <g transform={`translate(1430 ${GROUND})`}>
      <path d="M -90 0 L 0 -560 L 90 0 Z" fill={c} />
      <path d="M -45 0 L 0 -280 L 45 0" stroke={cLine} strokeWidth={6} fill="none" opacity={0.5} />
      <circle cx={0} cy={-360} r={34} fill="#FFD27A" />
      <rect x={-3} y={-650} width={6} height={100} fill={c} />
    </g>
  </g>
);

const nodes: [number, number][] = [
  [180, 450],
  [490, 390],
  [660, 490],
  [900, 160],
  [1320, 450],
  [1430, 200],
  [1620, 510],
  [1760, 390],
];

const RiyadhInner = () => {
  const { sec, tw, pop } = useAnim();
  const dusk = tw(8.5, 12.5);
  const net = tw(5, 7);
  const shield = pop(11.6, 14);
  return (
    <>
      <Camera from={{ scale: 1.12, x: 90, y: 30 }} to={{ scale: 1.02, x: -60, y: 0 }} end={14.5}>
        <Stage>
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFD9A0" />
              <stop offset="1" stopColor="#F7A86B" />
            </linearGradient>
            <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2A2F6B" />
              <stop offset="1" stopColor="#C4677A" />
            </linearGradient>
          </defs>
          <rect width={1920} height={1080} fill="url(#gold)" />
          <rect width={1920} height={1080} fill="url(#dusk)" opacity={dusk} />
          <circle cx={1180} cy={520 + dusk * 160} r={170} fill="#FFF0D0" opacity={1 - dusk * 0.6} />
          {/* far dunes/city haze */}
          <path d="M 0 640 Q 400 560 900 620 T 1920 600 L 1920 1080 L 0 1080 Z" fill="#F3BD86" opacity={1 - dusk * 0.5} />
          <g opacity={1 - dusk}>
            <Towers c="#C9855E" cLine="#FFE0B0" />
          </g>
          <g opacity={dusk}>
            <Towers c="#1E2050" cLine="#FFD27A" />
          </g>
          {/* smart-city network */}
          <g opacity={net}>
            {nodes.slice(1).map(([x, y], i) => (
              <line key={i} x1={nodes[i][0]} y1={nodes[i][1]} x2={x} y2={y} stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={3} strokeDasharray="8 10" strokeDashoffset={-sec * 30} />
            ))}
            {nodes.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={18 + Math.sin(sec * 3 + i) * 4} fill="#7CFFE1" opacity={0.35} />
                <circle cx={x} cy={y} r={8} fill="#FFFFFF" />
              </g>
            ))}
          </g>
          {/* highway with smooth light trails */}
          <rect x={0} y={GROUND} width={1920} height={320} fill={dusk > 0.5 ? "#2A2448" : "#B9715A"} opacity={1} />
          <rect x={0} y={GROUND} width={1920} height={320} fill="#2A2448" opacity={dusk} />
          <rect x={0} y={GROUND + 40} width={1920} height={130} fill="#3A2F52" />
          {Array.from({ length: 30 }).map((_, i) => {
            const x = ((rnd(i) * 2400 + sec * 520) % 2400) - 240;
            return <rect key={i} x={x} y={GROUND + 70} width={140} height={7} rx={3} fill="#FF6B6B" opacity={0.85} />;
          })}
          {Array.from({ length: 30 }).map((_, i) => {
            const x = 2160 - ((rnd(i + 70) * 2400 + sec * 520) % 2400);
            return <rect key={`w${i}`} x={x} y={GROUND + 120} width={140} height={7} rx={3} fill="#FFF1C1" opacity={0.85} />;
          })}
          {/* foreground palms */}
          <Palm x={140} ground={1080} h={520} c="#4A2C3A" />
          <Palm x={1780} ground={1080} h={460} c="#4A2C3A" />
          {/* privacy: a shield of light over the city */}
          <g transform={`translate(1640 230) scale(${shield})`} opacity={0.95}>
            <circle r={110} fill="#7CFFE1" opacity={0.15} />
            <path d="M 0 -78 L 64 -52 L 64 6 Q 64 58 0 84 Q -64 58 -64 6 L -64 -52 Z" fill="none" stroke="#FFFFFF" strokeWidth={8} />
            <rect x={-24} y={-6} width={48} height={40} rx={8} fill="#FFFFFF" />
            <path d="M -14 -6 L -14 -22 Q 0 -42 14 -22 L 14 -6" stroke="#FFFFFF" strokeWidth={8} fill="none" />
          </g>
        </Stage>
      </Camera>
      <BigType at={4.9} out={9.3} size={70} top={70} color="#FFFFFF" style={{ textAlign: "right", left: "auto", right: 110 }}>
        رؤية السعودية 2030
      </BigType>
      <FilmFinish />
      <Subtitles
        lines={[
          { text: "وفي المملكة العربية السعودية، تزداد أهمية توظيف التقنيات الحديثة", from: 0.6, to: 4.8 },
          { text: "لبناء مدن أكثر ذكاءً واستدامة، بما ينسجم مع مستهدفات رؤية السعودية 2030", from: 4.8, to: 9.2 },
          { text: "ويمكن للذكاء الاصطناعي أن يسهم في تطوير أنظمة النقل وتحسين جودة الحياة", from: 9.2, to: 11.8 },
          { text: "مع الحرص على حماية خصوصية مستخدمي الطرق ودقة البيانات", from: 11.8, to: 14 },
        ]}
      />
    </>
  );
};

export const S09Riyadh = Interactive.create({ Component: RiyadhInner, layout: "absolute-fill" });

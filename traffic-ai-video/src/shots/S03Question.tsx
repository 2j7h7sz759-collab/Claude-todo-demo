import { Interactive } from "remotion";
import { BigType, Camera, FilmFinish, Stage } from "../kit/film";
import { Head, rnd } from "../kit/props";
import { useAnim } from "../theme";

// Night skyline, a person on a rooftop watching jammed light-trails on the highway
const Skyline = ({ seed, base, color, lit, n, minH, maxH, w }: { seed: number; base: number; color: string; lit: string; n: number; minH: number; maxH: number; w: number }) => (
  <g>
    {Array.from({ length: n }).map((_, i) => {
      const h = minH + rnd(seed + i) * (maxH - minH);
      const x = i * (2200 / n) - 140;
      const ww = w * (0.7 + rnd(seed + i * 3) * 0.5);
      return (
        <g key={i}>
          <rect x={x} y={base - h} width={ww} height={h + 400} fill={color} />
          {rnd(seed + i * 5) > 0.6 ? <rect x={x + ww / 2 - 3} y={base - h - 60} width={6} height={60} fill={color} /> : null}
          {Array.from({ length: Math.floor(h / 40) }).map((__, r) =>
            Array.from({ length: Math.floor(ww / 34) }).map((___, c) =>
              rnd(seed * 7 + i * 31 + r * 5 + c) > 0.72 ? (
                <rect key={`${r}-${c}`} x={x + 12 + c * 34} y={base - h + 20 + r * 40} width={14} height={18} fill={lit} opacity={0.85} />
              ) : null,
            ),
          )}
        </g>
      );
    })}
  </g>
);

const QuestionInner = () => {
  const { sec, tw } = useAnim();
  const flow = tw(5.6, 8.5, [0.15, 1]);
  const scan = tw(5.4, 7.4, [-200, 2200]);
  return (
    <>
      <Camera from={{ scale: 1.0, x: 0, y: 0 }} to={{ scale: 1.12, x: -40, y: 20 }} end={10.5}>
        <Stage>
          <defs>
            <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0B1433" />
              <stop offset="1" stopColor="#2B3F7A" />
            </linearGradient>
          </defs>
          <rect width={1920} height={1080} fill="url(#nightSky)" />
          {Array.from({ length: 70 }).map((_, i) => (
            <circle key={i} cx={rnd(i) * 1920} cy={rnd(i + 99) * 420} r={1.5 + rnd(i + 7) * 2} fill="#FFFFFF" opacity={0.3 + 0.5 * Math.abs(Math.sin(sec * 1.5 + i))} />
          ))}
          <circle cx={1730} cy={110} r={56} fill="#FFF3D6" />
          <Skyline seed={1} base={640} color="#24366B" lit="#4A64A8" n={16} minH={160} maxH={360} w={150} />
          <Skyline seed={2} base={700} color="#1A2754" lit="#F5C76B" n={12} minH={140} maxH={420} w={190} />
          {/* elevated highway */}
          <rect x={-100} y={720} width={2120} height={60} fill="#111A3D" />
          <rect x={-100} y={780} width={2120} height={16} fill="#0B1230" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 180} y={796} width={36} height={300} fill="#0E1636" />
          ))}
          {/* light trails: clumped and slow, then flowing */}
          {Array.from({ length: 26 }).map((_, i) => {
            const v = 40 + flow * 260;
            const x = ((rnd(i) * 2400 + sec * v * (1 + rnd(i + 3) * 0.3)) % 2400) - 240;
            const len = 30 + flow * 120;
            return <rect key={`r${i}`} x={x} y={736} width={len} height={8} rx={4} fill="#FF4D6D" opacity={0.9} />;
          })}
          {Array.from({ length: 26 }).map((_, i) => {
            const v = 40 + flow * 260;
            const x = 2160 - (((rnd(i + 50) * 2400 + sec * v * (1 + rnd(i + 9) * 0.3)) % 2400));
            const len = 30 + flow * 120;
            return <rect key={`w${i}`} x={x} y={760} width={len} height={8} rx={4} fill="#FFF1C1" opacity={0.9} />;
          })}
          {/* forecast scan line sweeping the highway */}
          <rect x={scan} y={600} width={10} height={260} fill="#5CF2E3" opacity={0.8} />
          <rect x={scan - 260} y={700} width={260} height={100} fill="#5CF2E3" opacity={0.12} />
          {/* rooftop foreground with a person sitting on the ledge */}
          <path d="M -50 930 L 900 910 L 900 1100 L -50 1100 Z" fill="#070C22" />
          <rect x={700} y={850} width={40} height={70} fill="#070C22" />
          <rect x={670} y={840} width={100} height={18} fill="#070C22" />
          <g transform="translate(380 935) scale(1.35)">
            <path d="M -30 0 L -36 120" stroke="#141A3A" strokeWidth={22} strokeLinecap="round" />
            <path d="M 14 0 L 30 120" stroke="#141A3A" strokeWidth={22} strokeLinecap="round" />
            <path d="M -40 -2 Q -46 -110 0 -116 Q 44 -110 38 -2 Z" fill="#2E3A70" />
            <path d="M 30 -80 Q 60 -40 34 -4" stroke="#2E3A70" strokeWidth={18} fill="none" strokeLinecap="round" />
            <g transform="translate(0 -150) scale(1.15)">
              <Head look={{ skin: "#3A3F66", hair: "#141A3A", shirt: "#2E3A70", hairStyle: "short" }} />
            </g>
            <path d="M -44 -2 Q 0 -120 44 -2" stroke="#5CF2E3" strokeOpacity={0.18} strokeWidth={4} fill="none" />
          </g>
        </Stage>
      </Camera>
      <BigType at={0.6} out={5.2} size={76} top={150}>
        ولكن، ماذا لو استطعنا التنبؤ بالزحام قبل حدوثه؟
      </BigType>
      <BigType at={5.4} out={10.2} size={76} top={150}>
        وهل يمكن للذكاء الاصطناعي أن يجعل طرقنا أكثر انسيابية؟
      </BigType>
      <FilmFinish vignette={0.5} />
    </>
  );
};

export const S03Question = Interactive.create({ Component: QuestionInner, layout: "absolute-fill" });

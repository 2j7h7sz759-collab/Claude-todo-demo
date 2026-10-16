import { Interactive } from "remotion";
import { BigType, Camera, FilmFinish, Shot, Stage, Subtitles } from "../kit/film";
import { TopCar, rnd } from "../kit/props";
import { useAnim } from "../theme";

// Shot A: aerial highway — widening it doesn't clear the jam; data + AI does.
// Shot B: the city skyline as the smog lifts; three benefits appear.
const Highway = () => {
  const { sec, tw } = useAnim();
  const widen = tw(0.6, 2.4); // extra lanes being paved
  const smart = tw(3, 4); // AI layer switches on
  const lanes = [400, 480, 560, 640];
  const extra = [240, 320, 720, 800];
  const flow = smart;
  const dusty = 1 - smart;
  return (
    <Stage>
      <rect width={1920} height={1080} fill="#C9B79C" />
      <rect width={1920} height={1080} fill="#2A9D8F" opacity={smart * 0.85} />
      {/* new asphalt being laid */}
      <rect x={0} y={200} width={1920 * widen} height={160} fill="#55576B" />
      <rect x={1920 - 1920 * widen} y={680} width={1920 * widen} height={160} fill="#55576B" />
      <rect x={0} y={360} width={1920} height={320} fill="#4A4C60" />
      {[...lanes, ...extra].map((y, i) => (
        <g key={i}>
          {Array.from({ length: 14 }).map((_, k) => (
            <rect key={k} x={k * 150 - ((sec * 60 * flow) % 150)} y={y + 38} width={70} height={4} fill="#E9E4D8" opacity={i >= 4 ? 0.5 * widen : 0.6} />
          ))}
        </g>
      ))}
      {/* construction cones + roller */}
      <g opacity={dusty}>
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={i} d={`M ${120 + i * 180} 370 l 14 -40 l 14 40 z`} fill="#FF8C42" />
        ))}
        <g transform={`translate(${1920 * widen - 40} 280)`}>
          <rect x={-90} y={-40} width={130} height={80} rx={12} fill="#F2C14E" />
          <rect x={40} y={-56} width={50} height={112} rx={20} fill="#6B6E80" />
        </g>
      </g>
      {/* cars: packed and stopped, then spreading out across all lanes and flowing */}
      {[...lanes, ...extra].map((y, li) =>
        Array.from({ length: li >= 4 ? 6 : 12 }).map((_, k) => {
          const packed = k * 120 + (li % 2) * 40;
          const spread = k * 260 + rnd(li * 10 + k) * 100;
          const base = packed + (spread - packed) * flow;
          const x = (((base + sec * 340 * flow * (li % 2 ? -1 : 1)) % 2600) + 2600) % 2600 - 300;
          const visible = li < 4 ? 1 : widen;
          return (
            <g key={`${li}-${k}`} opacity={visible}>
              <TopCar x={x} y={y + 40} a={li % 2 ? 180 : 0} body={["#FFFFFF", "#E2574C", "#3E8ED0", "#F2C14E", "#2C3E73", "#6CC1B8"][(li + k) % 6]} brake={flow < 0.5} />
            </g>
          );
        }),
      )}
      {/* AI data sweep */}
      <rect x={tw(3, 4.4, [-300, 2200])} y={180} width={14} height={680} fill="#B6FF6C" opacity={0.8} />
      {/* smart lane signals */}
      {[...lanes, ...extra].map((y, i) => (
        <circle key={`s${i}`} cx={1860} cy={y + 40} r={12} fill="#3DDC84" opacity={smart} />
      ))}
      {/* dust haze */}
      <rect width={1920} height={1080} fill="#D9C8AA" opacity={0.25 * dusty} />
    </Stage>
  );
};

const ClearSky = () => {
  const { sec, tw } = useAnim();
  const clear = tw(6.4, 10.5);
  return (
    <Stage>
      <defs>
        <linearGradient id="clear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FD1F0" />
          <stop offset="1" stopColor="#D8F3F7" />
        </linearGradient>
      </defs>
      <rect width={1920} height={1080} fill="url(#clear)" />
      <circle cx={1520} cy={260} r={110} fill="#FFF1B8" />
      {Array.from({ length: 16 }).map((_, i) => {
        const h = 200 + rnd(i + 3) * 360;
        return <rect key={i} x={i * 125 - 20} y={800 - h} width={110} height={h + 300} fill={["#2A9D8F", "#3D85C6", "#7C5CC4", "#E07A5F"][i % 4]} />;
      })}
      {Array.from({ length: 16 }).map((_, i) =>
        Array.from({ length: 8 }).map((__, r) => (
          <rect key={`${i}-${r}`} x={i * 125} y={820 - (200 + rnd(i + 3) * 360) + r * 50} width={70} height={8} fill="#FFFFFF" opacity={0.35} />
        )),
      )}
      <rect x={0} y={800} width={1920} height={280} fill="#264653" />
      {/* leaves drifting once the air clears */}
      {Array.from({ length: 10 }).map((_, i) => {
        const p = (sec * 0.12 + rnd(i)) % 1;
        return (
          <path
            key={i}
            d="M 0 0 Q 20 -24 40 0 Q 20 24 0 0 Z"
            fill="#6BBF59"
            opacity={clear * 0.9}
            transform={`translate(${-100 + p * 2100} ${200 + rnd(i + 5) * 400 + Math.sin(sec * 2 + i) * 30}) rotate(${sec * 60 + i * 40})`}
          />
        );
      })}
      {/* smog layer lifting away */}
      <rect width={1920} height={1080} fill="#8D8378" opacity={0.75 * (1 - clear)} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse key={i} cx={200 + i * 320} cy={500 - clear * 700} rx={360} ry={130} fill="#9A9085" opacity={0.6 * (1 - clear)} />
      ))}
    </Stage>
  );
};

const ConclusionInner = () => (
  <>
    <Shot from={0} to={5.6}>
      <Camera from={{ scale: 1.15, x: 0, y: 0, rotate: -4 }} to={{ scale: 1.0, x: 0, y: 0, rotate: 0 }} end={5.8}>
        <Highway />
      </Camera>
    </Shot>
    <Shot from={5.6} to={12}>
      <Camera from={{ scale: 1.1, x: 0, y: 80 }} to={{ scale: 1.0, x: 0, y: 0 }} start={5.6} end={11.5}>
        <ClearSky />
      </Camera>
    </Shot>
    <BigType at={6.4} out={8} size={110} top={240}>
      قرارات أفضل
    </BigType>
    <BigType at={8.1} out={9.6} size={110} top={240}>
      وقت أقل
    </BigType>
    <BigType at={9.7} size={110} top={240}>
      وقود وتلوث أقل
    </BigType>
    <FilmFinish />
    <Subtitles
      lines={[
        { text: "إن حل مشكلة الزحام المروري لا يعتمد على توسيع الطرق فقط، بل على استخدام البيانات والتقنيات بذكاء", from: 0.6, to: 5.6 },
        { text: "فالذكاء الاصطناعي يمكن أن يساعدنا على اتخاذ قرارات أفضل، وتوفير الوقت، وتقليل استهلاك الوقود والتلوث", from: 5.8, to: 11 },
      ]}
    />
  </>
);

export const S10Conclusion = Interactive.create({ Component: ConclusionInner, layout: "absolute-fill" });

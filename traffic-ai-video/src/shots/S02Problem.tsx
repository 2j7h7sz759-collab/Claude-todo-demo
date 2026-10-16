import { Interactive } from "remotion";
import { Camera, FilmFinish, Shot, Stage, Subtitles } from "../kit/film";
import { Facade, SideCar } from "../kit/props";
import { useAnim } from "../theme";

// Warm orange tone-on-tone street (shot A) + in-car dashboard close-up (shot B)
const O = {
  sky: "#F9C27E",
  far: "#F6B36E",
  farLine: "#F2A35E",
  near: "#F4A55F",
  nearLine: "#E98A48",
  road: "#EE9A57",
  roadLine: "#DD7B3C",
  curb: "#E3874A",
};

const looks = {
  driver: { skin: "#F2C3A0", hair: "#3A2A2A", shirt: "#2F6FB0", hairStyle: "short" as const },
  p2: { skin: "#C98B62", hair: "#1E1A1A", shirt: "#E6E1D6", hairStyle: "bun" as const },
  p3: { skin: "#F5D0B5", hair: "#D65A31", shirt: "#3BA676", hairStyle: "long" as const },
};

const StreetJam = () => {
  const { sec } = useAnim();
  const crawl = Math.max(0, Math.sin(sec * 0.9)) * 6 + sec * 8;
  return (
    <Stage>
      <rect width={1920} height={1080} fill={O.sky} />
      <rect x={0} y={600} width={1920} height={480} fill={O.road} />
      <g transform="translate(0 -110)">
      <g transform={`translate(${-sec * 6} 0)`}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Facade key={i} x={-100 + i * 420} ground={700} w={380} h={520 + (i % 3) * 80} fill={O.far} line={O.farLine} seed={i} arches={i % 2 === 0} />
        ))}
      </g>
      <g transform={`translate(${-sec * 14} 0)`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Facade key={i} x={-250 + i * 560} ground={760} w={420} h={360 + (i % 2) * 90} fill={O.near} line={O.nearLine} seed={i + 10} arches />
        ))}
      </g>
      <rect x={0} y={740} width={1920} height={340} fill={O.road} />
      <rect x={0} y={740} width={1920} height={18} fill={O.curb} />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={i * 160 - ((sec * 8) % 160)} y={900} width={90} height={8} rx={4} fill={O.roadLine} />
      ))}
      {/* back lane, crawling */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <SideCar key={`b${i}`} x={-120 + i * 420 + crawl * 0.5} y={880} s={0.62} body={["#F07E5F", "#FFFFFF", "#2C3E73", "#F7D06B", "#6CC1B8", "#C65A7A"][i]} glass="#FBE3C6" brake />
      ))}
      {/* front lane, bumper to bumper, hero car in the middle */}
      <SideCar x={180 + crawl} y={1040} s={0.95} body="#E2574C" dist={crawl} brake driver={{ look: looks.p2, mood: "neutral" }} />
      <SideCar x={620 + crawl} y={1040} s={0.95} body="#3E8ED0" dist={crawl} brake driver={{ look: looks.driver, mood: "tired" }} passenger={{ look: looks.p3, mood: "tired" }} />
      <SideCar x={1060 + crawl} y={1040} s={0.95} body="#F2F2F2" dist={crawl} brake driver={{ look: looks.p3, mood: "neutral" }} />
      <SideCar x={1500 + crawl} y={1040} s={0.95} body="#2C3E73" dist={crawl} brake />
      <SideCar x={1940 + crawl} y={1040} s={0.95} body="#6CC1B8" dist={crawl} brake />
      {/* honks */}
      {[0, 1].map((i) => {
        const on = Math.floor(sec * 1.6 + i) % 3 === 0;
        return on ? (
          <g key={i} stroke="#B8402A" strokeWidth={7} strokeLinecap="round" transform={`translate(${i ? 1210 : 330} 840)`}>
            <line x1={0} y1={0} x2={30} y2={-30} />
            <line x1={14} y1={10} x2={52} y2={0} />
            <line x1={-14} y1={-8} x2={-6} y2={-46} />
          </g>
        ) : null;
      })}
      </g>
    </Stage>
  );
};

const Dashboard = () => {
  const { sec, tw } = useAnim();
  const local = sec - 7.2;
  const smog = tw(11.2, 13.5, [0, 0.55]);
  const fuel = 1 - tw(9.2, 14, [0, 0.75]);
  const glowT = tw(7.6, 8.2) * (1 - tw(9.1, 9.4));
  const glowF = tw(9.3, 9.8) * (1 - tw(11.1, 11.4));
  const glowP = tw(11.3, 11.8);
  return (
    <Stage>
      {/* outside: rear of the car ahead in haze */}
      <rect width={1920} height={1080} fill="#F6B97A" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 520 - 60} y={140 + (i % 2) * 60} width={420} height={600} fill="#F0A866" />
      ))}
      <g transform="translate(980 690)">
        <rect x={-380} y={-260} width={760} height={300} rx={60} fill="#2C3E73" />
        <rect x={-300} y={-380} width={600} height={160} rx={50} fill="#2C3E73" />
        <rect x={-260} y={-350} width={520} height={110} rx={30} fill="#FBE3C6" opacity={0.75} />
        <rect x={-120} y={-170} width={240} height={70} rx={10} fill="#F2F2F2" />
        {[-1, 1].map((d) => (
          <g key={d}>
            <circle cx={d * 300} cy={-170} r={90} fill="#FF3B3B" opacity={0.28 + Math.sin(sec * 3) * 0.05} />
            <rect x={d * 300 - 50} y={-200} width={100} height={60} rx={14} fill="#FF4D4D" />
          </g>
        ))}
      </g>
      {/* exhaust + smog */}
      {[0, 1, 2, 3, 4].map((i) => {
        const p = (local * 0.25 + i / 5) % 1;
        return <circle key={i} cx={760 + i * 90 + p * 120} cy={760 - p * 300} r={40 + p * 120} fill="#8C7F7A" opacity={(1 - p) * (0.15 + smog * 0.5)} />;
      })}
      <rect width={1920} height={1080} fill="#7D6E6A" opacity={smog} />
      <g transform="translate(0 -120)">
      {/* windshield frame + cabin */}
      <path d="M 0 -200 L 1920 -200 L 1920 1300 L 0 1300 Z M 150 90 Q 960 30 1770 90 L 1860 640 Q 960 700 60 640 Z" fill="#1E2033" fillRule="evenodd" />
      <path d="M 960 -100 L 960 120" stroke="#1E2033" strokeWidth={50} />
      <rect x={890} y={110} width={140} height={60} rx={12} fill="#2A2D45" />
      {/* dashboard */}
      <path d="M 0 700 Q 960 600 1920 700 L 1920 1300 L 0 1300 Z" fill="#2A2D45" />
      <path d="M 0 700 Q 960 600 1920 700" stroke="#3A3E5E" strokeWidth={14} fill="none" />
      {/* gauges: clock, fuel, air */}
      {[
        { x: 640, g: glowT, kind: "clock" },
        { x: 960, g: glowF, kind: "fuel" },
        { x: 1280, g: glowP, kind: "air" },
      ].map((G) => (
        <g key={G.kind} transform={`translate(${G.x} 790)`}>
          <circle r={120} fill={G.kind === "air" ? "#FF8A5B" : "#FFD166"} opacity={G.g * 0.35} />
          <circle r={96} fill="#15172A" />
          <circle r={96} fill="none" stroke="#4A4F78" strokeWidth={8} />
          {G.kind === "clock" ? (
            <>
              {Array.from({ length: 12 }).map((_, i) => (
                <rect key={i} x={-3} y={-82} width={6} height={14} fill="#8C93C7" transform={`rotate(${i * 30})`} />
              ))}
              <rect x={-4} y={-70} width={8} height={70} rx={4} fill="#FFD166" transform={`rotate(${local * 220})`} />
              <rect x={-5} y={-44} width={10} height={44} rx={5} fill="#FFFFFF" transform={`rotate(${local * 18})`} />
            </>
          ) : null}
          {G.kind === "fuel" ? (
            <>
              <path d="M -70 20 A 72 72 0 0 1 70 20" stroke="#4A4F78" strokeWidth={12} fill="none" />
              <path d="M -70 20 A 72 72 0 0 1 -50 -44" stroke="#FF5A5A" strokeWidth={12} fill="none" />
              <rect x={-4} y={-66} width={8} height={70} rx={4} fill="#FF8A5B" transform={`rotate(${-75 + fuel * 150})`} />
              <rect x={-16} y={36} width={32} height={34} rx={5} fill="#8C93C7" />
            </>
          ) : null}
          {G.kind === "air" ? (
            <>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={-30 + i * 30} cy={-6 + (i % 2) * 14} r={26 + glowP * 6} fill="#8C93C7" opacity={0.5 + glowP * 0.4} />
              ))}
              <text x={0} y={70} textAnchor="middle" fontSize={30} fontWeight={900} fill="#FF8A5B" fontFamily="Cairo">
                CO₂
              </text>
            </>
          ) : null}
          <circle r={8} fill="#E9EEF2" />
        </g>
      ))}
      {/* driver's hands on wheel, tapping */}
      <g transform={`translate(360 1010) rotate(${-8 + Math.sin(local * 4) * 1.5})`}>
        <circle r={240} fill="none" stroke="#14152A" strokeWidth={46} />
        <rect x={-30} y={-30} width={60} height={240} fill="#14152A" />
        <path d={`M -330 200 Q -260 40 -175 -135`} stroke="#2F6FB0" strokeWidth={70} fill="none" strokeLinecap="round" />
        <path d={`M 330 200 Q 260 40 ${178} ${-140 - Math.abs(Math.sin(local * 6)) * 16}`} stroke="#2F6FB0" strokeWidth={70} fill="none" strokeLinecap="round" />
        <ellipse cx={-172} cy={-150} rx={42} ry={36} fill="#F2C3A0" />
        <ellipse cx={176} cy={-156 - Math.abs(Math.sin(local * 6)) * 16} rx={42} ry={36} fill="#F2C3A0" />
      </g>
      </g>
    </Stage>
  );
};

const ProblemInner = () => {
  return (
    <>
      <Shot from={0} to={7.2}>
        <Camera from={{ scale: 1.12, x: 60, y: -40 }} to={{ scale: 1.0, x: -20, y: 0 }} end={7.5}>
          <StreetJam />
        </Camera>
      </Shot>
      <Shot from={7.2} to={16}>
        <Camera from={{ scale: 1.0, x: 0, y: 0 }} to={{ scale: 1.08, x: 0, y: 30 }} start={7.2} end={15.5}>
          <Dashboard />
        </Camera>
      </Shot>
      <FilmFinish />
      <Subtitles
        lines={[
          { text: "في كل يوم، يواجه آلاف الأشخاص مشكلة الزحام المروري", from: 0.6, to: 7 },
          { text: "التي تؤدي إلى إهدار الوقت، وزيادة استهلاك الوقود، وارتفاع مستويات التلوث", from: 7.4, to: 15 },
        ]}
      />
    </>
  );
};

export const S02Problem = Interactive.create({ Component: ProblemInner, layout: "absolute-fill" });

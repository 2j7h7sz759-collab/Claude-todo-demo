import { AbsoluteFill, Interactive } from "remotion";
import { BigType, Camera, FilmFinish, Stage } from "../kit/film";
import { useAnim } from "../theme";
import { AerialCity, NIGHT } from "./AerialCity";

const OutroInner = () => {
  const { sec, tw } = useAnim();
  return (
    <>
      <Camera from={{ scale: 1.25, x: 0, y: 0, rotate: 4 }} to={{ scale: 0.95, x: 0, y: 0, rotate: 0 }} end={7}>
        <Stage>
          <AerialCity p={NIGHT} t={sec + 3} speed={1.6} glow />
        </Stage>
      </Camera>
      <AbsoluteFill style={{ backgroundColor: "#070920", opacity: tw(0.6, 1.6, [0, 0.5]) }} />
      <BigType at={0.8} size={140} top={330}>
        الذكاء الاصطناعي…
      </BigType>
      <BigType at={1.8} size={84} top={520} weight={700} color="#9BE7FF">
        نحو تنقّل أذكى، ومدن أفضل.
      </BigType>
      <FilmFinish vignette={0.5} />
      <AbsoluteFill style={{ backgroundColor: "#000000", opacity: tw(6.1, 7) }} />
    </>
  );
};

export const S11Outro = Interactive.create({ Component: OutroInner, layout: "absolute-fill" });

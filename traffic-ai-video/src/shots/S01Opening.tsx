import { AbsoluteFill, Interactive } from "remotion";
import { BigType, Camera, FilmFinish, Stage } from "../kit/film";
import { useAnim } from "../theme";
import { AerialCity, DUSK } from "./AerialCity";

const OpeningInner = () => {
  const { sec, tw } = useAnim();
  return (
    <>
      <Camera from={{ scale: 1.5, x: 120, y: 60, rotate: -6 }} to={{ scale: 1.05, x: 0, y: 0, rotate: 0 }} end={7.5}>
        <Stage>
          <AerialCity p={DUSK} t={sec} />
        </Stage>
      </Camera>
      <AbsoluteFill style={{ backgroundColor: "#14163A", opacity: tw(1.2, 2.4, [0, 0.45]) }} />
      <BigType at={1.6} size={150} top={330}>
        الذكاء الاصطناعي
      </BigType>
      <BigType at={2.3} size={84} top={540} weight={700} color="#FFD3E2">
        في مواجهة الزحام المروري
      </BigType>
      <FilmFinish />
    </>
  );
};

export const S01Opening = Interactive.create({ Component: OpeningInner, layout: "absolute-fill" });

import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { S01Opening } from "./shots/S01Opening";
import { S02Problem } from "./shots/S02Problem";
import { S03Question } from "./shots/S03Question";
import { S04AI } from "./shots/S04AI";
import { S05Three } from "./shots/S05Three";
import { S06Lights } from "./shots/S06Lights";
import { S07Routing } from "./shots/S07Routing";
import { S08Control } from "./shots/S08Control";
import { S09Riyadh } from "./shots/S09Riyadh";
import { S10Conclusion } from "./shots/S10Conclusion";
import { S11Outro } from "./shots/S11Outro";

// 11 shots, 10 transitions of 0.5s each.
// Shot lengths sum to 125s; minus 5s of overlap = 120s total.
export const TrafficVideo = () => {
  const { fps } = useVideoConfig();
  const t = linearTiming({ durationInFrames: 0.5 * fps });
  const bg = { backgroundColor: "#000000" };

  return (
    <AbsoluteFill style={bg}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={7.5 * fps}>
          <S01Opening name="Opening" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={15.5 * fps}>
          <S02Problem name="Problem" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={10.5 * fps}>
          <S03Question name="Question" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={16.5 * fps}>
          <S04AI name="AI analysis" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={4.5 * fps}>
          <S05Three name="Three solutions" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={12.5 * fps}>
          <S06Lights name="Smart lights" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={12.5 * fps}>
          <S07Routing name="Routing" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={12.5 * fps}>
          <S08Control name="Control room" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={14.5 * fps}>
          <S09Riyadh name="Riyadh" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={11.5 * fps}>
          <S10Conclusion name="Conclusion" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={7 * fps}>
          <S11Outro name="Outro" style={bg} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

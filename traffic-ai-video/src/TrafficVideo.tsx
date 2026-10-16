import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { Scene01Title } from "./scenes/Scene01Title";
import { Scene02Problem } from "./scenes/Scene02Problem";
import { Scene03Question } from "./scenes/Scene03Question";
import { Scene04AI } from "./scenes/Scene04AI";
import { Scene05Solutions } from "./scenes/Scene05Solutions";
import { Scene06SmartLights } from "./scenes/Scene06SmartLights";
import { Scene07Routing } from "./scenes/Scene07Routing";
import { Scene08Analytics } from "./scenes/Scene08Analytics";
import { Scene09Saudi } from "./scenes/Scene09Saudi";
import { Scene10Conclusion } from "./scenes/Scene10Conclusion";
import { Scene11Outro } from "./scenes/Scene11Outro";
import { C } from "./theme";

// 11 scenes, 10 transitions of 0.5s each.
// Scene lengths sum to 125s; minus 5s of overlap = 120s total.
export const TrafficVideo = () => {
  const { fps } = useVideoConfig();
  const t = linearTiming({ durationInFrames: 0.5 * fps });
  const bg = { backgroundColor: C.cream };

  return (
    <AbsoluteFill style={bg}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={7.5 * fps}>
          <Scene01Title name="Title" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={15.5 * fps}>
          <Scene02Problem name="Problem" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={10.5 * fps}>
          <Scene03Question name="Question" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={16.5 * fps}>
          <Scene04AI name="AI analysis" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={4.5 * fps}>
          <Scene05Solutions name="Three solutions" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={12.5 * fps}>
          <Scene06SmartLights name="Smart lights" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={12.5 * fps}>
          <Scene07Routing name="Routing" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={t} />
        <TransitionSeries.Sequence durationInFrames={12.5 * fps}>
          <Scene08Analytics name="Analytics" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={14.5 * fps}>
          <Scene09Saudi name="Saudi Arabia" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={11.5 * fps}>
          <Scene10Conclusion name="Conclusion" style={bg} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={t} />
        <TransitionSeries.Sequence durationInFrames={7 * fps}>
          <Scene11Outro name="Outro" style={bg} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

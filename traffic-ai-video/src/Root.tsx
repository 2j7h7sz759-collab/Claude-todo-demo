import { Composition, Folder } from "remotion";
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
import { TrafficVideo } from "./TrafficVideo";

const shotDefaults = { style: { backgroundColor: "#000000" } };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TrafficAI"
        component={TrafficVideo}
        durationInFrames={120 * 30}
        fps={30}
        width={1920}
        height={1080}
      />
      <Folder name="Shots">
        <Composition id="S01Opening" component={S01Opening} durationInFrames={225} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S02Problem" component={S02Problem} durationInFrames={465} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S03Question" component={S03Question} durationInFrames={315} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S04AI" component={S04AI} durationInFrames={495} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S05Three" component={S05Three} durationInFrames={135} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S06Lights" component={S06Lights} durationInFrames={375} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S07Routing" component={S07Routing} durationInFrames={375} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S08Control" component={S08Control} durationInFrames={375} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S09Riyadh" component={S09Riyadh} durationInFrames={435} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S10Conclusion" component={S10Conclusion} durationInFrames={345} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
        <Composition id="S11Outro" component={S11Outro} durationInFrames={210} fps={30} width={1920} height={1080} defaultProps={shotDefaults} />
      </Folder>
    </>
  );
};

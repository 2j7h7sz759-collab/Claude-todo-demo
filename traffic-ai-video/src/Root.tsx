import { Composition, Folder } from "remotion";
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
import { TrafficVideo } from "./TrafficVideo";

const sceneDefaults = { style: { backgroundColor: C.cream } };

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
      <Folder name="Scenes">
        <Composition id="S01-Title" component={Scene01Title} durationInFrames={225} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S02-Problem" component={Scene02Problem} durationInFrames={465} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S03-Question" component={Scene03Question} durationInFrames={315} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S04-AI" component={Scene04AI} durationInFrames={495} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S05-Solutions" component={Scene05Solutions} durationInFrames={135} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S06-SmartLights" component={Scene06SmartLights} durationInFrames={375} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S07-Routing" component={Scene07Routing} durationInFrames={375} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S08-Analytics" component={Scene08Analytics} durationInFrames={375} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S09-Saudi" component={Scene09Saudi} durationInFrames={435} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S10-Conclusion" component={Scene10Conclusion} durationInFrames={345} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
        <Composition id="S11-Outro" component={Scene11Outro} durationInFrames={210} fps={30} width={1920} height={1080} defaultProps={sceneDefaults} />
      </Folder>
    </>
  );
};

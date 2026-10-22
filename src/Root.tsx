import React from "react";
import { Composition } from "remotion";
import { RealReel } from "./RealReel";
import { ConceptReel } from "./ConceptReel";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="RealReel"
        component={RealReel}
        durationInFrames={450} // 15초 * 30fps = 450 frames (12~13초 대사 완벽 소화)
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ConceptReel"
        component={ConceptReel}
        durationInFrames={300} // 10초 * 30fps = 300 frames
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

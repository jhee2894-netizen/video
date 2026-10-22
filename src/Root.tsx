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
        durationInFrames={570} // 19초 * 30fps = 570 frames (원빈 대사 풀버전 및 클로즈업 확장)
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

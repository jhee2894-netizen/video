import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Video,
  staticFile,
  useCurrentFrame,
  Sequence,
} from "remotion";

export const RealReel: React.FC = () => {
  const frame = useCurrentFrame();

  // 끝 1초(420~450프레임, 14~15초) 동안 볼륨 페이드아웃
  const audioVolume = interpolate(frame, [420, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fontBold = staticFile("Pretendard-Bold.ttf");
  const fontExtraBold = staticFile("Pretendard-ExtraBold.ttf");

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        fontFamily: "'Pretendard-ExtraBold', sans-serif",
      }}
    >
      <style>
        {`
          @font-face {
            font-family: 'Pretendard-Bold';
            src: url('${fontBold}') format('truetype');
            font-weight: 700;
          }
          @font-face {
            font-family: 'Pretendard-ExtraBold';
            src: url('${fontExtraBold}') format('truetype');
            font-weight: 800;
          }
        `}
      </style>

      {/* ========================================================
          1. 시네마틱 숏츠 영상 영역
          - 사용자 요청 타임라인:
            * Shot 1 (창가 착석): 0 ~ 180f (0.0s ~ 6.0s)
            * Shot 2 (눈동자 줌인): 180 ~ 360f (6.0s ~ 12.0s)
            * Shot 3 (걸어 나오는 씬): 360 ~ 450f (12.0s ~ 15.0s)
      ======================================================== */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 0,
          width: 1080,
          height: 860,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      >
        {/* Shot 1: 창가 착석 (0 ~ 180f, 6.0초간) - 1.20초까지만 재생하여 클로즈업 침범 원천 차단 */}
        <Sequence from={0} durationInFrames={180}>
          <Video
            src={staticFile("cat_video.mp4")}
            startFrom={0}
            playbackRate={0.20}
            muted
            style={{
              width: 1530,
              height: 860,
              objectFit: "cover",
              objectPosition: "38% center",
            }}
          />
        </Sequence>

        {/* Shot 2: 번뜩이는 눈빛 줌인 (180 ~ 360f, 6.0초간) - 정확히 1.40초(42f) 클로즈업 시작점부터 진입 */}
        <Sequence from={180} durationInFrames={180}>
          <Video
            src={staticFile("cat_video.mp4")}
            startFrom={42}
            playbackRate={0.30}
            muted
            style={{
              width: 1530,
              height: 860,
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </Sequence>

        {/* Shot 3: 걸어 나오는 씬 (360 ~ 450f, 3.0초간) - 정확히 3.27초(98f) 걷기 시작점부터 진입 */}
        <Sequence from={360} durationInFrames={90}>
          <Video
            src={staticFile("cat_video.mp4")}
            startFrom={98}
            playbackRate={0.57}
            muted
            style={{
              width: 1530,
              height: 860,
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </Sequence>
      </div>

      {/* ========================================================
          2. 원빈 실제 영화 육성 대사 및 자막 타임라인
      ======================================================== */}

      {/* --------------------------------------------------------
          [1] 3초에: "니들은 내일만 보고 살지?" (3.0s = 90프레임 시작)
      -------------------------------------------------------- */}
      <Sequence from={90} durationInFrames={85}>
        <Audio
          src={staticFile("wb_line1.mp3")}
          volume={audioVolume}
        />
        <div
          style={{
            position: "absolute",
            top: 1340,
            left: 60,
            right: 84,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard-ExtraBold",
              fontSize: 60,
              color: "#FFFFFF",
              letterSpacing: "-1.5px",
              textAlign: "center",
              lineHeight: 1.3,
              textShadow:
                "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 12px rgba(0, 0, 0, 0.8)",
              wordBreak: "keep-all",
            }}
          >
            니들은 내일만 보고 살지?
          </span>
        </div>
      </Sequence>

      {/* --------------------------------------------------------
          [2] 6초부터: "내일만 사는 놈은 오늘만 사는 놈한테 죽는다" (6.0s = 180프레임 시작)
      -------------------------------------------------------- */}
      <Sequence from={180} durationInFrames={105}>
        <Audio
          src={staticFile("wb_line2.mp3")}
          volume={audioVolume}
        />
        <div
          style={{
            position: "absolute",
            top: 1320,
            left: 50,
            right: 84,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard-ExtraBold",
              fontSize: 52,
              color: "#FFFFFF",
              letterSpacing: "-1.5px",
              textAlign: "center",
              lineHeight: 1.25,
              textShadow:
                "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 12px rgba(0, 0, 0, 0.8)",
              wordBreak: "keep-all",
            }}
          >
            내일만 사는 놈은
          </span>
          <span
            style={{
              fontFamily: "Pretendard-ExtraBold",
              fontSize: 52,
              color: "#FFFFFF",
              letterSpacing: "-1.5px",
              textAlign: "center",
              lineHeight: 1.25,
              textShadow:
                "0 4px 24px rgba(0, 0, 0, 0.95), 0 0 12px rgba(0, 0, 0, 0.8)",
              wordBreak: "keep-all",
            }}
          >
            오늘만 사는 놈한테 죽는다
          </span>
        </div>
      </Sequence>

      {/* --------------------------------------------------------
          [3] 이어서 9.5초~12초: "난 오늘만 산다" (9.5s = 285프레임 시작)
      -------------------------------------------------------- */}
      <Sequence from={285} durationInFrames={75}>
        <Audio
          src={staticFile("wb_line3.mp3")}
          volume={audioVolume}
        />
        <div
          style={{
            position: "absolute",
            top: 1340,
            left: 60,
            right: 84,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard-ExtraBold",
              fontSize: 64,
              color: "#FFE600", // 형광 옐로우 강조
              letterSpacing: "-1.5px",
              textAlign: "center",
              lineHeight: 1.3,
              textShadow:
                "0 0 28px rgba(255, 230, 0, 0.5), 0 4px 24px rgba(0, 0, 0, 0.95)",
              wordBreak: "keep-all",
            }}
          >
            난 오늘만 산다
          </span>
        </div>
      </Sequence>

      {/* --------------------------------------------------------
          [4] 12~13초 쯤: "내가 보여줄게" (12.2s = 366프레임 시작!)
      -------------------------------------------------------- */}
      <Sequence from={366} durationInFrames={80}>
        <Audio
          src={staticFile("wb_line4.mp3")}
          volume={audioVolume}
        />
        <div
          style={{
            position: "absolute",
            top: 1340,
            left: 60,
            right: 84,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Pretendard-ExtraBold",
              fontSize: 64,
              color: "#FF4500", // 주황 레드 강조
              letterSpacing: "-1.5px",
              textAlign: "center",
              lineHeight: 1.3,
              textShadow:
                "0 0 28px rgba(255, 69, 0, 0.5), 0 4px 24px rgba(0, 0, 0, 0.95)",
              wordBreak: "keep-all",
            }}
          >
            내가 보여줄게
          </span>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

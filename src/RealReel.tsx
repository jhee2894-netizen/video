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

  // 끝 1초(540~570프레임, 18~19초) 동안 볼륨 페이드아웃
  const audioVolume = interpolate(frame, [540, 570], [1, 0], {
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
          - 사용자 요청에 맞춘 타임라인:
            * Shot 1 (창가 원경): 0 ~ 170f (0.0s ~ 5.67s)
            * Shot 2 (눈빛 클로즈업 대폭 연장): 170 ~ 440f (5.67s ~ 14.67s, 9.0초간)
            * Shot 3 (걸어 나오는 씬): 440 ~ 570f (14.67s ~ 19.0s, 4.33초간)
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
        {/* Shot 1: 창가 착석 (0 ~ 170f, 5.67초간) - 1.19초까지만 재생하여 클로즈업 침범 원천 차단 */}
        <Sequence from={0} durationInFrames={170}>
          <Video
            src={staticFile("cat_video.mp4")}
            startFrom={0}
            playbackRate={0.21}
            muted
            style={{
              width: 1530,
              height: 860,
              objectFit: "cover",
              objectPosition: "38% center",
            }}
          />
        </Sequence>

        {/* Shot 2: 번뜩이는 눈빛 줌인 클로즈업 연장 (170 ~ 440f, 9.0초간) - 정확히 1.40초(42f) 클로즈업 시작점부터 진입 */}
        <Sequence from={170} durationInFrames={270}>
          <Video
            src={staticFile("cat_video.mp4")}
            startFrom={42}
            playbackRate={0.20}
            muted
            style={{
              width: 1530,
              height: 860,
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </Sequence>

        {/* Shot 3: 걸어 나오는 씬 (440 ~ 570f, 4.33초간) - 정확히 3.27초(98f) 걷기 시작점부터 진입 */}
        <Sequence from={440} durationInFrames={130}>
          <Video
            src={staticFile("cat_video.mp4")}
            startFrom={98}
            playbackRate={0.40}
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
          [1] 3.0초: "니들은 내일만 보고 살지?" (90프레임 시작, 2.35초 지속)
          - 타인의 "뭐?" 음성 완벽 제거 완료
      -------------------------------------------------------- */}
      <Sequence from={90} durationInFrames={75}>
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
          [2] 5.8초: "내일만 사는 놈은 오늘만 사는 놈한테 죽는다" (175프레임 시작, 7.0초 지속)
          - '죽는다'까지 잘림 없이 100% 완벽 재생
      -------------------------------------------------------- */}
      <Sequence from={175} durationInFrames={215}>
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
          [3] 13.17초: "난 오늘만 산다" (395프레임 시작, 2.6초 지속)
          - 클로즈업의 가장 강렬한 하이라이트 순간
      -------------------------------------------------------- */}
      <Sequence from={395} durationInFrames={78}>
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
          [4] 15.83초: "내가 보여줄게" (475프레임 시작, 2.5초 지속)
          - 고양이가 걸어 나오는 씬에서 진짜 원빈 육성 100% 매칭
      -------------------------------------------------------- */}
      <Sequence from={475} durationInFrames={75}>
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

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

const DialogueAudio: React.FC<{
  src: string;
}> = ({ src }) => {
  return <Audio src={src} volume={1} />;
};

export const RealReel: React.FC = () => {
  const frame = useCurrentFrame();

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
          배경 음악 & 누아르 빗소리 (영화 오리지널 첼로 스코어 무봉제 루프)
      ======================================================== */}
      <Audio
        src={staticFile("noir_bgm.mp3")}
        volume={(f) =>
          interpolate(f, [0, 20, 540, 570], [0, 0.50, 0.50, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

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
          [1] 3.0초: "니들은 내일만 보고 살지?" (90프레임 시작, 55프레임 지속, 145f 종료)
          - 초반 잡음("그게..") 완전 제거, 즉시 명확하게 대사 진입
      -------------------------------------------------------- */}
      <Sequence from={90} durationInFrames={55}>
        <DialogueAudio src={staticFile("wb_line1.mp3")} />
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
          [2] 4.93초: "내일만 사는 놈은 오늘만 사는 놈한테 죽는다" (148프레임 시작, 200프레임 지속, 348f(11.60초) 종료)
          - '죽는다'의 '다'까지 100% 잘림 없이 완벽히 송출
      -------------------------------------------------------- */}
      <Sequence from={148} durationInFrames={200}>
        <DialogueAudio src={staticFile("wb_line2.mp3")} />
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
          [간격] 348f ~ 378f (11.60초 ~ 12.60초): 정확히 1.0초(30프레임)간의 묵직한 정적 및 BGM 흐름
      -------------------------------------------------------- */}

      {/* --------------------------------------------------------
          [3] 12.60초: "난 오늘만 산다" (378프레임 시작, 37프레임 지속 -> 415프레임(13.83초) 종료)
          - 사용자 요청: 14초 이전에 음성과 자막 모두 완벽히 종료 (< 14.0s)
          - "죽는다" 이후 정확히 1.0초 간격을 두고 긴장감 있게 등장
      -------------------------------------------------------- */}
      <Sequence from={378} durationInFrames={37}>
        <DialogueAudio src={staticFile("wb_line3.mp3")} />
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
          [4] 16.0초: "내가 보여줄게" (480프레임 시작, 75프레임 지속 -> 555프레임(18.5초) 종료)
          - 사용자 요청: 정확히 16초부터 음성과 자막 출현
          - 고양이가 걸어 나오는 씬에서 원빈 육성 매칭
      -------------------------------------------------------- */}
      <Sequence from={480} durationInFrames={75}>
        <DialogueAudio src={staticFile("wb_line4.mp3")} />
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


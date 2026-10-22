import React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

interface StepItem {
  step: string;
  name: string;
  value: string;
  desc: string;
  badgeColor: string;
  isCheck?: boolean;
}

const STEPS: StepItem[] = [
  {
    step: "STEP 01",
    name: "기획 & 캐릭터 매칭",
    value: "동물 매칭 4종",
    desc: "원작 인물과 고양이 품종의 성격 및 외모 동기화",
    badgeColor: "#3B82F6", // 블루
  },
  {
    step: "STEP 02",
    name: "오디오 소스 & SFX",
    value: "보컬 분리 2트랙",
    desc: "영화 명대사 음성과 빗소리·타격음 효과음 결합",
    badgeColor: "#8B5CF6", // 퍼플
  },
  {
    step: "STEP 03",
    name: "AI 이미지 생성",
    value: "MJ v6 8K 3장",
    desc: "고등어 코숏 누아르 조명과 시네마틱 앵글 이미지",
    badgeColor: "#EC4899", // 핑크
  },
  {
    step: "STEP 04",
    name: "AI 비디오 모션",
    value: "Kling 3.0 5.04초",
    desc: "정지 컷에 호박색 눈빛 줌인과 묵직한 보행 모션",
    badgeColor: "#F59E0B", // 앰버
  },
  {
    step: "STEP 05",
    name: "9:16 세로 컷편집",
    value: "세로 1080×1920",
    desc: "가로 원본을 인스타 릴스 비율로 리프레이밍 정렬",
    badgeColor: "#10B981", // 에메랄드
  },
  {
    step: "STEP 06",
    name: "자막 & 후반 완성",
    value: "Pretendard 완료 ✓",
    desc: "인스타 세이프존 준수 폰트 렌더링 및 최종 마감",
    badgeColor: "#00FF66", // 네온 그린
    isCheck: true,
  },
];

export const ConceptReel: React.FC = () => {
  const frame = useCurrentFrame();
  const TOTAL_FRAMES = 300; // 10초 @ 30fps

  const fontBold = staticFile("Pretendard-Bold.ttf");
  const fontExtraBold = staticFile("Pretendard-ExtraBold.ttf");

  // 카드 치수
  const CARD_HEIGHT = 160;
  const CARD_GAP = 28;
  const PITCH = CARD_HEIGHT + CARD_GAP; // 188px
  const CYCLE_HEIGHT = STEPS.length * PITCH; // 6 * 188 = 1128px

  // 위에서 아래로 흘러내리는 연속 무한 루프 오프셋
  // frame 0에서 offset = 0, frame 300에서 offset = CYCLE_HEIGHT (완벽한 원점 일치)
  const translateY = interpolate(frame, [0, TOTAL_FRAMES], [0, CYCLE_HEIGHT], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 무한 루프를 위해 3번 반복 배치
  const loopList = [...STEPS, ...STEPS, ...STEPS];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        fontFamily: "'Pretendard-Bold', sans-serif",
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
          상단 고정 헤더 영역 (Y 240 ~ 340px)
          - 위 210px 비움
          - 오른쪽 84px 비움
      ======================================================== */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 84,
          right: 84,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "6px 16px",
            borderRadius: 9999,
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#FFE600",
              boxShadow: "0 0 8px #FFE600",
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontFamily: "Pretendard-Bold",
              color: "#FFE600",
              letterSpacing: "1px",
            }}
          >
            WORKFLOW PIPELINE
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 46,
            fontFamily: "Pretendard-ExtraBold",
            color: "#FFFFFF",
            letterSpacing: "-1.5px",
            textAlign: "center",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.9)",
          }}
        >
          AI 고양이 릴스 제작 6단계
        </h1>
      </div>

      {/* ========================================================
          가운데 컨베이어 벨트 카드 영역 (Y 370 ~ 1560px, 높이 1190px)
          - 위 210px 이상
          - 아래 1600px 미만 (하단 320px 완전 비움!)
          - 좌우 84px 안전 여백
      ======================================================== */}
      <div
        style={{
          position: "absolute",
          top: 370,
          bottom: 360, // 1920 - 360 = 1560px (안전 영역 1600px보다 위)
          left: 84,
          right: 84, // 우측 84px 비움
          overflow: "hidden",
        }}
      >
        {/* 상/하단 서서히 어두워지는 소프트 페이드 마스크 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            background:
              "linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0) 100%)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background:
              "linear-gradient(to top, #000000 0%, rgba(0,0,0,0) 100%)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />

        {/* 위에서 아래로 스크롤되는 카드 리스트 */}
        <div
          style={{
            position: "absolute",
            top: -CYCLE_HEIGHT, // 초기 오프셋 설정으로 첫 프레임부터 1단계가 화면 중앙에 즉시 표시됨
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            gap: CARD_GAP,
            transform: `translateY(${translateY}px)`,
          }}
        >
          {loopList.map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  height: CARD_HEIGHT,
                  backgroundColor: "rgba(22, 22, 26, 0.95)",
                  borderRadius: 20,
                  border: item.isCheck
                    ? "2px solid #00FF66"
                    : "1.5px solid rgba(255, 255, 255, 0.14)",
                  boxShadow: item.isCheck
                    ? "0 0 24px rgba(0, 255, 102, 0.25)"
                    : "0 8px 30px rgba(0, 0, 0, 0.6)",
                  padding: "20px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 12,
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                {/* 물체 상단에 고정된 이름표(Label / Badge) — 말풍선 금지 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* 스텝 태그 */}
                  <span
                    style={{
                      fontFamily: "Pretendard-ExtraBold",
                      fontSize: 18,
                      color: item.badgeColor,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.step}
                  </span>

                  {/* 화면에 찍히는 구체 값 (물체에 부착된 단단한 이름표 뱃지) */}
                  <div
                    style={{
                      backgroundColor: item.isCheck
                        ? "rgba(0, 255, 102, 0.15)"
                        : "rgba(255, 255, 255, 0.1)",
                      border: `1.5px solid ${item.badgeColor}`,
                      padding: "6px 14px",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Pretendard-ExtraBold",
                        fontSize: 22,
                        color: item.isCheck ? "#00FF66" : "#FFFFFF",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                </div>

                {/* 단계 이름 (굵은 타이포) */}
                <span
                  style={{
                    fontFamily: "Pretendard-ExtraBold",
                    fontSize: 34,
                    color: item.isCheck ? "#00FF66" : "#FFFFFF",
                    letterSpacing: "-1px",
                  }}
                >
                  {item.name}
                </span>

                {/* 이 움직임이 뜻하는 것 한 줄 설명 */}
                <span
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: 22,
                    color: "#A1A1AA",
                    letterSpacing: "-0.5px",
                    lineHeight: "26px",
                  }}
                >
                  {item.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

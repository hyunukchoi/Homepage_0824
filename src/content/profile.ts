/**
 * 프로필 · 소개 · 지표 데이터
 * ─────────────────────────────────────────────
 * CMS 없이 이 파일만 수정하면 사이트 상단/소개 영역이 즉시 갱신됩니다.
 */

export type Stat = { value: string; label: string; caption: string };
export type Capability = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
};

export const profile = {
  nameKo: "최현욱",
  nameEn: ["CHOI", "HYON UK"],
  role: "Game Client & XR System Developer",
  eyebrow: "GAME CLIENT & XR SYSTEM DEVELOPER",
  tagline: "다중 상용 엔진 아키텍처부터 XR, AI 파이프라인 제어까지 전체 사이클을 책임지는 10년 4개월 차 클라이언트 프로그래머",
  availability: "적극 구직 중 · 이직 협의 가능",
  email: "ssaturn000@naver.com",
  github: "https://github.com/hyunukchoi",
  location: "Gyeonggi-do, Republic of Korea",
} as const;

/** 히어로 하단 마퀴에 흐르는 기술 키워드 */
export const marqueeItems = [
  "Unreal Engine 5",
  "C++",
  "Unity",
  "C#",
  "OpenXR",
  "Hand Tracking",
  "Meta Quest",
  "Meta SDK",
  "Claude Code",
  "Codex",
  "Antigravity",
];

export const stats: Stat[] = [
  { value: "10", label: "년 4개월", caption: "TOTAL EXPERIENCE" },
  { value: "15", label: "", caption: "PROJECTS" },
  { value: "4", label: "", caption: "GAME ENGINES" },
  { value: "5", label: "", caption: "STUDIOS" },
];

export const about = {
  headline: ["10년간 게임과 VR 현장에서", "클라이언트를 직접 만들고 검증해왔습니다."],
  quote:
    "PC MMORPG 라이브 서비스부터 독립형 VR 콘텐츠, 다중 기기 관리 툴까지 직접 설계하고 구현해온 10년 4개월 차 클라이언트 프로그래머입니다.",
  body: "다양한 상용 엔진과 라이브 서비스를 거치며 모듈화와 코드 안정성의 중요성을 체득했습니다. 컴포넌트 단위로 구조를 탄탄히 설계하고, AI 도구를 활용하더라도 모든 코드는 직접 디버깅하며 완성도를 검증합니다.",
};

export const capabilities: Capability[] = [
  {
    id: "engine",
    index: "01",
    kicker: "ENGINE & ARCHITECTURE",
    title: "엔진 활용 & 컴포넌트 아키텍처",
    body: "PC 온라인 라이브 서비스 경험을 살려, 언리얼과 유니티 기반으로 프로젝트 요구사항에 맞춘 최적의 모듈형 아키텍처를 설계합니다.",
  },
  {
    id: "ux",
    index: "02",
    kicker: "VR UX & INTERACTION",
    title: "직관적 VR 조작계 & UX 설계",
    body: "전담 기획자가 없는 환경에서도 훈련 절차를 체계화하고, 이동 멀미 저감 알고리즘과 핸드 트래킹 조작계를 직접 구현합니다.",
  },
  {
    id: "hardware",
    index: "03",
    kicker: "HARDWARE INTEGRATION",
    title: "물리 하드웨어 & 체감 장비 연동",
    body: "모션 시뮬레이터, VR 트레드밀, 햅틱 슈트 SDK를 연동해 시각 정보와 물리적 감각이 어긋나지 않는 일체감을 만듭니다.",
  },
  {
    id: "infrastructure",
    index: "04",
    kicker: "NETWORK & CMS",
    title: "폐쇄망 로컬 서버 & 중앙 관제",
    body: "외부망이 차단된 폐쇄망 환경을 위한 자체 소켓 서버를 구축하고, 수십 대 HMD를 원격으로 일괄 제어·모니터링하는 관제 시스템을 개발합니다.",
  },
  {
    id: "ai",
    index: "05",
    kicker: "AI & MODULARITY",
    title: "모듈형 AI 통제 & 직접 검증",
    body: "AI 코드 파편화를 막기 위해 컴포넌트 단위로 역할을 나누고, 생성된 C++ 코드도 직접 디버깅하며 완성도를 검증합니다.",
  },
];

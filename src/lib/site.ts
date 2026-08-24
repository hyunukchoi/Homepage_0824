/**
 * 사이트 전역 설정 — 배포 도메인/기본 SEO 정보를 여기서 한 번에 관리합니다.
 */
export const site = {
  url: "http://localhost:3100",
  locale: "ko_KR",
  title: "최현욱 — Game Client & XR System Developer",
  shortTitle: "CHOI HYON UK",
  description:
    "게임 클라이언트 개발 경력 10년 4개월. Unreal Engine 5 · Unity 기반 체감형 VR 훈련 콘텐츠와 폐쇄망 멀티플레이 · 중앙 관제(CMS) 시스템을 설계하고 구축합니다.",
  keywords: [
    "최현욱",
    "VR 개발자",
    "XR 개발",
    "Unreal Engine 5",
    "Unity",
    "게임 클라이언트 개발자",
    "VR 훈련 콘텐츠",
    "Hand Tracking",
    "포트폴리오",
  ],
  author: "최현욱 (CHOI HYON UK)",
  email: "ssaturn000@naver.com",
  github: "https://github.com/hyunukchoi",
  /** 히어로·푸터의 이력서 버튼 — public/ 에 파일을 넣고 경로를 맞춰주세요 */
  resume: "/resume/최현욱_이력서.pdf",
} as const;

export type Site = typeof site;

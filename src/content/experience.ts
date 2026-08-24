/**
 * 경력 타임라인 데이터
 * ─────────────────────────────────────────────
 * 최신순으로 정렬해서 넣어주세요. 첫 항목이 기본으로 펼쳐집니다.
 */

export type Experience = {
  id: string;
  start: string;
  end: string;
  duration: string;
  company: string;
  role: string;
  focus: string;
  achievements: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    id: "perrygood",
    start: "2021.09",
    end: "2024.03",
    duration: "2년 7개월",
    company: "(주)페리굿",
    role: "VR 클라이언트 개발 (과장)",
    focus: "B2B/공공기관 메인 체감형 VR 콘텐츠 개발, 폐쇄망 관제 및 하드웨어 연동",
    achievements: [
      "VR/MR 교육 훈련 콘텐츠 다수 개발 — Meta Quest 핸드 트래킹 기반 공간 인터랙션 설계 및 최적화",
      "오프라인 폐쇄망 멀티플레이 개발 — Go 기반 자체 서버 및 다수 유저 협업 CPR 시뮬레이터 개발",
      "콘텐츠 관리 시스템(CMS) 개발 — C# WPF 기반 수십 대 HMD 일괄 원격 제어 및 실시간 화면 미러링 인프라 구축",
      "물리 체감 시스템 구축 — 모션하우스 4축 시뮬레이터 · Virtuix Omni · bHaptics 햅틱 슈트 SDK 연동 및 물리 체감 동기화",
    ],
    stack: ["Unity", "C#", "Go", "WPF", "Hand Tracking", "Hardware SDK"],
  },
  {
    id: "inixsoft",
    start: "2020.01",
    end: "2021.06",
    duration: "1년 6개월",
    company: "(주)아이닉스소프트",
    role: "게임 클라이언트 개발",
    focus: "칼온라인 (PC MMORPG), 쌈박 (모바일)",
    achievements: [
      "PC MMORPG '칼온라인' 글로벌 라이브 서비스 유지보수 및 레거시 C++ 클라이언트 아키텍처 리팩토링",
      "모바일 게임 '쌈박' 인게임 코어 전투 루프 및 상태 머신(FSM) 기반 AI Bot 시스템 구현 (Unity, C#)",
      "글로벌 서비스 플랫폼 연동 — Firebase, Google Play Games, 모바일 광고 SDK 통합",
    ],
    stack: ["C++", "Unity", "C#", "Firebase", "Live Service"],
  },
  {
    id: "lineplay",
    start: "2016.12",
    end: "2018.11",
    duration: "2년",
    company: "라인플레이 (Phx 스튜디오)",
    role: "모바일 게임 클라이언트 개발",
    focus: "스핀히어로즈 (모바일 퍼즐 RPG)",
    achievements: [
      "모바일 퍼즐 RPG '스핀히어로즈' 코어 전투 구현 (Unity, C#)",
      "2D 공간 연출 및 Spine 애니메이션 시스템 통합",
      "데이터 무결성 검증 및 기획 생산성 향상을 위한 C# 커스텀 에디터 툴 개발",
    ],
    stack: ["Unity", "C#", "Spine", "Editor Tools"],
  },
  {
    id: "move-interactive",
    start: "2016.02",
    end: "2016.12",
    duration: "11개월",
    company: "무브인터렉티브",
    role: "PC 온라인 게임 클라이언트 개발",
    focus: "디지몬 마스터즈 (PC MMORPG)",
    achievements: [
      "PC MMORPG '디지몬 마스터즈' 신규 시스템 로직 및 글로벌 라이브 콘텐츠 개발 (C++)",
      "빌드/배포 자동화 인프라 구축 — Jenkins + Git 기반 CI/CD 파이프라인 개발",
      "글로벌 패치 배포 인프라 운영 — CDN 기반 국내 및 북미 라이브 패치 배포 관리",
    ],
    stack: ["C++", "Jenkins", "Git", "CDN", "Live Service"],
  },
  {
    id: "softnyx",
    start: "2012.01",
    end: "2015.03",
    duration: "3년 3개월",
    company: "소프트닉스",
    role: "PC 온라인 게임 클라이언트 개발",
    focus: "NTD 프로젝트 (PC MMORPG), 라키온: 영웅의 귀환",
    achievements: [
      "언리얼 엔진 3 기반 'NTD 프로젝트' / '라키온' 코어 인게임 UI 콘텐츠 설계 (C++)",
      "UnrealScript 로직 구현 및 클라이언트 크래시 디버깅",
    ],
    stack: ["C++", "Unreal Engine 3", "UnrealScript", "UI Framework"],
  },
];

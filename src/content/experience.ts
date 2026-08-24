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
      "B2B·공공기관 VR/MR 교육 훈련 콘텐츠 개발 — Meta Quest 핸드 트래킹 기반 공간 조작계 설계 및 모바일 최적화",
      "오프라인 폐쇄망 멀티플레이 환경 구축 — Go 기반 독립형 소켓 서버 개발 및 4인 협동 CPR 시뮬레이터 구현",
      "기기 관제 시스템(CMS) 개발 — C# WPF 기반으로 수십 대 HMD 일괄 원격 제어 및 다채널 실시간 화면 미러링 인프라 구축",
      "체감형 하드웨어 연동 — 모션하우스 4축 시뮬레이터, Virtuix Omni 트레드밀, bHaptics 슈트 SDK 연동 및 모션 물리 동기화",
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
      "PC MMORPG '칼온라인' 글로벌 라이브 서비스 대응 및 레거시 C++ 클라이언트 구조 리팩토링",
      "모바일 캐주얼 대전 게임 '쌈박' 인게임 전투 루프 및 FSM 기반 AI 봇 시스템 개발 (Unity, C#)",
      "글로벌 플랫폼 SDK 연동 — Firebase, Google Play Games 및 인앱 광고 모듈 통합",
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
      "모바일 퍼즐 RPG '스핀히어로즈' 코어 전투 시스템 및 룰 로직 구현 (Unity, C#)",
      "2D 인게임 연출 및 Spine 2D 스켈레톤 애니메이션 시스템 통합",
      "기획 데이터 검증 및 작업 생산성 향상을 위한 Unity C# 커스텀 에디터 툴 제작",
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
      "PC MMORPG '디지몬 마스터즈' 인게임 신규 시스템 및 글로벌 라이브 콘텐츠 개발 (C++)",
      "빌드·배포 자동화 인프라 구축 — Jenkins와 Git 기반의 클라이언트 CI/CD 파이프라인 구성",
      "글로벌 패치 배포 운영 — CDN 기반 국내 및 글로벌(북미) 라이브 패치 배포 관리",
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
      "언리얼 엔진 3 기반 'NTD 프로젝트' 및 '라키온: 영웅의 귀환' 인게임 UI 시스템 및 콘텐츠 구현 (C++)",
      "UnrealScript 게임플레이 로직 작성 및 덤프 분석을 통한 클라이언트 크래시 디버깅",
    ],
    stack: ["C++", "Unreal Engine 3", "UnrealScript", "UI Framework"],
  },
];

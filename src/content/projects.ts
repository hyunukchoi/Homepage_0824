/**
 * 프로젝트 데이터 (포트폴리오 필터링 갤러리 소스)
 * ─────────────────────────────────────────────
 * · category 값은 아래 projectCategories 의 id 와 일치해야 합니다.
 * · cover 를 넣으면 카드 상단 이미지가 표시되고, 없으면 자동 생성 비주얼이 사용됩니다.
 *   예) cover: "/projects/vr-shooter.webp"
 */

export type ProjectCategory = "rnd" | "vr-training" | "vr-platform" | "game-client";

export type Project = {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  /** 상세 성과. 없으면 카드의 "상세 성과 보기" 버튼이 렌더되지 않습니다. */
  highlights?: string[];
  tags: string[];
  /** 상단 뱃지 (플랫폼/기기) */
  badges?: string[];
  /** 유튜브 영상 (첫 번째 영상의 썸네일이 카드 커버로 사용됩니다) */
  videos?: { id: string; label: string }[];
  cover?: string;
  link?: { label: string; href: string };
};

export const projectCategories: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "rnd", label: "개인 R&D" },
  { id: "vr-training", label: "VR 교육·훈련" },
  { id: "vr-platform", label: "VR 플랫폼·운영" },
  { id: "game-client", label: "게임 클라이언트" },
];

export const projects: Project[] = [
  {
    id: "vr-ct-viewer",
    year: "2026",
    title: "VR CT 의료영상 뷰어",
    subtitle: "개인 R&D",
    summary: "CT 의료 영상(DICOM)을 VR 환경에 실시간 3D 볼륨으로 렌더링하는 프로젝트 (AI 파이프라인 검증)",
    category: "rnd",
    badges: ["Meta Quest"],
    highlights: [
      "AI 도구로 HLSL 셰이더와 Python 전처리 파이프라인 고속 프로토타이핑",
      "Raymarching 셰이더 기반 반투명 실시간 3D 볼륨 렌더링 (2D DICOM 슬라이스 → Texture3D)",
      "클리핑 플레인 회전 행렬을 계산해 3D 단면을 2D 패널에 실시간 렌더링",
      "VTK로 추출한 장기 표면 메쉬를 경량화(Decimation)해 유니티 연동",
    ],
    tags: ["Unity 6", "URP", "C#", "HLSL", "OpenXR", "Meta XR SDK", "Python (SimpleITK · VTK)", "Claude Code"],
    videos: [
      { id: "IEp7bjI_z4U", label: "3D CT 뷰어 개발기 — Raymarching · Window Level · 의료 데이터 검증" },
    ],
  },
  {
    id: "vr-shooter",
    year: "2026",
    title: "VR 슈터",
    subtitle: "개인 R&D",
    summary: "UE 5.8 기반 1인 개발 C++ VR 상호작용 및 AI 전투 시스템 (AI 파이프라인 실전 검증)",
    category: "rnd",
    badges: ["Meta Quest"],
    highlights: [
      "UActorComponent 모듈화로 무기·인벤토리·상호작용 시스템 분리",
      "Data Asset 기반 스테이지 데이터 및 무기 밸런싱 구조 설계",
      "Behavior Tree 기반의 적 AI 및 본(Bone) 부위별 피격 반응 구현",
      "이동 멀미 저감을 위한 데드존 알고리즘 및 3D 공간 HUD 연동",
    ],
    tags: ["Unreal Engine 5.8", "C++", "Behavior Tree", "Physics", "AI-Driven"],
    videos: [
      { id: "cZiHYipa0jY", label: "UE5 VR Shooter" },
      { id: "VxuNtm1xxoQ", label: "실사형 VR 슈터 플레이 #1" },
      { id: "-icwFTwYyQE", label: "실사형 VR 슈터 플레이 #2" },
    ],
  },
  {
    id: "vr-cpr",
    year: "2021 — 2024",
    title: "VR 심폐소생술 (멀티플레이)",
    subtitle: "(주)페리굿",
    summary: "오프라인 로컬 네트워크(LAN) 기반 4인 동시 접속 심폐소생술 VR 시뮬레이터",
    category: "vr-platform",
    badges: ["Meta Quest"],
    highlights: [
      "Go 기반 독립형 소켓 서버를 구축해 인터넷 없는 폐쇄망에서 4인 동기화 구현",
      "HMD 트래킹 보간(Interpolation)과 서버 상태 알림(Notify)으로 싱크 유지",
      "공유기 1대와 일반 PC만으로 구동 가능한 현장 맞춤형 독립 환경 구성",
    ],
    tags: ["Go (Golang)", "Unity", "C#", "TCP / WebSocket", "UDP Socket", "Interpolation", "Multiplayer"],
    videos: [
      { id: "Q3D48ghc9Lw", label: "VR 심폐소생술 멀티플레이" },
    ],
  },
  {
    id: "barista-vr",
    year: "2021 — 2024",
    title: "독립형 VR 바리스타 (핸드 트래킹)",
    subtitle: "(주)페리굿",
    summary: "Meta Quest 핸드 트래킹을 활용해 커피 제조 과정을 맨손으로 실습하는 독립형 VR 콘텐츠",
    category: "vr-training",
    badges: ["Meta Quest", "핸드 트래킹"],
    highlights: [
      "컨트롤러 없이 맨손 제스처로 전 과정 조작",
      "손 모양 가이드와 마그네틱 그랩 포인트로 오조작 방지 및 조작감 개선",
      "독립형(Standalone) HMD 렌더링 부하·드로우콜 최적화",
    ],
    tags: ["Unity Engine", "Hand Tracking", "Standalone VR"],
    videos: [
      { id: "1hnMJgX4tvE", label: "아이스 카페라떼 제조 과정" },
      { id: "WvpNMnZ5kbI", label: "핫 카페라떼 제조 과정" },
    ],
  },
  {
    id: "vr-multiplay-edu",
    year: "2021 — 2024",
    title: "VR 교육 콘텐츠 (멀티플레이)",
    subtitle: "(주)페리굿",
    summary: "강사와 교육생이 가상 공간에 동시 접속하는 실시간 협업 교육 플랫폼",
    category: "vr-platform",
    cover: "/projects/vr-multiplay-edu.jpg",
    badges: ["Meta Quest"],
    highlights: [
      "아바타 위치·음성·시선 동기화 기반 실시간 쌍방향 교육 시스템 구현",
      "외부 모니터 시야 미러링 연동으로 참관자 실시간 현황 공유",
    ],
    tags: ["Unity Engine", "Multiplayer", "Voice Chat"],
    videos: [
      { id: "yF6cc8BTmBU", label: "PC형 VR 코옵 프로젝트" },
    ],
  },
  {
    id: "vr-cms",
    year: "2021 — 2024",
    title: "VR 헤드셋 통합 관제 시스템 (CMS)",
    subtitle: "(주)페리굿",
    summary: "다수의 VR 기기를 한 대의 PC에서 원격 제어하는 현장 통합 관제 솔루션",
    category: "vr-platform",
    badges: ["Meta Quest"],
    highlights: [
      "IP 기반 무선 소켓 통신을 통한 수십 대 HMD 일괄 제어 및 연결 상태 모니터링",
      "콘텐츠 동시 실행 및 화면 멀티 미러링으로 교육 현장 세팅 시간 단축",
    ],
    tags: ["C# / WPF", "Device Management", "Mirroring", "Tools"],
    videos: [
      { id: "EKMGAwwdiC8", label: "독립형 VR 콘텐츠 제어 프로그램 (CMS)" },
    ],
  },
  {
    id: "plant-process",
    year: "2021 — 2024",
    title: "VR 공정 설비 조작 훈련",
    subtitle: "(주)페리굿",
    summary: "가상 제어반과 공정 계통도를 조작하며 실습하는 플랜트 설비 훈련 시뮬레이션",
    category: "vr-training",
    badges: ["Meta Quest", "핸드 트래킹"],
    highlights: [
      "실제 산업 제어반 배치를 1:1로 모델링 및 인터랙션 매핑",
      "공정 단계별 가이드 UI와 에러 방지 로직으로 조작 실수 방지",
    ],
    tags: ["Unity Engine", "Simulation", "Procedure Training", "Hand Tracking"],
    videos: [
      { id: "57_GUD2wl4I", label: "독립형 VR 핸드 트래킹 조작" },
    ],
  },
  {
    id: "safety-360",
    year: "2021 — 2024",
    title: "산업안전 위험요소 발굴 VR",
    subtitle: "(주)페리굿",
    summary: "고해상도 360 영상에 3D 인터랙션을 결합한 산업안전 위험요소 발굴 교육",
    category: "vr-training",
    badges: ["Meta Quest"],
    highlights: [
      "360 파노라마 영상 위에 3D 오브젝트 인터랙션을 결합해 현장감 강화",
      "제한 시간 및 발굴 개수를 시각화하는 월드 스페이스 HUD 연동",
    ],
    tags: ["Unity Engine", "360 Video", "Interaction"],
    videos: [
      { id: "rPDS_D28yz0", label: "체험형 VR 프로젝트" },
    ],
  },
  {
    id: "home-nursing",
    year: "2021 — 2024",
    title: "방문간호 VR",
    subtitle: "(주)페리굿",
    summary: "방문 간호 절차와 생체 신호 측정 도구 사용법을 실습하는 VR 훈련 콘텐츠",
    category: "vr-training",
    badges: ["Meta Quest"],
    highlights: [
      "고혈압·뇌졸중 등 환자 질환군별 시나리오 분기 및 단계별 처치 프로세스 구현",
      "Safe Line 가이드 및 절차형 UI로 훈련 동선 체계화",
      "도구 아이콘화로 인터랙션 직관성 확보",
    ],
    tags: ["Unity Engine", "Healthcare", "Procedure Training"],
    videos: [
      { id: "UELsZuPHolk", label: "고혈압 환자 시나리오" },
      { id: "x0x6_hdxqAU", label: "고혈당 환자 시나리오" },
      { id: "RP2f6DGXKHA", label: "뇌졸중 환자 시나리오" },
    ],
  },
  {
    id: "fall-simulator",
    year: "2021 — 2024",
    title: "공사장 추락 체감 VR",
    subtitle: "(주)페리굿",
    summary: "4축 모션 시뮬레이터와 결합해 고소 작업 추락 상황을 물리적으로 체감하는 안전 콘텐츠",
    category: "vr-training",
    badges: ["4축 모션 시뮬레이터", "Virtuix Omni", "bHaptics TactSuit"],
    cover: "/projects/fall-simulator.jpg",
    highlights: [
      "모션하우스 4축 시뮬레이터와 콘텐츠 물리 이벤트를 Serial/UDP로 연동해 낙하 충격 재현",
      "Virtuix Omni 트레드밀 센서값을 이동 입력으로 변환하고 실제 보행 속도에 맞춰 카메라 보정",
    ],
    tags: ["Unity Engine", "Hardware SDK", "Serial / UDP", "Simulation"],
    videos: [
      { id: "Wu8z65bA4lI", label: "공사장 추락 체감 VR" },
    ],
  },
  {
    id: "roblox-cooking",
    year: "2026",
    title: "로블록스 요리·펫 게임",
    subtitle: "개인 프로젝트",
    summary: "로블록스 플랫폼에서 요리·펫 육성 루프를 직접 구현한 개인 프로젝트",
    category: "rnd",
    badges: ["Roblox"],
    cover: "/projects/roblox-cooking.jpg",
    highlights: [
      "요리·섭취·인벤토리로 이어지는 핵심 순환과 펫 수집·성장 구조 설계",
      "상점·일일 퀘스트·VIP 등 재화 순환과 리텐션 장치를 플랫폼 규격에 맞춰 구성",
    ],
    tags: ["Roblox", "Luau", "Game Design", "Live Ops"],
  },
  {
    id: "kal-online",
    year: "2020.01 — 2021.06",
    title: "칼온라인 & 모바일 프로젝트",
    subtitle: "(주)아이닉스소프트",
    summary: "PC MMORPG 라이브 서비스 유지보수 및 신규 모바일 게임 로직 개발",
    category: "game-client",
    tags: ["C++", "Unity", "C#", "MMORPG", "Live Service"],
    videos: [
      { id: "u482C3fF_qE", label: "모바일 프로젝트 '쌈박'" },
    ],
  },
  {
    id: "ntd-rakion",
    year: "2012.01 — 2015.03",
    title: "NTD 프로젝트 (Rakion: Return of Heroes)",
    subtitle: "소프트닉스",
    summary: "언리얼 엔진 3 기반 액션 MMORPG 클라이언트 로직 및 UI 프레임워크 개발",
    category: "game-client",
    tags: ["C++", "Unreal Engine 3", "MMORPG", "UI Framework"],
    videos: [
      { id: "oBbayeBZ-yE", label: "Rakion: Return of Heroes PV" },
      { id: "5vRgx14UWw8", label: "언리얼 3 MMORPG 프로젝트" },
      { id: "ZjQ0oasdkF8", label: "언리얼 3 MMORPG 프로젝트 #2" },
    ],
  },
  {
    id: "spin-heroes",
    year: "2016.12 — 2018.11",
    title: "스핀히어로즈",
    subtitle: "라인플레이",
    summary: "Unity 기반 퍼즐 RPG 전투 로직 및 기획 생산성 향상을 위한 커스텀 툴 개발",
    category: "game-client",
    cover: "/projects/spin-heroes.jpg",
    tags: ["Unity", "C#", "Puzzle RPG", "Tools"],
  },
  {
    id: "digimon-masters",
    year: "2016.02 — 2016.12",
    title: "디지몬 마스터즈",
    subtitle: "무브인터렉티브",
    summary: "PC MMORPG 글로벌 라이브 서비스 대응 및 신규 인게임 콘텐츠 개발",
    category: "game-client",
    cover: "/projects/digimon-masters.png",
    tags: ["C++", "MMORPG", "Live Service", "CI/CD"],
  },
];

/** 카테고리별 프로젝트 개수 (필터 칩 옆 숫자) */
export function countByCategory(id: "all" | ProjectCategory) {
  return id === "all" ? projects.length : projects.filter((p) => p.category === id).length;
}

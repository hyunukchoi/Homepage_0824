/**
 * 케이스 스터디 (대표 5건)
 * ─────────────────────────────────────────────
 * 선정 기준: 렌더링 / 엔진 아키텍처 / 네트워크 / 툴·인프라 / 인터랙션 UX
 *            — 서로 다른 기술 축이 중복 없이 증명되도록 골랐습니다.
 *
 * ⚠️ problem·approach 서술은 projects.ts 의 하이라이트를 근거로 쓴 **초안**입니다.
 *    본인 표현으로 교체해주세요. period 가 비어 있으면 화면에 "[기간 확인 필요]" 로 표시됩니다.
 */

export type CaseStudy = {
  /** projects.ts 의 id 와 일치해야 합니다 */
  id: string;
  axis: string;
  role: string;
  period?: string;
  problem: { title: string; body: string };
  approach: { title: string; body: string };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "vr-ct-viewer",
    axis: "VOLUME RENDERING",
    role: "1인 개발 (전 영역)",
    problem: {
      title: "2D 단면만 넘겨서는 전체 입체 구조를 파악하기 어렵다",
      body: "CT는 2D 단면 수백 장으로 저장됩니다. 일반 모니터에서는 슬라이스를 한 장씩 넘기며 머릿속으로 입체 구조를 재구성해야 하므로 직관적 이해에 한계가 있었습니다. VR 공간이라면 장기 볼륨 자체를 띄워두고 직접 회전·단면 조작하며 입체적으로 관찰할 수 있다고 판단했습니다.",
    },
    approach: {
      title: "전처리는 Python, 렌더링은 커스텀 셰이더",
      body: "SimpleITK로 DICOM을 읽어 정규화한 뒤 Texture3D로 변환하고, VTK로 추출한 장기 메쉬는 Decimation으로 경량화해 유니티에 올렸습니다. 렌더링은 URP 기반 커스텀 Raymarching 셰이더를 작성해 반투명 3D 볼륨을 실시간으로 구현했습니다.",
    },
  },
  {
    id: "vr-shooter",
    axis: "ENGINE ARCHITECTURE",
    role: "1인 개발 (전 영역)",
    problem: {
      title: "혼자 만들수록 구조의 경계가 중요하다",
      body: "무기, 인벤토리, 상호작용 로직이 단일 액터에 뭉치면 기능을 붙일 때마다 사이드 이펙트가 발생합니다. 1인 개발 환경에서 지속적인 개발 속도를 유지하려면 기능 구현 이전에 코드 경계를 명확히 분리해야 했습니다.",
    },
    approach: {
      title: "컴포넌트로 모듈화하고 데이터는 에셋으로 분리",
      body: "UActorComponent 단위로 무기, 인벤토리, 상호작용 모듈을 분리하고, 스테이지 데이터와 무기 밸런스는 Data Asset으로 관리해 코드 수정 없이 수치를 조정하도록 설계했습니다. 적 AI는 Behavior Tree로, 피격 반응은 Bone 부위별로 처리했습니다.",
    },
  },
  {
    id: "vr-cpr",
    axis: "NETWORK",
    role: "클라이언트 + 서버 개발",
    period: "2021 — 2024",
    problem: {
      title: "현장 교육장에는 외부 인터넷이 없다",
      body: "공공기관이나 기업 교육장은 대부분 보안상의 이유로 외부 인터넷이 차단된 폐쇄망입니다. 상용 클라우드 릴레이 서버를 쓸 수 없으므로, 공유기 1대와 일반 PC만으로 4인 동시 훈련 환경을 구축해야 했습니다.",
    },
    approach: {
      title: "경량 독립형 로컬 소켓 서버 자체 구축",
      body: "Go 언어로 독립형 TCP/UDP 소켓 서버를 직접 제작해 현장 PC에서 즉시 구동하고, HMD 트래킹은 보간으로, 주요 상태 변화는 이벤트 알림(Notify) 방식으로 동기화하여 4인 동시 협업 시에도 안정적인 싱크를 유지했습니다.",
    },
  },
  {
    id: "vr-cms",
    axis: "TOOLING",
    role: "관제 시스템 설계 · 개발",
    period: "2021 — 2024",
    problem: {
      title: "수십 대의 헤드셋을 일일이 설정하면 교육 시간이 부족하다",
      body: "단일 교육 세션마다 20~30대의 HMD가 동시에 투입됩니다. 기기마다 사람이 직접 앱을 켜고 설정을 맞추면 준비 시간이 길어지고, 강사가 교육생 개개인의 진행 상황을 실시간으로 확인하기 어렵습니다.",
    },
    approach: {
      title: "WPF 기반 원격 일괄 제어 및 다채널 미러링",
      body: "C# WPF 기반의 통합 관제 프로그램을 개발하여 수십 대의 HMD에 앱 실행, 종료, 시나리오 전환 명령을 일괄 전송하고, 각 기기의 실시간 화면을 단일 모니터에 멀티 미러링하여 강사가 현황을 한눈에 파악할 수 있게 구축했습니다.",
    },
  },
  {
    id: "barista-vr",
    axis: "INTERACTION UX",
    role: "VR 클라이언트 개발",
    period: "2021 — 2024",
    problem: {
      title: "컨트롤러 조작 자체가 교육생에게 큰 진입 장벽이다",
      body: "VR 기기를 처음 접하는 교육생은 콘텐츠 내용보다 컨트롤러의 복잡한 버튼 배열을 익히는 데 더 많은 시간을 소모합니다. 훈련 본연의 목적에 집중하려면 별도 장비 없이 맨손으로 즉시 시작할 수 있어야 했습니다.",
    },
    approach: {
      title: "핸드 트래킹 중심 인터랙션 및 렌더링 최적화",
      body: "핸드 트래킹 제스처만으로 커피 제조 전 과정을 수행하도록 조작계를 설계하고, 손 모양 가이드와 마그네틱 스냅을 적용해 오조작을 방지했습니다. 독립형 HMD의 하드웨어 한계를 고려해 드로우콜과 셰이더 부하를 철저히 최적화했습니다.",
    },
  },
];

export const caseStudyIds = caseStudies.map((study) => study.id);

export function caseStudyOf(id: string) {
  return caseStudies.find((study) => study.id === id);
}

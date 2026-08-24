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
      title: "슬라이스를 넘기며 3D를 상상해야 한다",
      body: "CT는 2D 단면 수백 장으로 저장됩니다. 평면 모니터에서는 슬라이스를 한 장씩 넘기며 머릿속에서 입체를 재구성해야 하고, 그 부담이 곧 학습 곡선이 됩니다. VR이라면 볼륨 자체를 손으로 돌려 보게 만들 수 있다고 봤습니다.",
    },
    approach: {
      title: "전처리는 Python, 렌더링은 셰이더",
      body: "SimpleITK로 DICOM을 읽어 정규화하고 Texture3D로 적재, VTK로 추출한 장기 표면 메쉬는 Decimation으로 경량화해 유니티에 넘겼습니다. 렌더링은 URP 커스텀 Raymarching 셰이더로 처리해 반투명 볼륨을 실시간으로 그립니다.",
    },
  },
  {
    id: "vr-shooter",
    axis: "ENGINE ARCHITECTURE",
    role: "1인 개발 (전 영역)",
    problem: {
      title: "혼자 만들수록 구조가 먼저 무너진다",
      body: "무기·인벤토리·상호작용이 한 액터에 뭉치면 기능을 하나 붙일 때마다 회귀가 납니다. 1인 개발에서 속도를 유지하려면 기능이 아니라 경계를 먼저 그어야 했습니다.",
    },
    approach: {
      title: "컴포넌트로 쪼개고 데이터로 뺀다",
      body: "UActorComponent 단위로 무기·인벤토리·상호작용을 분리하고, 스테이지 구성과 무기 밸런싱은 Data Asset으로 빼 코드 수정 없이 조정하도록 했습니다. 적 AI는 Behavior Tree로, 피격 반응은 본 부위별로 처리합니다.",
    },
  },
  {
    id: "vr-cpr",
    axis: "NETWORK",
    role: "클라이언트 + 서버 개발",
    period: "2021 — 2024",
    problem: {
      title: "교육장에는 인터넷이 없다",
      body: "공공기관·기업 교육장은 대부분 폐쇄망입니다. 상용 릴레이 서버를 쓸 수 없고, 현장에 남는 건 공유기 한 대와 일반 PC뿐이라는 전제에서 시작해야 했습니다.",
    },
    approach: {
      title: "서버를 직접 들고 들어간다",
      body: "Go로 독립형 소켓 서버를 만들어 현장 PC에서 바로 띄우고, HMD 트래킹은 보간으로, 상태 변화는 서버 알림(Notify)으로 맞췄습니다. 4인이 같은 환자에게 동시에 붙어도 흐트러지지 않는 선을 잡는 것이 핵심이었습니다.",
    },
  },
  {
    id: "vr-cms",
    axis: "TOOLING",
    role: "관제 시스템 설계 · 개발",
    period: "2021 — 2024",
    problem: {
      title: "헤드셋을 한 대씩 만지면 수업이 끝난다",
      body: "교육 한 회차에 HMD 수십 대가 들어갑니다. 실행·종료·콘텐츠 전환을 사람이 하나씩 처리하면 준비에만 시간이 다 가고, 강사는 지금 누가 어디에 있는지 볼 방법이 없습니다.",
    },
    approach: {
      title: "한 화면에서 전부 본다",
      body: "C# WPF로 관제 프로그램을 만들어 수십 대를 일괄 원격 제어하고, 각 기기 화면을 실시간으로 미러링해 강사가 진행 상황을 한눈에 보도록 했습니다.",
    },
  },
  {
    id: "barista-vr",
    axis: "INTERACTION UX",
    role: "VR 클라이언트 개발",
    period: "2021 — 2024",
    problem: {
      title: "컨트롤러가 첫 번째 장벽이다",
      body: "처음 헤드셋을 쓰는 교육생에게는 콘텐츠보다 컨트롤러 버튼 배치를 익히는 일이 먼저 벽이 됩니다. 맨손으로 바로 시작할 수 있어야 훈련 시간이 훈련에 쓰입니다.",
    },
    approach: {
      title: "맨손 조작을 전제로 다시 설계",
      body: "핸드 트래킹만으로 커피 제조 전 과정을 조작하게 하고, 손 모양 가이드와 마그네틱 그랩 포인트로 오조작을 줄였습니다. 독립형 HMD에서 도는 것이 조건이라 렌더링 부하와 드로우콜을 함께 잡았습니다.",
    },
  },
];

export const caseStudyIds = caseStudies.map((study) => study.id);

export function caseStudyOf(id: string) {
  return caseStudies.find((study) => study.id === id);
}

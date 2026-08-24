import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/content/skills";

const STEPS = [
  {
    index: "01",
    label: "SPLIT",
    title: "역할과 책임을 먼저 분리한다",
    body: "AI 코드 파편화를 방지하기 위해 컴포넌트 단위로 모듈을 설계합니다. 아키텍처 경계를 명확히 세운 뒤 코드 생성을 진행합니다.",
  },
  {
    index: "02",
    label: "PROTOTYPE",
    title: "탐색과 시행착오를 압축한다",
    body: "HLSL 셰이더나 Python 데이터 전처리처럼 리서치가 긴 구간을 빠르게 프로토타이핑하여 실현 가능성을 신속히 검증합니다.",
  },
  {
    index: "03",
    label: "VERIFY",
    title: "모든 코드는 직접 디버깅한다",
    body: "생성 도구를 활용하더라도 모든 C++ 코드는 직접 빌드하고 디버깅합니다. 내부 동작 원리와 예외 처리를 완전히 파악한 상태에서 커밋합니다.",
  },
];

export function Workflow() {
  const aiTools = skillGroups.find((group) => group.id === "ai")?.items ?? [];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--bg-deep)" }}
    >
      <div
        className="pointer-events-none absolute -right-40 top-10 size-[620px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--violet) / 0.22), transparent 66%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />
      <div className="shell relative">
        <SectionHeading
          index="02"
          eyebrow="AI WORKFLOW"
          title="AI를 쓰되, 코드는 직접 검증합니다"
          aside="2026년 개인 R&D 두 건(VR CT 뷰어 · VR 슈터)은 이 파이프라인이 실제로 어디까지 버티는지 확인하려고 시작한 프로젝트이기도 합니다."
        />

        <ol className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.index} delay={index * 80}>
              <div className="glass flex h-full flex-col gap-4 rounded p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[1.625rem] leading-none tracking-tight">
                    {step.index}
                  </span>
                  <span className="label-sm">{step.label}</span>
                </div>
                <span
                  className="h-px w-full"
                  style={{ background: "var(--line)" }}
                  aria-hidden
                />
                <h3 className="text-[1.0625rem]">{step.title}</h3>
                <p className="text-sm leading-[1.8] text-fg-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-8">
          <span className="label-sm">TOOLS IN USE</span>
          <div className="flex flex-wrap gap-2">
            {aiTools.map((tool) => (
              <span key={tool} className="chip">
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

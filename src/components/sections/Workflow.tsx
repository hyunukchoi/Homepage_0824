import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/content/skills";

const STEPS = [
  {
    index: "01",
    label: "SPLIT",
    title: "역할을 먼저 쪼갠다",
    body: "AI 코드 파편화를 방지하기 위해 컴포넌트 단위로 역할을 나눠 개발합니다. 경계를 먼저 긋고 나서야 생성을 맡깁니다.",
  },
  {
    index: "02",
    label: "PROTOTYPE",
    title: "탐색 구간을 압축한다",
    body: "HLSL 셰이더나 Python 전처리 파이프라인처럼 시행착오가 긴 구간을 빠르게 프로토타이핑해 검증 가능한 형태로 만듭니다.",
  },
  {
    index: "03",
    label: "VERIFY",
    title: "코드는 직접 디버깅한다",
    body: "생성된 코드라도 모든 C++ 코드는 직접 디버깅해 검증합니다. 동작 확인이 아니라 원인까지 설명할 수 있어야 커밋합니다.",
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

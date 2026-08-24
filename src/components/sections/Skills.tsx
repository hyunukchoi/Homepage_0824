import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/content/skills";

export function Skills() {
  return (
    <section className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="shell relative">
        <SectionHeading
          index="05"
          eyebrow="STACK"
          title="쓰는 도구"
          aside="엔진과 언어는 프로젝트 요구에 맞춰 고르고, 툴·인프라는 필요하면 직접 만들어 씁니다."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal as="li" key={group.id} delay={index * 60}>
              <div className="glass flex h-full flex-col gap-5 rounded p-7">
                <div className="flex items-center justify-between">
                  <span className="label-sm">{group.label}</span>
                  <span className="font-mono text-xs text-fg-faint">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-t pt-2.5 text-[0.9375rem] first:border-t-0 first:pt-0"
                    >
                      <span
                        className="size-1 rounded-full"
                        style={{ background: "rgb(var(--cool))" }}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

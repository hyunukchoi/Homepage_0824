"use client";

import { useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/content/experience";

/**
 * 좌측 레일의 구간 비중 — experience.ts 의 재직 기간을 개월로 환산해 계산했습니다.
 * 소프트닉스 39m + 무브인터렉티브 11m = 50m / 아이닉스 18m + 라인플레이 24m = 42m / 페리굿 31m
 * 합계 123개월.
 */
const TRAJECTORY = [
  { label: "PC 온라인 클라이언트", span: "4년 2개월", ratio: 41, tone: "var(--fg)" },
  { label: "PC · 모바일 라이브 서비스", span: "3년 6개월", ratio: 34, tone: "rgb(var(--cool))" },
  { label: "VR · XR 클라이언트", span: "2년 7개월", ratio: 25, tone: "rgb(var(--warm))" },
];

const ENGINES = [
  { label: "Unreal Engine 3 → 5", since: "2012—" },
  { label: "Unity", since: "2016—" },
  { label: "Meta XR · OpenXR", since: "2021—" },
];

export function Career() {
  const [open, setOpen] = useState<string>(experiences[0]?.id ?? "");

  return (
    <section
      id="career"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
      style={{ background: "var(--bg-deep)" }}
    >
      <div
        className="pointer-events-none absolute -bottom-64 -left-44 size-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--warm) / 0.24), transparent 66%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      <div className="shell relative">
        <SectionHeading
          index="04"
          eyebrow="CAREER"
          title="다섯 개의 스튜디오, 10년 4개월"
          aside={<span className="font-mono text-xs tracking-[0.16em]">2012.01 — 2024.03</span>}
        />

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* 좌 — 커리어 요약 레일 */}
          <Reveal className="lg:w-[300px] lg:shrink-0">
            <div className="flex flex-col gap-7">
              <div className="glass flex flex-col gap-5 rounded p-6">
                <span className="label-sm">TRAJECTORY</span>
                <div className="flex flex-col gap-4">
                  {TRAJECTORY.map((item) => (
                    <div key={item.label} className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[0.8125rem] text-fg-muted">{item.label}</span>
                        <span className="font-mono text-xs">{item.span}</span>
                      </div>
                      <div
                        className="h-1 overflow-hidden rounded-full"
                        style={{ background: "var(--line)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.ratio}%`, background: item.tone }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="label-sm">ENGINES OVER TIME</span>
                {ENGINES.map((engine) => (
                  <div key={engine.label} className="flex items-baseline justify-between text-[0.8125rem]">
                    <span className="text-fg-muted">{engine.label}</span>
                    <span className="font-mono text-xs text-fg-faint">{engine.since}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 우 — 타임라인 */}
          <div className="relative flex-1">
            <span
              className="absolute bottom-6 left-[6px] top-3 hidden w-px md:block"
              style={{
                background:
                  "linear-gradient(180deg, var(--fg) 0%, var(--fg) 34%, var(--line-mid) 34%, var(--line-mid) 100%)",
              }}
              aria-hidden
            />

            <ul className="flex flex-col md:pl-11">
              {experiences.map((experience, index) => {
                const isOpen = open === experience.id;
                const isFirst = index === 0;

                return (
                  <Reveal as="li" key={experience.id} delay={index * 60} className="relative">
                    <span
                      className="absolute hidden rounded-full md:block"
                      style={{
                        left: isFirst ? "-44px" : "-41px",
                        top: isFirst ? "20px" : "26px",
                        width: isFirst ? "13px" : "7px",
                        height: isFirst ? "13px" : "7px",
                        background: isFirst ? "var(--fg)" : "var(--fg-faint)",
                        boxShadow: `0 0 0 4px var(--bg-deep)`,
                      }}
                      aria-hidden
                    />

                    <div
                      className={
                        isOpen
                          ? "glass mb-6 rounded p-7 md:p-8"
                          : "border-t"
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? "" : experience.id)}
                        aria-expanded={isOpen}
                        className={`flex w-full items-start justify-between gap-6 text-left ${
                          isOpen ? "" : "py-5"
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
                            <span className={isOpen ? "text-[1.375rem]" : "text-[1.1875rem]"}>
                              {experience.company}
                            </span>
                            <span className="rounded-sm px-2.5 py-1 text-xs text-fg-muted" style={{ background: "var(--chip)" }}>
                              {experience.role}
                            </span>
                          </div>
                          <span className="text-[0.8125rem] text-fg-muted">{experience.focus}</span>
                        </div>

                        <div className="flex shrink-0 items-center gap-4">
                          <div className="hidden flex-col items-end gap-1 sm:flex">
                            <span className="font-mono text-xs">
                              {experience.start} — {experience.end}
                            </span>
                            <span className="label-sm">{experience.duration}</span>
                          </div>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mt-1 shrink-0 text-fg-subtle transition-transform duration-300"
                            style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                            aria-hidden
                          >
                            <path d="M4 6l4 4 4-4" />
                          </svg>
                        </div>
                      </button>

                      {isOpen ? (
                        <div className="mt-6 flex flex-col gap-5">
                          <ul className="flex flex-col">
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <li
                                key={achievement}
                                className="flex gap-3.5 border-t py-3.5 text-sm leading-[1.7]"
                              >
                                <span className="mt-0.5 font-mono text-[0.625rem] text-fg-faint">
                                  {String(achievementIndex + 1).padStart(2, "0")}
                                </span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1.5">
                            {experience.stack.map((item) => (
                              <span
                                key={item}
                                className="rounded-sm border px-2.5 py-1.5 font-mono text-[0.5938rem] uppercase tracking-[0.08em] text-fg-muted"
                                style={{ borderColor: "var(--line-mid)" }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

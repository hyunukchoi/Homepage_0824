"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { caseStudyIds } from "@/content/caseStudies";
import { coverOf } from "@/content/media";
import { projectCategories, projects, type Project } from "@/content/projects";

const INITIAL = 6;

export function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(
    null,
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    for (const project of projects) {
      map[project.category] = (map[project.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  const visible = filter === "all" && !expanded ? filtered.slice(0, INITIAL) : filtered;
  const hidden = filtered.length - visible.length;

  return (
    <section id="work" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -right-52 top-32 size-[720px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--cool) / 0.22), transparent 66%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      <div className="shell relative">
        <SectionHeading
          index="03"
          eyebrow="WORK"
          title="직접 만들고 검증한 15건"
          aside={
            <>
              의료 영상 볼륨 렌더링부터 폐쇄망 멀티플레이, 수십 대 HMD 관제까지.
              <br />
              다섯 건은 케이스 스터디로 과정을 열어두었습니다.
            </>
          }
        />

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="프로젝트 분류" className="flex flex-wrap gap-2">
            {projectCategories.map((category) => {
              const active = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(category.id);
                    setExpanded(false);
                  }}
                  className="rounded-sm border px-4 py-2.5 text-[0.8125rem] transition-colors"
                  style={{
                    background: active ? "var(--invert-bg)" : "var(--glass-soft)",
                    color: active ? "var(--invert-fg)" : "var(--fg-muted)",
                    borderColor: active ? "var(--invert-bg)" : "var(--line-mid)",
                  }}
                >
                  {category.label}{" "}
                  <span className="ml-0.5 font-mono text-[0.6875rem] opacity-70">
                    {String(counts[category.id] ?? 0).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
          <span className="label-sm">2012 — 2026</span>
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal as="li" key={project.id} delay={(index % 3) * 70} className="h-full">
              <ProjectCard
                project={project}
                onPlay={() => setLightbox({ project, index: 0 })}
              />
            </Reveal>
          ))}

          {hidden > 0 ? (
            <li className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded border border-dashed p-8 text-center"
              style={{ borderColor: "var(--line-strong)", background: "var(--glass-soft)" }}
            >
              <span className="font-mono text-[2.125rem] leading-none tracking-tight">
                +{String(hidden).padStart(2, "0")}
              </span>
              <span className="text-[0.8125rem] leading-relaxed text-fg-muted">
                {filtered
                  .slice(visible.length)
                  .map((project) => project.title.replace(/\s*\(.*\)$/, ""))
                  .join(" · ")}
              </span>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="glass-soft mt-1 inline-flex items-center gap-2 rounded-sm px-5 py-3 text-[0.8125rem] font-medium"
                style={{ borderColor: "var(--line-strong)" }}
              >
                전체 보기
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </button>
            </li>
          ) : null}
        </ul>
      </div>

      {lightbox?.project.videos?.length ? (
        <VideoLightbox
          videos={lightbox.project.videos}
          index={lightbox.index}
          title={lightbox.project.title}
          onClose={() => setLightbox(null)}
          onIndexChange={(next) =>
            setLightbox((current) => (current ? { ...current, index: next } : current))
          }
        />
      ) : null}
    </section>
  );
}

function ProjectCard({
  project,
  onPlay,
}: {
  project: Project;
  onPlay: () => void;
}) {
  const cover = coverOf(project);
  const isCase = caseStudyIds.includes(project.id);
  const videoCount = project.videos?.length ?? 0;

  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded transition-transform duration-500 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "var(--bg-deep)" }}>
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 200deg, rgb(var(--cool) / 0.5), rgb(var(--warm) / 0.4), rgb(var(--violet) / 0.45), rgb(var(--cool) / 0.5))",
              filter: "blur(18px)",
            }}
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(255 255 255 / 0.42) 0%, transparent 34%, transparent 62%, rgb(10 12 11 / 0.42) 100%)",
          }}
          aria-hidden
        />

        <span className="label-sm absolute left-4 top-3.5 !text-[0.5938rem]" style={{ color: "#1f2a26" }}>
          {project.year} · {project.subtitle}
        </span>

        {project.badges?.length ? (
          <span
            className="absolute right-4 top-3.5 rounded-sm px-2 py-1 font-mono text-[0.5625rem] tracking-[0.12em]"
            style={{ background: "rgb(255 255 255 / 0.82)", color: "#1f2a26" }}
          >
            {project.badges[0].toUpperCase()}
          </span>
        ) : null}

        {videoCount > 0 ? (
          <button
            type="button"
            onClick={onPlay}
            aria-label={`${project.title} 영상 보기`}
            className="absolute bottom-3.5 right-3.5 grid size-11 place-items-center rounded-full transition-transform hover:scale-105"
            style={{ background: "rgb(255 255 255 / 0.88)", color: "#14150f" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
              <path d="M3 1.6l7 4.4-7 4.4z" />
            </svg>
          </button>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-[1.1875rem] leading-snug">{project.title}</h3>
        <p className="text-[0.8125rem] leading-[1.75] text-fg-muted">{project.summary}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        {isCase ? (
          <Link
            href={`/work/${project.id}`}
            className="mt-1 flex items-center gap-2 border-t pt-4 text-[0.8125rem] font-medium transition-colors hover:text-link"
          >
            케이스 스터디
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

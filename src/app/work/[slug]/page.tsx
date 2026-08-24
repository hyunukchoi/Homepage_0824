import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseMedia } from "@/components/ui/CaseMedia";
import { caseStudies, caseStudyOf } from "@/content/caseStudies";
import { coverOf, galleryOf } from "@/content/media";
import { projectCategories, projects } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudyOf(slug);
  const project = projects.find((item) => item.id === slug);
  if (!study || !project) notFound();

  const order = caseStudies.findIndex((item) => item.id === slug);
  const next = caseStudies[(order + 1) % caseStudies.length];
  const nextProject = projects.find((item) => item.id === next.id);

  const category = projectCategories.find((item) => item.id === project.category);
  const cover = coverOf(project);
  const gallery = galleryOf(project.id);
  const engine =
    project.tags.find((tag) => /unreal|unity/i.test(tag)) ?? project.tags[0] ?? "—";
  const device = project.badges?.[0] ?? "PC";

  return (
    <article className="relative overflow-hidden pt-16">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-52 left-1/3 size-[780px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--cool) / 0.26), transparent 66%)",
          filter: "blur(18px)",
        }}
        aria-hidden
      />

      <div className="shell relative">
        {/* 브레드크럼 */}
        <div className="flex items-center justify-between border-b py-5">
          <Link
            href="/#work"
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] transition-colors hover:text-link"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            WORK
            <span className="text-fg-faint">/</span>
            <span className="text-fg-subtle">{category?.label}</span>
          </Link>
          <span className="label-sm">
            CASE {String(order + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
          </span>
        </div>

        {/* 제목 + 메타 레일 */}
        <div className="flex flex-col gap-12 pt-14 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-6 lg:w-[56%]">
            <span className="label !tracking-[0.24em]">
              {project.year} · {study.axis}
            </span>
            <h1 className="text-[clamp(2rem,4.4vw,3.375rem)] leading-[1.16]">
              {project.title}
            </h1>
            <p className="max-w-[640px] text-[clamp(0.95rem,1.2vw,1.0625rem)] leading-[1.8] text-fg-muted">
              {project.summary}
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-5 gap-y-6 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-1">
            <Meta label="ROLE" value={study.role} />
            <Meta
              label="PERIOD"
              value={study.period ?? "[기간 확인 필요]"}
              flag={!study.period}
            />
            <Meta label="ENGINE" value={engine} />
            <Meta label="DEVICE" value={device} />
            <div className="col-span-2 flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 대형 뷰포트 */}
        <div className="glass-strong relative mt-14 aspect-[1344/560] overflow-hidden rounded">
          {cover ? (
            <Image
              src={cover}
              alt={`${project.title} 대표 이미지`}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1344px"
              className="object-cover"
            />
          ) : null}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgb(255 255 255 / 0.28) 0%, transparent 30%, transparent 60%, rgb(10 12 11 / 0.45) 100%)",
            }}
            aria-hidden
          />
          <span
            className="label-sm absolute left-6 top-5 flex items-center gap-2.5"
            style={{ color: "#eef1ef" }}
          >
            <span className="size-1.5 rounded-full" style={{ background: "var(--status)" }} aria-hidden />
            {study.axis}
          </span>
          <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
            {project.badges?.map((badge) => (
              <span
                key={badge}
                className="rounded-sm px-3 py-2 font-mono text-[0.625rem] tracking-[0.12em]"
                style={{ background: "rgb(255 255 255 / 0.84)", color: "#14150f" }}
              >
                {badge.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* 문제 · 접근 · 구현 */}
        <div className="mt-16 flex flex-col gap-14 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-11 lg:w-[46%]">
            <Block index="01" title={study.problem.title} body={study.problem.body} />
            <Block index="02" title={study.approach.title} body={study.approach.body} />
          </div>

          <div className="flex flex-1 flex-col gap-5">
            <span className="label">03 / 구현 하이라이트</span>
            <ul className="flex flex-col">
              {(project.highlights ?? []).map((highlight) => (
                <li key={highlight} className="flex gap-4 border-t py-4 last:border-b">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="var(--link)"
                    strokeWidth="1.4"
                    className="mt-1 shrink-0"
                    aria-hidden
                  >
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  <span className="text-[0.9375rem] leading-[1.7]">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 영상 · 스냅샷 */}
        <div className="mt-16">
          <CaseMedia
            title={project.title}
            videos={project.videos ?? []}
            gallery={gallery}
          />
        </div>

        {/* 다음 케이스 */}
        <div className="mt-20 flex flex-col gap-6 border-t py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="label-sm">NEXT CASE</span>
            <span className="text-[1.25rem]">{nextProject?.title}</span>
          </div>
          <Link
            href={`/work/${next.id}`}
            className="inline-flex items-center gap-2.5 self-start rounded-sm px-6 py-4 text-[0.8438rem] font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--invert-bg)", color: "var(--invert-fg)" }}
          >
            다음 케이스
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Meta({
  label,
  value,
  flag = false,
}: {
  label: string;
  value: string;
  flag?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="label-sm">{label}</span>
      <span className="text-sm" style={flag ? { color: "var(--flag)" } : undefined}>
        {value}
      </span>
    </div>
  );
}

function Block({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-6">
      <span className="label-sm pt-1.5">{index}</span>
      <div className="flex flex-col gap-3">
        <h2 className="text-[1.375rem] leading-snug">{title}</h2>
        <p className="text-[0.9375rem] leading-[1.85] text-fg-muted">{body}</p>
      </div>
    </div>
  );
}

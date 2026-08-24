
import { VolumeField } from "@/components/ui/VolumeField";
import { marqueeItems, profile, stats } from "@/content/profile";
import { site } from "@/lib/site";

const CORNER = "absolute size-3.5 pointer-events-none";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      {/* 배경 — 계측 그리드 + 프리즘 블룸 */}
      <div className="grid-field absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-36 -top-64 size-[860px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 42% 42%, rgb(var(--cool) / 0.34), transparent 62%)",
          filter: "blur(16px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-80 -left-44 size-[780px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 60% 38%, rgb(var(--warm) / 0.28), transparent 64%)",
          filter: "blur(20px)",
        }}
        aria-hidden
      />

      <div className="shell relative flex flex-1 flex-col justify-center gap-12 py-14 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        {/* 좌 — 텍스트 열 */}
        <div className="flex max-w-[680px] flex-col gap-7 lg:w-[50%]">
          <span className="label !tracking-[0.24em]">{profile.eyebrow}</span>

          <h1 className="text-[clamp(2.125rem,4.6vw,3.375rem)] font-medium leading-[1.18]">
            엔진부터 하드웨어까지,
            <br />
            직접 만들고 검증합니다.
          </h1>

          <p className="max-w-[520px] text-[clamp(0.95rem,1.2vw,1.0625rem)] leading-[1.78] text-fg-muted">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-sm px-6 py-4 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                background: "var(--invert-bg)",
                color: "var(--invert-fg)",
              }}
            >
              프로젝트 15건 보기
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a
              href={site.resume}
              className="glass-soft inline-flex items-center gap-2.5 rounded-sm px-6 py-4 text-sm font-medium transition-colors hover:border-line-strong"
              style={{ borderColor: "var(--line-strong)" }}
            >
              이력서 PDF
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M8 3v8M4.5 7.5L8 11l3.5-3.5M3.5 13h9" />
              </svg>
            </a>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-6 border-t pt-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.caption} className="flex flex-col gap-1.5">
                <dd className="font-mono text-[1.75rem] leading-none tracking-tight">
                  {stat.value}
                  {stat.label ? (
                    <span className="ml-1 text-[0.9375rem] text-fg-muted">
                      {stat.label}
                    </span>
                  ) : null}
                </dd>
                <dt className="label-sm">{stat.caption}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* 우 — 유리 뷰포트 */}
        <div className="relative lg:w-[50%]">
          <div className="glass-strong relative aspect-[664/566] overflow-hidden rounded">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 52%, rgb(var(--cool) / 0.2), transparent 62%)",
              }}
              aria-hidden
            />
            <VolumeField className="absolute inset-0" />

            <div
              className="pointer-events-none absolute inset-[15%] rounded-full border border-dashed"
              style={{ borderColor: "rgb(var(--cool) / 0.32)" }}
              aria-hidden
            />

            <span className="label-sm absolute left-6 top-5 flex items-center gap-2.5">
              <span
                className="size-1.5 rounded-full"
                style={{ background: "var(--status)" }}
                aria-hidden
              />
              VOLUME FIELD · WEBGL
            </span>
            <span className="label-sm absolute right-6 top-5">
              RAYMARCH · 42 STEPS
            </span>

            <div
              className="glass-soft absolute inset-x-5 bottom-5 flex items-center justify-between gap-5 rounded-sm px-6 py-4"
              style={{ backdropFilter: "blur(12px)" }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[0.9375rem] font-medium">
                  {profile.nameKo} · {profile.nameEn.join(" ")}
                </span>
                <span className="text-xs text-fg-muted">{profile.role}</span>
              </div>
              <span className="label-sm hidden sm:block">{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 기술 마퀴 */}
      <div
        className="relative flex h-[62px] items-center overflow-hidden border-t"
        style={{ background: "var(--glass-soft)" }}
      >
        <div className="marquee-track flex w-max shrink-0 items-center gap-10 pl-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="label whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 코너 브래킷 */}
      <span
        className={`${CORNER} left-6 top-24 border-l border-t`}
        style={{ borderColor: "var(--line-strong)" }}
        aria-hidden
      />
      <span
        className={`${CORNER} right-6 top-24 border-r border-t`}
        style={{ borderColor: "var(--line-strong)" }}
        aria-hidden
      />
      <span
        className={`${CORNER} bottom-[86px] left-6 border-b border-l`}
        style={{ borderColor: "var(--line-strong)" }}
        aria-hidden
      />
      <span
        className={`${CORNER} bottom-[86px] right-6 border-b border-r`}
        style={{ borderColor: "var(--line-strong)" }}
        aria-hidden
      />
    </section>
  );
}

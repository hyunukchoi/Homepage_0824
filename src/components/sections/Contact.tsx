import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

const LINKS = [
  { label: "EMAIL", value: site.email, href: `mailto:${site.email}` },
  { label: "GITHUB", value: "github.com/hyunukchoi", href: site.github },
  { label: "RESUME", value: "이력서 PDF 내려받기", href: site.resume },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-32"
      style={{ background: "var(--bg-deep)" }}
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/3 size-[720px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--cool) / 0.24), transparent 66%)",
          filter: "blur(24px)",
        }}
        aria-hidden
      />

      <div className="shell relative">
        <Reveal>
          <div className="glass-strong flex flex-col gap-10 rounded px-8 py-12 md:px-14 md:py-16">
            <div className="flex flex-col gap-6">
              <span className="label !tracking-[0.24em]">06 / CONTACT</span>
              <h2 className="max-w-[15ch] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.16]">
                같이 만들 XR이 있다면 연락 주세요.
              </h2>
              <p className="flex items-center gap-2.5 text-sm text-fg-muted">
                <span
                  className="size-1.5 rounded-full"
                  style={{
                    background: "var(--status)",
                    boxShadow: "0 0 0 3px rgb(26 143 106 / 0.18)",
                  }}
                  aria-hidden
                />
                {profile.availability} · {profile.location}
              </p>
            </div>

            <ul className="grid gap-px overflow-hidden rounded" style={{ background: "var(--line)" }}>
              {LINKS.map((link) => (
                <li key={link.label} style={{ background: "var(--bg)" }}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-chip"
                  >
                    <span className="flex items-center gap-6">
                      <span className="label-sm w-16 shrink-0">{link.label}</span>
                      <span className="text-[0.9375rem] md:text-base">{link.value}</span>
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      <path d="M4 12L12 4M6 4h6v6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

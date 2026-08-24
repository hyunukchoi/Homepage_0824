import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, capabilities } from "@/content/profile";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="grid-field pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="shell relative">
        <SectionHeading
          index="01"
          eyebrow="ABOUT"
          title={
            <>
              {about.headline[0]}
              <br />
              {about.headline[1]}
            </>
          }
          aside={about.body}
        />

        <Reveal className="mt-14 md:mt-16">
          <blockquote className="glass max-w-[860px] rounded px-8 py-9 text-[clamp(1rem,1.5vw,1.1875rem)] leading-[1.85] md:px-11 md:py-11">
            <span
              className="mb-5 block h-px w-14"
              style={{ background: "rgb(var(--cool) / 0.7)" }}
              aria-hidden
            />
            {about.quote}
          </blockquote>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded md:mt-16 md:grid-cols-2 lg:grid-cols-3"
          style={{ background: "var(--line)" }}
        >
          {capabilities.map((capability, index) => (
            <Reveal
              as="li"
              key={capability.id}
              delay={index * 60}
              className="flex flex-col gap-4 bg-bg p-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-fg-faint">
                  {capability.index}
                </span>
                <span className="label-sm">{capability.kicker}</span>
              </div>
              <h3 className="text-[1.0625rem] leading-snug">{capability.title}</h3>
              <p className="text-sm leading-[1.8] text-fg-muted">{capability.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

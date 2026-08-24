import { profile } from "@/content/profile";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="shell flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[0.16em]">
            {profile.nameKo} · {profile.nameEn.join(" ")}
          </span>
          <span className="text-xs text-fg-subtle">{profile.role}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={`mailto:${site.email}`} className="text-xs text-fg-muted transition-colors hover:text-fg">
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-fg-muted transition-colors hover:text-fg"
          >
            GitHub
          </a>
          <span className="label-sm">© 2026</span>
        </div>
      </div>
    </footer>
  );
}

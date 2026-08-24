"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { profile } from "@/content/profile";

const NAV = [
  { index: "01", label: "ABOUT", href: "/#about" },
  { index: "02", label: "WORK", href: "/#work" },
  { index: "03", label: "CAREER", href: "/#career" },
  { index: "04", label: "CONTACT", href: "/#contact" },
];

export function Header() {
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300"
      style={{
        borderColor: lifted ? "var(--line)" : "transparent",
        background: lifted ? "var(--glass-soft)" : "transparent",
        backdropFilter: lifted ? "blur(14px)" : "none",
        WebkitBackdropFilter: lifted ? "blur(14px)" : "none",
      }}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3.5">
          <span
            className="relative grid size-[18px] place-items-center rounded-full border-[1.5px]"
            style={{ borderColor: "var(--fg)" }}
            aria-hidden
          >
            <span
              className="size-2.5 rounded-full"
              style={{ background: "var(--fg)" }}
            />
          </span>
          <span className="font-mono text-xs font-medium tracking-[0.16em]">
            {profile.nameEn.join(" ")}
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.14em] text-fg-subtle sm:inline">
            PORTFOLIO 2026
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav aria-label="주요 섹션" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-[11px] tracking-[0.16em] text-fg-muted transition-colors hover:text-fg"
              >
                <span className="text-fg-faint">{item.index}</span> {item.label}
              </a>
            ))}
          </nav>

          <span
            className="hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:inline-flex"
            style={{
              borderColor: "var(--line-mid)",
              background: "var(--glass-soft)",
            }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{
                background: "var(--status)",
                boxShadow: "0 0 0 3px rgb(26 143 106 / 0.18)",
              }}
              aria-hidden
            />
            {profile.availability.split(" · ")[0]}
          </span>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

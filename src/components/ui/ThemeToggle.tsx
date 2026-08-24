"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MODES = ["light", "system", "dark"] as const;
type Mode = (typeof MODES)[number];

const LABEL: Record<Mode, string> = {
  light: "라이트",
  system: "시스템",
  dark: "다크",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current: Mode = mounted && MODES.includes(theme as Mode) ? (theme as Mode) : "light";

  return (
    <div
      role="radiogroup"
      aria-label="테마"
      className="flex items-center gap-0.5 rounded-full border border-line-mid p-0.5"
      style={{ background: "var(--glass-soft)" }}
    >
      {MODES.map((mode) => {
        const active = mounted && current === mode;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={LABEL[mode]}
            title={LABEL[mode]}
            onClick={() => setTheme(mode)}
            className="grid size-7 place-items-center rounded-full transition-colors"
            style={{
              background: active ? "var(--invert-bg)" : "transparent",
              color: active ? "var(--invert-fg)" : "var(--fg-subtle)",
            }}
          >
            <Icon mode={mode} />
          </button>
        );
      })}
    </div>
  );
}

function Icon({ mode }: { mode: Mode }) {
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (mode === "light") {
    return (
      <svg {...common} aria-hidden>
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.9 3.1l-1.1 1.1M4.2 11.8l-1.1 1.1M12.9 12.9l-1.1-1.1M4.2 4.2L3.1 3.1" />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg {...common} aria-hidden>
        <path d="M13.4 9.6A5.8 5.8 0 0 1 6.4 2.6a5.9 5.9 0 1 0 7 7z" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden>
      <rect x="1.8" y="3" width="12.4" height="8" rx="1.4" />
      <path d="M5.6 13.4h4.8" />
    </svg>
  );
}

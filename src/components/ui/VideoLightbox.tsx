"use client";

import { useCallback, useEffect } from "react";

export type LightboxVideo = { id: string; label: string };

export function VideoLightbox({
  videos,
  index,
  title,
  onClose,
  onIndexChange,
}: {
  videos: LightboxVideo[];
  index: number;
  title: string;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const current = videos[index];

  const step = useCallback(
    (delta: number) => {
      if (videos.length < 2) return;
      onIndexChange((index + delta + videos.length) % videos.length);
    },
    [index, onIndexChange, videos.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, step]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} 영상`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{ background: "rgb(8 10 9 / 0.72)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="glass-strong relative w-full max-w-5xl overflow-hidden rounded"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="label-sm">{title}</span>
            <span className="truncate text-sm">{current.label}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {videos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="이전 영상"
                  className="grid size-9 place-items-center rounded-sm border transition-colors hover:bg-chip"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                </button>
                <span className="font-mono text-[11px] text-fg-subtle">
                  {index + 1} / {videos.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="다음 영상"
                  className="grid size-9 place-items-center rounded-sm border transition-colors hover:bg-chip"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </button>
              </>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="ml-1 grid size-9 place-items-center rounded-sm border transition-colors hover:bg-chip"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            key={current.id}
            src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
            title={current.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        </div>
      </div>
    </div>
  );
}

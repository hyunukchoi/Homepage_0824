"use client";

import Image from "next/image";
import { useState } from "react";

import { VideoLightbox, type LightboxVideo } from "@/components/ui/VideoLightbox";
import { thumbOf } from "@/content/media";

export function CaseMedia({
  title,
  videos,
  gallery,
}: {
  title: string;
  videos: LightboxVideo[];
  gallery: string[];
}) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8">
      {videos.length > 0 ? (
        <div className="flex flex-col gap-4">
          <span className="label-sm">VIDEO</span>
          <ul className="grid gap-4 sm:grid-cols-2">
            {videos.map((video, videoIndex) => (
              <li key={video.id}>
                <button
                  type="button"
                  onClick={() => setIndex(videoIndex)}
                  className="glass group flex w-full items-center gap-4 overflow-hidden rounded p-3 text-left transition-transform hover:-translate-y-0.5"
                >
                  <span className="relative aspect-video w-[132px] shrink-0 overflow-hidden rounded-sm" style={{ background: "var(--bg-deep)" }}>
                    <Image
                      src={thumbOf(video.id)}
                      alt=""
                      fill
                      sizes="132px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                      style={{ background: "rgb(255 255 255 / 0.9)", color: "#14150f" }}
                      aria-hidden
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M3 1.6l7 4.4-7 4.4z" />
                      </svg>
                    </span>
                  </span>
                  <span className="min-w-0 text-[0.8125rem] leading-snug">{video.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {gallery.length > 0 ? (
        <div className="flex flex-col gap-4">
          <span className="label-sm">SNAPSHOTS</span>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((src) => (
              <li key={src} className="glass relative aspect-video overflow-hidden rounded">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {index !== null && videos[index] ? (
        <VideoLightbox
          videos={videos}
          index={index}
          title={title}
          onClose={() => setIndex(null)}
          onIndexChange={setIndex}
        />
      ) : null}
    </div>
  );
}

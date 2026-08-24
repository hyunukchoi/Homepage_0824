"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

/** 스크롤 진입 시 한 번만 페이드업. prefers-reduced-motion 은 CSS 쪽에서 무력화됩니다. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as as "div",
    {
      ref,
      className: `reveal ${shown ? "is-in" : ""} ${className}`,
      style: { animationDelay: `${delay}ms` },
    },
    children,
  );
}

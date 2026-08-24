import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  aside,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 border-b pb-7 md:flex-row md:items-end md:justify-between md:gap-12">
      <div className="flex flex-col gap-4">
        <span className="label !tracking-[0.24em]">
          {index} / {eyebrow}
        </span>
        <h2 className="text-[clamp(1.75rem,3.4vw,2.625rem)] leading-tight">
          {title}
        </h2>
      </div>
      {aside ? (
        <div className="max-w-[400px] text-sm leading-[1.8] text-fg-muted md:text-right">
          {aside}
        </div>
      ) : null}
    </div>
  );
}

import type { ReactNode } from "react";

// A highlighted quote pulled from the essay or an interview.
export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="my-12 border-l-4 border-yellow pl-6">
      <blockquote className="font-serif text-[1.65rem] italic leading-[1.35] text-ink">{children}</blockquote>
      {cite && <figcaption className="label mt-4 text-ink-3">— {cite}</figcaption>}
    </figure>
  );
}

// An image with a caption and photo credit. Put image files in /public/images/essays/.
export function Figure({
  src,
  alt,
  caption,
  credit,
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}) {
  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full" />
      {(caption || credit) && (
        <figcaption className="mt-3 font-sans text-[0.875rem] text-ink-2">
          {caption}
          {credit && <span className="text-ink-3"> {caption ? "· " : ""}{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

// Wraps wide markdown tables so they scroll sideways on phones.
export function TableScroll({ children }: { children: ReactNode }) {
  return <div className="table-scroll">{children}</div>;
}

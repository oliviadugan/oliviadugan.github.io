import type { ReactNode } from "react";
import Reveal from "@/app/components/Reveal";

export default function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 flex items-center gap-4 sm:mb-12">
            <span aria-hidden className="h-[3px] w-10 bg-blue" />
            <h2 id={headingId} className="display text-[clamp(2.5rem,5vw,3.75rem)]">
              {title}
            </h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

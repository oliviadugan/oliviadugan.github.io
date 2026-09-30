import Reveal from "@/app/components/Reveal";
import { stats } from "@/app/lib/data";

// Real numbers from her record, styled like an arena scoreboard.
export default function Scoreboard() {
  if (stats.length === 0) return null;
  return (
    <section aria-label="By the numbers" className="mt-20 bg-band text-band-ink sm:mt-24">
      <Reveal>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-2 px-4 py-8 sm:px-6 sm:py-10 ${
                i % 2 === 1 ? "border-l border-band-line" : ""
              } ${i >= 2 ? "border-t border-band-line lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <dt className="order-2 max-w-[16rem] text-[0.9rem] leading-snug opacity-80">{s.label}</dt>
              <dd className="display order-1 text-[clamp(2.75rem,6vw,4.25rem)] text-yellow tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

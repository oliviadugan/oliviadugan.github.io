import { profile } from "@/app/lib/data";
import { formatDate, getEssay } from "@/app/writing/essays";

// Title block at the top of an essay. Pulls its text from the registry
// in app/writing/essays.ts so it stays in sync with the Writing page.
export default function EssayHeader({ slug }: { slug: string }) {
  const e = getEssay(slug);
  return (
    <header className="mb-10 border-b border-line pb-8">
      <h1 className="font-serif text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.01em]">
        {e.title}
      </h1>
      <p className="mt-4 font-serif text-[1.35rem] italic leading-snug text-ink-2">{e.dek}</p>
      <p className="label mt-6 text-ink-3">
        By {profile.name} · <time dateTime={e.date}>{formatDate(e.date)}</time> · {e.minutes} min read
      </p>
    </header>
  );
}

import Link from "next/link";
import Photo from "@/app/components/Photo";
import Reveal from "@/app/components/Reveal";
import Section from "@/app/components/Section";
import { about, experiences, honors, impact, profile, skills } from "@/app/lib/data";
import { photos } from "@/app/lib/photos";
import { essays, formatDate } from "@/app/writing/essays";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="space-y-6 font-serif text-[1.25rem] leading-[1.65]">
            {about.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.1}>
          <dl className="divide-y divide-line border-y border-line">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="py-5">
                <dt className="label text-blue-text">{group}</dt>
                <dd className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience" className="border-t border-line">
      <ol className="space-y-16">
        {experiences.map((x) => {
          const photo = x.photo ? photos[x.photo] : null;
          return (
            <li key={x.org}>
              <Reveal>
                <article className="grid gap-6 md:grid-cols-12 md:gap-10">
                  <p className="label pt-1 text-ink-3 tabular-nums md:col-span-3">{x.period}</p>
                  <div className={photo ? "md:col-span-5" : "md:col-span-9"}>
                    <h3 className="font-display text-[2rem] font-extrabold uppercase leading-none">{x.role}</h3>
                    <p className="mt-2 font-semibold text-blue-text">{x.org}</p>
                    {x.bullets.length > 0 && (
                      <ul className="mt-5 space-y-3 font-serif text-[1.1rem] leading-[1.6] text-ink-2">
                        {x.bullets.map((b) => (
                          <li key={b.slice(0, 32)} className="relative pl-5">
                            <span aria-hidden className="absolute left-0 top-[0.7em] h-[2px] w-2.5 bg-yellow" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {photo && (
                    <div className="md:col-span-4">
                      <Photo
                        photo={photo}
                        alt={x.photoAlt ?? ""}
                        sizes="(min-width: 768px) 360px, 92vw"
                        className="block w-full object-cover shadow-[var(--shadow)]"
                      />
                    </div>
                  )}
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

export function Impact() {
  if (impact.length === 0) return null;
  return (
    <Section id="impact" title="Community impact" className="border-t border-line">
      <div className="grid gap-6 md:grid-cols-2">
        {impact.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article className="h-full border border-line bg-surface p-7 sm:p-8">
              <p className="label text-blue-text">{p.role}</p>
              <h3 className="font-display mt-3 text-[2.25rem] font-extrabold uppercase leading-none">{p.title}</h3>
              <p className="mt-4 font-serif text-[1.1rem] leading-[1.6] text-ink-2">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {honors.length > 0 && (
        <Reveal className="mt-16">
          <h3 className="label text-ink-3">Honors</h3>
          <ul className="mt-5 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {honors.map((h) => (
              <li key={h.title} className="bg-paper p-6">
                <p className="font-semibold">{h.title}</p>
                <p className="mt-1 text-[0.95rem] text-ink-2">{h.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}

export function WritingPreview() {
  if (essays.length === 0) return null;
  return (
    <Section id="writing" title="Writing" className="border-t border-line">
      <ul className="divide-y divide-line border-y border-line">
        {essays.slice(0, 3).map((e) => (
          <li key={e.slug}>
            <Link href={`/writing/${e.slug}/`} className="group grid gap-2 py-7 md:grid-cols-12 md:gap-8">
              <p className="label pt-1 text-ink-3 md:col-span-3">
                {formatDate(e.date)} · {e.minutes} min
              </p>
              <div className="md:col-span-9">
                <p className="font-serif text-[1.6rem] font-semibold leading-tight group-hover:text-blue-text">
                  {e.title}
                </p>
                <p className="mt-2 font-serif text-[1.1rem] text-ink-2">{e.dek}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {essays.length > 3 && (
        <Link href="/writing/" className="btn btn-ghost mt-8">
          All essays
        </Link>
      )}
    </Section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-band py-20 text-band-ink sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="label text-yellow">Contact</p>
          <h2 id="contact-heading" className="display mt-4 text-[clamp(3rem,9vw,6.5rem)]">
            Get in touch
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block break-all font-serif text-[clamp(1.35rem,3.2vw,2.25rem)] underline decoration-yellow decoration-2 underline-offset-[0.2em] hover:decoration-4"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-6 text-[0.95rem] font-semibold">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-yellow">
              LinkedIn ↗
            </a>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yellow">
                Resume (PDF) ↗
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-[0.875rem] text-ink-3 sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <a href="#main" className="hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

import type { CSSProperties } from "react";
import Photo from "@/app/components/Photo";
import { intro, profile } from "@/app/lib/data";
import { photos } from "@/app/lib/photos";

// Entrance animations are pure CSS (see .enter-* in globals.css) so the hero
// paints immediately, before any JavaScript loads.
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7 lg:pb-6">
          <p className="label enter-fade text-ink-3">
            {profile.school} · {profile.majors} · {profile.graduating}
          </p>

          <h1 className="display mt-4 text-[clamp(4.5rem,15vw,10.5rem)]">
            <span className="enter-rise block">{profile.firstName}</span>
            <span className="enter-rise block" style={delay(0.08)}>
              {profile.lastName}
            </span>
          </h1>

          {/* Broadcast lower third: the caption bar wipes in, then its text lands. */}
          <p className="sr-only">
            {profile.label}: {profile.tagline}
          </p>
          <div className="mt-6 flex max-w-xl items-stretch" aria-hidden>
            <span
              className="label enter-drop flex shrink-0 items-center bg-yellow px-3 text-[0.7rem] text-[#0d1a2d] sm:px-4 sm:text-[0.75rem]"
              style={delay(0.55)}
            >
              {profile.label}
            </span>
            <span className="enter-wipe flex flex-1 items-center bg-blue px-4 py-3 text-white" style={delay(0.35)}>
              <span className="enter-fade font-sans text-[0.95rem] font-semibold leading-snug sm:text-[1.05rem]" style={delay(0.8)}>
                {profile.tagline}
              </span>
            </span>
          </div>

          <p
            className="enter-rise mt-8 max-w-[34rem] font-serif text-[1.3rem] leading-[1.5] text-ink-2"
            style={delay(0.9)}
          >
            {intro}
          </p>

          <div className="enter-rise mt-8 flex flex-wrap gap-3" style={delay(1)}>
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              Email Olivia
            </a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            {profile.resumeUrl && (
              <a className="btn btn-ghost" href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume (PDF)
              </a>
            )}
          </div>
        </div>

        <div className="enter-fade relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none" style={delay(0.15)}>
          <div className="relative">
            <div aria-hidden className="absolute -right-3 -top-3 h-full w-full border-2 border-yellow" />
            <Photo
              photo={photos.portrait}
              alt={`Portrait of ${profile.name}`}
              sizes="(min-width: 1024px) 420px, 90vw"
              className="relative block aspect-[4/5] w-full object-cover shadow-[var(--shadow)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Reveal from "@/app/components/Reveal";
import Section from "@/app/components/Section";
import { reel, type ReelItem } from "@/app/lib/data";

type Embed = { src: string; poster: string | null };

// Turns a YouTube or Vimeo link into a privacy-friendly embed URL.
function toEmbed(url: string): Embed | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    return {
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`,
      poster: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`, poster: null };
  return null;
}

// Shows a lightweight poster; the video player only loads when clicked.
function ReelCard({ item }: { item: ReelItem }) {
  const [playing, setPlaying] = useState(false);
  const embed = toEmbed(item.url);
  if (!embed) return null;

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden bg-band shadow-[var(--shadow)]">
        {playing ? (
          <iframe
            src={embed.src}
            title={item.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 grid place-items-center"
            aria-label={`Play ${item.title}`}
          >
            {embed.poster && (
              // eslint-disable-next-line @next/next/no-img-element -- remote poster frame
              <img src={embed.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy" />
            )}
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-yellow text-[#0d1a2d] transition-transform group-hover:scale-105">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="font-semibold">{item.title}</p>
        <p className="mt-1 text-[0.95rem] text-ink-2">
          {item.context} · {item.year}
        </p>
      </figcaption>
    </figure>
  );
}

export default function Reel() {
  if (reel.length === 0) return null;
  return (
    <Section id="work" title="Video work" className="border-t border-line">
      <div className="grid gap-10 md:grid-cols-2">
        {reel.map((item, i) => (
          <Reveal key={item.url} delay={(i % 2) * 0.08}>
            <ReelCard item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

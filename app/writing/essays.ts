import type { Metadata } from "next";
import { profile } from "@/app/lib/data";

// Registry of published essays, newest first. To publish an essay:
//   1. Copy content-templates/essay-template.mdx to app/writing/(essays)/<slug>/page.mdx
//   2. Add an entry here with the same slug.
// The Writing page, the homepage section, the nav link, and the sitemap all read this list.
export type Essay = {
  slug: string;
  title: string;
  dek: string;
  date: string; // YYYY-MM-DD
  minutes: number; // reading time
};

export const essays: Essay[] = [];

export const writingIntro =
  "Essays on sport and society: who plays, who watches, who gets paid, and why.";

export function getEssay(slug: string): Essay {
  const essay = essays.find((e) => e.slug === slug);
  if (!essay) throw new Error(`No essay registered with slug "${slug}" in app/writing/essays.ts`);
  return essay;
}

// og.png is written by scripts/postbuild.mjs from app/opengraph-image.tsx.
export const SHARE_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: `${profile.name}: ${profile.tagline}` };

export function essayMetadata(slug: string): Metadata {
  const e = getEssay(slug);
  return {
    title: e.title,
    description: e.dek,
    alternates: { canonical: `/writing/${e.slug}/` },
    openGraph: {
      type: "article",
      url: `/writing/${e.slug}/`,
      title: e.title,
      description: e.dek,
      publishedTime: e.date,
      authors: [profile.name],
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title: e.title, description: e.dek, images: [SHARE_IMAGE.url] },
  };
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

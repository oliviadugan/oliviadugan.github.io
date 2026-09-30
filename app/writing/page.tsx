import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import { Footer } from "@/app/components/Sections";
import { navLinks } from "@/app/lib/nav";
import { essays, formatDate, SHARE_IMAGE, writingIntro } from "@/app/writing/essays";

export const metadata: Metadata = {
  title: "Writing",
  description: writingIntro,
  alternates: { canonical: "/writing/" },
  openGraph: { url: "/writing/", title: "Writing · Olivia Dugan", description: writingIntro, images: [SHARE_IMAGE] },
  twitter: { card: "summary_large_image", title: "Writing · Olivia Dugan", description: writingIntro, images: [SHARE_IMAGE.url] },
};

export default function WritingIndex() {
  return (
    <>
      <Nav links={navLinks()} />
      <main id="main" className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6">
        <p className="label text-blue-text">Essays</p>
        <h1 className="display mt-3 text-[clamp(3.5rem,10vw,6.5rem)]">Writing</h1>
        <p className="mt-6 max-w-2xl font-serif text-[1.3rem] leading-[1.55] text-ink-2">{writingIntro}</p>

        {essays.length === 0 ? (
          <p className="mt-16 border-t border-line pt-8 text-ink-3">The first essay is on its way.</p>
        ) : (
          <ul className="mt-14 divide-y divide-line border-y border-line">
            {essays.map((e) => (
              <li key={e.slug}>
                <Link href={`/writing/${e.slug}/`} className="group block py-8">
                  <p className="label text-ink-3">
                    {formatDate(e.date)} · {e.minutes} min read
                  </p>
                  <h2 className="mt-3 font-serif text-[1.85rem] font-semibold leading-tight group-hover:text-blue-text">
                    {e.title}
                  </h2>
                  <p className="mt-2 font-serif text-[1.15rem] text-ink-2">{e.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}

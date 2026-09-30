import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "@/app/components/Nav";
import { Footer } from "@/app/components/Sections";
import { navLinks } from "@/app/lib/nav";

// Shared frame for every essay page in this route group.
export default function EssayLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav links={navLinks()} />
      <main id="main" className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
        <article className="mx-auto max-w-[42rem]">
          <Link href="/writing/" className="label text-blue-text hover:underline">
            ← All essays
          </Link>
          <div className="essay-body mt-8">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}

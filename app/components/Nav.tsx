"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/app/lib/data";
import ThemeToggle from "@/app/components/ThemeToggle";

export type NavLink = { href: string; label: string };

export default function Nav({ links }: { links: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-200 ${
        open
          ? "border-b border-line bg-paper"
          : scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="font-display grid h-9 w-9 place-items-center rounded-[3px] bg-blue text-[1.05rem] font-extrabold tracking-tight text-white"
          >
            OD
          </span>
          <span className="font-sans text-[0.95rem] font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-[3px] px-3 py-2 text-[0.9rem] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-[3px] text-ink-2 hover:text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M2 5h16M2 10h16M2 15h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display block py-3 text-3xl font-extrabold uppercase"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

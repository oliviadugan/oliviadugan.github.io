import type { NavLink } from "@/app/components/Nav";
import { impact, reel } from "@/app/lib/data";
import { essays } from "@/app/writing/essays";

// Nav shows only sections that currently have content.
export function navLinks(): NavLink[] {
  const links: NavLink[] = [
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Experience" },
  ];
  if (reel.length > 0) links.push({ href: "/#work", label: "Video" });
  if (impact.length > 0) links.push({ href: "/#impact", label: "Impact" });
  if (essays.length > 0) links.push({ href: "/writing/", label: "Writing" });
  links.push({ href: "/#contact", label: "Contact" });
  return links;
}

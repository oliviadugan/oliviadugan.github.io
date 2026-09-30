import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders, Newsreader } from "next/font/google";
import MotionProvider from "@/app/components/MotionProvider";
import { profile } from "@/app/lib/data";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/app/lib/site";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  display: "swap",
  axes: ["opsz"],
  // Google has no metric overrides for this face, so fall back to a condensed system font.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif-condensed", "sans-serif"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${profile.name}` },
  description: SITE_DESCRIPTION,
  authors: [{ name: profile.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: profile.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f5fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a111d" },
  ],
};

// Runs before first paint so a saved theme never flashes the wrong colors.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of California, Berkeley" },
  knowsAbout: ["Sports media", "Video production", "Social media", "Sociology of sport"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bigShoulders.variable} ${newsreader.variable} ${archivo.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JavaScript, scroll-reveal content would stay hidden; show it. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

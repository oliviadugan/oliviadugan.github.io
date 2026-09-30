# oliviadugan.github.io

Olivia Dugan's personal website: https://oliviadugan.github.io

> **Seeing this README instead of the website?** The site hasn't been switched to
> automatic deploys yet. Repo owner: open **Settings → Pages**, and under
> **Build and deployment → Source**, choose **GitHub Actions**. The next push to
> `main` publishes the site.

## How it works

The site is built with [Next.js](https://nextjs.org) and exported as plain static
files. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages. Pull requests run the same build as a check,
so a broken change can't reach the live site.

All content lives in **`app/lib/data.ts`**. The components only display what's in
that file, and a section with no content hides itself.

## Common edits

**Change text, experience, honors, or stats:** edit `app/lib/data.ts`.

**Add the resume:** put the PDF at `public/resume.pdf`, then in `app/lib/data.ts`
set `resumeUrl: "/resume.pdf"`. Resume buttons appear in the hero and contact section.

**Add a video:** add an entry to `reel` in `app/lib/data.ts` with a YouTube or
Vimeo link. A "Video work" section and nav link appear automatically. Videos load
only when someone clicks play, so they don't slow the page down.

**Publish an essay:**
1. Pick a short slug, e.g. `title-ix-at-55`.
2. Copy `content-templates/essay-template.mdx` to `app/writing/(essays)/title-ix-at-55/page.mdx`.
3. Replace `your-slug-here` in that file (two places) with the slug.
4. Add the essay to the list in `app/writing/essays.ts`.
5. Push. The Writing page, the homepage section, the nav link, and the sitemap update themselves.

Essays are written in MDX, which is Markdown plus a few components: `<Chart>` for
bar and line charts, `<PullQuote>`, and `<Figure>` for captioned images. Footnotes
use `[^1]`. The template shows each one.

**Add or change a photo:** put the original in `photos-src/`, add it to the
`PHOTOS` list in `scripts/optimize_images.py`, and run `npm run images`. The script
resizes the photo, converts it to WebP, and strips location data from the file.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000, reloads as you edit
npm run build    # production build into out/
```

## Custom domain

1. Get the domain (e.g. a free `.me` through the GitHub Student Developer Pack).
2. Repo owner: **Settings → Pages → Custom domain**, enter it, and turn on **Enforce HTTPS**.
3. At the domain registrar, add the DNS records GitHub shows on that page.
4. Change `SITE_URL` in `app/lib/site.ts` to the new address, so the share previews and sitemap use it.

# SEO Improvements Design

**Date:** 2026-06-24
**Goal:** Improve both search ranking (Google) and social sharing (LinkedIn, Slack, etc.) for ojaco.dev.

---

## Approach

Full native Next.js SEO — zero new dependencies. Four changes total: one edit to `app/layout.tsx`, plus three new files (`app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`).

---

## Section 1: Metadata (`app/layout.tsx`)

Expand the existing `metadata` export with:

- `metadataBase`: `new URL('https://ojaco.dev')` — required so relative OG/Twitter image URLs resolve correctly
- `title`: `"Oliver James Aco — Web Developer & Frontend Specialist"`
- `description`: value from `HERO.bio` in `lib/content.ts`
- `keywords`: `["web developer", "frontend developer", "Next.js", "React", "TypeScript", "Philippines"]`
- `authors`: `[{ name: "Oliver James Aco", url: "https://ojaco.dev" }]`
- `alternates.canonical`: `"https://ojaco.dev"`
- `openGraph`: type `"website"`, title, description, URL `"https://ojaco.dev"`, siteName `"ojaco.dev"` — Next.js will auto-register the OG image from `opengraph-image.tsx`
- `twitter`: card `"summary_large_image"`, title, description — image also auto-registered

Also inject JSON-LD structured data via a `<script type="application/ld+json">` in `<head>` (see Section 3).

---

## Section 2: Dynamic OG Image (`app/opengraph-image.tsx`)

Uses `ImageResponse` from `next/og`. Exported constants:
- `size`: `{ width: 1200, height: 630 }`
- `contentType`: `"image/png"`

**Layout (JSX):**
- Dark background card (`#0f172a`)
- Left: `hero_img.png` as a rounded portrait (fetched via absolute URL from the same origin using `process.env.NEXT_PUBLIC_SITE_URL` or hardcoded base URL)
- Right: stacked text
  - Name: `"Oliver James Aco"` — large, bold, white
  - Title: `"Web Developer & Frontend Specialist"` — medium, muted accent
  - URL: `"ojaco.dev"` — small, gray
- Font: Exo loaded via `fetch` from Google Fonts to match the site typeface

Next.js automatically serves this at `/opengraph-image` and wires it into the metadata.

---

## Section 3: JSON-LD Structured Data (`app/layout.tsx`)

A `<script type="application/ld+json">` added inside `<head>` using `dangerouslySetInnerHTML`. Uses the `Person` schema from schema.org:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Oliver James Aco",
  "url": "https://ojaco.dev",
  "jobTitle": "Web Developer & Frontend Specialist",
  "description": "<HERO.bio value>",
  "sameAs": [
    "https://github.com/revilosemaj",
    "<LinkedIn URL from SOCIAL_LINKS>"
  ]
}
```

Values sourced from `HERO` and `SOCIAL_LINKS` in `lib/content.ts` — no hardcoding in the layout file.

---

## Section 4: Sitemap & Robots

**`app/sitemap.ts`** — returns a `MetadataRoute.Sitemap` array with one entry:
```ts
[{ url: 'https://ojaco.dev', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
```
Served by Next.js at `/sitemap.xml`.

**`app/robots.ts`** — returns a `MetadataRoute.Robots` object:
```ts
{
  rules: { userAgent: '*', allow: '/' },
  sitemap: 'https://ojaco.dev/sitemap.xml',
}
```
Served by Next.js at `/robots.txt`.

---

## Files Changed

| File | Action |
|------|--------|
| `app/layout.tsx` | Edit — expand metadata export, add JSON-LD script |
| `app/opengraph-image.tsx` | New — dynamic OG image via ImageResponse |
| `app/sitemap.ts` | New — sitemap.xml |
| `app/robots.ts` | New — robots.txt |

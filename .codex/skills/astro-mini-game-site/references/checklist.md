# Mini-Game Astro Site Checklist

## Must-Have Pages

- `/` (homepage with embedded game + screenshots + FAQ)
- `/privacy-policy`
- `/terms-of-service`
- `/cookie-policy`
- `/dmca`
- `/contact`

## SEO Basics

- `astro.config.mjs` has `site: "https://your-domain"`
- Layout includes:
  - `<title>`
  - `<meta name="description">`
  - canonical URL
  - OG/Twitter tags

## AdSense-Friendly Surface

- `public/robots.txt` with sitemap URL
- `public/ads.txt`:
  - Use a placeholder until the publisher id is provided
  - Replace with the real `pub-...` id before applying for AdSense

## Game Embed

- iframe `allowfullscreen` + `allow="fullscreen"`
- Fullscreen toggle via `requestFullscreen()` on a wrapper element
- Reload button re-sets iframe URL with a cache-buster query param

## Screenshots

- Put local screenshots under `src/assets/`
- Render via `astro:assets` `<Image />` with `widths` + `sizes`

## Verification

- `npm run build` passes
- `dist/` contains:
  - legal pages
  - `/robots.txt` and `/ads.txt`
  - sitemap output (if integrated)


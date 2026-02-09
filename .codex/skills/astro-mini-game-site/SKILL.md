---
name: astro-mini-game-site
description: Build or refactor a static Astro + Tailwind mini-game website from a sample HTML page and a game URL, including SEO layout, header/footer components, an embedded game iframe with fullscreen and reload controls, a screenshot gallery using `astro:assets` Image, AdSense-friendly legal pages (privacy, terms, cookies, DMCA, contact), plus robots.txt/ads.txt and a sitemap. Use when creating a small browser game portal site quickly with a repeatable structure and compliance pages.
---

# Astro Mini Game Site

## Inputs To Confirm Up Front

- Site brand text (e.g., `fun clicker`) and canonical domain (e.g., `https://example.com`)
- Game URL to embed (iframe)
- Primary keyword phrase (optional) and target density (optional, e.g., ~3% on the homepage)
- Screenshot files: where they live (prefer `src/assets/*.png|jpg|webp`)
- Whether to add real AdSense identifiers now or leave placeholders

## Workflow (Do In Order)

### 1. Verify Project Baseline

- Confirm it is an Astro project and can build: `npm run build`
- Ensure Tailwind is wired (commonly `@tailwindcss/vite` and `@import "tailwindcss";` in `src/styles/global.css`)
- Ensure `astro.config.mjs` has a correct `site:` URL (needed for canonical + sitemap)

### 2. Port `sample.html` Into Astro Layout + Components

- Create a global layout (prefer `src/layouts/SiteLayout.astro`) that:
  - Imports `src/styles/global.css`
  - Adds SEO basics: title, meta description, canonical, OpenGraph/Twitter tags
  - Includes the chosen font(s) with `preconnect`
- Extract header/footer into components (prefer `src/components/SiteHeader.astro` and `src/components/SiteFooter.astro`)
  - Keep navigation anchors for the homepage (`/#about`, `/#faq`, etc.)
  - Link footer to legal pages (Privacy, Terms, Cookies, DMCA, Contact)

### 3. Implement Homepage With Embedded Game

- Build `src/pages/index.astro` with sections matching the sample:
  - Hero + embedded game iframe
  - About, mechanics, characters, strategies, FAQ
- Embed the game via iframe:
  - Default to `import.meta.env.PUBLIC_GAME_URL ?? '<GAME_URL>'`
  - Add fullscreen support: `allowfullscreen` and `allow="fullscreen"`
  - Add two buttons under the iframe:
    - `FULLSCREEN`: call `requestFullscreen()` on the iframe container
    - `RELOAD`: force refresh by re-setting the iframe `src` and appending a cache-busting query param (works cross-origin)

### 4. Add Screenshot Gallery Using Astro Image

- Prefer `astro:assets` for local screenshots:
  - `import { Image } from 'astro:assets'`
  - `import screenshot1 from '../assets/1.png'` etc.
  - Use `widths` + `sizes` for responsive output
  - Keep `loading="lazy"` and `decoding="async"`

### 5. Add AdSense-Friendly Legal Pages (English)

Create these routes in `src/pages/` (minimal, clear language):

- `privacy-policy.astro`
- `terms-of-service.astro`
- `cookie-policy.astro`
- `dmca.astro`
- `contact.astro`

Keep them linked from the footer. Use a consistent `Last Updated: YYYY-MM-DD` string and keep it current.

### 6. Add Site Surface Files

- `public/robots.txt`:
  - `Allow: /`
  - `Sitemap: <site>/sitemap-index.xml` (match your sitemap integration output)
- `public/ads.txt`:
  - Add a placeholder line unless the user provides the real publisher id

### 7. Expand FAQ (At Least 15 Items)

- Keep questions aligned with the page content:
  - saving/resetting, CPS/upgrades, transformations, fullscreen/reload, mobile support, basic troubleshooting
- Avoid claims you cannot verify (versions, creators, exact mechanics) unless sourced by the user

### 8. Tune Keyword Phrase Density (Optional)

- Measure on the homepage only (visible text, not scripts):
  - Use `scripts/keyword_density.mjs` to compute current density
- Adjust naturally:
  - Add a short tagline line near the hero
  - Add the phrase in a few FAQ questions/answers
  - Do not spam; keep copy readable

### 9. Verify

- Run `npm run build`
- Spot-check generated routes in `dist/`:
  - `/privacy-policy/`, `/terms-of-service/`, `/cookie-policy/`, `/dmca/`, `/contact/`
  - `/robots.txt`, `/ads.txt`, and sitemap output

## Bundled Resources

### scripts/

- `scripts/keyword_density.mjs`: compute keyword phrase density for an Astro page (approximation based on visible text).

### references/

- `references/checklist.md`: deployment/SEO/AdSense surface checklist.

### assets/

If you need boilerplate, copy from `assets/templates/` and then customize:

- `assets/templates/` contains layout/components/legal pages stubs you can adapt quickly.

## Structuring This Skill

[TODO: Choose the structure that best fits this skill's purpose. Common patterns:

**1. Workflow-Based** (best for sequential processes)
- Works well when there are clear step-by-step procedures
- Example: DOCX skill with "Workflow Decision Tree" -> "Reading" -> "Creating" -> "Editing"
- Structure: ## Overview -> ## Workflow Decision Tree -> ## Step 1 -> ## Step 2...

**2. Task-Based** (best for tool collections)
- Works well when the skill offers different operations/capabilities
- Example: PDF skill with "Quick Start" -> "Merge PDFs" -> "Split PDFs" -> "Extract Text"
- Structure: ## Overview -> ## Quick Start -> ## Task Category 1 -> ## Task Category 2...

**3. Reference/Guidelines** (best for standards or specifications)
- Works well for brand guidelines, coding standards, or requirements
- Example: Brand styling with "Brand Guidelines" -> "Colors" -> "Typography" -> "Features"
- Structure: ## Overview -> ## Guidelines -> ## Specifications -> ## Usage...

**4. Capabilities-Based** (best for integrated systems)
- Works well when the skill provides multiple interrelated features
- Example: Product Management with "Core Capabilities" -> numbered capability list
- Structure: ## Overview -> ## Core Capabilities -> ### 1. Feature -> ### 2. Feature...

Patterns can be mixed and matched as needed. Most skills combine patterns (e.g., start with task-based, add workflow for complex operations).

Delete this entire "Structuring This Skill" section when done - it's just guidance.]

## [TODO: Replace with the first main section based on chosen structure]

[TODO: Add content here. See examples in existing skills:
- Code samples for technical skills
- Decision trees for complex workflows
- Concrete examples with realistic user requests
- References to scripts/templates/references as needed]

## Resources (optional)

Create only the resource directories this skill actually needs. Delete this section if no resources are required.

### scripts/
Executable code (Python/Bash/etc.) that can be run directly to perform specific operations.

**Examples from other skills:**
- PDF skill: `fill_fillable_fields.py`, `extract_form_field_info.py` - utilities for PDF manipulation
- DOCX skill: `document.py`, `utilities.py` - Python modules for document processing

**Appropriate for:** Python scripts, shell scripts, or any executable code that performs automation, data processing, or specific operations.

**Note:** Scripts may be executed without loading into context, but can still be read by Codex for patching or environment adjustments.

### references/
Documentation and reference material intended to be loaded into context to inform Codex's process and thinking.

**Examples from other skills:**
- Product management: `communication.md`, `context_building.md` - detailed workflow guides
- BigQuery: API reference documentation and query examples
- Finance: Schema documentation, company policies

**Appropriate for:** In-depth documentation, API references, database schemas, comprehensive guides, or any detailed information that Codex should reference while working.

### assets/
Files not intended to be loaded into context, but rather used within the output Codex produces.

**Examples from other skills:**
- Brand styling: PowerPoint template files (.pptx), logo files
- Frontend builder: HTML/React boilerplate project directories
- Typography: Font files (.ttf, .woff2)

**Appropriate for:** Templates, boilerplate code, document templates, images, icons, fonts, or any files meant to be copied or used in the final output.

---

**Not every skill requires all three types of resources.**

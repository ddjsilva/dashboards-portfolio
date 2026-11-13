# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Source of truth

`Briefing — Portfólio Power BI.md` is the project's source of truth. **Consult it before making any design or content decision** (layout, sections, copy, colors, typography, page structure, scope). If a request conflicts with the briefing, point out the conflict before proceeding.

## What this repo is

Diogo Silva's Power BI consulting portfolio, rebuilt from a Wix site (https://www.diogosilvaportfolio.com/) as a static **Astro 7 + Tailwind 4** site at the repo root, to be deployed on **Vercel** (Vercel Analytics is wired in `src/layouts/Base.astro`). The Wix version is already tagged `v1-wix` on GitHub.

- `Briefing — Portfólio Power BI.md` — the spec for the new site (see above): narrative order of the home page, page structure, case-file fields, palette, typography, technical requirements and v1 scope.
- `site/legacy/` — a full capture of the old Wix site (screenshots, text, structure JSON, rendered DOM, original images, Power BI embed HTML). Use it as the source of existing content and of the Power BI embed URLs (`pages/*/embed-1.html`). Its own `README.md` documents the layout.
- `referencias/` — visual references from Dribbble (a video and an image) cited in the briefing for navigation, motion and layout.

All site content and the briefing are in **Portuguese (pt-BR)**; v1 is Portuguese-only.

## Commands

```bash
npm run dev       # dev server on http://localhost:4321
npm run build     # astro check (types) + static build to dist/
npm run preview   # serve dist/
```

There are no tests or linter; `astro check` (run by `build`) is the type/diagnostics gate.

## Architecture

- **Cases = content collection.** `src/content.config.ts` defines the `projetos` collection (schema = the briefing's case fields). One `.md` per dashboard in `src/content/projetos/`; the filename is the slug (`/projetos/<slug>`), `order` sets grid position, the Markdown body is the "Bastidores" text. Omitting `embedUrl` makes the card render "Em breve" and unlinked. Covers live in `src/assets/projetos/` (currently the legacy `powerbi-1.png` screenshots; they include Power BI's footer bar, so they are shown `object-cover object-top` in a 16:9 frame).
- **Home** is `src/pages/index.astro`, with section copy kept as arrays at the top of the file. Deliberate deviations from the briefing, decided by Diogo: the "Como funciona" section is removed for now (6 sections: Abertura, O problema, Como eu trabalho, Projetos, Sobre mim, Contato), and Projetos is a horizontal scroll-snap carousel (script at the bottom of `index.astro`) so it scales past 6 dashboards; its controls hide themselves when every card fits. Header/Footer/Logo/ProjectCard are in `src/components/`. Contact links and nav items are centralised in `src/site.ts`.
- **Case pages** are `src/pages/projetos/[slug].astro`, generated only for cases that have `embedUrl` (cases without it exist only as "Em breve" cards). Section order follows the briefing: header (title, summary, problem, tools) → Contexto + "O que o painel responde" → Dashboard → "Resultados e bastidores" (the Markdown body, styled by `.prose-case`) → CTA → next project (cycles by `order`).
- **Power BI embed** is `src/components/PowerBIEmbed.astro`: the page ships no iframe. The "Abrir dashboard interativo" button is a real link to `embedUrl` (new tab), so phones (<768px) and no-JS visitors open the report full screen; at ≥768px the script intercepts the click and swaps the cover for a 16:9 iframe. Keep the full "Publicar na Web" URL in `embedUrl`, including any `&pageName=` (it sets the report's opening page).
- **Styling:** Tailwind 4 configured in CSS (`src/styles/global.css` `@theme`), no `tailwind.config`. Colour tokens: `lilac-500` is the briefing's `#8B6FE8` and is only for fills/decoration and text on dark; text, links and buttons on light backgrounds use `lilac-600` (`#6E50D8`) because `#8B6FE8` fails AA on white. Shared classes: `container-site`, `section`, `eyebrow`, `section-title`, `btn` + `btn-primary|btn-ghost|btn-dark`. Two dark blocks (`bg-night`) are used on the home: Projetos and Contato.
- **Motion:** add `data-reveal` (optionally `style="--reveal-delay:N"`) for the fade-up on scroll; the observer lives in `Base.astro` and is disabled under `prefers-reduced-motion`.
- **SEO:** `Base.astro` takes `title`, `description`, `ogImage` props and generates a 1200×630 OG image via `getImage`; sitemap via `@astrojs/sitemap` (`site` set in `astro.config.mjs`).

## Key requirements from the briefing (easy to miss)

- Two page types only: home (`/`, single scrolling narrative of 7 sections in a fixed order) and one case page per dashboard (`/projetos/[nome]`), plus optional `/projetos` grid and a 404.
- **Each dashboard case is its own content file** (e.g. `projetos/supply-chain.md`); adding a file must make the home card and case page appear automatically with no layout changes. A case with no embed link shows "Em breve". Use an Astro content collection for this.
- Power BI embeds ("Publicar na Web"): responsive 16:9 iframe, **never loaded on page open** — show the cover image with an "Abrir dashboard interativo" button and load on demand. On mobile, show the cover and a link to open the report full screen.
- Copy rules: first person, short sentences, business language; technical terms (DAX, SQL, Airflow) only inside case pages. No skill percentage bars, no all-caps headings, no pop-ups/urgency tactics.
- Visual: minimal, white + lilac accent (`#8B6FE8`), Inter or Geist, 17–18px body. Check lilac contrast for accessibility. Mobile-first, test at 375 / 768 / 1440px.
- Contact via direct links only — no form in v1. Dark mode is out of scope for v1. **Deviation decided by Diogo:** WhatsApp is removed everywhere (he doesn't want his number public); LinkedIn is the primary channel and e-mail the secondary. Don't re-add `wa.me` links.
- Links to home sections from other pages (`/#contato`, `/#projetos`) rely on the hash-scroll fix in `Base.astro`; without it the CSS smooth scroll is interrupted during load and the page stays at the top.
- Per-page title/description, social preview image, sitemap; simple free analytics (e.g. Vercel Analytics).

## Legacy capture

Regenerate with the Playwright script (requires Node, `playwright` installed, and `curl` on PATH). From the repo root:

```bash
node site/legacy/_tools/scrape.js site/legacy
```

The page list is hard-coded in `PAGES` in `scrape.js`. Note the Supply Chain page's legacy slug is `cópia-dashboard-people-analytics` (folder `copia-dashboard-people-analytics`), an artifact of a Wix page duplication — it is not a People Analytics page.

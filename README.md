# Beacon Diagnostics

Marketing site for Beacon Diagnostics, built to the **Brand Foundations** spec.
The whole system runs on one metaphor — *signal resolving from noise* (a
calibration grid locking into tolerance) — and every decision serves the emotional
hierarchy **Confidence → Relief → Respect → Continuity**.

## Stack

- **[Astro](https://astro.build)** — static output, islands. Editorial content
  ships ~zero JS; only motion hydrates (Brand Foundations §4.4).
- **Self-hosted variable fonts** — Source Serif 4 (headings) + Inter (body/UI),
  `font-display: optional`, preloaded above-the-fold (`public/fonts/`).
- **Inline Tabler outline SVG icons** — one `Icon.astro`, no icon font, no JS (§2.4).
- **Motion** — vanilla-JS islands (IntersectionObserver) + CSS/SVG transitions.
  Respects `prefers-reduced-motion` (§4.2).

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  site.ts                 # single source of truth: tracks, icons, contact
  styles/
    tokens.css            # §2 design tokens (color, type, grid, motion)
    global.css            # fonts, reset, base type, .grid-container, utilities
  layouts/Base.astro      # <head>, font preload, view transitions, reveal observer
  components/             # Nav (two states), Footer, Icon, Button, CalibrationGrid,
                          #   Stat (count-up), RoutingTile, ProofCard, TrackBadge, Logo
  pages/
    index.astro           # gateway / routing page (§3.1)
    imaging-qc.astro      # service page — imaging & equipment QC (§3.2)
    cardiac.astro         # service page — remote/cardiac diagnostics (§3.6)
public/
  fonts/                  # self-hosted latin variable woff2
  favicon.png
  assets/                 # Beacon logo/icon PNG set + source SVG
```

## Design system notes (the load-bearing rules)

- **The amber rule (§2.1).** CTAs on light = **Deep Amber `#9C6F0E` + white text**.
  **Bright Amber `#D4A017`** only for thin marks on light, or for anything on navy
  (incl. amber fills, which then take **dark** text). **No amber on slate-blue.**
- **Grid (§2.3).** 12 cols desktop / 4 cols mobile. Gateway is centered/symmetric;
  service pages use deliberate alternating asymmetry — but every span starts and
  ends on a grid boundary (`--from` / `--to` on `.col`).
- **Nav has two states (§3.4).** Gateway = both tracks equal weight + bordered
  Contact. Service = active-track badge + a smaller secondary "Switch track".
- **One sticky element max (§4.1).** The nav is it.
- **Motif is SVG, not canvas/WebGL (§4.2/4.4).** Cheap on mobile, no main-thread block.
- **No stock clinicians, no ECG/heartbeat glyph** — the "monitoring" icon is a
  broadcast/signal mark, on-metaphor (§1, §2.4).

## Deliberately deferred (per the spec)

- Trust/social-proof content stays **structural and visibly empty** until pilot
  results exist — no placeholder testimonials, no star ratings (§4.3). The footer
  trust slot and the `ProofCard` reserved state hold these places.
- No long-form case-study page (§4.3). No physics/QC content in the cardiac track (§3.6).

See [`docs/brand-foundations.md`](docs/brand-foundations.md) for the full reasoning.

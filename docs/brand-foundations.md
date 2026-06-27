# Beacon Diagnostics — Brand Foundations

**What this document is:** the single reference for every visual, brand, and technical decision made so far. Layer 1 explains *why* (strategy/intent) — use it to check whether a new decision fits the brand before it's built. Layer 2 defines the *tokens* (exact values — color, type, grid, icons). Layer 3 shows the tokens *applied* to the two page types designed so far, as worked examples for anything new to be checked against. Layer 4 covers mobile UX, motion, trust-proof structure, and technical performance.

This doc is a living reference, not a finished spec. When a new decision needs to be made (navigation, footer, a new page type), check it against Layer 1 first, then see if Layer 3 already has a comparable pattern before inventing a new one.

---

## Layer 1 — Strategy (the reasoning layer)

### The business context
Beacon Diagnostics starts in **imaging/equipment QC** (mammography, MRI, multi-site compliance) and is expanding into **diagnostics-as-a-service** (Holter monitoring, CIED support, remote monitoring). These look operationally different but share one underlying job: turning a continuous, noisy stream of data into a discrete, trustworthy, actionable finding. That shared job is the foundation the whole brand sits on.

### Primary brand metaphor: calibration / resolution — not the lighthouse
The reference logo's lighthouse metaphor (broadcasting light outward, guiding from a distance) is warm and maritime, but passive — it suits a consumer wellness brand more than a B2B clinical buyer who needs precision, not rescue. The brand instead runs on **signal resolving from noise** — a calibration grid locking into tolerance, a field of scattered readings converging on one verified value. This is more accurate to the business (calibration and tolerance are literally what QC does) and more ownable visually, since it isn't a saturated healthcare cliché the way waveform/ECG imagery is.

**Explicitly avoided:** ECG/heartbeat trace lines as the literal visual expression of this metaphor — too common in health/medtech branding, undercuts "authentic."

### Emotional hierarchy (in priority order)
1. **Confidence** — rigorous, clinically literate, competent
2. **Relief** — simpler and clearer than expected, not another bloated enterprise system
3. **Respect** — speaks to the visitor as a professional peer, not a sales target
4. **Continuity** — conveys ongoing vigilance ("we watch"), not just a one-off audit — important given the move from point-in-time QC toward continuous monitoring

Notably *not* prioritized: excitement, delight, warmth-as-the-lead-note. Those are secondary, never primary.

### Five visual descriptors
1. **Precise** — exact alignment, tolerance-band thinking in the grid itself
2. **Clinical-warm** — trustworthy like a well-made instrument; never sterile, never beige
3. **Editorial** — typography-led authority (journal/Bloomberg-grade), not template SaaS
4. **Legible-under-pressure** — the system must stay clear even when dense (multi-day data, multi-site dashboards)
5. **Understated-confident** — restraint as a competence signal; no stock clinicians, no gradient mesh, no exclamation points

### Use this layer to check new work
Before designing anything new, ask: does it serve Confidence → Relief → Respect → Continuity, in that order? Does it hold all five descriptors, or does it quietly drop one (e.g., a busy promotional banner would break "understated-confident" even if everything else about it looks on-brand)?

---

## Layer 2 — Design tokens

### 2.1 Color system

| Role | Hex | Use |
|---|---|---|
| Primary — Deep Navy | `#0B2447` | Trust anchor — headers, dark panels, primary brand color |
| Secondary — Slate-Blue | `#3D5A80` | UI chrome, secondary headings, borders, inactive states |
| Accent — Bright Amber | `#D4A017` | Thin marks, icons, highlights on navy backgrounds |
| Accent — Deep Amber | `#9C6F0E` | Filled CTAs/badges on light backgrounds (paired with white text) |
| Background | `#F7F8FA` | Page background — cool-tinted, reduces glare-fatigue in long sessions |
| Text | `#1A1D29` | Body copy default — navy-tinted near-black, not pure black |

**Psychological logic, in brief:** navy = audited/institutional without coldness. Amber = "this matters" without borrowing green's "healthy/normal" connotation or red's false-alarm connotation — and it ties back to the reference logo's lighthouse-beam equity even though the literal lighthouse metaphor has been retired. Off-white background and near-black (not pure black) text both serve long clinical reading sessions and keep the palette feeling like one designed system, not default values.

**The amber rule — the one thing this system depends on getting right:** amber's correct shade is context-dependent.

| Background it sits on | Use | Why |
|---|---|---|
| Light (`#F7F8FA` or white), as a small/thin mark | Bright Amber `#D4A017` | Decorative-scale; not load-bearing for text contrast |
| Light, as a filled shape with text on top | Deep Amber `#9C6F0E` + white text | Bright amber fails AA contrast when text-bearing on light backgrounds |
| Light, if Bright Amber must be the fill | Bright Amber `#D4A017` + **dark** text `#1A1D29` | Only safe text pairing for bright amber on a light fill (7.06:1) |
| Navy `#0B2447` | Bright Amber `#D4A017` | Deep amber goes muddy and under-contrasts against navy |
| Slate-Blue `#3D5A80` | **No amber at all** — use white or Background instead | Both amber shades fail badly against slate-blue (see ratios below) |

**Verified WCAG 2.1 contrast ratios:**

| Pairing | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) |
|---|---|---|---|---|
| Text on Background | 15.79 | Pass | Pass | Pass |
| Primary Navy on Background | 14.56 | Pass | Pass | Pass |
| White on Primary Navy | 15.47 | Pass | Pass | Pass |
| Secondary Slate-Blue on Background | 6.65 | Pass | Pass | Fail |
| White on Secondary Slate-Blue | 7.06 | Pass | Pass | Pass |
| Text on Secondary Slate-Blue | 2.37 | Fail | Fail | Fail |
| Dark Text on Bright Amber fill | 7.06 | Pass | Pass | Pass |
| White on Deep Amber fill | passes — safe for buttons/chips | Pass | Pass | — |
| White on Bright Amber fill | 2.24 | Fail | Fail | Fail |
| Bright Amber on Primary Navy | 6.51 | Pass | Pass | Fail |
| Deep Amber on Primary Navy | 3.46 | Fail | Pass (large only) | Fail |
| Bright Amber on Secondary Slate-Blue | 2.97 | Fail | Fail | Fail |
| Deep Amber on Secondary Slate-Blue | 1.58 | Fail | Fail | Fail |

---

### 2.2 Typography system

**Headings:** Source Serif 4 (fallback: Georgia, serif)
**Body / UI:** Inter (fallback: -apple-system, sans-serif)

**Logic:** two typefaces with distinct jobs, mirroring the navy/amber color split. The serif carries editorial authority (the "voice"); Inter carries legibility and data density (the "instrument") — including strong tabular-figure support, which matters for a brand constantly displaying calibration values and tolerance ranges.

```css
:root {
  --font-heading: 'Source Serif 4', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
}

h1 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 1.4rem + 2.2vw, 3.5rem); /* 32px mobile -> 56px desktop/4K */
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

body, p {
  font-family: var(--font-body);
  font-size: 1rem;       /* 16px floor for body copy — never go smaller */
  line-height: 1.65;     /* slightly more generous than typical 1.5, for long technical reading sessions */
  font-weight: 400;
}

button, .cta {
  font-family: var(--font-body);
  font-size: 0.9375rem;  /* 15px */
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: none;  /* avoid uppercase + heavy tracking — reads aggressive in a clinical context */
}
```

**4K monitors:** the risk isn't text rendering too small (OS-level scaling handles that) — it's **line length**. Constrain body copy to `max-width: 65ch` regardless of viewport width, so lines stay in the 50–75 character comfortable-reading range on any size display.

**Mobile:** the risk is the serif losing its distinguishing weight at small sizes and reading as a slightly-fancy sans. The H1's 32px floor and 600 weight are both chosen specifically to keep Source Serif's character visible on lower-density phone screens.

---

### 2.3 Grid system

**Desktop — 12 columns**
```css
.grid-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 64px;       /* side margins */
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;      /* gutter */
}
```

**Mobile — 4 columns**
```css
.grid-container {
  padding: 0 20px;       /* side margins */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 16px;      /* gutter */
}
```

**Why 4 columns on mobile, not a literal shrink of 12:** mobile reading is sequential/vertical. Most content collapses to full-width (4/4) or half-width (2/4); asymmetric column play is a desktop-attention device that doesn't translate and usually just produces a cramped, unwanted sidebar on a phone.

**Two usage modes — this is the part most likely to be missed by anyone working from values alone:**

| Page job | Grid usage | Why |
|---|---|---|
| **Front gateway** (calm, fast, routes an already-warm visitor) | Mostly centered, symmetric spans — e.g. columns 3–10 (8/12) for the hero, clean 6/6 for routing tiles | Two routing options must look equally weighted; neither should appear subordinate. Asymmetry here would undercut the routing logic itself. |
| **Service/track pages** (deeper trust-building, proof, methodology) | Deliberate, alternating asymmetry — e.g. 7/5 in one section, 5/7 in the next, 8/4 for a true sidebar further down | Different content types (narrative vs. proof/data) carry different weight at different points in the page; alternating which side is wider creates rhythm without ever leaving the 12-column grid. |

The constant across both modes: every span starts and ends on a grid boundary. Asymmetry means choosing *which* combination of spans per section — never going off-grid. That discipline is what keeps "asymmetrical" from sliding into "messy."

---

### 2.4 Icon system

**Style:** outline/line icons only, consistent 1.5–2px stroke weight. No fills except for deliberate status states (e.g. a filled dot for "active"). Recommended library: Tabler Icons (outline set) — thin, consistent, unopinionated, and large enough (5,800+) to never need a one-off custom icon for routine UI needs.

**Why this has to stay deliberately plain:** the logo is the one illustrated, detailed mark in the entire system. If UI icons try to match its level of ornamentation, every icon competes with the logo and with each other — the same "one accent, one job" principle from the color system applies here: restraint in the UI icon layer is what lets the logo, and the amber accent, keep their visual authority.

**Essential icon list, by context:**

| Context | Icons |
|---|---|
| Navigation / structural | menu, close, search, chevron-down, arrow-right, external-link |
| Service / modality (one fixed icon per track, used consistently everywhere that track appears) | ruler/calibration (imaging & equipment QC), a monitoring icon — **not a literal heartbeat/ECG glyph**, consistent with the metaphor decision in Layer 1 (remote diagnostics), device/chip (CIED support) |
| Trust / status | check (verified/passed), alert-triangle (flagged — used sparingly, never decoratively), shield (compliance/security), clock (turnaround time), file-text (reports/documentation) |
| Contact / conversion | mail, phone, calendar |

---

## Layer 3 — Applied patterns (worked examples)

### 3.1 Front gateway page

**Job:** confirm credibility fast and route an already-warm visitor (someone who has typically met Braden or his partner in person) to the right service track. Not a persuasion page — a confirmation-and-routing page.

**Structure:**
- Logo: small mark in nav, top-left, standard size. **Not** a centerpiece treatment — the brand is pre-recognition with this audience, so the headline and the calm layout carry the confidence load, not a large lockup.
- Headline: outcome-led, written to be **forward-safe** (works equally well for the original warm visitor and anyone they forward the page to). No reference to "reconnecting" or prior contact — that framing ages out fast as referral traffic becomes the norm rather than the exception, and it doesn't survive being forwarded.
- Routing: two tracks presented with **equal visual weight** — "Imaging & equipment QC" and "Remote diagnostics" — neither subordinate to the other.
- Grid: centered/symmetric (per 2.3 above), not the alternating asymmetry used on service pages.

**Decided, not yet rebuilt as a clean final artifact:** a warmer first-draft version was explored and explicitly rejected (see project history) — keep the gateway page neutral and forward-safe by default.

### 3.2 Service / track page (worked example: imaging & equipment QC)

**Job:** build specific, detailed confidence with a known buyer type (e.g. radiology director, medical physicist) — informative *and* confidence-building, since by this point the visitor has self-selected into this track.

**Structure (asymmetric rhythm, per 2.3):**
1. **Hero** — content columns 1–7 (58%), visual columns 8–12 (42%). Content-weighted because headline + CTA carries more early trust-building load than the visual.
2. **Proof/credibility section** — flips to visual/stats columns 1–5, narrative columns 6–12. The reversal creates rhythm rather than repeating the same split.
3. **Methodology/detail section** — true 2/3 + 1/3: substantive explanation columns 1–8, persistent sidebar (accreditation, quick reference, contact) columns 9–12. This is the one section where a real sidebar pattern is earned — by this point the visitor is in detail-seeking mode.
4. **Closing CTA** — near-full symmetry, columns 2–11 centered. A calm, resolved close after the asymmetric rhythm of the body — echoes the calibration/resolution metaphor itself (noise through the middle, alignment at the end).

**Hero content specifics (as designed):**
- H1: outcome-language, not service-language (e.g. "Clarity you can act on, every time") — works even as the service catalogue grows, since it never names a specific modality
- Sub-headline: the only place services are named, listed with equal weight
- One primary CTA only, in Deep Amber fill with white text (the accessible variant) — never two competing amber buttons, per the "one accent, one job" rule in 2.1
- Proof stats sit at the same baseline as the CTA — numbers build confidence faster than sentences
- Visual: the locking-grid/calibration motif, never literal equipment photography or stock clinicians — sits outside the reading path, meant to be felt peripherally rather than read

### 3.4 Navigation and footer

**Navigation has two states, not one — this is the key design decision.**

*Gateway page (no track active):* both service tracks named with equal visual weight in the nav, mirroring the equal-weight routing tiles below the fold. Contact is the one bordered/distinct nav item, consistent with the "one accent, one job" discipline used for the CTA system.

*Service page (track active):* the flat link list is replaced by a small active-track badge (amber-tinted, with the track's icon from 2.4) — this is orientation, not a menu repeat. A visitor who has already chosen a track shouldn't see both options presented as equally undecided again. "Switch track" becomes one deliberately secondary, smaller action beside the badge, not a second equal-weight nav item.

**Footer — four columns, matching the grid's quarter-divisions (Layer 2.3):** brand statement, services, company/contact, and a **trust-proof slot reserved on purpose** (see 4.3) — present and visibly empty pre-launch rather than absent. This avoids discovering later that there's "nowhere good" to place the first pilot-site mention; the placement decision is made once, now, and only the content drops in later.

### 3.5 Deliberately left open — needs real content first, not a placeholder pattern

These aren't oversights — building them now would mean inventing service-line specifics that don't exist yet, which produces a pattern wearing borrowed clothes rather than a real one. Build these once the underlying content is real:

- **The diagnostics-as-a-service track's own hero (build).** Cardiac content now exists (see 3.6) — the remaining task is applying it to 3.2's hero structure (same asymmetric rhythm, same anatomy), not gathering more content. The physics/QC component of this track is explicitly out of scope for v1.
- **Mobile-specific wireframe for the service-page hero.** Worth doing once there are at least two real heroes (imaging/QC and cardiac diagnostics) to wireframe against, so the mobile pattern is checked against more than one case.
- **Trust/social-proof population** (structure already defined in 4.3) — blocked on pilot-site results existing, as already noted.

### 3.6 Confirmed content — cardiac diagnostics-as-a-service (v1, no physics/QC component)

**Scope note:** v1 of this track is cardiac-only. Imaging/equipment physics and QC content is deliberately excluded from this track for now — it lives in the existing imaging/QC track (3.2) and is not duplicated here.

**Content philosophy — deliberately minimal, by design choice, not by default:** this track intentionally omits step-by-step workflow, billing/signing mechanics, and fitting logistics. That information qualifies a lead in conversation, not on the page — a deliberate trade of "explain and convince" for "name and invite contact," which still fits Layer 1's "understated-confident" descriptor as long as the page reads as *confidently* brief rather than thin. The positioning line is doing most of the persuasive work as a result, and should be treated as load-bearing, not filler.

**Positioning (the load-bearing line — outcome-led, doubles as the H1 candidate per 3.2's hero anatomy):**
> Get clarity quicker, refer smarter.

This reframes the value prop from "outsource your workload to us" to "extend what a referring GP/clinic can already do, and refer onward with real diagnostic information when referral is still right." Notably uses "clarity," directly echoing the Layer 1 brand metaphor (signal resolving into a clear finding) without needing to force the connection.

**Services offered (sub-headline list, equal weight per 3.2):** Holter monitoring · CIED support · Remote monitoring

**Why trust us (credentials — confirmed, feeds the proof/credibility section):**
> Co-chair and board director, International Board of Heart Rhythm Examiners

**CTA:** Get in touch

**Content guardrail for whoever writes final copy:** claim *capability*, never *scale* or *capacity* — e.g. it's accurate to say the three services are offered; it is not accurate to imply current volume, client count, or nationwide reach. This avoids overclaiming while the business is still starting small, without requiring any qualifying language on the page that would undercut confidence.

---

## Layer 4 — Mobile UX, motion, trust-proof structure, and performance

### 4.1 Mobile-first UX strategy

**Why this is a Layer 1 issue, not just a technical one:** mobile handling directly serves "Legible-under-pressure" and "Respect" — a clinician checking something on a phone between cases deserves a fast, considered experience, not a shrunk desktop site.

**Data tables (QC logs, tolerance values):** below ~640px, tables transform into stacked label-value cards rather than shrinking into horizontal-scroll tables. For dense logs, show only the most decision-relevant fields (e.g. date, result, status) in the card view, with tap-to-expand for full detail — an information-budget decision, not information hidden.

**Large images/visuals:** serve different assets at different breakpoints via `<picture>` + `<source media>` art-direction — a simplified, bolder version of the locking-grid motif on mobile, not a scaled-down copy of the desktop asset. This is a UX decision and a performance decision at once (see 4.4).

**Scroll fatigue — a pacing problem, not a length problem:**
- Alternate visual density section-to-section (dense data section → light, high-whitespace section), the same alternating-rhythm logic already used for grid spans in Layer 2.3, now applied to density.
- No infinite scroll — a visitor should be able to sense "the page is resolving toward an end," which also echoes the calibration metaphor itself.
- One sticky element maximum. Stacking a sticky header with a sticky CTA bar is the most common real-world cause of mobile scroll fatigue; it shrinks the usable viewport more than any amount of content length does.

### 4.2 Interactive components & motion

**The rule:** motion's only legitimate job here is to dramatize resolution (noise becoming clarity) — the same metaphor as everything else in the system. Decorative-only motion (parallax, bounce, float) undercuts "understated-confident" regardless of how "premium" it looks in isolation.

| Moment | Treatment |
|---|---|
| Section reveal on scroll | Scattered marks animate into an aligned row/grid — sub-400ms, eased (`cubic-bezier(0.4,0,0.2,1)` or similar), never overshooting past the resting position |
| Stat callouts | Count up from 0 on first view — one mainstream "premium SaaS" convention worth keeping, because it dramatizes arriving at a verified value |
| Buttons / links | Press state: scale to ~0.98, no shadow, no glow, no color shift. Restraint on interaction feedback is itself part of the confidence signal |
| Page transitions | Brief fade/cross-dissolve (~150–200ms) between pages — signals one considered system rather than disconnected static pages |
| **Explicitly avoid** | Parallax scrolling, particle effects, cursor-follow effects, autoplaying video backgrounds, spring/elastic easing — all skew toward "exciting," which sits outside the emotional hierarchy in Layer 1 |

**Build note:** implement the resolve-on-scroll motif as SVG attribute transitions or CSS, not canvas/WebGL — cheaper on low-end mobile CPUs and doesn't block the main thread. (See 4.4 for why this also matters for PageSpeed.)

### 4.3 Trust & social proof — structure defined now, populated later

This content is explicitly conditional on pilot-site results existing — nothing here should be populated with placeholder testimonials. What's defined now is the *shape* these will fill later, so they slot into the existing system rather than getting bolted on afterward.

1. **Verified-result card** — pilot outcomes presented in the same visual language as the proof-stat pattern already defined in Layer 3.2 (e.g. "Site A — 6-month pilot — 0 missed tolerance flags"). Frames a client win as more data resolving — the most on-brand way to do social proof here, because it borrows the brand's own visual grammar rather than a generic testimonial convention.
2. **Named, specific outcomes — never star ratings.** Quotes (with permission) set in the editorial serif, attributed by name/role/institution. Star-rating iconography reads as consumer/e-commerce and undercuts a buyer evaluating a clinical/compliance partner.
3. **Quiet logo strip** — once there are a few pilot sites, a restrained "trusted by" row (text names are fine, arguably more restrained than logos) belongs in the proof/credibility section already defined in Layer 3.2.

**Explicitly deferred:** a long-form case-study page. A thin case study with one or two data points reads as more damaging than no case study at all — wait until pilot history is substantial enough to earn the format.

### 4.4 Technical performance — target: PageSpeed 95+ without reducing visual complexity

**Context:** this is a fresh build with nothing yet in place, so the recommendation below is the starting architecture, not a retrofit.

**Foundation: an islands/partial-hydration framework (e.g. Astro) as the default, not a SPA.** Most of this site is static/editorial content (headlines, methodology text, proof stats) — that content should ship as near-zero JavaScript. Only genuinely interactive pieces (the resolve-on-scroll motif, any future dashboard demo) hydrate as small, isolated JS islands. This is the single highest-leverage decision for hitting 95+ while keeping the richness already designed — it avoids the usual tradeoff where more interactivity always costs more JS, by only paying that cost where interactivity actually exists.

| Risk area | 2026-appropriate fix |
|---|---|
| Source Serif 4 + Inter, multiple weights | Self-host with `font-display: optional` (avoids visible re-flow, unlike `swap`); `<link rel="preload">` only for above-the-fold weights; prefer variable font files to cut request count |
| Locking-grid / resolve animation | SVG + CSS transitions, not canvas/WebGL (see 4.2) |
| Proof-section and future case-study imagery | AVIF with WebP fallback as the default format; explicit `width`/`height` to prevent layout shift; `loading="lazy"` below the fold |
| Data tables / QC logs | Virtualize long tables (render only visible rows) rather than full pagination re-fetches |
| Third-party scripts (chat widgets, analytics, pixels) | The most common real-world score-killer on B2B sites, usually added post-launch. Defer or load after first interaction; audit every addition against performance budget, not just at launch |
| Two-track architecture (gateway + service pages) | Route-based code-splitting — the gateway page must not load service-page-only JS (sidebar interactions, methodology accordions) it never uses |

**The honest caveat:** hitting and *keeping* 95+ depends more on ongoing build discipline than on any single technical choice at launch. The most common way a site like this loses its score isn't the initial build — it's six months of small, individually-reasonable additions (one chat widget, one marketing pixel). Performance budget should be treated as an ongoing constraint, checked the same way new design decisions get checked against Layer 1.

---

## How to use this document going forward

When a new page, section, or component needs to be designed:
1. Check it against **Layer 1** first — does it serve the emotional hierarchy and hold the five descriptors?
2. Check **Layer 3** for a comparable existing pattern before inventing a new one — most new work is a variation on the gateway pattern or the service-page pattern, not a third pattern.
3. Check **Layer 4** for mobile, motion, and performance implications before anything ships — these aren't a final QA pass, they're a constraint to design within from the start.
4. Only reach for **Layer 2** tokens directly once 1–3 confirm what's being built and why.

This document doesn't enforce coherence automatically — it makes coherence checkable. The habit of checking new decisions against it is what keeps the system intact, not the document on its own.



    ---
name: Metalcoop
description: Brand surface of a Brazilian workers' cooperative forging steel parts for global automotive Tier-1s. Procurement-first, forge-lane.
---

<!-- SEED: re-run /impeccable document once /impeccable typeset, /impeccable colorize, and /impeccable extract have landed real tokens and components. -->

# Design System: Metalcoop

## 1. Overview

**Creative North Star: "The Forge Floor Spec Sheet"**

This is the brand surface of a worker-cooperative steel forge that supplies global automotive Tier-1s. The visual world is the forge floor (heat, mass, the press in motion) described in the calm voice of a supervisor's spec sheet. The audience is procurement at Dana, Eaton, ZF, Meritor; their question is whether Metalcoop is credible enough for an RFQ. The system has to answer that question in five seconds, twice (once visually, once when they read).

The design rejects: the current site's Tailwind-emerald maximalism, the Brazilian-industrial-template lane (Schulz, Brasilforjas, Aços Villares), the Sandvik / Bosch / GKN clean-spec sterility, the cooperative-movement solidarity-poster aesthetic, and the marketing-agency carousel-cards-form structural cliché. It does not look like a Brazilian forge competitor; it does not look like an AI template; it does not retreat into clean-spec safety to look serious.

Color is committed to a forge-warm chassis (cast-iron + ember-orange + paper) with the locked brand emerald appearing only as a cooperative signature. Typography pairs an industrial-stencil-influenced display (forge presence) with a technical sans body (the supervisor's voice). Motion is restrained: state changes only, no entrance animations, no scroll-triggered reveals.

**Key Characteristics:**
- Forge-warm, not Tailwind-emerald.
- Numbers and units carry typography. Specifications are content, not decoration.
- The cooperative is a signature, never a headline.
- Calm voice, hot subject. Patient prose describing a violent process.
- Paper surface, soot text, brand emerald as stamp not wash.
- Flat by default. No drop shadows, no hover-lift.

## 2. Colors

A committed forge-warm palette anchored to paper surface and soot ink. Brand emerald is preserved as a cooperative signature. The forge-lane work is carried by a non-emerald secondary (cast-iron + ember).

### Primary
- **Soot Ink** *(approximate `#0e1110`, final value resolved in `/impeccable extract`)*: near-black warm, tinted slightly toward the iron hue. Default body text, headings, structural rule lines. The first colour the eye lands on after Paper.
- **Ember** *(approximate `#c64a14`, final hue + chroma resolved in `/impeccable colorize`)*: the heat-glow of a billet at temperature. Carries the *hot subject*: number callouts, lot codes in progress, °C tags, status-in-progress, occasional CTA emphasis. Always small. If ember reads as a theme, it has overstayed its welcome.

### Secondary
- **Cast-Iron** *(approximate `#3a3530`, final value resolved in `/impeccable extract`)*: warm dark grey tinted toward iron. Borders, dividers, secondary text, the chassis of any heavy element. Bridges Soot and Paper without ever going to a cold blue-grey.

### Tertiary (cooperative signature)
- **Brand Emerald** (`#059669`): the locked Metalcoop green. Appears in: the logo, certification stamps (ISO 9001, IATF 16949), the *Produzido pelos cooperados da Metalcoop* colophon, and form-field focus rings. Never as a section wash. Never on a CTA fill. Never on a hero background.
- **Brand Emerald Deep** (`#047857`): hover and active state for the emerald signature only. Same restraint applies.

### Neutral
- **Paper** (`#ffffff`): primary surface (locked).
- **Warm Cream** *(approximate `#f7f4ee`, final value resolved in `/impeccable extract`)*: optional secondary surface for sectional contrast, e.g. spec-data blocks or the cooperative-byline footer.
- **Muted** (`#374151`): existing legacy token, retained for body copy that should sit below Soot but above Cast-Iron in hierarchy.

### Named Rules

**The Signature-Not-Wash Rule.** The brand emeralds (`#059669`, `#047857`) are *signature* colors, not surface colors. They appear on the logo, on certification marks, in the cooperative byline, and on focus rings — and nowhere else. Any field, panel, button, or section that wants to feel "branded" by going green is wrong. The brand is the work. Emerald is the stamp.

**Exception: the cooperative-recruitment surface.** The `#jobs` ("Trabalhe Conosco") section on `index.html` carries `--brand-700` as its background. This is a deliberate, scoped exception: the section IS the cooperative argument, asking the visitor to join the cooperados, so the brand emerald carrying the surface is the message. Limit: this exception applies to that one section only. No other surface on the site (no card, no hero, no contact bar, no section-wash on empresa / produtos / clientes / contato) reuses the exception. If a second emerald wash appears anywhere else, the rule has failed and needs reopening, not extending.

**The Ember Discipline Rule.** Ember-orange is the visual heat of the forge. Used on numbers, °C, lot codes, process indicators, and CTA emphasis. If ember occupies more than ~10% of a screen, the screen is on fire — pull back until it reads as heat, not as theme.

**The Iron-Tinted-Neutral Rule.** Every neutral on the site is tinted warm toward the iron hue (chroma 0.005–0.01 in OKLCH). Cold blue-greys are forbidden. Never `#000` or `#fff` in code: Soot Ink and Paper instead. The greys feel like the floor of the workshop, not the inside of a Bosch enclosure.

## 3. Typography

**Display Font:** an industrial-stencil-influenced sans display, final choice in `/impeccable typeset`. The presence of forge signage, machine-shop placards, hot-stamped lot markers, without becoming costume. Evaluate candidates from Pangram Pangram, ABC Dinamo, Klim, Future Fonts, ABC Dinamo, Velvetyne in display weights.

**Body Font:** a technical industrial sans, final choice in `/impeccable typeset`. The supervisor's voice: clean, plain-spoken, slightly utility, readable at small sizes for spec data. Pairs with the stencil display via shared structure / x-height; contrasts via weight + texture.

**Character:** Hot subject in display, calm voice in body. The display has weight and presence, like a hot-stamp on a billet. The body is patient and dimensional, like a supervisor describing tolerance to a buyer.

### Hierarchy

*Final values resolved in `/impeccable typeset`. Directional only at seed time.*

- **Display** (display family, ~80–120px clamp, line-height 0.95–1.05): page openers and section breakpoints only. One per fold. Headlines borrow from spec-sheet voice: *Forjamento a frio*, *±0.05 mm*, lot codes used as headers.
- **Headline** (display heavy or body extrabold, ~32–48px): sub-section heads.
- **Title** (body family semibold/bold, ~18–22px): component heads, card titles when cards are warranted.
- **Body** (body family regular, ~16–18px, line-height 1.5–1.6, max 65–75 ch): paragraph copy. Numbers and units inline (°C, ±, Ø, mm), not quarantined to tables.
- **Label / Spec** (body family semibold, ~11–13px, letter-spacing +0.08–0.12em, uppercase or small-caps): eyebrows, lot codes, IATF clause references, °C and ± inline tags.

### Named Rules

**The Numbers-As-Voice Rule.** Tolerance numbers, lot codes, °C, Ø, ±, IATF clauses are *part of the writing*, not specs trapped in tables. Body copy that reads *"Pinhão forjado a frio. Ø40 ±0.04. Lote 2026-A2."* is correct. A separate *Specifications* sidebar repeating the same numbers is wrong.

**The One-Display-Per-Fold Rule.** The stencil display has weight; it earns one appearance per fold. Two display headlines stacked on the same screen is theater. Prefer one display + body hierarchy over two displays.

**The No-Reflex-Type Rule.** Inter is forbidden. So is the rest of the reflex-reject list: IBM Plex (any), Söhne, Space Grotesk, Space Mono, DM Sans, DM Serif, Outfit, Plus Jakarta, Instrument Sans, Instrument Serif, Fraunces, Cormorant, Newsreader, Lora, Crimson, Crimson Pro, Playfair Display, Syne. If a font is on every Brazilian-industrial-template site, do not pick it.

## 4. Elevation

The system is **flat by default**. Surfaces are paper-on-paper; they distinguish themselves through type, rule lines, and warm-cream sectional shifts, not through drop shadows. A workshop has no soft glow under things, and neither does this site.

- No drop shadows on cards, buttons, or panels at rest.
- Hairline rules (1px Cast-Iron) divide content. Heavier rules (2–3px Soot) signal hierarchy breaks.
- Hover does not lift. Hover changes color (background fill, border weight) — never `transform: translateY(-Xpx)`.
- The legacy site's box-shadow stack (`--elev-1`, `0 4px 12px rgba(0,0,0,0.15)`, `0 18px 36px -18px ...` and friends) is removed.

### Named Rules

**The Flat-Workshop Rule.** Surfaces are flat. A forge floor has rule lines, paint marks, and weight — not soft shadows. If a component is "lifting on hover," rewrite it.

## 5. Components

*No component layer exists yet; the legacy components on the current site will be replaced. Real specs land when `/impeccable extract` builds the system, after `/impeccable typeset` (fonts), `/impeccable colorize` (final ember + iron resolution), and `/impeccable distill` (removing the AI-template skin).*

Stub guidance for the next pass:

### Buttons
- **Shape**: square or near-square corners (≤4px radius). No pill buttons.
- **Primary**: Soot fill, Paper text, Ember on hover. No gradients, ever.
- **Secondary**: Paper fill, Soot border (1.5px), fills with Cast-Iron on hover.
- **Brand emerald is forbidden as a button background.**

### Cards
Avoid where possible. When unavoidable: Paper surface, hairline Cast-Iron border, no shadow, no hover-lift, generous internal padding. Identical card grids (icon + heading + line repeated) are forbidden — that is the AI-template tell.

### Inputs
Paper surface, Soot text, Cast-Iron 1px border, Brand-Emerald focus border + 3px emerald/15% glow. Form labels in body-bold. Errors in Ember.

### Navigation
Type-set, not button-set. Active page indicated by typography weight or a 2px Soot underline. Brand emerald may color the active state if held to ≤3% screen presence; otherwise do not.

### Spec Callouts (signature pattern)
Inline number + unit set in label-style mono or small-caps, embedded directly in body copy. *Not* a card with an icon and a number above a label.

### Cooperative Byline (signature)
Single line of label-sized type at the colophon: *"Produzido pelos cooperados da Metalcoop · IATF 16949"*. Brand Emerald may color the cooperative phrase; the IATF clause is Soot.

## 6. Do's and Don'ts

### Do:

- **Do** treat brand emerald (`#059669` / `#047857`) as signature only: logo, certification marks, cooperative byline, focus rings. Maximum ~3% of any screen.
- **Do** treat ember-orange as visual heat: numbers, process indicators, CTA emphasis. Maximum ~10% of any screen.
- **Do** describe the forge process plainly. *"850 °C. ±0.05. Lot 2026-A2."* beats *"Quality you can trust."*
- **Do** anchor every page in real Metalcoop photography (fachada, parts, cooperados) or in type. No stock industrial imagery.
- **Do** vary structure per page. The home page is not a longer empresa page.
- **Do** keep numbers and units inline in body copy.
- **Do** honor `prefers-reduced-motion` on every animation, not just the slider.
- **Do** tint every neutral toward the iron hue (chroma 0.005–0.01 in OKLCH).

### Don't:

- **Don't** use brand emerald (`#059669` / `#047857`) as a button background, a section wash, a header background, a hero background, or a CTA fill. Emerald is a signature, not a surface.
- **Don't** use gradient buttons. `linear-gradient(90deg, var(--accent), var(--accent-dark))` on a CTA is the AI-template tell.
- **Don't** use `#000` or `#fff` in code. Soot Ink and Paper instead.
- **Don't** ship Inter, IBM Plex, Söhne, Space Grotesk, Space Mono, DM Sans, DM Serif, Outfit, Plus Jakarta, Instrument Sans, Instrument Serif, Fraunces, Cormorant, Newsreader, Lora, Crimson, Crimson Pro, Playfair Display, or Syne. Reflex-reject list is binding.
- **Don't** use soft drop shadows (`0 4px 12px rgba(0,0,0,0.15)` and friends). The system is flat. Hover does not lift.
- **Don't** build identical card grids. Same-sized cards with icon + heading + 1-line text repeated are direct anti-refs from PRODUCT.md.
- **Don't** ship an auto-advancing carousel hero. Find another structure for the home page.
- **Don't** retreat to Sandvik / Bosch / GKN clean-spec calm to "look serious." Forged-dimensional-plural ≠ Sandvik-blue.
- **Don't** lean into cooperative-movement solidarity-poster aesthetic. Red/black hand-set print, MST publication feel, raised-fist iconography are out.
- **Don't** use stock photography of industrial scenes (gears, handshakes, globes, blueprints). Only real Metalcoop material or none.
- **Don't** restate the heading in the paragraph below it. No marketing copy reflex.
- **Don't** use em dashes in copy. Commas, colons, semicolons, periods, parentheses.
- **Don't** animate layout properties (height, width, margin, top, left). Use opacity + transform.
- **Don't** add scroll-driven entrance animations. Motion is restrained: state changes only.
- **Don't** wrap every section in a 1100px container with the same padding. Vary structure for rhythm.

# Metalcoop · Webfonts

Drop the licensed Dinamo WOFF2 files into this directory. The
`@font-face` declarations in `css/tokens.css` already point to the
filenames below.

## What to license

Three families, one foundry: **ABC Dinamo**
(https://abcdinamo.com).

- **ABC Monument Grotesk** — display, headlines, signage register.
- **ABC Diatype** — body copy, the supervisor's voice.
- **ABC Diatype Mono** — spec sheets, lot codes, units inline in body.

Buy a **Webfont** licence sized to projected pageviews. Dinamo's
standard webfont licence permits self-hosting via `@font-face`
delivered from this directory. Do **not** rely on a Desktop licence
to ship the WOFF2 — that's a licence violation. Confirm the tier at
purchase.

## Filenames (exact, case-sensitive)

```
ABCMonumentGrotesk-Bold.woff2     (700)
ABCMonumentGrotesk-Heavy.woff2    (800)
ABCMonumentGrotesk-Black.woff2    (900)

ABCDiatype-Regular.woff2          (400)
ABCDiatype-Medium.woff2           (500)
ABCDiatype-Semibold.woff2         (600)
ABCDiatype-Bold.woff2             (700)

ABCDiatypeMono-Regular.woff2      (400)
ABCDiatypeMono-Medium.woff2       (500)
```

Dinamo's downloads typically arrive named like `ABCDinamo-Diatype-Regular.woff2` — rename to the above so the `@font-face` `src` paths resolve.

## Fallback behaviour

`tokens.css` chains each family to a metric-similar system fallback
(Arial Narrow / Helvetica Neue for display, system-ui for body,
ui-monospace for spec data). The site renders correctly before any
WOFF2 file lands here; the licensed family swaps in as soon as the
file is present. `font-display: swap` is set on every face — no
invisible FOIT.

## Why this pairing

See `_typeset/specimens.html` (Pairing A · Monument) and the
typography section of `DESIGN.md`. Monument Grotesk is built from
an 1884 Palmer & Rey specimen and reads as a cast foundry-signage
plate; Diatype is its calm body counterpart, drawn for screen,
with a Mono sister that carries spec data without changing voice.
One foundry, one voice across the building.

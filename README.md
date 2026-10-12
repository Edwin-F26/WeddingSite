# Edwin & Maria — Wedding Website

A single-page wedding invitation built with React, Vite, and GSAP. Guests land
on a sealed envelope; opening it reveals the invitation card, followed by the
venue, the day's programme, the dress code, and the RSVP.

## Getting started

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # eslint
```

## Editing the content

Everything guests read lives in one file: `src/data/wedding.js`.

| Key          | What it controls                                                   |
| ------------ | ------------------------------------------------------------------ |
| `couple`     | First names shown on the card and in the footer                    |
| `event`      | Date (ISO, drives the countdown), short/long date labels, city     |
| `scripture`  | Verse under the artwork on the invitation                          |
| `venue`      | Name, subtitle, description, and the map link                      |
| `schedule`   | Programme stops: time, title, and icon (`bouquet`, `rings`, `glasses`, `dinner`, `moon`) |
| `dressCode`  | Attire copy and the swatch palette                                 |
| `rsvp`       | Deadline text and the RSVP link                                    |

Entries marked `PLACEHOLDER` in that file still need the real details.

## Brand

- **Palette** (`public/images/colorscheme.png`), exposed as CSS variables in
  `src/index.css`: cream `#F8EFE7`, blush `#ECACB1`, wine `#471225`, cocoa
  `#250F0D`, sage `#A8B17E`, olive `#445427`, forest `#161D0A`, black.
- **Logos** in `public/images/`: the originals `Logo1.jpeg` (E&M monogram)
  and `Logo2.jpeg` (wordmark) are JPEGs on white, so the site uses
  transparent PNG cut-outs derived from them: `logo-monogram.png` (nav and
  card), `logo-wordmark.png` (landing screen), and `logo-wordmark-light.png`
  (cream version for the wine footer). If the logos change, regenerate the
  PNGs from the new source files.
- **Type**: Cormorant Garamond (headings/body), Pinyon Script (accents), Jost
  (labels), loaded from Google Fonts in `index.html`.

## Structure

```
src/
  components/
    Intro.jsx         Envelope landing + GSAP opening sequence
    HeartEnvelope.jsx Reusable envelope with a lace heart card
    Invitation.jsx    Framed invitation card, countdown, pointer tilt
    Location.jsx      Venue + map link
    Schedule.jsx      Winding programme path drawn on scroll (ScrollTrigger)
    DressCode.jsx     Attire copy + palette swatches
    Rsvp.jsx          RSVP envelope + link
    Footer.jsx        Wordmark on wine
    Ornaments.jsx     All SVG flourishes and icons
    Petals.jsx        Floating petal particles
    Nav.jsx           Fixed anchor navigation
  data/wedding.js     Site copy
  hooks/              useReveal (scroll fade-ins), useCountdown, useMediaQuery
  lib/gsap.js         GSAP + ScrollTrigger registration
```

All motion is wrapped in `gsap.matchMedia()` and collapses to static under
`prefers-reduced-motion: reduce`.

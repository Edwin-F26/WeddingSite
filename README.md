# Edwin & Maria — Wedding Website

Single-page wedding invitation for Edwin & Maria  
**September 30, 2027 · Miami, Florida**

Built with React, Vite, GSAP, and Supabase.

## Quick start

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm run lint
```

## RSVP setup (Supabase)

1. Run `supabase/schema.sql` in the Supabase SQL Editor.
2. Add a `.env.local` file:

```bash
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-or-publishable-key>
```

Use the **anon / publishable** key only. Never put the service-role key in this repo.

3. Restart the dev server. RSVPs appear in **Table Editor → rsvps**.

If those env vars are missing, the form falls back to the link in `src/data/wedding.js`.

## Content edits

All guest-facing copy is in `src/data/wedding.js`:

| Key | What it controls |
| --- | --- |
| `couple` | Names |
| `event` | Date, stamps, city |
| `scripture` | Verse on the invitation |
| `venue` | Loveland Venue details + map/website links |
| `schedule` | Day-of timeline |
| `dressCode` | Formal attire + palette |
| `rsvp` | Deadline + fallback URL |

## Brand

- Palette: cream, blush, wine, cocoa, sage, olive, forest, black (`src/index.css`)
- Logos: `public/images/`
- Fonts: Cormorant Garamond, Jost, local Aston Script

## Project layout

```text
src/
  components/   Intro, Invitation, Location, Schedule, DressCode, Rsvp, Nav, Footer
  data/         wedding.js (site copy)
  lib/          supabase.js, gsap.js
supabase/       schema.sql
```

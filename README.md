# Malek's Mowing — Website

A fast, mobile-first marketing site for a lawn care business. Plain HTML, CSS,
and JavaScript — no build step, no dependencies. Open `index.html` in a browser
and it just works.

## Structure

```
index.html      All page content (hero, services, pricing, gallery, FAQ, quote form)
css/styles.css  All styling
js/main.js      Mobile nav, scrollspy, stat counters, form validation + submit
assets/         Drop your photos here
```

## Business details baked into the site

These are live throughout `index.html` (and `CONTACT_EMAIL` in `js/main.js`):

- **Phone:** (605) 290-3872 — `tel:` links use `+16052903872`
- **Email:** maleksmowing@outlook.com
- **Service area:** Aberdeen, SD and surrounding areas
- **Domain:** maleksmowing.com (GoDaddy, registered through 2029)

## Logo and brand colors

Both logo versions you supplied are in `assets/`, trimmed and optimized:

| File | Used for |
|---|---|
| `logo-light.png` | Full lockup on white (spare — not currently placed) |
| `logo-dark.png` | Footer, on black |
| `mark-light.png` | The M mark in the header |
| `mark-dark.png` | Spare, for dark backgrounds |
| `icon-180.png`, `favicon.ico` | Browser tab and phone home-screen icon |
| `og-image.png` | Preview image when the link is shared (Facebook, texts) |

The palette is sampled straight from the logo and lives at the top of
`css/styles.css`:

| Token | Value | Role |
|---|---|---|
| `--brand` | `#69A91D` | The logo green. Buttons, accents, marks on black. |
| `--brand-mid` | `#5E9A18` | Large green text on white |
| `--green-700` | `#4E7F14` | Small green text, and green that carries white text |
| `--green-900` / `--ink` | `#101310` | Near-black: headings and dark sections |
| `--brand-lift` | `#7CC022` | Button hover |

Buttons use **black text on the green**, not white. The logo green is bright
enough that white text on it fails readability standards (2.9:1); black on it
is very legible (7.3:1). Same green, and it looks closer to the logo.

## Promises made on the page

Confirmed accurate. If how the business operates changes, these are the
lines to revisit:

| Claim | Where |
|---|---|
| "A text if weather moves us" / "text you which day" | Why Us, FAQ |
| "Same-day quotes" / "reply within 24 hours" | Hero card, form note |
| "Cash, check, or Venmo" | FAQ |
| "Priority rescheduling after storms" | Pricing |

No business hours are advertised anywhere, deliberately.

**No insurance claim appears anywhere on the site.** Don't add an "Insured"
badge or a licensed-and-insured line unless it is verified and current — it's
the kind of claim customers rely on.

The **Reviews section is commented out** in `index.html`. Turn it on once you
have real customer quotes and their permission — the instructions are in the
comment. Don't publish invented ones.

## Photos

All in `assets/`, cropped to 4:3 landscape at 1000x750 and compressed to
under ~220 KB each:

| File | Where |
|---|---|
| `yard-1-before/after.jpg` | First before/after pair |
| `yard-2-before/after.jpg` | Second before/after pair |
| `work-1..4.jpg` | "More finished yards" grid |
| `hero-lawn.jpg` | Hero background (1600x800, 2:1) |

Two rules when adding more:

1. **Crop to 4:3 before committing.** The tiles are landscape; a portrait
   phone shot gets centre-cropped, which usually cuts the lawn in half.
2. **Never set a pixel height in CSS on these images, and keep `height:auto`
   in the base `img` rule.** The `width`/`height` attributes on `<img>` are
   treated as fixed dimensions otherwise, and the aspect-ratio is ignored.

To add a before/after pair, copy a `.ba-pair` block in `index.html`:

```html
<div class="ba-pair">
  <figure class="ba">
    <span class="ba-tag">Before</span>
    <img src="assets/yard-3-before.jpg" width="1000" height="750" loading="lazy"
         alt="describe what the photo shows">
  </figure>
  <figure class="ba">
    <span class="ba-tag ba-tag-after">After</span>
    <img src="assets/yard-3-after.jpg" width="1000" height="750" loading="lazy"
         alt="describe what the photo shows">
  </figure>
</div>
```

To add a finished shot, copy a `.work` figure into `.work-grid`.

Phone originals are 5-10 MB. Always resize before committing, or the page
will crawl on mobile data.

## Ideas not yet done

### Photos on the service cards

The six service cards currently use drawn icons. Photos of the actual work
would be stronger. Needs one good landscape shot per service — action shots
beat finished ones here, since the card is about the work, not the result:

| Service | Shot to get |
|---|---|
| Lawn Mowing | The mower mid-cut, stripes laying down behind it |
| Trimming & Edging | Trimmer working a fence line, or a close-up of a fresh edge |
| Spring & Fall Cleanup | Leaf pile, blower going, or a loaded trailer |
| Dethatching | The machine working, or the piles of thatch pulled out |
| Mulching & Beds | Fresh dark mulch against green grass with a cut edge |
| Property Cleanups | An overgrown lot halfway cut — mess on one side, clean on the other |

Can be done piecemeal: photos on the cards that have them, icons on the rest.
Crop to 4:3 and keep each under ~200 KB, same as the gallery photos.

### Field-service software integration

If the business moves onto a scheduling/invoicing platform (Jobber or
similar), keep this site as the public face and point the domain here rather
than at the platform's generated site.

Three things to wire up at that point:

1. **Quote form → work request.** Repoint `FORM_ENDPOINT` in `js/main.js`
   at the platform's request link so submissions land in the job list.
2. **Client login link** in the header, for quote approval and invoices.
3. **Online payment.**

### An About section

A few sentences on who runs the business and how it started, ideally with a
photo of the owner or the truck. Nothing on the site currently shows a
person, and for a service where someone is coming onto your property, that
matters more than any other single addition.

### Reviews on the page

The reviews section links out to the Google profile. Once there are several
reviews, pulling two or three onto the page as quotes — with names, and with
permission — would land harder than a button alone.

### Winter services

Not offered, and deliberately absent from the site. If that ever changes,
a winter service is worth adding here — it keeps customer relationships
alive year-round rather than restarting each spring.

## The quote form

Requests go through Formspree (`https://formspree.io/f/xbgjqqvq`, set as
`FORM_ENDPOINT` at the top of `js/main.js`) and arrive by email at
maleksmowing@outlook.com. The subject line carries the customer's name and
address. The form submits in the background and shows a confirmation inline.

If Formspree is ever unreachable, the visitor sees an error asking them to
call or text instead. Clearing `FORM_ENDPOINT` reverts to the old behaviour:
the form opens the visitor's own email app with the request pre-filled.

Verified working end to end on 10 September 2026: a submission from the live
site arrived in the inbox.

**Re-test after any change to the form** — submit a real request and confirm
it lands. A silently broken form loses jobs without any sign that it has.

If the business later runs on scheduling software, repoint this at that
platform's work-request link so submissions land in the job list.

## Publishing

The site is live at **https://maleksmowing.com**, served by GitHub Pages
from the `main` branch. Any push to `main` republishes within a minute or so.

DNS lives at GoDaddy: four `A` records on `@` pointing at GitHub Pages
(185.199.108–111.153) and a `CNAME` on `www` pointing at
`malekwieker10.github.io`. The `CNAME` file at the repo root holds the custom
domain — **don't delete it**, or the site falls back to the github.io address.

**Netlify / Cloudflare Pages:** drag the folder in, or connect the repo. No
build command, publish directory `/`.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- Responsive down to small phones; sticky "Call now" bar appears on mobile.
- Accessible: skip link, focus rings, labeled fields, `prefers-reduced-motion` respected.
- SEO: meta description, Open Graph tags, and LocalBusiness structured data
  (the JSON-LD block in `index.html` carries the real phone, email, and area).

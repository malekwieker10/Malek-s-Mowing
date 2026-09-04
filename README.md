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

## Before you go live — replace the placeholders

Everything below is filler. Search and replace across `index.html` and `js/main.js`:

| Placeholder | Where | Replace with |
|---|---|---|
| `(555) 123-4567` and `+15551234567` | header, hero, contact, footer, call button | Your real phone (the `tel:` links use the digits-only form) |
| `hello@maleksmowing.com` | contact list, footer, JSON-LD, `js/main.js` | Your real email |
| `Your City` | JSON-LD, FAQ, contact list, footer | Your town / service area |
| Prices: `$45`, `$40`, `$120` | Pricing section | Your actual starting rates |
| `Sample Client, Neighborhood` | Reviews section | Real customer quotes (with permission) |
| Stat numbers (`data-count`) | Why Us section | Real numbers, or delete the block |

## Add real photos

The gallery currently uses CSS color blocks as stand-ins. Before/after shots of
your own work are the single highest-impact change you can make to this page.

1. Put images in `assets/` (JPG, resized to ~1600px wide, under ~300 KB each).
2. In `index.html`, replace each figure:

```html
<figure class="shot shot-a">
  <img src="assets/yard-1.jpg" alt="Freshly mowed front lawn with crisp edging">
  <figcaption>Weekly residential cut</figcaption>
</figure>
```

3. Add to `css/styles.css`:

```css
.shot img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
```

## Making the quote form actually send

Out of the box the form validates and then opens the visitor's email app with
the request pre-filled — no setup, works immediately.

To have requests emailed to you automatically instead:

1. Create a free form endpoint (e.g. [Formspree](https://formspree.io)).
2. Open `js/main.js` and set the URL at the top:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/your-form-id';
```

The form then submits in the background and shows a success message inline.

## Publishing

**GitHub Pages** (free, works with this repo as-is):
Repo → Settings → Pages → Source: *Deploy from a branch* → pick your branch,
folder `/ (root)` → Save. Live in a minute or two at
`https://<username>.github.io/<repo>/`.

To use your own domain, add a `CNAME` file at the repo root containing just
`maleksmowing.com`, then point the domain's DNS at GitHub Pages.

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
  (update the JSON-LD block in `index.html` with your real details).

# Alloy Metrix — Website

Product-information website for **alloymetrix.in** — Alloy Metrix, Analytical & Agro Solution.

A static marketing site: it presents the product catalogue and routes every enquiry to the
phone, WhatsApp, email or enquiry form. There is no cart, checkout, account or login.

Built with **React 19 + Vite 7 + Tailwind CSS v4 + React Router 7**, deployed on **Netlify**.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/ (also writes dist/sitemap.xml)
npm run preview    # serve the built output locally
```

## Pages

| Route             | Page                                                             |
| ----------------- | ---------------------------------------------------------------- |
| `/`               | Home — hero, divisions, featured products, assurances, partners   |
| `/products`       | Catalogue, filterable by division and category via the URL        |
| `/product/:slug`  | Product detail — gallery, features, specs, comparison table       |
| `/about`          | Company, divisions, partnership, who we work with                 |
| `/contact`        | Phone / WhatsApp / email / address plus the enquiry form          |

Filters are held in the query string (`/products?division=agro&category=tillage`), so any
filtered view can be linked or bookmarked.

## Editing content

All copy lives in `src/data/` — no component edits needed for routine changes.

| File                        | What it holds                                                      |
| --------------------------- | ------------------------------------------------------------------ |
| `company.js`                | Name, phone, email, address, hours, divisions, categories, partners |
| `products.analytical.js`    | The 18 NDT / analytical products                                    |
| `products.agro.js`          | The 10 Kisan King Agro implements                                   |
| `products.js`               | Combines both lists; sets which products are featured on the home page |

### Adding a product

Append an object to the relevant list. Everything except `slug`, `name`, `category`, `image`
and `summary` is optional — sections, spec tables and comparison tables render only when present.

```js
{
  slug: 'new-product',              // URL: /product/new-product
  name: 'New Product',
  category: 'hardness-testing',     // must match an id in company.js → categories
  brand: 'Magnafield',
  image: '/img/products/new-product.jpg',
  gallery: ['/img/products/new-product.jpg'],
  summary: 'One or two sentences shown on the card and at the top of the page.',
  highlights: ['Short', 'Badge', 'Labels'],
  sections: [{ title: 'Features', items: ['Bullet one.', 'Bullet two.'] }],
  specs: [{ label: 'Weight', value: '300 g' }],
  table: { title: 'Model comparison', columns: ['', 'A', 'B'], rows: [['Range', '1', '2']] },
  compliance: ['ASTM A1038'],
  warranty: '3 years*',
}
```

Product photographs live in `public/img/products/`. Shoot or crop them on a white background —
cards and galleries render images with `mix-blend-multiply` on a warm grey tile, so a white
backdrop drops away cleanly. Keep them under ~1200 px on the long edge.

### Brand assets

`public/img/brand/` holds the logo lockup (`logo-alloymetrix.png`, used in the footer), a
header variant with the strapline cropped off (`logo-header.png`) and the AM monogram
(`mark-am.png`). Colours in `src/index.css` are sampled from the logo: forest green `#0b3b1e`,
brick red `#8a1608`, brass `#a97c22`.

## Enquiry form

The form on `/contact` posts to **Netlify Forms** — no backend, no third-party service.
Submissions appear in the Netlify dashboard under *Forms → enquiry*, and Netlify can email
them onward (*Forms → Settings → Form notifications*).

Netlify detects the form from the static copy in `index.html`; the React form posts the same
field names. If a field is added to `src/pages/Contact.jsx`, add it to that hidden form too or
it will be dropped silently.

## Branch → environment mapping

| Branch | Netlify context | URL                       | Indexed by Google |
| ------ | --------------- | ------------------------- | ----------------- |
| `dev`  | branch deploy   | https://dev.alloymetrix.in | No (`noindex`)   |
| `main` | production      | https://alloymetrix.in     | Yes              |

Workflow: feature branch → PR into `dev` → client reviews on `dev.alloymetrix.in` → merge
`dev` into `main` → live on production.

`npm run seo:noindex` runs automatically on every non-production deploy (see
`scripts/noindex.mjs`) and rewrites `dist/robots.txt` and `dist/_headers` so the dev site can
never be indexed. `scripts/sitemap.mjs` regenerates `dist/sitemap.xml` from the catalogue on
every build, so new products are listed without anyone maintaining the file.

## DNS

DNS stays on GoDaddy's nameservers (`ns35`/`ns36.domaincontrol.com`) so the existing GoDaddy
mail records — MX, SPF, DKIM, DMARC and the autodiscover SRV — keep working untouched. Do
**not** point the domain at Netlify's `dns*.p07.nsone.net` nameservers; that would blank the
zone and break mail. Only three records point at Netlify:

| Type  | Name  | Value                            |
| ----- | ----- | -------------------------------- |
| A     | `@`   | `75.2.60.5`                      |
| CNAME | `www` | `<site-name>.netlify.app`        |
| CNAME | `dev` | `dev--<site-name>.netlify.app`   |

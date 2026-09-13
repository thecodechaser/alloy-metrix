# AlloyMetrix — Website

Coming-soon / under-development page for **allowmetrix.in**.

Built with **React 19 + Vite 7 + Tailwind CSS v4**, deployed on **Netlify**.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the built output locally
```

All page copy (brand name, tagline, email, phone, location) lives in
[`src/site.js`](src/site.js) — edit that file, nothing else, to change wording.
Leave `phone` as an empty string to hide the phone button.

## Branch → environment mapping

| Branch | Netlify context  | URL                    | Indexed by Google |
| ------ | ---------------- | ---------------------- | ----------------- |
| `dev`  | branch deploy    | https://dev.allowmetrix.in | No (`noindex`) |
| `main` | production       | https://allowmetrix.in | Yes               |

Workflow: merge work into `dev` → client reviews on `dev.allowmetrix.in` →
merge `dev` into `main` → live on production.

`npm run seo:noindex` runs automatically on every non-production deploy
(see `scripts/noindex.mjs`) and rewrites `dist/robots.txt` + `dist/_headers`
so the dev site can never be indexed.

## One-time Netlify setup

1. **Create the site** — Netlify → *Add new site* → *Import an existing project*
   → pick the `alloy-metrix` repo. Build settings are read from `netlify.toml`
   (build command `npm run build`, publish directory `dist`).
2. **Production branch** — *Site configuration → Build & deploy → Branches and
   deploy contexts* → set the production branch to `main`.
3. **Branch deploys** — in the same screen, choose *Let me add individual
   branches* and add `dev`.
4. **Domains** — *Domain management → Add a domain*:
   - `allowmetrix.in` (plus the `www` alias, redirecting to the apex) → production.
   - *Add a branch subdomain* → branch `dev`, subdomain `dev.allowmetrix.in`.
5. **DNS** — at the registrar for `allowmetrix.in`, either delegate the domain to
   Netlify DNS (recommended, gives automatic certificates for both names), or
   point records manually:
   - `@` → `A 75.2.60.5` (Netlify load balancer)
   - `www` → `CNAME <site-name>.netlify.app`
   - `dev` → `CNAME dev--<site-name>.netlify.app`
6. **HTTPS** — *Domain management → HTTPS* → *Verify DNS configuration* →
   *Provision certificate*. Do this after DNS has propagated so the certificate
   covers the apex, `www` and `dev`.

Every push to `dev` or `main` then redeploys automatically.

## Replacing the coming-soon page later

The real site can be built inside this same project: keep `netlify.toml` and the
branch flow as-is, and replace `src/App.jsx` with the full site (add a router if
needed — the SPA fallback redirect is already in place).

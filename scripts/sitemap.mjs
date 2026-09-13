// Generates dist/sitemap.xml from the product catalogue after every build.
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { products } from '../src/data/products.js'
import { company, divisions } from '../src/data/company.js'

const origin = `https://${company.domain}`

const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'monthly' },
  ...divisions.map((d) => ({ path: `/products?division=${d.id}`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/about', priority: '0.6', changefreq: 'yearly' },
  { path: '/contact', priority: '0.7', changefreq: 'yearly' },
  ...products.map((p) => ({ path: `/product/${p.slug}`, priority: '0.7', changefreq: 'monthly' })),
]

const body = routes
  .map(
    ({ path, priority, changefreq }) =>
      `  <url>\n    <loc>${origin}${path.replace(/&/g, '&amp;')}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(resolve(process.cwd(), 'dist', 'sitemap.xml'), xml, 'utf8')
console.log(`[sitemap] ${routes.length} URLs written to dist/sitemap.xml`)

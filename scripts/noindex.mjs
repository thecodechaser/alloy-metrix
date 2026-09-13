// Marks a non-production deploy (dev.alloymetrix.in, previews) as noindex so
// the unfinished site never shows up in search results.
// Runs after `vite build`, rewriting artefacts inside dist/.
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')

writeFileSync(
  resolve(dist, 'robots.txt'),
  'User-agent: *\nDisallow: /\n',
  'utf8',
)

writeFileSync(
  resolve(dist, '_headers'),
  '/*\n  X-Robots-Tag: noindex, nofollow\n',
  'utf8',
)

console.log('[seo:noindex] dist/robots.txt and dist/_headers set to noindex')

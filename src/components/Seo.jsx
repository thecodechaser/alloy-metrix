import { useEffect } from 'react'
import { company } from '../data/company.js'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? []
    if (key) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Sets the document title, description and canonical URL for each route. */
export default function Seo({ title, description, path }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${company.name}` : `${company.name} — ${company.strapline}`
    document.title = fullTitle

    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    setMeta('meta[property="og:title"]', 'content', fullTitle)

    const url = `https://${company.domain}${path ?? window.location.pathname}`
    setMeta('meta[property="og:url"]', 'content', url)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, path])

  return null
}

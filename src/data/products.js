import { analyticalProducts } from './products.analytical.js'
import { agroProducts } from './products.agro.js'
import { categories } from './company.js'

export const products = [
  ...analyticalProducts.map((p) => ({ ...p, division: 'analytical' })),
  ...agroProducts.map((p) => ({ ...p, division: 'agro' })),
]

export const getProduct = (slug) => products.find((p) => p.slug === slug)

export const categoryName = (id) => categories.find((c) => c.id === id)?.name ?? id

export const productsInDivision = (division) => products.filter((p) => p.division === division)

export const productsInCategory = (id) => products.filter((p) => p.category === id)

export const categoriesInDivision = (division) =>
  categories
    .filter((c) => c.division === division)
    .map((c) => ({ ...c, products: productsInCategory(c.id) }))
    .filter((c) => c.products.length > 0)

// Shown on the home page.
export const featuredSlugs = [
  'yokelite',
  'xrf-x-200-alloy',
  'hardness-metatip',
  'ridger-with-khad-box',
  'denslite',
  'disc-harrow',
]

export const featuredProducts = featuredSlugs.map(getProduct).filter(Boolean)

export const relatedProducts = (product, limit = 3) =>
  products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => {
      const score = (p) => (p.category === product.category ? 0 : p.division === product.division ? 1 : 2)
      return score(a) - score(b)
    })
    .slice(0, limit)

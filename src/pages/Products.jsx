import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Eyebrow } from '../components/ui.jsx'
import { categories, divisions } from '../data/company.js'
import { products } from '../data/products.js'

const divisionTabs = [{ id: 'all', name: 'All products' }, ...divisions.map((d) => ({ id: d.id, name: d.name }))]

export default function Products() {
  const [params, setParams] = useSearchParams()
  const division = params.get('division') ?? 'all'
  const category = params.get('category') ?? 'all'

  const visibleCategories = useMemo(
    () => categories.filter((c) => division === 'all' || c.division === division),
    [division],
  )

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (division === 'all' || p.division === division) &&
          (category === 'all' || p.category === category),
      ),
    [division, category],
  )

  const activeDivision = divisions.find((d) => d.id === division)
  const title = activeDivision ? activeDivision.name : 'All products'

  const setFilter = (next) => {
    const draft = new URLSearchParams(params)
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === 'all') draft.delete(key)
      else draft.set(key, value)
    })
    setParams(draft, { replace: true })
  }

  return (
    <>
      <Seo
        title={title}
        description={
          activeDivision?.description ??
          'The full Alloy Metrix catalogue — NDT and analytical instruments, consumables, accessories and agricultural implements.'
        }
      />

      <section className="border-b border-line bg-paper">
        <div className="wrap py-14 md:py-16">
          <Eyebrow>Catalogue</Eyebrow>
          <h1 className="display mt-5 text-[2.1rem] leading-tight sm:text-[2.6rem]">{title}</h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-500">
            {activeDivision?.description ??
              'Inspection and measurement equipment for industry, and tractor implements for Indian agriculture. Every product on this site is available to quote.'}
          </p>
        </div>
      </section>

      <section className="wrap py-10">
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-5">
          {divisionTabs.map((tab) => {
            const active = division === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter({ division: tab.id, category: 'all' })}
                className={[
                  'border px-4 py-2 text-sm transition-colors',
                  active
                    ? 'border-forest-800 bg-forest-800 text-white'
                    : 'border-line-strong text-ink-700 hover:border-forest-800 hover:text-forest-800',
                ].join(' ')}
              >
                {tab.name}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-5">
          <span className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-300">Category</span>
          <button
            type="button"
            onClick={() => setFilter({ category: 'all' })}
            className={[
              'text-sm transition-colors',
              category === 'all' ? 'text-brick-700 underline underline-offset-4' : 'text-ink-500 hover:text-forest-800',
            ].join(' ')}
          >
            All
          </button>
          {visibleCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter({ division: c.division, category: c.id })}
              className={[
                'text-sm transition-colors',
                category === c.id ? 'text-brick-700 underline underline-offset-4' : 'text-ink-500 hover:text-forest-800',
              ].join(' ')}
            >
              {c.name}
            </button>
          ))}
        </div>

        <p className="pb-8 text-[0.8rem] text-ink-300">
          {list.length} {list.length === 1 ? 'product' : 'products'}
        </p>

        {list.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="border border-line bg-paper p-10 text-center">
            <p className="text-ink-500">No products match this filter.</p>
            <button
              type="button"
              onClick={() => setFilter({ division: 'all', category: 'all' })}
              className="mt-4 text-sm text-forest-800 underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}

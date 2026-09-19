import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { Tag } from '../components/ui.jsx'
import { company } from '../data/company.js'
import { categoryName, getProduct, relatedProducts } from '../data/products.js'
import { useEnquiryLinks } from '../lib/visitor.jsx'

function SpecTable({ specs }) {
  return (
    <div className="overflow-hidden border border-line">
      <table className="w-full border-collapse text-left text-sm">
        <tbody>
          {specs.map((row, i) => (
            <tr key={row.label} className={i % 2 ? 'bg-paper' : 'bg-white'}>
              <th scope="row" className="w-2/5 border-b border-line px-5 py-3.5 align-top font-medium text-ink-900">
                {row.label}
              </th>
              <td className="border-b border-line px-5 py-3.5 align-top leading-relaxed text-ink-500">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ComparisonTable({ table }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
        <thead>
          <tr>
            {table.columns.map((col, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-line-strong bg-paper px-4 py-3 align-bottom text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-forest-800"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={[
                    'border-b border-line px-4 py-3 align-top leading-relaxed',
                    ci === 0 ? 'font-medium text-ink-900' : 'text-ink-500',
                  ].join(' ')}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [active, setActive] = useState(0)
  const enquiry = useEnquiryLinks({
    product: product?.name ?? '',
    category: product ? categoryName(product.category) : '',
  })

  if (!product) return <Navigate to="/products" replace />

  const gallery = product.gallery?.length ? product.gallery : [product.image]
  const image = gallery[Math.min(active, gallery.length - 1)]
  const related = relatedProducts(product)

  return (
    <>
      <Seo
        title={product.name}
        description={product.summary}
        path={`/product/${product.slug}`}
      />

      <div className="wrap pt-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.8rem] text-ink-300">
          <Link to="/" className="hover:text-forest-800">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/products?division=${product.division}`} className="hover:text-forest-800">
            {product.division === 'agro' ? 'Agricultural' : 'Analytical & NDT'}
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            to={`/products?division=${product.division}&category=${product.category}`}
            className="hover:text-forest-800"
          >
            {categoryName(product.category)}
          </Link>
        </nav>
      </div>

      <section className="wrap grid gap-12 py-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <div className="aspect-4/3 border border-line bg-paper-2 p-8">
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-contain mix-blend-multiply"
            />
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1} of ${product.name}`}
                  aria-current={i === active}
                  className={[
                    'h-20 w-20 border bg-paper-2 p-2 transition-colors',
                    i === active ? 'border-forest-800' : 'border-line hover:border-line-strong',
                  ].join(' ')}
                >
                  <img src={src} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6">
          <p className="eyebrow">{categoryName(product.category)}</p>
          <h1 className="display mt-5 text-[2rem] leading-tight sm:text-[2.4rem]">{product.name}</h1>
          {product.brand && (
            <p className="mt-3 text-sm text-ink-300">
              Supplied by Alloy Metrix · {product.brand}
            </p>
          )}
          <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-700">{product.summary}</p>

          {product.highlights && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {product.highlights.map((h) => (
                <li key={h}>
                  <Tag>{h}</Tag>
                </li>
              ))}
            </ul>
          )}

          {(product.compliance || product.warranty) && (
            <dl className="mt-8 grid gap-5 border-y border-line py-6 sm:grid-cols-2">
              {product.compliance && (
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-300">Compliance</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-700">
                    {product.compliance.join(' · ')}
                  </dd>
                </div>
              )}
              {product.warranty && (
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-300">Warranty</dt>
                  <dd className="mt-2 text-sm text-ink-700">{product.warranty}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={enquiry.mailto(company.email)} className="btn btn-primary">
              Request a quote
            </a>
            <a
              href={enquiry.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              Message on WhatsApp
            </a>
          </div>
          {product.warranty && (
            <p className="mt-4 text-[0.75rem] text-ink-300">
              * One year standard warranty for international purchases.
            </p>
          )}
        </div>
      </section>

      {(product.sections?.length || product.specs || product.table) && (
        <section className="wrap grid gap-14 border-t border-line py-16 lg:grid-cols-12 lg:gap-16">
          {product.sections?.length > 0 && (
            <div className="grid min-w-0 content-start gap-12 lg:col-span-7">
              {product.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="display text-[1.3rem]">{section.title}</h2>
                  <ul className="prose-list mt-5 text-[0.95rem]">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {product.specs && (
            <div className={`min-w-0 ${product.sections?.length ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
              <h2 className="display text-[1.3rem]">Specifications</h2>
              <div className="mt-5">
                <SpecTable specs={product.specs} />
              </div>
            </div>
          )}

          {product.table && (
            <div className="min-w-0 lg:col-span-12">
              <h2 className="display text-[1.3rem]">{product.table.title}</h2>
              <div className="mt-5">
                <ComparisonTable table={product.table} />
              </div>
            </div>
          )}
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line bg-paper">
          <div className="wrap py-16">
            <h2 className="display text-[1.4rem]">Related equipment</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

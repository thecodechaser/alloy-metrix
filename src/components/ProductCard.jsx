import { Link } from 'react-router-dom'
import { categoryName } from '../data/products.js'

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col border border-line bg-white transition-colors hover:border-line-strong"
    >
      <div className="aspect-4/3 overflow-hidden bg-paper-2 p-6">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-line p-5">
        <p className="text-[0.68rem] uppercase tracking-[0.14em] text-brick-700">
          {categoryName(product.category)}
        </p>
        <h3 className="display mt-2 text-[1.05rem] leading-snug">{product.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-500">{product.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 pt-1 text-[0.8rem] font-medium text-forest-800">
          View details
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
            <path d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

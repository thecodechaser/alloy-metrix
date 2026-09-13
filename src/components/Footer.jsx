import { Link } from 'react-router-dom'
import { company, divisions } from '../data/company.js'
import { categoriesInDivision } from '../data/products.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-paper">
      <div className="wrap grid gap-12 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <img
            src="/img/brand/logo-alloymetrix.png"
            alt={company.name}
            width="720"
            height="480"
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-500">
            Analytical, non-destructive testing and agricultural equipment supplied across India —
            with certification, technical guidance and after-sales support.
          </p>
        </div>

        {divisions.map((division) => (
          <div key={division.id} className="md:col-span-3">
            <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest-800">
              {division.name}
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {categoriesInDivision(division.id).map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?division=${division.id}&category=${category.id}`}
                    className="text-sm text-ink-500 transition-colors hover:text-forest-800"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest-800">
            Contact
          </h2>
          <ul className="mt-4 grid gap-2.5 text-sm text-ink-500">
            <li>
              <a href={`tel:${company.phoneHref}`} className="transition-colors hover:text-forest-800">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="break-all transition-colors hover:text-forest-800">
                {company.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.salesEmail}`} className="break-all transition-colors hover:text-forest-800">
                {company.salesEmail}
              </a>
            </li>
            <li className="leading-relaxed">
              {company.address.line1}
              <br />
              {company.address.line2}
            </li>
            <li>
              <Link to="/contact" className="text-forest-800 underline underline-offset-4">
                Send an enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>{company.strapline}</p>
        </div>
      </div>
    </footer>
  )
}

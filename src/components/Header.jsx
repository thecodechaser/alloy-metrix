import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company } from '../data/company.js'
import { useEnquiryLinks } from '../lib/visitor.jsx'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/products?division=analytical', label: 'Analytical & NDT', match: 'analytical' },
  { to: '/products?division=agro', label: 'Agricultural', match: 'agro' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function linkClass({ isActive }) {
  return [
    'relative py-2 text-[0.9rem] transition-colors',
    isActive ? 'text-forest-800' : 'text-ink-700 hover:text-forest-800',
  ].join(' ')
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const enquiry = useEnquiryLinks()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.search])

  const division = new URLSearchParams(location.search).get('division')
  const isNavActive = (item) => {
    if (item.match) return location.pathname.startsWith('/products') && division === item.match
    if (item.end) return location.pathname === '/'
    return location.pathname.startsWith(item.to)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="bg-forest-900 text-white">
        <div className="wrap flex items-center justify-between gap-4 py-2 text-[0.72rem] tracking-wide">
          <div className="flex items-center gap-4 md:gap-6">
            <a href={`tel:${company.phoneHref}`} className="hover:text-brass-400">
              {company.phone}
            </a>
            <a href={enquiry.mailto(company.email)} className="hover:text-brass-400">
              {company.email}
            </a>
          </div>
          {/* Too long to sit beside the contacts on a phone. */}
          <p className="hidden text-white/70 md:block">
            Authorised sales &amp; distribution partner — Kisan King Agro Implements
          </p>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="wrap flex items-center justify-between gap-6 py-3.5">
          <Link to="/" className="flex shrink-0 items-center" aria-label={`${company.name} — home`}>
            <img
              src="/img/brand/logo-header.png"
              alt={`${company.name} — Analytical & Agro Solution`}
              width="672"
              height="378"
              className="h-12 w-auto sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={() => linkClass({ isActive: isNavActive(item) })}
              >
                {item.label}
                {isNavActive(item) && (
                  <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-brick-700" />
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn btn-primary hidden sm:inline-flex">
              Request a quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center border border-line-strong lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
                {open ? (
                  <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-line bg-white lg:hidden">
          <nav className="wrap flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="border-b border-line py-3.5 text-[0.95rem] text-ink-700 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 py-4 sm:hidden">
              <a href={`tel:${company.phoneHref}`} className="btn btn-primary">
                Call {company.phone}
              </a>
              <Link to="/contact" className="btn btn-ghost">
                Request a quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { categories } from '../data/company.js'
import { hasVisitorDetails } from '../lib/enquiry.js'
import { useVisitor } from '../lib/visitor.jsx'

const DELAY_MS = 8000

const field =
  'mt-1.5 w-full border border-line-strong bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-forest-800'
const label = 'text-[0.68rem] uppercase tracking-[0.14em] text-ink-500'

export default function EnquiryBanner() {
  const { visitor, saveVisitor, dismissed, dismiss } = useVisitor()
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const firstField = useRef(null)
  const { pathname } = useLocation()

  // Not on the contact page — the form there already asks for the same details.
  const skip = dismissed || hasVisitorDetails(visitor) || pathname === '/contact'

  useEffect(() => {
    if (skip) return undefined
    const timer = setTimeout(() => setOpen(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [skip])

  useEffect(() => {
    if (open) firstField.current?.focus()
  }, [open])

  if (skip || !open) return null

  const onSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    saveVisitor({
      name: (data.get('name') ?? '').toString().trim(),
      company: (data.get('company') ?? '').toString().trim(),
      phone: (data.get('phone') ?? '').toString().trim(),
      category: (data.get('category') ?? '').toString().trim(),
    })
    setSaved(true)
    setTimeout(() => setOpen(false), 1600)
  }

  return (
    <div
      role="dialog"
      aria-label="Save your details for enquiries"
      className="fixed inset-x-4 bottom-4 z-50 border border-line bg-white shadow-lg sm:left-auto sm:right-6 sm:w-[21rem]"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        className="absolute right-2 top-2 grid h-8 w-8 place-items-center text-ink-300 transition-colors hover:text-ink-900"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {saved ? (
        <div className="px-5 py-6">
          <p className="display text-[1rem]">Saved — thank you.</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Your details will be filled in whenever you email or message us on WhatsApp.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="px-5 py-6">
          <p className="display pr-6 text-[1rem]">Save time on your enquiry</p>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-500">
            Tell us who you are once and every email or WhatsApp message will come pre-filled.
          </p>

          <div className="mt-4 grid gap-3">
            <div>
              <label className={label} htmlFor="banner-name">Name</label>
              <input id="banner-name" name="name" ref={firstField} className={field} defaultValue={visitor.name} />
            </div>
            <div>
              <label className={label} htmlFor="banner-company">Company</label>
              <input id="banner-company" name="company" className={field} defaultValue={visitor.company} />
            </div>
            <div>
              <label className={label} htmlFor="banner-phone">Phone</label>
              <input id="banner-phone" name="phone" type="tel" className={field} defaultValue={visitor.phone} placeholder="+91" />
            </div>
            <div>
              <label className={label} htmlFor="banner-category">Category of interest</label>
              <select id="banner-category" name="category" className={field} defaultValue={visitor.category}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <button type="submit" className="btn btn-primary">
              Save details
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="text-[0.82rem] text-ink-500 underline underline-offset-4 hover:text-forest-800"
            >
              Not now
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

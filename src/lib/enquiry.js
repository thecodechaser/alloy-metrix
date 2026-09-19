// One enquiry template shared by every email and WhatsApp link on the site.
// Whatever the visitor has told us is filled in; the rest is left blank for them.
import { company } from '../data/company.js'

const STORE_KEY = 'alloymetrix:visitor'
const DISMISS_KEY = 'alloymetrix:visitor-dismissed'

export const emptyVisitor = { name: '', company: '', phone: '', category: '' }

export function readVisitor() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY)
    return raw ? { ...emptyVisitor, ...JSON.parse(raw) } : { ...emptyVisitor }
  } catch {
    return { ...emptyVisitor }
  }
}

export function writeVisitor(visitor) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(visitor))
  } catch {
    // Private browsing or storage disabled — the template simply stays blank.
  }
}

export function hasVisitorDetails(visitor) {
  return Boolean(visitor && (visitor.name || visitor.company || visitor.phone))
}

export function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

export function writeDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, '1')
  } catch {
    // Ignored — the prompt will just appear again on the next visit.
  }
}

// context: { product, category } — whatever the current page already knows.
export function enquiryBody(visitor = emptyVisitor, context = {}) {
  return [
    `Name: ${visitor.name || ''}`,
    `Company: ${visitor.company || ''}`,
    `Phone: ${visitor.phone || ''}`,
    `Category: ${context.category || visitor.category || ''}`,
    `Requirements/specifications: ${context.product || ''}`,
  ].join('\n')
}

export function enquirySubject(context = {}) {
  return context.product ? `Quote request — ${context.product}` : `Enquiry — ${company.name}`
}

export function mailtoHref(address, visitor, context = {}) {
  const subject = encodeURIComponent(enquirySubject(context))
  const body = encodeURIComponent(enquiryBody(visitor, context))
  return `mailto:${address}?subject=${subject}&body=${body}`
}

export function whatsappHref(visitor, context = {}) {
  const text = `${enquirySubject(context)}\n\n${enquiryBody(visitor, context)}`
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`
}

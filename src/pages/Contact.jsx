import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { Eyebrow } from '../components/ui.jsx'
import { company, enquiryTypes } from '../data/company.js'

const field =
  'mt-2 w-full border border-line-strong bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-forest-800'
const label = 'text-[0.72rem] uppercase tracking-[0.14em] text-ink-500'

export default function Contact() {
  const [params] = useSearchParams()
  const product = params.get('product') ?? ''
  const [status, setStatus] = useState('idle')

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    const data = new FormData(event.target)
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('sent')
      event.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact Alloy Metrix for quotations, technical details, dealership enquiries and bulk orders. Call ${company.phone} or email ${company.email}.`}
        path="/contact"
      />

      <section className="border-b border-line bg-paper">
        <div className="wrap py-14 md:py-16">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="display mt-5 text-[2.1rem] leading-tight sm:text-[2.6rem]">
            Tell us what you need
          </h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-500">
            Quotations, technical details, demonstrations, dealership opportunities and bulk
            requirements — send the detail and we will come back with specifics.
          </p>
        </div>
      </section>

      <section className="wrap grid gap-14 py-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="display text-[1.3rem]">Direct lines</h2>
          <dl className="mt-6 grid gap-px border border-line bg-line">
            <div className="bg-white p-6">
              <dt className={label}>Phone &amp; WhatsApp</dt>
              <dd className="mt-2">
                <a href={`tel:${company.phoneHref}`} className="text-[1.05rem] text-forest-800">
                  {company.phone}
                </a>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm text-ink-500 underline underline-offset-4 hover:text-forest-800"
                >
                  Message on WhatsApp
                </a>
              </dd>
            </div>
            <div className="bg-white p-6">
              <dt className={label}>Email</dt>
              <dd className="mt-3 grid gap-3">
                {company.mailboxes.map((mailbox) => (
                  <div key={mailbox.address}>
                    <p className="text-[0.78rem] text-ink-300">{mailbox.label}</p>
                    <a
                      href={`mailto:${mailbox.address}`}
                      className="break-all text-[0.98rem] text-forest-800 hover:underline hover:underline-offset-4"
                    >
                      {mailbox.address}
                    </a>
                  </div>
                ))}
              </dd>
            </div>
            <div className="bg-white p-6">
              <dt className={label}>Address</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink-700">
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.country}
              </dd>
            </div>
            <div className="bg-white p-6">
              <dt className={label}>Business hours</dt>
              <dd className="mt-2 text-[0.95rem] text-ink-700">{company.hours}</dd>
            </div>
          </dl>

          <h2 className="display mt-12 text-[1.3rem]">We handle</h2>
          <ul className="prose-list mt-5 text-[0.95rem]">
            {enquiryTypes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-line p-7 sm:p-9">
            <h2 className="display text-[1.3rem]">Send an enquiry</h2>
            <p className="mt-2 text-sm text-ink-500">
              Fields marked with an asterisk are required.
            </p>

            {status === 'sent' ? (
              <div className="mt-8 border border-forest-800/20 bg-forest-50 p-6">
                <p className="font-serif text-[1.15rem] text-forest-900">Thank you — enquiry received.</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  We will reply to you shortly. For anything urgent, call {company.phone}.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm text-forest-800 underline underline-offset-4"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                name="enquiry"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="mt-7 grid gap-5"
              >
                <input type="hidden" name="form-name" value="enquiry" />
                <p className="hidden">
                  <label>
                    Leave this field empty
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="name">Name *</label>
                    <input id="name" name="name" required className={field} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={label} htmlFor="organisation">Company / farm</label>
                    <input id="organisation" name="organisation" className={field} placeholder="Optional" />
                  </div>
                  <div>
                    <label className={label} htmlFor="phone">Phone *</label>
                    <input id="phone" name="phone" type="tel" required className={field} placeholder="+91" />
                  </div>
                  <div>
                    <label className={label} htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" className={field} placeholder="Optional" />
                  </div>
                </div>

                <div>
                  <label className={label} htmlFor="type">Enquiry type</label>
                  <select id="type" name="type" className={field} defaultValue={enquiryTypes[0]}>
                    {enquiryTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={label} htmlFor="product">Product of interest</label>
                  <input
                    id="product"
                    name="product"
                    className={field}
                    defaultValue={product}
                    placeholder="e.g. YokeLite, Disc Harrow"
                  />
                </div>

                <div>
                  <label className={label} htmlFor="message">Requirement *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={field}
                    placeholder="Quantity, specification, application, delivery location"
                  />
                </div>

                {status === 'error' && (
                  <p className="border border-brick-700/25 bg-brick-50 px-4 py-3 text-sm text-brick-800">
                    The form could not be submitted. Please email{' '}
                    <a href={`mailto:${company.salesEmail}`} className="underline underline-offset-4">
                      {company.salesEmail}
                    </a>{' '}
                    or call {company.phone}.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                  </button>
                  <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    WhatsApp instead
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

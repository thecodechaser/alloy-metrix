import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { ArrowLink, Eyebrow, SectionHead } from '../components/ui.jsx'
import { company, divisions, partners } from '../data/company.js'
import { categoriesInDivision, featuredProducts } from '../data/products.js'

const assurances = [
  {
    title: 'Standards, not claims',
    body: 'Instruments supplied against ASTM, ASME and ISO requirements, with NABL-traceable test and calibration certificates in the box.',
  },
  {
    title: 'Two divisions, one partner',
    body: 'Inspection equipment for industry and implements for the field — sourced, supplied and supported by the same team.',
  },
  {
    title: 'Guidance before the sale',
    body: 'Product selection, demonstrations, technical details and quotations — so the equipment that arrives is the equipment the job needs.',
  },
  {
    title: 'Supply across India',
    body: 'Dealers, distributors, farmers, institutional buyers and OEMs — with after-sales coordination and service support.',
  },
]

export default function Home() {
  return (
    <>
      <Seo
        title={null}
        description="Alloy Metrix supplies non-destructive testing instruments, alloy analysers and Kisan King Agro agricultural implements across India — with certification, technical guidance and after-sales support."
        path="/"
      />

      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="animate-fade-up lg:col-span-6">
            <Eyebrow>Analytical &amp; Agro Solution</Eyebrow>
            <h1 className="display mt-6 text-[2.4rem] leading-[1.08] sm:text-[3rem] lg:text-[3.4rem]">
              Analytical precision.
              <br />
              Agricultural progress.
            </h1>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-ink-500">
              Alloy Metrix supplies non-destructive testing instruments, handheld alloy analysers and
              tractor implements across India — equipment that has to be right the first time, backed
              by certification and people who know how it is used.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/products?division=analytical" className="btn btn-primary">
                Analytical &amp; NDT instruments
              </Link>
              <Link to="/products?division=agro" className="btn btn-ghost">
                Agricultural implements
              </Link>
            </div>
          </div>

          <div className="animate-fade-up lg:col-span-6">
            <div className="relative">
              <img
                src="/img/products/hardness-metatip-field.jpg"
                alt="Hardness testing on a pipe in the field"
                width="1200"
                height="490"
                className="w-full object-cover"
              />
              <div className="grid grid-cols-3 border border-t-0 border-line">
                {[
                  { k: '28+', v: 'Products' },
                  { k: '1985', v: 'Kisan King since' },
                  { k: 'NABL', v: 'Traceable certs' },
                ].map((item) => (
                  <div key={item.v} className="border-r border-line px-4 py-4 last:border-r-0">
                    <p className="display text-lg">{item.k}</p>
                    <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.12em] text-ink-300">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="wrap py-20">
        <SectionHead
          eyebrow="What we supply"
          title="Two catalogues, one supplier"
          intro="Inspection and measurement equipment for industry, and field-proven implements for Indian agriculture."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {divisions.map((division) => (
            <article key={division.id} className="group flex flex-col border border-line">
              <div className="aspect-16/10 overflow-hidden bg-paper-2 p-8">
                <img
                  src={division.image}
                  alt={division.name}
                  loading="lazy"
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-line p-7">
                <h3 className="display text-[1.35rem]">{division.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{division.description}</p>
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.8rem] text-ink-300">
                  {categoriesInDivision(division.id).map((category) => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
                <ArrowLink to={`/products?division=${division.id}`} className="mt-7">
                  Browse the range
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-line bg-paper">
        <div className="wrap py-20">
          <SectionHead
            eyebrow="Selected equipment"
            title="Frequently specified"
            action={<ArrowLink to="/products">See all products</ArrowLink>}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Assurances */}
      <section className="wrap py-20">
        <SectionHead
          eyebrow="Why Alloy Metrix"
          title="Equipment is the easy part"
          intro="What decides a purchase is the certificate that comes with it, the advice before it and the support after it."
        />
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          {assurances.map((item) => (
            <div key={item.title} className="bg-white p-8">
              <h3 className="display text-[1.1rem]">{item.title}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-ink-500">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-line">
        <div className="wrap py-14">
          <p className="text-center text-[0.72rem] uppercase tracking-[0.18em] text-ink-300">
            Supplying equipment from
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner.name} className="text-center">
                <p className="display text-[1.15rem]">{partner.name}</p>
                <p className="mt-1 text-[0.8rem] text-ink-300">{partner.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest-900 text-white">
        <div className="wrap flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-serif text-[1.7rem] leading-tight font-semibold sm:text-[2rem]">
              Tell us what you need to measure, test or till.
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">
              Quotations, technical details, demonstrations and dealership enquiries — we reply to all
              of them.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn bg-white text-forest-900 hover:bg-paper-2">
              Send an enquiry
            </Link>
            <a
              href={`tel:${company.phoneHref}`}
              className="btn border border-white/25 text-white hover:border-white/60"
            >
              {company.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { Eyebrow, SectionHead } from '../components/ui.jsx'
import { company, divisions, partners } from '../data/company.js'

const audiences = [
  'Dealers & distributors',
  'Farmers & agricultural businesses',
  'Fabricators & inspection agencies',
  'Institutional & bulk buyers',
  'OEMs',
  'Service & calibration customers',
]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Alloy Metrix — Analytical & Agro Solution. Supplier of NDT and analytical instruments and authorised sales & distribution partner of Kisan King Agro Implements."
        path="/about"
      />

      <section className="border-b border-line bg-paper">
        <div className="wrap py-14 md:py-16">
          <Eyebrow>About us</Eyebrow>
          <h1 className="display mt-5 max-w-3xl text-[2.1rem] leading-tight sm:text-[2.7rem]">
            Two kinds of precision, supplied by one team
          </h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-500">
            {company.legalName} supplies measurement and inspection equipment to industry, and
            tractor implements to Indian agriculture — the same standard of sourcing, guidance and
            support behind both.
          </p>
        </div>
      </section>

      <section className="wrap grid gap-12 py-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="grid gap-5 text-[0.98rem] leading-relaxed text-ink-700">
            <p>
              Our analytical division supplies non-destructive testing equipment — magnetic particle
              yokes and benches, radiographic film viewers and densitometers, portable hardness
              testers, ultrasonic probes and blocks, handheld XRF alloy analysers, light meters,
              consumables and accessories. Instruments are supplied against the ASTM, ASME and ISO
              requirements they are bought for, with NABL-traceable test and calibration certificates.
            </p>
            <p>
              Our agro division serves farmers, dealers, distributors and agricultural businesses
              across India as authorised sales &amp; distribution partner of Kisan King Agro
              Implements. With over four decades of manufacturing experience since 1985, Kisan King
              has built expertise across a wide range of implements — ridgers, disc harrows,
              cultivators, ploughs, tillers, levellers, bund makers and subsoilers.
            </p>
            <p>
              Customised implements can be developed according to specific customer, crop, soil,
              tractor and application requirements. Through this association we provide access to
              reliable machinery along with professional sales support, product guidance, quotations,
              technical assistance and after-sales coordination.
            </p>
          </div>

          <div className="mt-10 border-l-2 border-brass-600 pl-6">
            <p className="font-serif text-[1.2rem] leading-snug text-forest-900">
              Our objective is to build long-term business relationships — quality products,
              competitive pricing, dependable support and professional service.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <img
            src="/img/brand/team.jpg"
            alt="The Alloy Metrix team on site"
            loading="lazy"
            className="w-full border border-line object-cover"
          />
          <dl className="mt-6 grid gap-px border border-line bg-line">
            {[
              ['Established partner', 'Kisan King Agro Implements, manufacturing since 1985'],
              ['Coverage', 'Supply and support across India'],
              ['Based at', `${company.address.line1}, ${company.address.line2}`],
            ].map(([term, value]) => (
              <div key={term} className="bg-white p-5">
                <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-300">{term}</dt>
                <dd className="mt-1.5 text-sm text-ink-700">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap py-16">
          <SectionHead eyebrow="Our divisions" title="What each division covers" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {divisions.map((division) => (
              <div key={division.id} className="border border-line bg-white p-8">
                <h3 className="display text-[1.25rem]">{division.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{division.description}</p>
                <Link
                  to={`/products?division=${division.id}`}
                  className="mt-6 inline-block text-sm font-medium text-forest-800 underline underline-offset-4"
                >
                  View the catalogue
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Who we work with" title="Let's grow together" />
            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-500">
              Whether you are looking for inspection equipment, implements for your farm, dealership
              opportunities, bulk requirements or a customised solution — we are ready to assist
              across India.
            </p>
            <Link to="/contact" className="btn btn-primary mt-8">
              Start an enquiry
            </Link>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {audiences.map((item) => (
                <li key={item} className="bg-white px-6 py-5 text-[0.95rem] text-ink-700">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-300">Brands we supply</p>
              <p className="mt-3 text-[0.95rem] text-ink-700">
                {partners.map((p) => p.name).join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

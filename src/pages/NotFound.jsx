import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { Eyebrow } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." />
      <section className="wrap py-24 text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="display mt-5 text-[2rem] sm:text-[2.5rem]">This page does not exist</h1>
        <p className="mx-auto mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink-500">
          The link may be out of date. Browse the catalogue or get in touch and we will point you to
          the right product.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/products" className="btn btn-primary">View all products</Link>
          <Link to="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
      </section>
    </>
  )
}

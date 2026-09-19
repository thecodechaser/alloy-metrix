import { Link } from 'react-router-dom'

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

export function SectionHead({ eyebrow, title, intro, action, className = '' }) {
  return (
    <div className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="display mt-4 text-[1.75rem] leading-tight sm:text-[2.1rem]">{title}</h2>
        {intro && <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-500">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function ArrowLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-forest-800 ${className}`}
    >
      {children}
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1">
        <path d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

export function Tag({ children }) {
  return (
    <span className="inline-flex items-center border border-line px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em] text-ink-500">
      {children}
    </span>
  )
}

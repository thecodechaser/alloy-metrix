import { site } from './site'

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Warm forge glow */}
      <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,106,43,0.16),rgba(224,106,43,0)_62%)] blur-2xl animate-drift" />
      {/* Cool steel glow */}
      <div className="absolute bottom-[-22rem] right-[-10rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(122,150,190,0.14),rgba(122,150,190,0)_65%)] blur-2xl" />
      {/* Machined grid */}
      <div
        className="absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_72%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(154,166,182,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(154,166,182,0.16) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,8,10,0.85)_100%)]" />
    </div>
  )
}

function Mark({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={`${site.name} logo`} className={className}>
      <defs>
        <linearGradient id="markSteel" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#eef3f8" />
          <stop offset="0.5" stopColor="#9aa6b6" />
          <stop offset="1" stopColor="#5c6674" />
        </linearGradient>
      </defs>
      <path
        d="M32 3.5 56.5 17.5v29L32 60.5 7.5 46.5v-29z"
        fill="none"
        stroke="url(#markSteel)"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path d="M22 43 32 20l10 23" fill="none" stroke="url(#markSteel)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.4 35.4h11.2" fill="none" stroke="#e06a2b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-steel-400 backdrop-blur-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-ember-400 animate-pulse-dot" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-500" />
      </span>
      Coming soon
    </span>
  )
}

export default function App() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden px-6 py-10 sm:px-8 sm:py-14">
      <Backdrop />

      <header className="relative flex w-full max-w-5xl items-center gap-3">
        <Mark className="h-8 w-8 sm:h-9 sm:w-9" />
        <span className="font-display text-sm font-semibold tracking-[0.18em] text-steel-300 uppercase">
          {site.name}
        </span>
      </header>

      <section className="relative flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-7 py-16 text-center sm:gap-8">
        <div className="animate-rise">
          <StatusPill />
        </div>

        <h1 className="metal-text animate-rise font-display text-[2.75rem] leading-[1.05] font-bold tracking-tight sm:text-6xl md:text-7xl [animation-delay:90ms]">
          {site.name}
        </h1>

        <p className="animate-rise max-w-xl text-balance text-base leading-relaxed text-steel-400 sm:text-lg [animation-delay:180ms]">
          {site.tagline}
        </p>

        <div className="animate-rise h-px w-24 bg-gradient-to-r from-transparent via-steel-400/45 to-transparent [animation-delay:240ms]" />

        <p className="animate-rise max-w-lg text-sm leading-relaxed text-steel-400/75 sm:text-[0.95rem] [animation-delay:300ms]">
          {site.blurb}
        </p>

        <div className="animate-rise flex flex-col items-center gap-4 sm:flex-row [animation-delay:380ms]">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-steel-300 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-400"
          >
            {site.email}
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
              <path d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-steel-300 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember-400"
            >
              {site.phone}
            </a>
          )}
        </div>
      </section>

      <footer className="relative flex w-full max-w-5xl flex-col items-center gap-2 text-xs text-steel-400/60 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span className="tracking-wide">{site.location} · {site.domain}</span>
      </footer>
    </main>
  )
}

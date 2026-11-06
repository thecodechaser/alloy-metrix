// Visit analytics via OpenPanel (https://openpanel.dev) — production only.
//
// Two guards keep dev.alloymetrix.in, deploy previews and localhost out of the
// numbers:
//   1. VITE_OPENPANEL_CLIENT_ID is set in Netlify for the Production context
//      only, so other builds never receive a client id.
//   2. The script only loads when the page is actually served from
//      alloymetrix.in (or www.alloymetrix.in).
//
// Page views on client-side route changes are picked up by `trackScreenViews`,
// and clicks on tel:/mailto:/WhatsApp links by `trackOutgoingLinks`.

const CLIENT_ID = import.meta.env.VITE_OPENPANEL_CLIENT_ID
const PROD_HOSTS = ['alloymetrix.in', 'www.alloymetrix.in']

export function initAnalytics() {
  if (!CLIENT_ID || typeof window === 'undefined') return
  if (!PROD_HOSTS.includes(window.location.hostname)) return

  window.op =
    window.op ||
    function (...args) {
      ;(window.op.q = window.op.q || []).push(args)
    }

  window.op('init', {
    clientId: CLIENT_ID,
    trackScreenViews: true,
    trackOutgoingLinks: true,
    trackAttributes: true,
  })

  const script = document.createElement('script')
  script.src = 'https://openpanel.dev/op1.js'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

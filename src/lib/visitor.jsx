import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  emptyVisitor,
  mailtoHref,
  readDismissed,
  readVisitor,
  whatsappHref,
  writeDismissed,
  writeVisitor,
} from './enquiry.js'

const VisitorContext = createContext(null)

const fallback = {
  visitor: emptyVisitor,
  saveVisitor: () => {},
  dismissed: true,
  dismiss: () => {},
}

export function VisitorProvider({ children }) {
  const [visitor, setVisitor] = useState(readVisitor)
  const [dismissed, setDismissed] = useState(readDismissed)

  const saveVisitor = useCallback((next) => {
    const merged = { ...emptyVisitor, ...next }
    writeVisitor(merged)
    setVisitor(merged)
  }, [])

  const dismiss = useCallback(() => {
    writeDismissed()
    setDismissed(true)
  }, [])

  const value = useMemo(
    () => ({ visitor, saveVisitor, dismissed, dismiss }),
    [visitor, saveVisitor, dismissed, dismiss],
  )

  return <VisitorContext.Provider value={value}>{children}</VisitorContext.Provider>
}

export function useVisitor() {
  return useContext(VisitorContext) ?? fallback
}

// Email and WhatsApp links for the current page, pre-filled with the template.
export function useEnquiryLinks(context) {
  const { visitor } = useVisitor()
  const product = context?.product ?? ''
  const category = context?.category ?? ''

  return useMemo(() => {
    const ctx = { product, category }
    return {
      mailto: (address) => mailtoHref(address, visitor, ctx),
      whatsapp: whatsappHref(visitor, ctx),
    }
  }, [visitor, product, category])
}

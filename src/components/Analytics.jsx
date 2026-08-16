import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Analytics() {
  const location = useLocation()
  const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN

  useEffect(() => {
    if (!gaId || document.querySelector(`script[data-slnb-ga="${gaId}"]`)) return
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.dataset.slnbGa = gaId
    document.head.appendChild(script)
    window.dataLayer = window.dataLayer || []
    window.gtag = (...args) => window.dataLayer.push(args)
    window.gtag('js', new Date())
    window.gtag('config', gaId, { send_page_view: false })
  }, [gaId])

  useEffect(() => {
    if (window.gtag && gaId) window.gtag('event', 'page_view', { page_path: location.pathname + location.search })
    if (plausibleDomain && window.plausible) window.plausible('pageview')
  }, [location, gaId, plausibleDomain])

  useEffect(() => {
    if (!plausibleDomain || document.querySelector('script[data-slnb-plausible]')) return
    const script = document.createElement('script')
    script.defer = true
    script.dataset.domain = plausibleDomain
    script.dataset.slnbPlausible = 'true'
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)
  }, [plausibleDomain])
  return null
}

import { profile } from '@/data/profile'

/**
 * Google Analytics 4. Loads only in production builds, so local dev and tests
 * never send data. VITE_GA_MEASUREMENT_ID overrides the ID in profile.js.
 * GA4's enhanced measurement handles SPA route changes and PDF downloads.
 */
export function initAnalytics(
  id = import.meta.env.VITE_GA_MEASUREMENT_ID || profile.analyticsId,
  enabled = import.meta.env.PROD,
) {
  if (!id || !enabled || typeof window === 'undefined' || window.gtag) return false

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
  return true
}

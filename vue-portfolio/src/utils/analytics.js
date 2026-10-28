import { nextTick } from 'vue'
import { profile } from '@/data/profile'

/**
 * Google Analytics 4. Loads only in production builds, so local dev and tests
 * never send data. VITE_GA_MEASUREMENT_ID overrides the ID in profile.js.
 * GA4's enhanced measurement sends page views on route changes (the router sets
 * document.title in beforeResolve so each view carries the right title), file
 * downloads, outbound clicks and scroll depth. On top of that we send:
 *   contact_click    { method: email | linkedin | github }
 *   resume_download  { file }
 *   section_view     { section_id }  once per home-page section per visit
 */
export function initAnalytics(
  id = import.meta.env.VITE_GA_MEASUREMENT_ID || profile.analyticsId,
  enabled = import.meta.env.PROD,
  router = null,
) {
  if (!id || !enabled || typeof window === 'undefined' || window.gtag) return false

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)

  document.addEventListener('click', trackLinkClick)
  if (router) router.afterEach(() => nextTick(() => trackSections()))
  return true
}

/** Maps a clicked link to a custom event, or null if it isn't one we track. */
export function classifyLink(href = '') {
  if (href.startsWith('mailto:')) return ['contact_click', { method: 'email' }]
  if (/linkedin\.com/i.test(href)) return ['contact_click', { method: 'linkedin' }]
  if (/github\.com/i.test(href)) return ['contact_click', { method: 'github' }]
  if (/resume[^/]*\.pdf$/i.test(href)) {
    return ['resume_download', { file: href.split('/').pop() }]
  }
  return null
}

function trackLinkClick(event) {
  const link = event.target.closest?.('a[href]')
  const match = link && classifyLink(link.getAttribute('href'))
  if (match) window.gtag('event', ...match)
}

let sectionObserver
const seenSections = new Set()

/** Sends section_view the first time each `section[id]` is half visible. */
export function trackSections(root = document) {
  if (typeof IntersectionObserver === 'undefined' || !window.gtag) return
  sectionObserver?.disconnect()
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const sectionId = entry.target.id
        if (!entry.isIntersecting || seenSections.has(sectionId)) continue
        seenSections.add(sectionId)
        window.gtag('event', 'section_view', { section_id: sectionId })
      }
    },
    { threshold: 0.5 },
  )
  root.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s))
}

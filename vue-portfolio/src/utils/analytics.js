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
 *   cta_click        { target }      hero buttons (data-cta="experience|projects|contact")
 *   experience_expand { job_id }     "Show more" on a work-experience card
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

/**
 * Tracked redirects for links printed in resumes and cover letters, e.g.
 * /go/github?utm_campaign=sportsbet. A PDF can't report clicks on github.com,
 * so the PDF links here instead: the page view carries the UTM tags, we send
 * profile_link_click { link }, then forward to the real profile.
 */
export const REDIRECTS = {
  github: profile.links.github,
  linkedin: profile.links.linkedin,
}

export function redirectTarget(pathname = '') {
  const match = pathname.match(/\/go\/([a-z]+)\/?$/)
  return match && REDIRECTS[match[1]] ? { link: match[1], url: REDIRECTS[match[1]] } : null
}

export function followRedirect({ link, url }, navigate = (to) => window.location.replace(to)) {
  let done = false
  const go = () => {
    if (!done) {
      done = true
      navigate(url)
    }
  }
  if (window.gtag) {
    window.gtag('event', 'profile_link_click', {
      link,
      transport_type: 'beacon',
      event_callback: go,
    })
    setTimeout(go, 1500)
  } else {
    go()
  }
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

/** Sends a custom event when analytics is loaded; a no-op in dev and tests. */
export function track(name, params = {}) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', name, params)
}

function trackLinkClick(event) {
  const link = event.target.closest?.('a[href]')
  if (!link) return
  if (link.dataset.cta) track('cta_click', { target: link.dataset.cta })
  const match = classifyLink(link.getAttribute('href'))
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

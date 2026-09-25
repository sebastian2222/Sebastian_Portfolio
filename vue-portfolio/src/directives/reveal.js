/**
 * v-reveal: fades an element in the first time it scrolls into view.
 * Styling lives in base.css and is skipped for prefers-reduced-motion.
 */
let observer

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  )
  return observer
}

export const reveal = {
  mounted(el) {
    const io = getObserver()
    if (!io) return
    el.setAttribute('data-reveal', '')
    io.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

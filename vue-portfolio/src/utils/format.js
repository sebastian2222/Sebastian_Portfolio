// Fixed labels: Intl's en-AU "short" month renders "June"/"July" unabbreviated.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** '2024-07' -> 'Jul 2024'. */
export function formatMonth(value) {
  const [year, month] = value.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

/** Formats a start/end pair; a null end means the role is ongoing. */
export function formatPeriod(start, end) {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`
}

/** Resolves a path inside /public against the deploy base, leaving URLs alone. */
export function asset(path) {
  if (/^(https?:|mailto:)/.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function isExternal(href) {
  return /^https?:/.test(href)
}

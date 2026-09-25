import { ref } from 'vue'

const STORAGE_KEY = 'theme'
const theme = ref('dark')

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function read() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Storage can be blocked (private mode); fall back to the OS setting.
  }
  return systemTheme()
}

/** Shared theme state; the pre-paint script in index.html applies it first. */
export function useTheme() {
  theme.value = read()

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme.value
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      // Non-persistent is fine.
    }
  }

  return { theme, toggle }
}

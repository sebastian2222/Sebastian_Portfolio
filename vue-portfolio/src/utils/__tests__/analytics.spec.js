import { afterEach, describe, expect, it } from 'vitest'
import { initAnalytics } from '../analytics'

const gaScripts = () => document.head.querySelectorAll('script[src*="googletagmanager.com"]')

afterEach(() => {
  gaScripts().forEach((s) => s.remove())
  delete window.gtag
  delete window.dataLayer
})

describe('initAnalytics', () => {
  it('does nothing without a measurement ID or outside production', () => {
    expect(initAnalytics('', true)).toBe(false)
    expect(initAnalytics('G-TEST123', false)).toBe(false)
    expect(gaScripts()).toHaveLength(0)
    expect(window.gtag).toBeUndefined()
  })

  it('loads gtag once and configures the measurement ID', () => {
    expect(initAnalytics('G-TEST123', true)).toBe(true)
    expect(initAnalytics('G-TEST123', true)).toBe(false)
    expect(gaScripts()).toHaveLength(1)
    expect(gaScripts()[0].src).toContain('id=G-TEST123')
    expect(window.dataLayer.some((args) => args[0] === 'config' && args[1] === 'G-TEST123')).toBe(
      true,
    )
  })
})

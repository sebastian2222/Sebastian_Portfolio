import { describe, expect, it } from 'vitest'
import { asset, formatMonth, formatPeriod, isExternal } from '../format'

describe('formatMonth', () => {
  it('uses three-letter months', () => {
    expect(formatMonth('2024-07')).toBe('Jul 2024')
    expect(formatMonth('2026-06')).toBe('Jun 2026')
    expect(formatMonth('2022-01')).toBe('Jan 2022')
  })
})

describe('formatPeriod', () => {
  it('renders ongoing roles as Present', () => {
    expect(formatPeriod('2025-07', null)).toBe('Jul 2025 – Present')
  })

  it('renders closed ranges', () => {
    expect(formatPeriod('2022-07', '2024-07')).toBe('Jul 2022 – Jul 2024')
  })
})

describe('asset', () => {
  it('prefixes public paths with the base URL', () => {
    expect(asset('media/demo.mp4')).toBe('/media/demo.mp4')
    expect(asset('/files/cv.pdf')).toBe('/files/cv.pdf')
  })

  it('leaves absolute URLs untouched', () => {
    expect(asset('https://wdr26.org')).toBe('https://wdr26.org')
    expect(asset('mailto:a@b.c')).toBe('mailto:a@b.c')
  })
})

describe('isExternal', () => {
  it('detects http(s) links', () => {
    expect(isExternal('https://x.dev')).toBe(true)
    expect(isExternal('media/demo.mp4')).toBe(false)
  })
})

import { afterEach, describe, expect, it } from 'vitest'
import { classifyLink, initAnalytics } from '../analytics'

const gaScripts = () => document.head.querySelectorAll('script[src*="googletagmanager.com"]')
const sentEvents = () =>
  window.dataLayer.filter((args) => args[0] === 'event').map((args) => [args[1], args[2]])

afterEach(() => {
  gaScripts().forEach((s) => s.remove())
  document.body.innerHTML = ''
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

  it('sends a contact_click event when the email link is clicked', () => {
    initAnalytics('G-TEST123', true)
    document.body.innerHTML = '<a href="mailto:me@example.com"><span>Email</span></a>'
    document.querySelector('span').click()
    expect(sentEvents()).toContainEqual(['contact_click', { method: 'email' }])
  })
})

describe('classifyLink', () => {
  it('recognises contact links and resume downloads', () => {
    expect(classifyLink('mailto:a@b.c')).toEqual(['contact_click', { method: 'email' }])
    expect(classifyLink('https://www.linkedin.com/in/x/')).toEqual([
      'contact_click',
      { method: 'linkedin' },
    ])
    expect(classifyLink('https://github.com/x')).toEqual(['contact_click', { method: 'github' }])
    expect(classifyLink('/files/Sebastian_Parakal_Jose_Resume.pdf')).toEqual([
      'resume_download',
      { file: 'Sebastian_Parakal_Jose_Resume.pdf' },
    ])
  })

  it('ignores ordinary links', () => {
    expect(classifyLink('/projects/hush')).toBeNull()
    expect(classifyLink('https://hushapp.live')).toBeNull()
  })
})

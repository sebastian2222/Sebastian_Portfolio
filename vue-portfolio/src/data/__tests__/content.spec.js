import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { categories, projects, getProject } from '../projects'
import { experience } from '../experience'
import { profile } from '../profile'

const PUBLIC_DIR = resolve(__dirname, '../../../public')
const categoryIds = new Set(categories.map((c) => c.id))
const localPath = (href) => !/^(https?:|mailto:)/.test(href)

describe('projects', () => {
  it('have unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it.each(projects.map((p) => [p.slug, p]))('%s has the fields a case study needs', (_, p) => {
    for (const key of [
      'title',
      'tagline',
      'year',
      'context',
      'team',
      'role',
      'summary',
      'problem',
    ]) {
      expect(p[key], key).toBeTruthy()
    }
    expect(p.stack.length).toBeGreaterThan(0)
    expect(p.built.length).toBeGreaterThan(0)
    expect(p.categories.length).toBeGreaterThan(0)
    for (const c of p.categories) expect(categoryIds.has(c), c).toBe(true)
  })

  it('only link to https URLs or files that exist in /public', () => {
    for (const p of projects) {
      for (const link of p.links) {
        expect(['live', 'repo', 'demo', 'docs']).toContain(link.kind)
        if (localPath(link.href))
          expect(existsSync(resolve(PUBLIC_DIR, link.href)), link.href).toBe(true)
        else expect(link.href).toMatch(/^https:\/\//)
      }
      if (p.media) {
        expect(existsSync(resolve(PUBLIC_DIR, p.media.video))).toBe(true)
        expect(existsSync(resolve(PUBLIC_DIR, p.media.poster))).toBe(true)
      }
    }
  })

  it('has an even number of featured projects so the 2-column grid stays balanced', () => {
    expect(projects.filter((p) => p.featured).length % 2).toBe(0)
  })

  it('getProject finds by slug and returns undefined otherwise', () => {
    expect(getProject('hush')?.title).toBe('Hush')
    expect(getProject('does-not-exist')).toBeUndefined()
  })
})

describe('experience', () => {
  it('references existing case studies', () => {
    for (const job of experience) {
      for (const slug of job.projects) expect(getProject(slug), slug).toBeDefined()
    }
  })

  it('uses YYYY-MM dates with end after start', () => {
    for (const job of experience) {
      expect(job.start).toMatch(/^\d{4}-\d{2}$/)
      if (job.end) expect(job.end > job.start).toBe(true)
    }
  })
})

describe('profile', () => {
  it('ships the resume it links to', () => {
    expect(existsSync(resolve(PUBLIC_DIR, profile.resume))).toBe(true)
  })
})

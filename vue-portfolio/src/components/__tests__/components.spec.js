import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProjectCard from '../ProjectCard.vue'
import ProjectsSection from '../sections/ProjectsSection.vue'
import ArchitectureFlow from '../ArchitectureFlow.vue'
import SiteHeader from '../SiteHeader.vue'
import HeroSection from '../sections/HeroSection.vue'
import ExperienceSection from '../sections/ExperienceSection.vue'
import HomeView from '@/views/HomeView.vue'
import { experience } from '@/data/experience'
import { projects, getProject } from '@/data/projects'
import { routes } from '@/router'

async function mountWithRouter(component, options = {}) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  router.push('/')
  await router.isReady()
  return mount(component, {
    ...options,
    global: { plugins: [router], directives: { reveal: {} } },
  })
}

describe('ProjectCard', () => {
  it('links to the case study and shows live/demo badges', async () => {
    const wrapper = await mountWithRouter(ProjectCard, {
      props: { project: getProject('cloudpose') },
    })
    expect(wrapper.find('a').attributes('href')).toBe('/projects/cloudpose')
    expect(wrapper.text()).toContain('Demo video')
    expect(wrapper.text()).not.toMatch(/\bSolo\b|\bTeam\b/)
  })

  it('caps the stack chips and shows the overflow count', async () => {
    const project = getProject('hush')
    const wrapper = await mountWithRouter(ProjectCard, { props: { project } })
    expect(wrapper.text()).toContain(`+${project.stack.length - 5}`)
  })
})

describe('ProjectsSection', () => {
  it('shows every project by default and filters by category', async () => {
    const wrapper = await mountWithRouter(ProjectsSection)
    expect(wrapper.findAll('article')).toHaveLength(projects.length)

    const mobile = wrapper.findAll('button').find((b) => b.text() === 'Mobile')
    await mobile.trigger('click')
    await flushPromises()

    const expected = projects.filter((p) => p.categories.includes('mobile')).length
    expect(wrapper.findAll('article')).toHaveLength(expected)
    expect(mobile.attributes('aria-pressed')).toBe('true')
  })
})

describe('ArchitectureFlow', () => {
  it('renders each lane as an ordered list of steps', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { lanes: [{ name: 'Path', steps: ['A', 'B', 'C'] }], caption: 'cap' },
    })
    expect(wrapper.findAll('ol > li').map((li) => li.text())).toEqual(['A', 'B', 'C'])
    expect(wrapper.find('figcaption').text()).toContain('cap')
  })
})

describe('Home page order', () => {
  it('shows experience before projects, and both before the journey', async () => {
    const wrapper = await mountWithRouter(HomeView, { attachTo: document.body })
    const ids = wrapper.findAll('section[id]').map((s) => s.attributes('id'))
    expect(ids.indexOf('experience')).toBeLessThan(ids.indexOf('projects'))
    expect(ids.indexOf('projects')).toBeLessThan(ids.indexOf('journey'))
    wrapper.unmount()
  })

  it('lists Experience first in the nav', async () => {
    const wrapper = await mountWithRouter(SiteHeader)
    const labels = wrapper.findAll('.nav__link').map((a) => a.text())
    expect(labels.slice(0, 3)).toEqual(['Experience', 'Projects', 'Journey'])
  })

  it('points the hero primary button at experience', async () => {
    const wrapper = await mountWithRouter(HeroSection)
    const primary = wrapper.find('.btn--tomato')
    expect(primary.attributes('href')).toBe('/#experience')
    expect(primary.text()).toContain('See my experience')
  })
})

describe('ExperienceSection', () => {
  it('shows three highlights per role and expands the rest on demand', async () => {
    const wrapper = await mountWithRouter(ExperienceSection)
    const job = experience.find((j) => j.highlights.length > 3)
    const card = wrapper.find(`#job-${job.id}`)
    const visible = () =>
      card.findAll('.job__highlights li').filter((li) => li.element.style.display !== 'none')

    expect(visible()).toHaveLength(3)
    const toggle = card.find('.job__toggle')
    expect(toggle.attributes('aria-expanded')).toBe('false')

    await toggle.trigger('click')
    expect(visible()).toHaveLength(job.highlights.length)
    expect(toggle.attributes('aria-expanded')).toBe('true')
    expect(toggle.text()).toContain('Show less')
  })

  it('keeps every highlight in the DOM for search', async () => {
    const wrapper = await mountWithRouter(ExperienceSection)
    const total = experience.reduce((n, j) => n + j.highlights.length, 0)
    expect(wrapper.findAll('.job__highlights li')).toHaveLength(total)
  })
})

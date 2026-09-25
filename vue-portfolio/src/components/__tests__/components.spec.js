import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProjectCard from '../ProjectCard.vue'
import ProjectsSection from '../sections/ProjectsSection.vue'
import ArchitectureFlow from '../ArchitectureFlow.vue'
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
    expect(wrapper.text()).toContain('Solo')
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

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { getProject } from '@/data/projects'
import { profile } from '@/data/profile'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: `${profile.name} | ${profile.role}` },
  },
  {
    path: '/projects/:slug',
    name: 'project',
    component: () => import('@/views/ProjectView.vue'),
    props: true,
    beforeEnter: (to) =>
      getProject(to.params.slug)
        ? true
        : { name: 'not-found', params: { pathMatch: to.path.slice(1).split('/') } },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: `Page not found | ${profile.name}` },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const project = to.name === 'project' ? getProject(to.params.slug) : null
  document.title = project ? `${project.title} | ${profile.name}` : (to.meta.title ?? profile.name)
})

export default router

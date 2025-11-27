import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  {
    path: '/', name: 'Home', component: HomeView
  },
  { path: '/projects/:slug', name: 'ProjectDetail', component: ProjectDetail }
]

const router = createRouter({
  history: createWebHashHistory(), // for GitHub Pages compatibility
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

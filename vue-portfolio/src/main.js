import { createApp } from 'vue'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/700.css'
import '@fontsource/caveat/700.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'
import { followRedirect, initAnalytics, redirectTarget } from './utils/analytics'

// /go/<link> pages (used by resume PDFs) record the click and forward on
// without rendering the site.
const redirect = redirectTarget(window.location.pathname)
if (redirect) {
  initAnalytics()
  followRedirect(redirect)
} else {
  initAnalytics(undefined, undefined, router)
  createApp(App).use(router).directive('reveal', reveal).mount('#app')
}

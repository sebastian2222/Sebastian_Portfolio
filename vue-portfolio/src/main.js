import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.vue'
import router from './router'
import { reveal } from './directives/reveal'

createApp(App).use(router).directive('reveal', reveal).mount('#app')

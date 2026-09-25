import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * GitHub Pages has no SPA fallback, so ship index.html as 404.html too.
 * Deep links such as /projects/hush then boot the app instead of a 404.
 */
function spaFallback() {
  let outDir
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      await copyFile(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// BASE_PATH lets CI build for a project page (e.g. /Sebastian_Portfolio/)
// while local dev and custom domains stay at the root.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [vue(), spaFallback()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.js'],
  },
})

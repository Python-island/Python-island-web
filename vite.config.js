import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import seoPrerender from 'vite-plugin-seo-prerender'
import { fileURLToPath, URL } from 'node:url'
import { routes } from './src/router/routes'

const resolvePath = (dir) => fileURLToPath(new URL(dir, import.meta.url))

export default defineConfig({
  resolve: {
    alias: { '@': resolvePath('./src') }
  },
  plugins: [
    vue(),
    seoPrerender({
      hostname: 'https://www.silenthim.top',
      routes: routes.map(route => route.path)
    })
  ]
})
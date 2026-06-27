import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sitemap from 'vite-plugin-sitemap'
import { fileURLToPath, URL } from 'node:url'
import { routesPaths } from './src/router/routes-paths'

const resolvePath = (dir) => fileURLToPath(new URL(dir, import.meta.url))

export default defineConfig({
  resolve: {
    alias: { '@': resolvePath('./src') }
  },
  plugins: [
    vue(),
    sitemap({
      hostname: 'https://www.silenthim.top',
      dynamicRoutes: routesPaths
    })
  ]
})
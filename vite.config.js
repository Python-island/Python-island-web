import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sitemap from 'vite-plugin-sitemap'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import { routesPaths } from './src/router/routes-paths'
import { routeSeo } from './src/router/seo'

const resolvePath = (dir) => fileURLToPath(new URL(dir, import.meta.url))
const siteDomain = 'https://www.silenthim.top'
const siteName = 'PyIsland第二站点'
const siteImage = `${siteDomain}/PyislandLogo.png`
const sitemapRoutes = routesPaths.filter((routePath) => routePath !== '/')

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const replaceHeadTag = (html, matcher, replacement) => {
  if (matcher.test(html)) return html.replace(matcher, replacement)
  return html.replace('</head>', `  ${replacement}\n</head>`)
}

const buildSeoFallback = (currentPath) => {
  const meta = routeSeo[currentPath] || {}
  const links = routesPaths
    .map((routePath) => {
      const linkMeta = routeSeo[routePath] || {}
      return `<a href="${routePath}">${escapeHtml(linkMeta.h1 || linkMeta.title || routePath)}</a>`
    })
    .join('')

  return `<div id="app"><main class="seo-fallback"><h1>${escapeHtml(meta.h1 || meta.title)}</h1><p>${escapeHtml(meta.desc)}</p><nav aria-label="站点页面">${links}</nav></main></div>`
}

const applyRouteSeo = (html, routePath) => {
  const meta = routeSeo[routePath] || {}
  const title = meta.title || `${siteName}-开源项目分享平台`
  const desc = meta.desc || 'PyIsland开源项目平台，提供项目介绍与下载服务。'
  const keywords = meta.keywords || 'PyIsland,开源项目,项目分享'
  const canonicalUrl = `${siteDomain}${routePath === '/' ? '/' : routePath}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': routePath === '/' ? 'WebSite' : 'WebPage',
    name: meta.h1 || title,
    headline: meta.h1 || title,
    description: desc,
    url: canonicalUrl,
    image: siteImage,
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteDomain
    }
  }

  let nextHtml = html.replace(/<div id="app"><\/div>/, buildSeoFallback(routePath))
  nextHtml = replaceHeadTag(nextHtml, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  nextHtml = replaceHeadTag(nextHtml, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(desc)}">`)
  nextHtml = replaceHeadTag(nextHtml, /<meta name="keywords" content="[^"]*"\s*\/?>/, `<meta name="keywords" content="${escapeHtml(keywords)}">`)
  nextHtml = replaceHeadTag(nextHtml, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonicalUrl}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(desc)}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${siteImage}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonicalUrl}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(desc)}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${siteImage}" />`)
  nextHtml = replaceHeadTag(nextHtml, /<meta name="twitter:url" content="[^"]*"\s*\/?>/, `<meta name="twitter:url" content="${canonicalUrl}" />`)
  nextHtml = nextHtml.replace(/<script id="route-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>\n?/, '')

  return nextHtml.replace('</head>', `  <script id="route-json-ld" type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`)
}

const staticRouteSeoPlugin = () => ({
  name: 'static-route-seo',
  apply: 'build',
  async closeBundle() {
    const distDir = resolvePath('./dist')
    const sourceHtml = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')

    await Promise.all(routesPaths.map(async (routePath) => {
      const outputPath = routePath === '/'
        ? path.join(distDir, 'index.html')
        : path.join(distDir, routePath.replace(/^\//, ''), 'index.html')

      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, applyRouteSeo(sourceHtml, routePath))
    }))
  }
})

export default defineConfig({
  resolve: {
    alias: { '@': resolvePath('./src') }
  },
  plugins: [
    vue(),
    sitemap({
      hostname: 'https://www.silenthim.top',
      dynamicRoutes: sitemapRoutes
    }),
    staticRouteSeoPlugin()
  ]
})

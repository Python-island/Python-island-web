import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const SITE_DOMAIN = 'https://www.silenthim.top'
const SITE_NAME = 'PyIsland第二站点'
const SITE_IMAGE = `${SITE_DOMAIN}/PyislandLogo.png`
const DEFAULT_TITLE = 'PyIsland第二站点-开源项目分享平台'
const DEFAULT_DESC = 'PyIsland开源项目平台，提供 PyIsland、CIsland、EIsland 等项目的介绍与下载服务，打造优质的开源软件分享社区。'
const DEFAULT_KEYWORDS = 'PyIsland,EIsland,CIsland,PyCapsule,Pyball,Macisland,开源项目,项目分享'

const setMeta = (selector, attrs) => {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }

  Object.entries(attrs).forEach(([key, value]) => {
    tag.setAttribute(key, value)
  })

  return tag
}

const setJsonLd = (data) => {
  let script = document.querySelector('#route-json-ld')
  if (!script) {
    script = document.createElement('script')
    script.id = 'route-json-ld'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }

  script.textContent = JSON.stringify(data)
}

router.afterEach((to) => {
  const title = to.meta.title || DEFAULT_TITLE
  const desc = to.meta.desc || DEFAULT_DESC
  const keywords = to.meta.keywords || DEFAULT_KEYWORDS
  const canonicalUrl = `${SITE_DOMAIN}${to.path}`

  document.title = title

  setMeta('meta[name="description"]', { name: 'description', content: desc })
  setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)

  setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
  setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  setMeta('meta[property="og:description"]', { property: 'og:description', content: desc })
  setMeta('meta[property="og:image"]', { property: 'og:image', content: SITE_IMAGE })
  setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'zh_CN' })

  setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: desc })
  setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: SITE_IMAGE })
  setMeta('meta[name="twitter:url"]', { name: 'twitter:url', content: canonicalUrl })

  setJsonLd({
    '@context': 'https://schema.org',
    '@type': to.path === '/' ? 'WebSite' : 'WebPage',
    name: to.meta.h1 || title,
    headline: to.meta.h1 || title,
    description: desc,
    url: canonicalUrl,
    image: SITE_IMAGE,
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_DOMAIN
    }
  })
})
export default router

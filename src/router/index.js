import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 站点域名
const SITE_DOMAIN = 'https://www.silenthim.top'

// 切换页面自动更新标题、描述和各种SEO标签
router.afterEach(to=>{
  // 更新页面标题
  document.title = to.meta.title || 'PyIsland第二站点-开源项目分享平台'
  
  // 更新描述
  let desc = document.querySelector('meta[name="description"]')
  if(desc) desc.content = to.meta.desc || 'PyIsland开源项目平台，提供PyIsland、CIsland、EIsland等项目的介绍与下载服务，打造优质的开源软件分享社区'
  
  // 更新 canonical 权威链接
  const canonicalUrl = `${SITE_DOMAIN}${to.fullPath}`
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)
  
  // 更新OG标签
  let ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', document.title)
  
  let ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', desc.content)
  
  let ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl)
})
export default router
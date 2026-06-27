import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 切换页面自动更新标题、描述
router.afterEach(to=>{
  document.title = to.meta.title || 'PyIsland2'
  let desc = document.querySelector('meta[name="description"]')
  if(desc) desc.content = to.meta.desc || 'PyIsland 开源项目平台'
})
export default router
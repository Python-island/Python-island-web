export const routes = [
  // 你的页面路由，示例：
  { path: '/', name: 'home', component: () => import('@/components/Welcome.vue'), meta:{title:'首页-PyIsland第二站点',desc:'首页欢迎界面'} },
  { path: '/intro', name: 'intro', component: () => import('@/components/Introduction.vue'), meta:{title:'项目介绍-PyIsland',desc:'PyIsland各个项目功能、开发背景介绍'} },
]

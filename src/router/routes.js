export const routes = [
  { path: '/', name: 'home', component: () => import('@/components/Welcome.vue'), meta:{title:'首页-PyIsland第二站点',desc:'首页欢迎界面'} },
  { path: '/intro', name: 'intro', component: () => import('@/components/Introduction.vue'), meta:{title:'项目介绍-PyIsland',desc:'PyIsland各个项目功能、开发背景介绍'} },
  { path: '/team', name: 'team', component: () => import('@/components/team.vue'), meta:{title:'团队介绍-PyIsland',desc:'PyIsland开发团队介绍'} },
  { path: '/download', name: 'download', component: () => import('@/components/download.vue'), meta:{title:'下载中心-PyIsland',desc:'PyIsland项目下载页面'} },
]

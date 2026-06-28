export const routes = [
  { path: '/', name: 'home', component: () => import('@/components/Welcome.vue'), meta:{title:'首页-PyIsland第二站点',desc:'首页欢迎界面,此页面主要为pyisland第二站点的欢迎界面，通过优质的动画效果，为用户提供一个友好的欢迎体验'} },
  { path: '/intro', name: 'intro', component: () => import('@/components/Introduction.vue'), meta:{title:'项目介绍-PyIsland',desc:'PyIsland各个项目功能、开发背景介绍，为用户提供一个全面的项目介绍，同时涵盖了Pyisland主站点和其他网站的网站的友情链接，方便用户跳转。'} },
  { path: '/team', name: 'team', component: () => import('@/components/team.vue'), meta:{title:'团队介绍-PyIsland',desc:'PyIsland开发团队介绍，为用户提供一个全面的团队介绍，以卡片形式展示团队成员的信息，包括姓名、头像、介绍等，方便用户了解团队成员的背景和能力。'} },
  { path: '/download', name: 'download', component: () => import('@/components/download.vue'), meta:{title:'下载中心-PyIsland',desc:'PyIsland项目下载页面，提供Pyisland_sideV，cisland（tauri），eisland,Pyball,Pycapsule,Macisland的下载服务,同时涵盖抖音视频链接'} },
]

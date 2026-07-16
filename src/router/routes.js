import { routeSeo } from './seo'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Welcome.vue'),
    meta: routeSeo['/']
  },
  {
    path: '/intro',
    name: 'intro',
    component: () => import('@/components/Introduction.vue'),
    meta: routeSeo['/intro']
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/components/team.vue'),
    meta: routeSeo['/team']
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/components/download.vue'),
    meta: routeSeo['/download']
  },
]

import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'form',
    component: () => import('/@/components/form/demo/index.vue'),
  },
  {
    path: '/toast',
    name: 'toast',
    component: () => import('/@/components/toast/demo/index.vue'),
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('/@/components/icon/demo/index.vue'),
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('/@/components/button/demo/index.vue'),
  },
  {
    path: '/markdown',
    name: 'markdown',
    component: () => import('/@r/docs/t.md'),
  },
] as RouteRecordRaw[]
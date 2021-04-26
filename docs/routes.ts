import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('./markdown/home.md'),
  },
  {
    path: '/button',
    name: 'button',
    component: () => import('./markdown/button.md'),
  },
  {
    path: '/slider',
    name: 'slider',
    component: () => import('./markdown/slider.md'),
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: () => import('./markdown/tooltip.md'),
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import('./markdown/radio.md'),
  },
  {
    path: '/check-box',
    name: 'check-box',
    component: () => import('./markdown/check-box.md'),
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('./markdown/input.md'),
  },
  {
    path: '/switch',
    name: 'switch',
    component: () => import('./markdown/switch.md'),
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('./markdown/select.md'),
  },
  {
    path: '/form',
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
] as RouteRecordRaw[]

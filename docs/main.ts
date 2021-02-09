import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import App from './app.vue'

import FastUI from '/@/index'
import '/@/styles/index.scss'

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(FastUI)
app.use(router)
app.mount('#app')

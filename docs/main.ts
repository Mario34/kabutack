import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import App from './app.vue'
import DemoContainer from './components/demo-container'
import './styles/index.scss'

import Kabutack from '/@/index'
import '/@/styles/index.scss'

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.component(DemoContainer.name, DemoContainer)

app.use(Kabutack)
app.use(router)
app.mount('#app')

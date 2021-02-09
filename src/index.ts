import type { App } from 'vue'
import Button from './components/button'
import Icon from './components/icon'
import { Form, FormItem } from './components/form'

/* plugins */
import ToastPlugin, { Toast } from './components/toast'

const components = [
  Button,
  Icon,
  Form,
  FormItem,
]

const plugins = [
  ToastPlugin,
]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin as any)
  })
}

export default {
  install,
  Toast,
}
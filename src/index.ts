import type { App } from 'vue'
import Button from './components/button'
import Icon from './components/icon'
import { Form, FormItem } from './components/form'
import Switch from './components/switch'
import Input from './components/input'
import { CheckBox, CheckBoxGroup } from './components/check-box'

/* plugins */
import ToastPlugin, { Toast } from './components/toast'

const components = [
  Button,
  Icon,
  Form,
  FormItem,
  Switch,
  Input,
  CheckBox,
  CheckBoxGroup,
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

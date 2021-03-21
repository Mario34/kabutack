import type { App } from 'vue'
import Button from './components/button'
import Icon from './components/icon'
import { Form, FormItem } from './components/form'
import Switch from './components/switch'
import Input from './components/input'
import { CheckBox, CheckBoxGroup } from './components/check-box'
import { Radio, RadioGroup } from './components/radio'
import Tooltip from './components/tooltip'
import ToastPlugin, { Toast } from './components/toast'
import { clickOutside } from './directives'

const components = [
  Button,
  Icon,
  Form,
  FormItem,
  Switch,
  Input,
  CheckBox,
  CheckBoxGroup,
  Radio,
  RadioGroup,
  Tooltip,
]

const plugins = [
  ToastPlugin,
]

const directives = {
  clickOutside,
}

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin as any)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })
}

export default {
  install,
  Toast,
}

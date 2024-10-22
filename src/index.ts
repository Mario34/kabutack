import type { App, Directive } from 'vue'
import Button from './components/button'
import Icon from './components/icon'
import { Form, FormItem } from './components/form'
import Switch from './components/switch'
import Input from './components/input'
import { CheckBox, CheckBoxGroup } from './components/check-box'
import { Radio, RadioGroup } from './components/radio'
import { Popper } from './components/popper'
import Tooltip from './components/tooltip'
import ToastPlugin, { Toast } from './components/toast'
import Slider from './components/slider'
import { Select, SelectOption } from './components/select'
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
  Popper,
  Tooltip,
  Slider,
  Select,
  SelectOption,
]

const plugins = [
  ToastPlugin,
]

const directives: Record<string, Directive> = {
  clickOutside,
}

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin as any)
  })

  for (const key in directives) {
    app.directive(key, directives[key])
  }
}

export {
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
  Popper,
  Tooltip,
  Slider,
  Select,
  SelectOption,
  Toast,
}

export default {
  install,
  Toast,
}

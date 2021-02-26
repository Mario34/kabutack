import Switch from './src/switch.vue'
import '/@/styles/switch.scss'

export type SwitchType = 'primary' | 'warning' | 'success' | 'danger'

export type SwitchValue = boolean | number | string
export interface SwitchProps {
  modelValue: SwitchValue
  size?: ComponentSize
  disabled?: boolean
  type?: SwitchType
  trueValue?: any
  falseValue?: any
}

export default Switch

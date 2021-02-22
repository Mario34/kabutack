import Switch from './src/switch.vue'
import '/@/styles/switch.scss'

export type SwitchType = 'primary' | 'warning' | 'success' | 'danger'

export interface SwitchProps {
  modelValue: boolean
  size?: ComponentSize
  disabled?: boolean
  type?: SwitchType
}

export default Switch

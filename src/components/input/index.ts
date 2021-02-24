import Input from './src/input.vue'
import '/@/styles/input.scss'

export type InputType = 'text' | 'password'

export interface InputProps {
  modelValue: string
  size?: ComponentSize
  placeholder?: string
  maxLength?: number
  clearable?: boolean
  type?: InputType
  disabled?: boolean
  autocomplete?: string
  prefix?: string
  suffix?: string
  plain?: boolean
  inline?: boolean
}

export default Input

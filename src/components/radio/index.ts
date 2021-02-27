import Radio from './src/radio.vue'
import RadioGroup from './src/radio-group.vue'
import '/@/styles/radio.scss'

import type { Ref, ToRefs } from 'vue'

export type GroupValueType = string | number | boolean

export interface RadioGroupProps {
  modelValue?: GroupValueType
  max?: number
  min?: number
  disabled?: boolean
  size?: ComponentSize
}

export interface RadioProps {
  modelValue?: GroupValueType
  value?: string
  disabled?: boolean
  size?: ComponentSize
}

export interface OnItemChange {
  (key: GroupValueType): void
}

export interface RadioGroupProvide extends ToRefs<RadioGroupProps>{
  groupValue: Ref<GroupValueType>
  onItemChange: OnItemChange
}

export const radioKey = 'radio'
export const radioGroupKey = 'radio-group'

export { Radio, RadioGroup }

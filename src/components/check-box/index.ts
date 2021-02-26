import CheckBox from './src/check-box.vue'
import CheckBoxGroup from './src/check-box-group.vue'
import '/@/styles/check-box.scss'

import type { Ref, ToRefs, ComputedRef } from 'vue'

export type ValuesType = Record<string, boolean>

export type GroupValueType = (string | number)[]

export interface CheckBoxGroupProps {
  modelValue?: GroupValueType
  max?: number
  min?: number
  disabled?: boolean
  size?: ComponentSize
}

export interface CheckBoxProps {
  modelValue?: GroupValueType
  name?: string
  disabled?: boolean
  size?: ComponentSize
  indeterminate?: boolean
}

export interface OnItemChange {
  (key: string|number, value: boolean): void
}

export interface CheckBoxGroupProvide extends ToRefs<CheckBoxGroupProps>{
  values: Ref<ValuesType>
  onItemChange: OnItemChange
  isMaxlimit: ComputedRef<boolean>
  isMinlimit: ComputedRef<boolean>
}

export const checkBoxKey = 'check-box'
export const checkBoxGroupKey = 'check-box-group'

export { CheckBox, CheckBoxGroup }

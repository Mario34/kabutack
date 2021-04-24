import '/@/styles/select.scss'

export interface SelectItem {
  label: number | string
  value: any
}

export interface SelectInject {
  onSelect: (item: any) => void
  modelValue: any
}

export { default as Select } from './src/select.vue'
export { default as SelectOption } from './src/select-option.vue'

import Form from './src/form.vue'
import FormItem from './src/form-item.vue'
import '/@/styles/form.scss'

import type { Rules, RuleItem, ValidateError } from 'async-validator'
import type { Emitter } from 'mitt'
import type { Ref, ToRefs } from 'vue'

export type FormType = {
  [field: string]: unknown
}

export type FormRulesType = Rules

export type FormLabelAlign = 'right' | 'left' | 'top'

export interface FormProps {
  /**
   * 表单数据
   */
  form: FormType
  /**
   * 表单校验规则
   */
  rules?: Rules
  initialValues: FormType
  labelAlign?: FormLabelAlign
  labelWidth?: number
  inline?: boolean
  size?: ComponentSize
  disabled?: boolean
  showError?: boolean
  requiredRemark?: boolean
}

export interface FormItemProps {
  /**
   * 字段名name
   */
  name: string
  label?: string
  /**
   * 单个字段校验规则，将会覆盖form的规则
   */
  rules?: RuleItem | RuleItem[]
  labelAlign?: FormLabelAlign
  labelWidth?: number
  inline?: boolean
  disabled?: boolean
  showError?: boolean
  error?: string
  size?: ComponentSize
}

export interface FormErrors {
  [field: string]: ValidateError[]
}

export interface FormProvide extends ToRefs<Required<FormProps>>{
  rules: Ref<Rules>
  errors: Ref<FormErrors>
  emitter: Emitter
}

export const EventKey = {
  validate: 'form.validate',
  validateField: 'form-item.validateField',
  resetField: 'form.resetField',
  clearValidate: 'form.clearValidate',
}

export const formKey = 'form'
export const formItemKey = 'form-item'

export { Form, FormItem }

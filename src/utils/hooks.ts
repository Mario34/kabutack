import { inject, reactive } from 'vue'
import { formKey, formItemKey } from '/@/components/form'
import type { FormProvide, FormItemProvide } from '/@/components/form'

export interface KabutackConfig {
  size: ComponentSize
}

export const useGlobalConfig: () => KabutackConfig = () => {
  return inject<KabutackConfig>('KabutackConfig', reactive({
    size: 'sm',
  }))
}

export const useFormInject = (): {
  form: FormProvide
  formItem: FormItemProvide
} => ({
  form: inject(formKey, {}) as FormProvide,
  formItem: inject(formItemKey, {}) as FormItemProvide,
})

import { inject, reactive, computed } from 'vue'
import { formKey, formItemKey } from '/@/components/form'
import { getDefinedValue } from './index'

import type { ComputedRef } from 'vue'
import type { FormProvide, FormItemProvide } from '/@/components/form'

export interface KabutackConfig {
  size: ComponentSize
}

export const useGlobalConfig = (): KabutackConfig => {
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

interface UseFormComponentSize {
  <T>(props: T & { size?: ComponentSize }): ComputedRef<ComponentSize>
}
interface UseFormComponentDisabled {
  <T>(props: T & { disabled?: boolean }): ComputedRef<boolean>
}

export const useFormComponentSize: UseFormComponentSize = (props) => {
  return computed(() => {
    const config = useGlobalConfig()
    const { form: formInject, formItem: formItemInject } = useFormInject()
    return getDefinedValue([
      props.size,
      formItemInject.size?.value,
      formInject.size?.value,
      config.size,
    ]) as ComponentSize
  })
}

export const useFormComponentDisabled: UseFormComponentDisabled = (props) => {
  return computed(() => {
    const { form: formInject, formItem: formItemInject } = useFormInject()
    return !!getDefinedValue([
      formInject.disabled?.value,
      formItemInject.disabled?.value,
      props.disabled,
    ])
  })
}

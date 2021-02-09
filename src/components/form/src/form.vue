<template>
  <form class="ka-form">
    <slot />
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  ref,
  PropType,
  toRefs,
} from 'vue'
import { formKey, EventKey } from '../index'
import Mitt from 'mitt'
import { validateGlobalSize } from '/@/utils/validator'

import type { FormType, FormLabelAlign, FormProvide, FormErrors } from '../index'
import type { Rules, ErrorList } from 'async-validator'

export default defineComponent({
  name: 'KaForm',
  props: {
    form: {
      type: Object as PropType<FormType>,
      required: true,
    },
    rules: {
      type: Object as PropType<Rules>,
      default: () => ({}),
    },
    initialValues: {
      type: Object as PropType<FormType>,
      default: () => ({}),
    },
    labelAlign: {
      type: String as PropType<FormLabelAlign>,
      default: 'right',
    },
    labelWidth: {
      type: Number,
      default: 80,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ComponentSize>,
      default: undefined,
      validator: validateGlobalSize,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
      default: true,
    },
    requiredRemark: Boolean,
  },
  emits: ['validate'],
  setup(props, ctx) {
    const errors = ref<FormErrors>({})
    const emitter = Mitt()
    const validate = async () => {
      const formErrors: { [field: string]: ErrorList } = {}
      emitter.on(EventKey.validateField, ({ field, errors }) => {
        if (errors.length) {
          formErrors[field] = errors
        } else {
          delete formErrors[field]
        }
      })
      emitter.emit(EventKey.validate)
      await new Promise((r) => setTimeout(r))
      ctx.emit('validate')
      if (Object.keys(formErrors).length) {
        return Promise.reject(formErrors)
      }
      return
    }
    const clearValidate = () => {
      emitter.emit(EventKey.clearValidate)
    }
    const resetFields = (init?: FormType) => {
      emitter.emit(EventKey.resetField, init)
      clearValidate()
    }

    provide<FormProvide>(formKey, {
      ...toRefs(props),
      errors,
      emitter,
    })

    return {
      validate,
      resetFields,
      clearValidate,
    }
  },
})
</script>

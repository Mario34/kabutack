<template>
  <div
    class="ka-form-item"
    :class="[
      `ka-size-${mergeSize}`,
      `ka-align-${mergeLabelAlign}`,
      {
        'ka-is-error': errorMessage,
        'ka-is-inline': mergeInline,
      },
    ]"
  >
    <label
      v-if="label"
      class="ka-form-item__label"
      :style="labelStyle"
    >{{ label }}</label>
    <div class="ka-form-item__inner">
      <slot />
      <transition name="ka-form-item__error-fade">
        <div v-if="errorMessage" class="ka-form-item__error">
          {{ errorMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  inject,
  provide,
  onMounted,
  onUnmounted,
  watch,
  PropType,
  toRefs,
} from 'vue'
import { formKey, EventKey, FormProvide, formItemKey } from '../index'
import AsyncValidator from 'async-validator'
import { useGlobalConfig } from '/@/utils'
import { validateGlobalSize } from '/@/utils/validator'

import type { RuleItem, ErrorList, ValidateError } from 'async-validator'
import type { FormType, FormLabelAlign } from '../index'

export default defineComponent({
  name: 'KaFormItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    rules: [Array, Object] as PropType<RuleItem | RuleItem[]>,
    labelAlign: String as PropType<FormLabelAlign>,
    labelWidth: Number,
    inline: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
      default: true,
    },
    error: String,
    size: {
      type: String as PropType<ComponentSize>,
      validator: validateGlobalSize,
    },
  },
  setup(props) {
    const errorsList = ref<ValidateError[]>([])
    const config = useGlobalConfig()
    const formInject = inject(formKey) as FormProvide
    const { emitter } = formInject
    const rules = computed(() => {
      if (props.rules) {
        return props.rules
      }
      return formInject.rules.value[props.name]
    })
    const field = computed(() => {
      return formInject.form.value[props.name]
    })
    const mergeShowError = computed(() => {
      return props.showError || formInject.showError.value
    })
    const errorMessage = computed<string | null>(() => {
      if(!mergeShowError.value) {
        return null
      }
      if(props.error) {
        return props.error
      }
      if (errorsList.value[0]) {
        return errorsList.value[0].message
      }
      return null
    })
    const mergeSize = computed(() => {
      return props.size || formInject.size.value || config.size
    })
    const mergeLabelAlign = computed(() => {
      return props.labelAlign || formInject.labelAlign.value
    })
    const mergeInline = computed(() => {
      return props.inline || formInject.inline.value
    })
    const labelStyle = computed(() => {
      const style = {
        width: `${props.labelWidth || formInject.labelWidth.value}px`,
      }
      if (mergeLabelAlign.value === 'top') {
        style.width = ''
      }
      return style
    })

    const emitValidateResult = (errors: ErrorList) => {
      emitter.emit(EventKey.validateField, { field: props.name, errors })
    }

    const validateField = () => {
      const data = { [props.name]: field.value }
      const descriptor = { [props.name]: rules.value }
      const validator = new AsyncValidator(descriptor)

      validator
        .validate(data)
        .then(() => {
          errorsList.value = []
          emitValidateResult([])
        })
        .catch(({ errors }) => {
          errorsList.value = errors
          emitValidateResult([...errors])
        })
    }

    const clearValidateField = () => {
      errorsList.value = []
    }

    const resetField = (init?: FormType) => {
      if (props.name) {
        formInject.form.value[props.name] = (init ||
          formInject.initialValues.value)[props.name]
      }
    }

    provide(formItemKey, {
      ...toRefs(props),
      clearValidateField,
      validateField,
      resetField,
    })

    onMounted(() => {
      emitter.on(EventKey.validate, validateField)
      emitter.on(EventKey.clearValidate, clearValidateField)
      emitter.on(EventKey.resetField, resetField)
    })

    onUnmounted(() => {
      emitter.off(EventKey.validate, validateField)
      emitter.off(EventKey.clearValidate, clearValidateField)
      emitter.off(EventKey.resetField, resetField)
    })

    watch(rules, () => {
      // 规则变化重新校验
      validateField()
    })

    return {
      errorMessage,
      mergeInline,
      mergeSize,
      mergeLabelAlign,
      labelStyle,
    }
  },
})
</script>

<template>
  <label
    class="ka-input"
    :class="[
      `ka-size-${mergeSize}`,
      {
        'ka-is-plain': plain,
        'ka-is-inline': inline,
        'ka-is-clearable': clearable,
        'ka-is-prefix': prefix,
        'ka-is-suffix': suffix,
        'ka-is-disabled': mergeDisabled,
        'ka-is-password': isShowPassword,
      },
    ]"
  >
    <ka-icon v-if="prefix" class="ka-input__prefix" :icon="prefix" />
    <input
      ref="inputRef"
      :value="modelValue"
      :type="type"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :disabled="mergeDisabled"
      :autocomplete="autocomplete"
      class="ka-input__inner"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @change="onChange"
      @clear="onClear"
    />
    <ka-icon
      v-if="isShowPassword"
      class="ka-input__switch-type"
      :icon="hideText ? 'eye-off' : 'eye'"
      @click="onSwitchType"
    />
    <ka-icon
      v-if="isShowClear"
      class="ka-input__clear"
      icon="x"
      @click="onClear"
    />
    <ka-icon
      v-if="isShowSuffix"
      class="ka-input__suffix"
      :icon="suffix"
      @click="onClear"
    />
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { getDefinedValue } from '/@/utils'
import { useFormInject, useFormComponentSize, useFormComponentDisabled } from '/@/utils/hooks'
import { validateType } from '/@/utils/validator'
import Icon from '/@/components/icon'

import type { PropType } from 'vue'
import type { InputType } from '../index'

const TypeMap = ['text', 'password']

export default defineComponent({
  name: 'KaInput',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    modelValue: { type: String, default: undefined },
    size: {
      type: String as PropType<ComponentSize>,
      default: undefined,
    },
    placeholder: { type: String, default: undefined },
    maxLength: { type: [Number, String], default: undefined },
    clearable: { type: Boolean, default: false },
    type: {
      type: String as PropType<InputType>,
      default: 'text',
      validator: validateType<string>(TypeMap),
    },
    disabled: { type: Boolean, default: undefined },
    autocomplete: String,
    inline: Boolean,
    prefix: String,
    suffix: String,
    plain: Boolean,
  },
  emits: ['update:modelValue', 'clear', 'change', 'input', 'blur', 'focus'],
  setup(props, ctx) {
    const hideText = ref(props.type === 'password')
    const inputRef = ref<HTMLIFrameElement | null>(null)
    const onInput = (e: any) => {
      ctx.emit('update:modelValue', e.target.value)
      ctx.emit('input')
    }
    const { form: formInject, formItem: formItemInject } = useFormInject()
    const mergeSize = useFormComponentSize(props)
    const mergeDisabled = useFormComponentDisabled(props)
    const triggerType = computed(() => {
      /* 触发校验时机 */
      return getDefinedValue([
        formItemInject.trigger?.value,
        formInject.trigger?.value,
      ])
    })
    const onFocus = () => ctx.emit('focus')
    const onChange = () => {
      ctx.emit('change')
      if (triggerType.value === 'change') {
        formItemInject.validateField()
      }
    }
    const onBlur = () => {
      ctx.emit('blur')
      if (triggerType.value === 'blur') {
        formItemInject.validateField()
      }
    }
    const onClear = () => {
      ctx.emit('clear')
      ctx.emit('update:modelValue', '')
    }
    const onSwitchType = () => {
      if (inputRef.value) {
        inputRef.value.setAttribute(
          'type',
          hideText.value ? 'text' : 'password',
        )
        hideText.value = !hideText.value
      }
    }
    const isShowPassword = computed(() => {
      return props.type === 'password'
    })
    const isShowClear = computed(() => {
      return (
        !isShowPassword.value &&
        props.clearable &&
        props.modelValue &&
        !mergeDisabled.value
      )
    })
    const isShowSuffix = computed(() => {
      return !isShowPassword.value && !isShowClear.value && props.suffix
    })

    return {
      hideText,
      inputRef,
      onBlur,
      onInput,
      onFocus,
      onClear,
      onChange,
      onSwitchType,
      mergeSize,
      mergeDisabled,
      isShowClear,
      isShowPassword,
      isShowSuffix,
    }
  },
})
</script>

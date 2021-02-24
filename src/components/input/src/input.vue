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
      },
    ]"
  >
    <ka-icon
      v-if="prefix"
      class="ka-input__prefix"
      :icon="prefix"
    />
    <input
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
      v-if="clearable && modelValue && !mergeDisabled"
      class="ka-input__clear"
      icon="x"
      @click="onClear"
    />
    <ka-icon
      v-else-if="suffix"
      class="ka-input__suffix"
      :icon="suffix"
      @click="onClear"
    />
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getDefinedValue } from '/@/utils'
import { useGlobalConfig, useFormInject } from '/@/utils/hooks'
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
    size: { type: String, default: undefined },
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
    const onInput = (e: any) => {
      ctx.emit('update:modelValue', e.target.value)
      ctx.emit('input')
    }
    const config = useGlobalConfig()
    const { form: formInject, formItem: formItemInject } = useFormInject()
    const mergeSize = computed(() => {
      return getDefinedValue([
        props.size,
        formItemInject.size?.value,
        formInject.size?.value,
        config.size,
      ])
    })
    const mergeDisabled = computed(() => {
      return !!getDefinedValue([
        formInject.disabled?.value,
        formItemInject.disabled?.value,
        props.disabled,
      ])
    })
    /* 触发校验时机 */
    const triggerType = computed(() => {
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

    return {
      onBlur,
      onInput,
      onFocus,
      onClear,
      onChange,
      mergeSize,
      mergeDisabled,
    }
  },
})
</script>

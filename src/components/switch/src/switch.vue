<template>
  <div
    class="ka-switch"
    :class="[
      `ka-size-${mergeSize}`,
      `ka-type-${type}`,
      {
        'ka-is-checked': modelValue === trueValue,
        'ka-is-disabled': mergeDisabled,
      },
    ]"
  >
    <button
      type="checkbox"
      :true-value="trueValue"
      :false-value="falseValue"
      class="ka-switch__input"
      :disabled="mergeDisabled"
      @click="onClick"
    />
    <div class="ka-switch__inner">
      <div class="ka-switch__slider" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useFormComponentSize, useFormComponentDisabled } from '/@/utils/hooks'
import { validateType } from '/@/utils/validator'

import type { PropType } from 'vue'
import type { SwitchType } from '../index'

const typeMap = ['primary', 'warning', 'success', 'danger']

export default defineComponent({
  name: 'KaSwitch',
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: undefined,
    },
    size: String as PropType<ComponentSize>,
    disabled: { type: Boolean, default: undefined },
    type: {
      type: String as PropType<SwitchType>,
      default: 'primary',
      validator: validateType<string>(typeMap),
    },
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const mergeSize = useFormComponentSize(props)
    const mergeDisabled = useFormComponentDisabled(props)
    const isChecked = computed(() => {
      return props.trueValue === props.modelValue
    })
    const onClick = () => {
      const value = isChecked.value ? props.falseValue : props.trueValue
      ctx.emit('change', value)
      ctx.emit('update:modelValue', value)
    }

    return {
      onClick,
      mergeSize,
      mergeDisabled,
    }
  },
})
</script>

<template>
  <label
    class="ka-radio"
    :class="[
      `ka-size-${mergeSize}`,
      {
        'ka-is-disabled': mergeDisabled,
        'ka-is-checked': checked,
      },
    ]"
  >
    <input
      :checked="checked"
      class="ka-radio__input"
      type="radio"
      :disabled="mergeDisabled"
      @input="onInput"
    />
    <span class="ka-radio__check" />
    <span
      class="ka-radio__label"
    ><slot>{{ value }}</slot></span>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, watch } from 'vue'
import { radioGroupKey } from '../index'
import { getDefinedValue, isUndef } from '/@/utils'
import Dev from '/@/utils/dev-tool'
import { useGlobalConfig, useFormInject } from '/@/utils/hooks'

import type { RadioGroupProvide } from '../index'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'KaRadio',
  props: {
    modelValue: {
      type: [Number, String, Boolean],
      default: undefined,
    },
    value: {
      type: [Number, String, Boolean],
      default: true,
    },
    disabled: { type: Boolean, default: undefined },
    size: { type: String as PropType<ComponentSize>, default: undefined },
    indeterminate: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const groupInject = inject(radioGroupKey, {}) as RadioGroupProvide
    const isGroup = computed(() => {
      return !!groupInject.onItemChange
    })
    function getCheck() {
      if (isGroup.value) {
        return groupInject.modelValue?.value === props.value
      }
      return props.modelValue === props.value
    }
    const checked = ref(getCheck())
    const config = useGlobalConfig()
    const { form: formInject, formItem: formItemInject } = useFormInject()
    const onInput = () => {
      if (isGroup.value) {
        if (isUndef(props.value)) {
          Dev.warn('the radiu in group must provide name prop.')
        } else {
          groupInject.onItemChange &&
            groupInject.onItemChange(props.value)
        }
      } else {
        ctx.emit('update:modelValue', props.value)
        ctx.emit('change', props.value)
      }
    }
    const mergeSize = computed(() => {
      return getDefinedValue([
        props.size,
        groupInject.size?.value,
        formItemInject.size?.value,
        formInject.size?.value,
        config.size,
      ])
    })
    const mergeDisabled = computed(() => {
      return !!getDefinedValue([
        formInject.disabled?.value,
        formItemInject.disabled?.value,
        groupInject.disabled?.value,
        props.disabled,
      ])
    })

    watch(
      () => groupInject.modelValue?.value,
      (val) => {
        if (isGroup.value) {
          checked.value = val === props.value
        }
      },
    )

    watch(
      () => props.modelValue,
      (val) => {
        if (!isGroup.value) {
          checked.value = val === props.value
        }
      },
    )

    return {
      checked,
      onInput,
      mergeSize,
      mergeDisabled,
    }
  },
})
</script>

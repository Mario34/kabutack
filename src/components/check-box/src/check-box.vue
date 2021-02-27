<template>
  <label
    class="ka-check-box"
    :class="[
      `ka-size-${mergeSize}`,
      {
        'ka-is-disabled': mergeDisabled,
        'ka-is-checked': checked,
        'ka-is-indeterminate': isIndeterminate,
      },
    ]"
  >
    <input
      :checked="checked"
      class="ka-check-box__inner"
      type="checkbox"
      :disabled="mergeDisabled"
      @input="onInput"
    />
    <CheckIcon
      :disabled="mergeDisabled"
      :checked="checked"
      :is-indeterminate="isIndeterminate"
      class="ka-check-box__box"
    />
    <span class="ka-check-box__label"><slot>{{ name }}</slot></span>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, watch } from 'vue'
import { checkBoxGroupKey } from '../index'
import { getDefinedValue, isUndef } from '/@/utils'
import Dev from '/@/utils/dev-tool'
import CheckIcon from './check-icon.vue'
import { useGlobalConfig, useFormInject } from '/@/utils/hooks'

import type { CheckBoxGroupProvide } from '../index'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'KaCheckBox',
  components: {
    CheckIcon,
  },
  props: {
    modelValue: { type: Boolean, default: false },
    name: { type: [Number, String] },
    disabled: { type: Boolean, default: undefined },
    size: { type: String as PropType<ComponentSize>, default: undefined },
    indeterminate: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(props, ctx) {
    const groupInject = inject(checkBoxGroupKey, {}) as CheckBoxGroupProvide
    const isGroup = computed(() => {
      return !!groupInject.onItemChange
    })
    function getCheck() {
      if(isGroup.value) {
        return groupInject.values.value[props.name as string]
      }
      return props.modelValue
    }
    const checked = ref(getCheck())
    const config = useGlobalConfig()
    const { form: formInject, formItem: formItemInject } = useFormInject()
    const onInput = (e: Event) => {
      const value = !!(e.target as HTMLInputElement).checked
      if (isGroup.value) {
        if (isUndef(props.name)) {
          Dev.warn('the check-box in group must provide name prop.')
        } else {
          groupInject.onItemChange &&
            groupInject.onItemChange(props.name as string, value)
        }
      } else {
        ctx.emit('update:modelValue', (e.target as HTMLInputElement).checked)
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
        isLimit.value,
        props.disabled,
      ])
    })
    const isIndeterminate = computed(() => {
      if (isGroup.value) {
        return false
      }
      return props.indeterminate && !checked.value
    })
    const isLimit = computed(
      () =>
        (groupInject.isMaxlimit?.value && !checked.value) ||
        (groupInject.isMinlimit?.value && checked.value),
    )

    watch(
      () => groupInject.values?.value,
      (val) => {
        if (!isUndef(props.name) && isGroup.value) {
          checked.value = !!val[props.name as string]
        }
      },
    )

    watch(
      () => props.modelValue,
      (val) => {
        if (!isGroup.value) {
          checked.value = val
        }
      },
    )

    return {
      checked,
      onInput,
      mergeSize,
      mergeDisabled,
      isIndeterminate,
    }
  },
})
</script>

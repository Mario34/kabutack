<template>
  <label
    class="ka-switch"
    :class="[
      `ka-size-${mergeSize}`,
      `ka-type-${type}`,
      {
        'ka-is-checked': modelValue,
        'ka-is-disabled': mergeDisabled,
      }
    ]"
  >
    <input
      v-model="checked"
      type="checkbox"
      class="ka-switch__input"
      :disabled="mergeDisabled"
    />
    <div class="ka-switch__inner">
      <div class="ka-switch__slider" />
    </div>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useGlobalConfig, useFormInject } from '/@/utils/hooks'
import { validateType } from '/@/utils/validator'
import { getDefinedValue } from '/@/utils'

import type { PropType } from 'vue'
import type { SwitchType } from '../index'

const typeMap = [ 'primary', 'warning', 'success', 'danger']

export default defineComponent({
  name: 'KaSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    size: String as PropType<ComponentSize>,
    disabled: Boolean,
    type: {
      type: String as PropType<SwitchType>,
      default: 'primary',
      validator: validateType<string>(typeMap),
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const checked = ref(!!props.modelValue)
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

    watch(checked, (val) => {
      ctx.emit('change', val)
      ctx.emit('update:modelValue', val)
    })

    return {
      checked,
      mergeSize,
      mergeDisabled,
    }
  },
})
</script>

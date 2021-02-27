<template>
  <div
    class="ka-radio-group"
    :class="[`ka-size-${mergeSize}`]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  toRefs,
  ref,
} from 'vue'
import { radioGroupKey } from '../index'
import { useFormComponentSize } from '/@/utils/hooks'

import type { PropType } from 'vue'
import type {
  RadioGroupProvide,
  OnItemChange,
  GroupValueType,
} from '../index'

export default defineComponent({
  name: 'KaRadioGroup',
  props: {
    modelValue: {
      type: [Number, String, Boolean],
      default: undefined,
    },
    disabled: { type: Boolean, default: undefined },
    size: { type: String as PropType<ComponentSize>, default: undefined },
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(props, ctx) {
    const groupValue = ref<GroupValueType>(props.modelValue)
    const onItemChange: OnItemChange = (val: GroupValueType) => {
      ctx.emit('update:modelValue', val)
    }
    const mergeSize = useFormComponentSize<typeof props>(props)

    provide<RadioGroupProvide>(radioGroupKey, {
      ...toRefs(props),
      groupValue,
      onItemChange,
    })

    return {
      mergeSize,
    }
  },
})
</script>

<template>
  <div
    class="ka-check-box-group"
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
  watch,
  computed,
} from 'vue'
import { checkBoxGroupKey } from '../index'
import { getDefinedValue } from '/@/utils'
import { useGlobalConfig, useFormInject } from '/@/utils/hooks'

import type { PropType } from 'vue'
import type {
  GroupValueType,
  CheckBoxGroupProvide,
  OnItemChange,
  ValuesType,
} from '../index'

export default defineComponent({
  name: 'KaCheckBoxGroup',
  props: {
    modelValue: {
      type: Array as PropType<GroupValueType>,
      default: () => [],
    },
    max: { type: Number, default: undefined },
    min: { type: Number, default: 0 },
    disabled: { type: Boolean, default: undefined },
    size: { type: String as PropType<ComponentSize>, default: undefined },
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(props, ctx) {
    const values = ref<ValuesType>(toValues(props.modelValue))
    const filterValue = computed(() =>
      Object.keys(values.value).filter((i) => values.value[i]),
    )
    const isMinlimit = computed(() => filterValue.value.length <= props.min)
    const isMaxlimit = computed(() => filterValue.value.length >= props.max)
    const config = useGlobalConfig()
    const { form: formInject, formItem: formItemInject } = useFormInject()
    const onItemChange: OnItemChange = (key, value) => {
      values.value[key] = value
      onInput()
    }
    const onInput = () => {
      ctx.emit('update:modelValue', filterValue.value)
    }
    const mergeSize = computed(() => {
      return getDefinedValue([
        props.size,
        formItemInject.size?.value,
        formInject.size?.value,
        config.size,
      ])
    })

    provide<CheckBoxGroupProvide>(checkBoxGroupKey, {
      ...toRefs(props),
      values,
      onItemChange,
      isMaxlimit,
      isMinlimit,
    })

    watch(
      () => props.modelValue,
      (val: GroupValueType) => {
        values.value = toValues(val)
      },
    )

    function toValues(val: GroupValueType) {
      return val.reduce((pre, curr) => {
        pre[curr] = true
        return pre
      }, {} as ValuesType)
    }

    return {
      values,
      mergeSize,
    }
  },
})
</script>

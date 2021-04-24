<template>
  <div
    class="ka-select-option"
    :class="{
      'ka-is-select': isSelect,
    }"
    @click="onClickItem"
  >
    <slot>
      {{ labelText }}
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { isUndef } from '/@/utils'

import type { SelectInject } from '../index'

export default defineComponent({
  name: 'KaSelectOption',
  props: {
    label: {
      type: [Number, String],
      default: undefined,
    },
    value: {
      type: [Number, String, Boolean, Object],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const labelText = computed(() => {
      return isUndef(props.label) ? String(props.value) : props.label
    })
    const selectInject = inject<SelectInject>('ka-select')
    const onClickItem = () => {
      selectInject?.onSelect(props.value)
    }
    const isSelect = computed(() => selectInject?.modelValue?.value === props.value)
    return {
      labelText,
      onClickItem,
      isSelect,
    }
  },
})
</script>

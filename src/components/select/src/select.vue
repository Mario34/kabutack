<template>
  <ka-popper
    ref="popperRef"
    trigger-type="manual"
    class-name="ka-select__popper"
    placement="bottom"
    auto-width
    :is-show="isShowPopper"
    :animation-duration="100"
  >
    <div
      v-clickOutside="onClickOutSide"
      class="ka-select"
      :class="[
        `ka-size-${mergeSize}`,
        {
          'ka-is-clearable': clearable,
          'ka-is-disabled': mergeDisabled,
        },
      ]"
      @click="onClick"
    >
      {{ valueText }}
      <ka-icon
        class="ka-select__arrow"
        :class="{
          'ka-select__arrow--open': isShowPopper
        }"
        icon="chevron-down"
      />
    </div>
    <template #content>
      <div class="ka-select__options">
        <slot :item="options">
          <ka-select-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </slot>
      </div>
    </template>
  </ka-popper>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref, toRefs } from 'vue'
import { Popper } from '/@/components/popper'
import SelectOption from './select-option.vue'
import Icon from '/@/components/icon'
import { isObj } from '/@/utils'
import { useFormComponentSize, useFormComponentDisabled } from '/@/utils/hooks'

import type { PropType } from 'vue'
import type { SelectItem } from '../index'

export default defineComponent({
  name: 'KaSelect',
  components: {
    [Popper.name]: Popper,
    [Icon.name]: Icon,
    [SelectOption.name]: SelectOption,
  },
  props: {
    modelValue: {
      type: [Number, String, Boolean, Object, Array],
      required: false,
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    options: {
      type: Array as PropType<SelectItem[]>,
      default: () => [],
    },
    size: {
      type: String as PropType<ComponentSize>,
      required: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const popperRef = ref<typeof Popper|null>(null)
    const isShowPopper = ref(false)
    const mergeSize = useFormComponentSize(props)
    const mergeDisabled = useFormComponentDisabled(props)
    const onSelect = (item: any) => {
      ctx.emit('update:modelValue', item)
      popperRef.value?.hide()
    }
    const valueText = computed(() => {
      if (isObj(props.modelValue)) {
        const target = props.options.find(i => i.value === (props.modelValue as any)?.[props.valueKey])
        return target ? target.label : props.modelValue?.[props.valueKey]
      }
      const target = props.options.find(i => i.value === props.modelValue)
      return target ? target.label : props.modelValue
    })
    const { modelValue } = toRefs(props)
    const onClickOutSide = () => {
      isShowPopper.value = false
    }
    const onClick = () => {
      isShowPopper.value = !isShowPopper.value
    }

    provide('ka-select', {
      onSelect,
      modelValue,
    })

    return {
      popperRef,
      valueText,
      isShowPopper,
      mergeSize,
      mergeDisabled,
      onClick,
      onClickOutSide,
    }
  },
})
</script>

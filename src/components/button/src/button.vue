<template>
  <button
    class="ka-button"
    :type="type"
    :class="[
      `ka-size-${btnSize}`,
      `ka-color-${colorType}`,
      {
        'ka-is-light': light,
        'ka-is-loading': loading,
        'ka-is-round': round,
        'ka-is-disabled': disabled,
        'ka-is-slots': slots,
      },
    ]"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <Icon v-if="icon" class="ka-button__icon" :icon="icon" />
    <slot><span v-if="slots" class="ka-button__inner"></span></slot>
    <Loading v-if="loading" class="ka-button__loading" :light="light" />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  validateGlobalSize,
  validateType,
} from '/@/utils/validator'
import { useGlobalConfig } from '/@/utils/hooks'
import Loading from './button-loading.vue'
import Icon from '../../icon'

import type { BtnColorType, NativeBtnType } from '../index'
import type { PropType } from 'vue'

const ColorTypeMap = ['primary', 'warning', 'success', 'danger']

export default defineComponent({
  name: 'KaButton',
  components: {
    Loading,
    Icon,
  },
  props: {
    type: {
      type: String as PropType<NativeBtnType>,
      default: 'button',
    },
    colorType: {
      type: String as PropType<BtnColorType>,
      default: 'primary',
      validator: validateType<string>(ColorTypeMap),
    },
    size: {
      type: String as PropType<ComponentSize>,
      validator: validateGlobalSize,
    },
    disabled: { type: Boolean },
    light: { type: Boolean },
    loading: { type: Boolean },
    icon: String,
    round: { type: Boolean },
  },
  emits: ['click'],
  setup(props, ctx) {
    const config = useGlobalConfig()
    const btnSize = computed(() => props.size || config.size)
    const onClick = (evt: Event) => {
      ctx.emit('click', evt)
    }
    return {
      onClick,
      btnSize,
      slots: ctx.slots.default,
    }
  },
})
</script>

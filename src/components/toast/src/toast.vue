<template>
  <transition name="ka-toast-fade">
    <div v-if="isMounted" class="ka-toast" :class="[`ka-color-${type}`]">
      <div class="ka-toast__inner">
        <div class="ka-toast__icon">
          <Icon :icon="statusIcon" />
        </div>
        <div class="ka-toast__main">
          <slot>
            <div class="ka-toast__main-title">{{ title }}</div>
            <div class="ka-toast__main-content">{{ content }}</div>
          </slot>
        </div>
      </div>
      <div v-if="isClosable" class="ka-toast__btn" @click="delayUnmount">
        <Icon class="ka-active-btn">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </Icon>
      </div>
      <div
        class="ka-toast__mouse-hack"
        @mouseenter="onMouseenter"
        @mouseout="onMouseout"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Icon from '/@/components/icon'
import { validateType } from '/@/utils/validator'

import type { PropType } from 'vue'
import type { ToastType, ToastOnClose, ToastUnmount } from '../index'

export const TypeMap: ToastType[] = ['default', 'primary', 'success', 'warning', 'error']

const IconMap = {
  'default': 'info',
  'primary': 'info',
  'success': 'check-circle',
  'warning': 'alert-triangle',
  'error': 'x-circle',
}

export default defineComponent({
  name: 'KaToast',
  components: {
    Icon,
  },
  props: {
    title: String,
    content: String,
    type: {
      type: String as PropType<ToastType>,
      default: 'default',
      validator: validateType<string>(TypeMap),
    },
    duration: {
      type: Number,
      default: 3000,
    },
    onClose: Function as PropType<ToastOnClose>,
    isClosable: {
      type: Boolean,
      default: true,
    },
    unmount: Function as PropType<ToastUnmount>,
    vmId: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const isMounted = ref(false)
    const timeId = ref()
    const statusIcon = IconMap[props.type] || 'zap'
    const autoClose = () => {
      const duration = Math.max(props.duration, 500)
      timeId.value = setTimeout(() => {
        delayUnmount()
      }, duration)
    }
    const delayUnmount = () => {
      if(!isMounted.value) {
        /* closeAll调用时需要判断当前组件是否已经开始卸载 */
        return
      }
      isMounted.value = false
      props.onClose && props.onClose()
      clearTimeout(timeId.value)
      setTimeout(() => {
        props.unmount && props.unmount(props.vmId)
      }, 250)
    }
    const onMouseenter = () => {
      clearTimeout(timeId.value)
      timeId.value = null
    }
    const onMouseout = () => {
      autoClose()
    }
    onMounted(() => {
      isMounted.value = true
      autoClose()
    })

    return {
      isMounted,
      statusIcon,
      delayUnmount,
      onMouseenter,
      onMouseout,
    }
  },
})
</script>

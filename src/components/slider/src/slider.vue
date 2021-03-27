<template>
  <div
    class="ka-slider"
    :class="{
      'ka-is-drag': isDraging,
      'ka-is-hover': isHovering,
      'ka-is-vertical': vertical,
      'ka-is-disabled': mergeDisabled,
    }"
    @click="onClick"
  >
    <div ref="containerRef" class="ka-slider__bg" />
    <div ref="barRef" class="ka-slider__bar" />
    <ka-tooltip
      ref="tooltipRef"
      trigger-type="manual"
      :content="`${stateValue}`"
      :is-show="isDraging || isHovering"
      :disabled="!showTooltip"
      :placement="vertical ? 'left' : 'top'"
    >
      <div
        ref="controllerRef"
        class="ka-slider__controller"
        @mousedown="onMousedown"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
      />
    </ka-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import Event from '/@/utils/event'
import KaTooltip from '/@/components/tooltip'
import { useFormComponentDisabled } from '/@/utils/hooks'

export default defineComponent({
  name: 'KaSlider',
  components: {
    KaTooltip,
  },
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    step: {
      type: Number,
      default: 1,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    range: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'input'],
  setup(props, ctx) {
    const containerRef = ref<Element | null>(null)
    const controllerRef = ref<Element | null>(null)
    const barRef = ref<Element | null>(null)
    const tooltipRef = ref<typeof KaTooltip | null>(null)
    const getValidValue = () => {
      if (props.modelValue < props.min) {
        return props.min
      }
      if (props.modelValue > props.max) {
        return props.max
      }
      return props.modelValue
    }
    const stateValue = ref(getValidValue())
    const isDraging = ref(false)
    const isHovering = ref(false)
    let startPoint = [0, 0]
    const length = computed(() => props.max - props.min)
    const mergeDisabled = useFormComponentDisabled(props)

    const onMousedown = (e: MouseEvent) => {
      startPoint = [e.offsetX, e.offsetY]
      isDraging.value = true
      Event.on(document, 'mousemove', onMousemove)
      Event.on(document, 'mouseup', onMouseup)
    }
    const onMouseup = () => {
      isDraging.value = false
      Event.off(document, 'mousemove', onMousemove)
      Event.off(document, 'mouseup', onMouseup)
    }
    const onMousemove = (e: MouseEvent) => {
      if (mergeDisabled.value) {
        return
      }
      const { left, top, width, height } = containerRef.value?.getBoundingClientRect() as DOMRect
      if (props.vertical) {
        let offset = e.clientY - top - startPoint[1]
        if (offset <= -7) {
          offset = -7
        }
        if (offset >= height - 7) {
          offset = height - 7
        }
        stateValue.value = getStepValue(props.min + ((offset + 7) / height) * length.value)
      } else {
        let offset = e.pageX - left - startPoint[0]
        if (offset <= -7) {
          offset = -7
        }
        if (offset >= width - 7) {
          offset = width - 7
        }
        stateValue.value = getStepValue(props.min + ((offset + 7) / width) * length.value)
      }
    }
    const onClick = (e: MouseEvent) => {
      onMousemove(e)
    }
    const move = () => {
      const offset = valueToOffset()
      if (props.vertical) {
        controllerRef.value?.setAttribute('style', `top: ${offset}px;`)
        barRef.value?.setAttribute('style', `height: ${offset}px;`)
      } else {
        controllerRef.value?.setAttribute('style', `left: ${offset}px;`)
        barRef.value?.setAttribute('style', `width: ${offset}px;`)
      }
      tooltipRef.value?.update()
    }
    const getStepValue = (val: number) => {
      const remainder = val % props.step
      if (remainder / props.step < 0.5) {
        return val - remainder
      }
      return val - remainder + props.step
    }
    const valueToOffset = () => {
      if (containerRef.value !== null) {
        const { width, height } = containerRef.value.getBoundingClientRect()
        const offset = props.vertical ? height : width
        return offset * ((props.modelValue - props.min) / length.value)
      }
      return 0
    }

    watch(stateValue, (val) => {
      ctx.emit('update:modelValue', val)
      ctx.emit('input', val)
    })

    watch(
      () => props.modelValue,
      () => {
        if (containerRef.value == null) {
          return
        }
        const value = getValidValue()
        if (value !== props.modelValue) {
          ctx.emit('update:modelValue', value)
          return
        }
        move()
      },
    )

    onMounted(() => {
      const value = getValidValue()
      if (value !== props.modelValue) {
        ctx.emit('update:modelValue', value)
        return
      }
      move()
    })

    onBeforeUnmount(() => {
      Event.off(document, 'mousemove', onMousemove)
    })

    return {
      containerRef,
      controllerRef,
      tooltipRef,
      barRef,
      onMousedown,
      onClick,
      isDraging,
      isHovering,
      stateValue,
      mergeDisabled,
    }
  },
})
</script>

import {
  defineComponent,
  h,
  onMounted,
  createVNode,
  ref,
  createBlock,
  onBeforeUnmount,
  Teleport,
  Fragment,
  cloneVNode,
  watch,
  openBlock,
} from 'vue'
import { isElement } from '/@/utils/dom'
import { usePopper } from '/@/components/popper'
import { getFirstNode } from '/@/utils'

import type { UsePopper } from '/@/components/popper'
import type { VNode, PropType } from 'vue'
import type { TriggerType, Placement } from '../index'

let id = 0
const getPopperId = () => `popper-${++id}`

export default defineComponent({
  name: 'KaPopper',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'top',
    },
    triggerType: {
      type: String as PropType<TriggerType>,
      default: 'hover',
    },
    showDelay: {
      type: Number,
      default: 0,
    },
    hideDelay: {
      type: Number,
      default: 0,
    },
    class: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    autoWidth: {
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      required: false,
    },
  },
  setup(props, ctx) {
    const popperId = getPopperId()
    const triggerRef = ref<Element>()
    const tooltipRef = ref<Element>()
    const popperInstance = ref<ReturnType<UsePopper> | null>(null)

    onMounted(() => {
      const trigger: HTMLElement = isElement(triggerRef.value)
        ? triggerRef.value
        : (triggerRef.value as any).$el
      const tooltip = tooltipRef.value as Element
      const { triggerType, showDelay, hideDelay, placement } = props

      if (trigger !== null && tooltip !== null) {
        popperInstance.value = usePopper(
          {
            trigger,
            popper: tooltip,
            placement,
            triggerType,
            showDelay,
            hideDelay,
            animationDuration: props.animationDuration,
          },
          ctx,
        )
        if (props.triggerType === 'manual' && props.isShow) {
          !props.disabled && popperInstance.value.show()
        }
      }
    })

    watch(
      () => props.placement,
      (placement) => {
        popperInstance.value?.instance.setOptions({ placement })
      },
    )

    watch(
      () => props.isShow,
      (val) => {
        if (props.triggerType === 'manual' && !props.disabled) {
          val ? popperInstance.value?.show() : popperInstance.value?.hide()
        }
      },
    )

    onBeforeUnmount(() => {
      popperInstance.value?.destroy?.()
    })

    const update = () => popperInstance.value?.instance?.update()
    const hide = () => {
      popperInstance.value?.hide()
    }

    return {
      triggerRef,
      tooltipRef,
      popperId,
      popperInstance,
      hide,
      update,
    }
  },
  render() {
    const { popperId, $slots } = this
    const defaultSlot = $slots.default?.()
    const trigger = defaultSlot ? getFirstNode(defaultSlot as VNode[]) : null
    const { width = 0 } = this.triggerRef?.getBoundingClientRect?.() || {}

    return (
      openBlock(),
      createBlock(Fragment, {}, [
        trigger ? cloneVNode(trigger, { ref: 'triggerRef' }, true) : null,
        createVNode(
          Teleport as any,
          {
            to: 'body',
          },
          [
            h(
              'div',
              {
                id: popperId,
                class: [this.className, this.class],
                style: {
                  width: this.autoWidth ? `${Math.max(width, 100)}px` : '',
                },
                ref: 'tooltipRef',
              },
              [
                h('div', { class: `${this.className}-content` }, [
                  $slots.content ? $slots.content() : this.content,
                ]),
                h('div', { class: `${this.className}-arrow`, 'data-popper-arrow': '' }),
              ],
            ),
          ],
        ),
      ])
    )
  },
})

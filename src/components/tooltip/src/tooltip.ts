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
import usePopper from '/@/components/popper'
import { getFirstNode } from '/@/utils'

import type { UsePopper } from '/@/components/popper'
import type { VNode, PropType } from 'vue'
import type { TriggerType, Placement } from '../index'

let id = 0
const getPopperId = () => `popper-${++id}`

export default defineComponent({
  name: 'KaTooltip',
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
      default: 200,
    },
    hideDelay: {
      type: Number,
      default: 200,
    },
    class: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const popperId = getPopperId()
    const triggerRef = ref<Element>()
    const tooltipRef = ref<Element>()
    let popperInstance: ReturnType<UsePopper>

    onMounted(() => {
      const trigger: HTMLElement = isElement(triggerRef.value)
        ? triggerRef.value
        : (triggerRef.value as any).$el
      const tooltip = tooltipRef.value as Element
      const { triggerType, showDelay, hideDelay, placement } = props

      if (trigger !== null && tooltip !== null) {
        popperInstance = usePopper(
          { trigger, popper: tooltip, placement, triggerType, showDelay, hideDelay },
          ctx,
        )
        if (props.triggerType === 'manual' && props.isShow) {
          !props.disabled && popperInstance.show()
        }
      }
    })

    watch(
      () => props.placement,
      (placement) => {
        popperInstance?.instance.setOptions({ placement })
      },
    )

    watch(
      () => props.isShow,
      (val) => {
        if (props.triggerType === 'manual') {
          val && !props.disabled ? popperInstance?.show() : popperInstance?.hide()
        }
      },
    )

    onBeforeUnmount(() => {
      popperInstance?.destroy?.()
    })

    const update = () => popperInstance?.instance?.update()

    const defaultSlot = ctx.slots.default && ctx.slots.default()
    const trigger = getFirstNode(defaultSlot as VNode[])

    return {
      triggerRef,
      tooltipRef,
      trigger,
      popperId,
      update,
    }
  },
  render() {
    const { trigger, popperId, $slots } = this
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
                class: ['ka-tooltip', this.class],
                ref: 'tooltipRef',
              },
              [
                h('div', { class: 'ka-tooltip-content' }, [
                  $slots.content ? $slots.content() : this.content,
                ]),
                h('div', { class: 'ka-tooltip-arrow', 'data-popper-arrow': '' }),
              ],
            ),
          ],
        ),
      ])
    )
  },
})

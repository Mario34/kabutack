import { createPopper } from '@popperjs/core'
import { Fragment, nextTick } from 'vue'
import Event from '/@/utils/event'
import { addEvent, removeEvent } from '/@/directives/click-outside'

import type { VNode } from 'vue'
import type { Placement, Instance as PopperInstance } from '@popperjs/core'

export type TriggerType = 'hover' | 'click' | 'manual'

export interface UsePopperProps {
  showDelay?: number
  hideDelay?: number
  trigger: Element
  popper: Element
  triggerType?: TriggerType
  placement?: Placement
}

export interface UsePopper {
  (props: UsePopperProps, ctx: any): {
    show: () => void
    hide: () => void
    destroy: () => void
    instance: PopperInstance
  }
}

const usePopper: UsePopper = (props) => {
  let timeId: ReturnType<typeof setTimeout>
  const {
    showDelay = 0,
    hideDelay = 0,
    trigger,
    popper,
    triggerType = 'hover',
    placement = 'top',
  } = props
  const popperInstance = createPopper(trigger, popper as HTMLElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })
  const show = () => {
    clearTimeout(timeId)
    popper.setAttribute('data-enter', '')
    setTimeout(() => {
      popper.setAttribute('data-show', '')
      popper.removeAttribute('data-enter')
    }, showDelay)
    popperInstance.update()
  }
  const hide = () => {
    timeId = setTimeout(() => {
      popper.removeAttribute('data-show')
      popper.setAttribute('data-leave', '')
      nextTick(() => {
        popper.removeAttribute('data-leave')
      })
    }, hideDelay)
  }
  const clear = () => {
    clearTimeout(timeId)
  }
  let beforeDestroy = () => {}
  const destroy = () => {
    popperInstance.destroy()
    beforeDestroy?.()
  }

  if(triggerType === 'hover') {
    Event.on(trigger, 'mouseenter', show)
    Event.on(trigger, 'mouseleave', hide)
    Event.on(popper, 'mouseenter', clear)
    Event.on(popper, 'mouseleave', hide)

    beforeDestroy = () => {
      Event.off(trigger, 'mouseenter', show)
      Event.off(trigger, 'mouseleave', hide)
      Event.off(popper, 'mouseenter', clear)
      Event.off(popper, 'mouseleave', hide)
    }
  }

  if(triggerType === 'click') {
    let isShow = false
    const onShow = () => {
      if(isShow) {
        return
      }
      show()
      isShow = true
      addEvent(popper, onHide)
    }
    const onHide = () => {
      if(!isShow) {
        return
      }
      hide()
      removeEvent(popper)
      setTimeout(() => {
        isShow = false
      }, 0)
    }
    Event.on(trigger, 'click', onShow)
    beforeDestroy = () => {
      removeEvent(popper)
      Event.off(trigger, 'mouseenter', onShow)
    }
  }

  return {
    show,
    hide,
    destroy,
    instance: popperInstance,
  }
}

const getFirstNode = (node: VNode[]): VNode | void => {
  if (Array.isArray(node)) {
    return getAvailableNode(node[0])
  } else {
    return getAvailableNode(node)
  }
}

const getAvailableNode = (node: VNode): VNode | void => {
  if (node.type === Comment || node.type === Text) {
    return
  }
  if (node.type === Fragment || node.type === 'template') {
    return getFirstNode(node.children as VNode[])
  }
  return node
}

export default usePopper

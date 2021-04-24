import { createPopper } from '@popperjs/core'
import Event from '/@/utils/event'
import { addEvent, removeEvent } from '/@/directives/click-outside'

import type { Placement as _Placement, Instance as PopperInstance } from '@popperjs/core'

export type TriggerType = 'hover' | 'click' | 'manual'

export type Placement = _Placement

export interface UsePopperProps {
  showDelay?: number
  hideDelay?: number
  trigger: Element
  popper: Element
  triggerType?: TriggerType
  placement?: Placement
  animationDuration?: number
}

export interface UsePopper {
  (props: UsePopperProps, ctx: any): {
    show: () => void
    hide: () => void
    destroy: () => void
    instance: PopperInstance
  }
}

export const usePopper: UsePopper = (props) => {
  let timeId: ReturnType<typeof setTimeout> | null
  let hideTimeId: ReturnType<typeof setTimeout> | null
  const {
    showDelay = 0,
    hideDelay = 0,
    trigger,
    popper,
    triggerType = 'hover',
    placement = 'top',
    animationDuration = 0,
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
    if (timeId) {
      clearTimeout(timeId)
      timeId = null
    }
    popper.setAttribute('data-enter', '')
    setTimeout(() => {
      popper.setAttribute('data-show', '')
      popper.removeAttribute('data-enter')
    }, showDelay)
    popperInstance.update()
  }
  const hide = () => {
    timeId = setTimeout(() => {
      if (hideTimeId) {
        clearTimeout(hideTimeId)
        hideTimeId = null
      }
      popper.removeAttribute('data-show')
      popper.setAttribute('data-leave', '')
      hideTimeId = setTimeout(() => {
        popper.removeAttribute('data-leave')
      }, animationDuration)
    }, hideDelay)
  }
  const clear = () => {
    if (timeId) {
      clearTimeout(timeId)
      timeId = null
    }
  }
  let beforeDestroy = () => {}
  const destroy = () => {
    popperInstance.destroy()
    beforeDestroy?.()
  }

  if (triggerType === 'hover') {
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

  let isShow = false
  const onShow = () => {
    if (isShow) {
      return
    }
    show()
    isShow = true
    addEvent(popper, onHide)
  }
  const onHide = () => {
    if (!isShow) {
      return
    }
    hide()
    removeEvent(popper)
    setTimeout(() => {
      isShow = false
    }, 0)
  }

  if (triggerType === 'click') {
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

export { default as Popper } from './src/popper'

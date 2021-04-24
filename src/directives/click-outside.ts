import Event from '/@/utils/event'
import { rowType, isFn } from '/@/utils'
import Dev from '/@/utils/dev-tool'

import type { Directive } from 'vue'

interface EventItem {
  handler: Handler
}

interface Handler {
  (mousedown: Event, mouseup: Event): void
}

interface CreateHandel {
  (el: Element, onClick: () => void): Handler
}

const eventMap = new Map<Element, EventItem>()

let startEvent: Event

Event.on(document, 'mousedown', (e) => {
  startEvent = e
})

Event.on(document, 'mouseup', (e) => {
  eventMap.forEach(({ handler }) => {
    handler(startEvent, e)
  })
})

export const createHandel: CreateHandel = (el, onClick) => {
  if (!isFn(onClick)) {
    Dev.warn(`The v-click-outside directive expect accept a Function, but got ${rowType(onClick)}.`)
  }
  return (mousedown, mouseup) => {
    const inexistent = !mousedown.target || !mouseup.target
    const isContain = el.contains(mousedown.target as Element) ||
    el.contains(mouseup.target as Element)
    const isSelf = el === mousedown.target || el === mouseup.target
    if (inexistent || isContain || isSelf || !isFn(onClick)) {
      return
    }
    onClick()
  }
}

export const removeEvent = (el: Element): boolean => eventMap.delete(el)

export const addEvent = (el: Element, onClick: () => void): void => {
  eventMap.set(el, {
    handler: createHandel(el, onClick),
  })
}


const directive: Directive = {
  beforeMount(el, binding) {
    addEvent(el, binding.value)
  },
  updated(el, binding) {
    addEvent(el, binding.value)
  },
  unmounted(el) {
    removeEvent(el)
  },
}

export default directive

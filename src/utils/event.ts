interface EventHandel {
  (e: Event): unknown
}

interface EventOff {
  (
    elm: Element | Document,
    type: keyof HTMLElementEventMap,
    listener: EventHandel
  ): void
}

interface QuickOff {
  (): void
}

interface EventOn {
  (
    elm: Element | Document,
    type: keyof HTMLElementEventMap,
    listener: EventHandel
  ): QuickOff
}

export const on: EventOn = (elm, type, listener) => {
  elm.addEventListener(type, listener)
  return () => off(elm, type, listener)
}

export const off: EventOff = (elm, type, listener) => {
  elm.removeEventListener(type, listener)
}

const Event = {
  on, off,
}

export default Event

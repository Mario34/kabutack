import { rowType } from './index'

export const isElement = (target: unknown): target is HTMLElement => {
  return rowType(target).startsWith('HTML')
}

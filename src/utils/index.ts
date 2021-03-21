import { Fragment, Text, Comment } from 'vue'
import type { VNode } from 'vue'

export const isUndef = (val: unknown): val is undefined => val === undefined

export const isFn = (val: unknown): boolean => rowType(val) === 'Function'

/**
 * 获取数组项中第一个有效值，def为获取到有效值时返回的默认值
*/
export const getDefinedValue = (values: unknown[], def?: unknown): unknown => {
  const res = values.find(i => !isUndef(i))
  return isUndef(res) ? def : res
}

export const rowType = (target: unknown): string => {
  return Object.prototype.toString.call(target).slice(8, -1)
}

export const getFirstNode = (node: VNode[]): VNode | void => {
  if (Array.isArray(node)) {
    return getAvailableNode(node[0])
  } else {
    return getAvailableNode(node)
  }
}

export const getAvailableNode = (node: VNode): VNode | void => {
  if (node.type === Comment || node.type === Text) {
    return
  }
  if (node.type === Fragment || node.type === 'template') {
    return getFirstNode(node.children as VNode[])
  }
  return node
}

export const newWait = (t: number): Promise<void> => new Promise(resolve => {
  setTimeout(resolve, t)
})

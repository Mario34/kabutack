export const isUndef = (val: unknown): boolean => val === undefined

/**
 * 获取数组项中第一个有效值，def为获取到有效值时返回的默认值
*/
export const getDefinedValue = (values: unknown[], def?: unknown): unknown => {
  const res = values.find(i => !isUndef(i))
  return isUndef(res) ? def : res
}

const size = ['xs', 'sm', 'md', 'lg']

/**
 * 验证组件size属性
 */
export function validateGlobalSize(val: string): boolean {
  return size.includes(val)
}

/**
 * 验证枚举类型
 */
export function validateType<T>(types: T[]): (val: T) => boolean {
  return (val: T) => types?.includes(val)
}

/**
 * 安全获取类型
 */
export function searchType<T>(types: T[], val: T, def: T): T {
  return types.includes(val) ? val : def
}

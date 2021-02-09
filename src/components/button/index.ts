import Button from './src/button.vue'
import '/@/styles/button.scss'

export type BtnColorType = 'primary' | 'warning' | 'success' | 'danger'

export type NativeBtnType = 'button' | 'submit' | 'reset'
export interface ButtonProps {
  /**
   * 原生type
   */
  type?: NativeBtnType
  /**
   * 颜色类型
   */
  colorType?: BtnColorType
  /**
   * 组件尺寸
   */
  size?: ComponentSize
  /**
   * 禁用状态
   */
  disabled?: boolean
  /**
   * 浅色模式
   */
  light?: boolean
  /**
   * 加载状态
   */
  loading?: boolean
  /**
   * 图标
   */
  icon?: string
  /**
   * 圆角风格
   */
  round?: boolean
}

export default Button

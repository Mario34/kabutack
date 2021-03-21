import Tooltip from './src/tooltip'
import '/@/styles/tooltip.scss'

import type { Placement as _Placement } from '@popperjs/core'

export type TriggerType = 'hover' | 'click' | 'manual'
export type Placement = _Placement

export interface TooltipProps {
  isShow?: boolean
  content?: string
  placement?: Placement
  trigger?: TriggerType
  manual?: boolean
  showDelay?: number
  hideDelay?: number
  popperClass?: string
  disabled?: boolean
}

export default Tooltip

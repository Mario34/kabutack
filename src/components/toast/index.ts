import ToastComponent from './src/toast.vue'
import '/@/styles/toast.scss'
import type { VNode } from 'vue'
import { createVNode, render, Plugin } from 'vue'

export type ToastType = 'primary' | 'warning' | 'success' | 'error'| 'default'
export type ToastOnClose = () => void;
export type ToastUnmount = (id: number) => void;
export type ToastRender = () => VNode;

export interface ToastProps {
  /**
   * 标题
   */
  title?: string
  /**
   * 内容
   */
  content?: string
  /**
   * Toast类型 默认default
   */
  type?: ToastType
  /**
   * 持续时间(ms)
   */
  duration?: number
  /**
   * 关闭回调
   */
  onClose?: () => void
  /**
   * 可关闭的
   */
  isClosable?: boolean
  /**
   * 自定义内容
   */
  render?: ToastRender
}

export interface ToastCtx {
  close(): void
  elId: string
}

export interface ShowToast {
  (props: ToastProps): ToastCtx
}

export interface IToast extends ShowToast{
  closeAll(): void
  default: ShowToast
  primary: ShowToast
  warning: ShowToast
  success: ShowToast
  error: ShowToast
}

class KaToast {
  private id = 0 // 递增id
  private instanceMap: Map<number, { vm: VNode; el: Element; id: number }> = new Map()
  private containerId = 'ka-toast-container'

  /* 获取容器元素 */
  private getContainerElm(): Element {
    let elm = document.getElementById(this.containerId)
    if(!elm) {
      elm = document.createElement('div')
      elm.setAttribute('id', this.containerId)
      document.body.appendChild(elm)
    }
    return elm
  }

  /* 创建Toast挂载根结点 */
  private getRootElm(id: number): Element {
    const rootId = `ka-toast-root-${id}`
    const elm = document.createElement('div')
    elm.setAttribute('id', rootId)
    this.getContainerElm().appendChild(elm)
    return elm
  }

  public showToast = (props: ToastProps): ToastCtx => {
    const vmId = ++this.id
    const rootElm = this.getRootElm(vmId)
    const vm = createVNode(
      ToastComponent,
      {
        ...props,
        vmId,
        unmount: (id: number) => this.unmount(id),
      },
      props.render ? { default: props.render } : null,
    )
    this.instanceMap.set(this.id, { vm, el: rootElm, id: vmId })
    render(vm, rootElm)
    return {
      close: () => this.unmount(vmId),
      elId: rootElm.id,
    }
  }

  /* 卸载组件并移除挂载元素 */
  public unmount(id: number) {
    const elm = document.getElementById(`ka-toast-root-${id}`) as Element
    render(null, elm)
    this.instanceMap.delete(id)
    elm?.parentElement?.removeChild(elm)
    if(this.instanceMap.size === 0) {
      /* 重制id为零 */
      this.id = 0
    }
  }

  public closeAll = () => {
    this.instanceMap.forEach(({ vm }) => {
      // @ts-expect-error: undefined Type
      vm.component.ctx.delayUnmount()
    })
  }
}

const instance = new KaToast()

export const Toast: IToast = function(props: ToastProps = {}) {
  return instance.showToast(props)
} as IToast

Toast.closeAll = instance.closeAll

const TypeMethod: ToastType[] = ['default', 'primary', 'success', 'warning', 'error']

TypeMethod.forEach((type: ToastType) => {
  Toast[type] = (props: ToastProps = {}) => Toast({ ...props, type })
})

export default {
  install(app) {
    app.config.globalProperties.$KaToast = Toast
  },
} as Plugin

import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ToastComponent from '../src/toast.vue'

describe('ToastComponent', () => {
  test('render title', async () => {
    const wrapper = mount(ToastComponent, {
      props: {
        title: 'toast title',
      },
    })
    await nextTick()
    expect(wrapper.find('.ka-toast__main-title').text())
      .toContain('toast title')
  })

  test('render content', async () => {
    const wrapper = mount(ToastComponent, {
      props: {
        content: 'toast content',
      },
    })
    await nextTick()
    expect(wrapper.find('.ka-toast__main-content').text())
      .toContain('toast content')
  })

  test('render icon', async () => {
    const wrapper = mount(ToastComponent, {
      props: {
        title: 'toast title',
        content: 'toast content',
        type: 'warning',
      },
    })
    await nextTick()
    expect(wrapper.find('.ka-toast__icon use').attributes('href'))
      .toBe('#ka-icon-alert-triangle')
  })

  test('color type', async () => {
    const wrapper = mount(ToastComponent, {
      props: {
        title: 'toast title',
        content: 'toast content',
        type: 'error',
      },
    })
    await nextTick()
    expect(wrapper.find('.ka-toast.ka-color-error').exists()).toBe(true)
  })

  test('click close button and remove root element', async () => {
    let isClose = false
    const wrapper = mount(ToastComponent, {
      props: {
        title: 'toast title',
        content: 'toast content',
        type: 'warning',
        onClose: () => {
          isClose = true
        },
      },
    })
    await nextTick()
    expect(wrapper.find('.ka-toast').exists()).toBe(true)
    await wrapper.find('.ka-toast .ka-toast__btn').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-toast').exists()).toBe(false)
    expect(isClose).toBe(true)
  })

  test('min duration 500ms', async () => {
    let isClose = false
    const wrapper = mount(ToastComponent, {
      props: {
        title: 'toast title',
        content: 'toast content',
        type: 'warning',
        duration: 100,
        vmId: 0,
        onClose: () => {
          isClose = true
        },
      },
    })
    await nextTick()
    expect(wrapper.find('.ka-toast').exists()).toBe(true)
    await new Promise<void>((resolve) => { setTimeout(() => resolve(), 200)})
    expect(wrapper.find('.ka-toast').exists()).toBe(true)
    await new Promise<void>((resolve) => { setTimeout(() => resolve(), 300)})
    expect(wrapper.find('.ka-toast').exists()).toBe(false)
    expect(isClose).toBe(true)
  })
})

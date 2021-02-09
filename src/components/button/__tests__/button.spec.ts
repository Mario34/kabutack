import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import Button from '../src/button.vue'
import type { ButtonProps } from '../index'

describe('button', () => {
  test('render default slots', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Hello world',
      },
    })

    expect(wrapper.text()).toContain('Hello world')
  })

  test('native type', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'submit',
      } as ButtonProps,
      slots: {
        default: 'Hello world',
      },
    })

    expect(wrapper.attributes().type).toContain('submit')
  })

  test('class', () => {
    const wrapper = mount(Button, {
      global: {
        provide: {
          size: 'sm',
        },
      },
      props: {
        colorType: 'primary',
        size: 'lg',
        light: true,
        loading: true,
        round: true,
        disabled: true,
      } as ButtonProps,
      slots: {
        default: 'Hello world',
      },
    })

    expect(wrapper.attributes().class).toContain('size-lg')
    expect(wrapper.attributes().class).toContain('color-primary')
    expect(wrapper.attributes().class).toContain('is-light')
    expect(wrapper.attributes().class).toContain('is-loading')
    expect(wrapper.attributes().class).toContain('is-round')
    expect(wrapper.attributes().class).toContain('is-disabled')
  })

  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'info',
      } as ButtonProps,
      slots: {
        default: 'Hello world',
      },
    })

    expect(wrapper.find('.ka-button__icon').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello world')
  })

  test('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      } as ButtonProps,
      slots: {
        default: 'Hello world',
      },
    })

    expect(wrapper.attributes().disabled).toBeDefined()
  })


  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      } as ButtonProps,
      slots: {
        default: 'Hello world',
      },
    })

    expect(wrapper.attributes().disabled).toBeDefined()
  })

  test('click', async () => {
    const wrapper = mount({
      template: '<Button @click="onClick">count:{{count}}</Button>',
      components: {
        Button,
      },
      provide: {
        size: 'sm',
      },
      setup() {
        const count = ref(0)
        const onClick = () => {
          count.value++
        }
        return {
          count,
          onClick,
        }
      },
    })

    await wrapper.find('.ka-button').trigger('click')
    await wrapper.find('.ka-button').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-button').html()).toContain('count:2')
  })

  test('loading click', async () => {
    const wrapper = mount({
      template: '<Button @click="onClick" loading>count:{{count}}</Button>',
      components: {
        Button,
      },
      provide: {
        size: 'sm',
      },
      setup() {
        const count = ref(0)
        const onClick = () => {
          count.value++
        }
        return {
          count,
          onClick,
        }
      },
    })

    await wrapper.find('.ka-button').trigger('click')
    await wrapper.find('.ka-button').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-button').html()).toContain('count:0')
  })
})

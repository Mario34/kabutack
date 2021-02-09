import { mount } from '@vue/test-utils'
import Icon from '../src/icon.vue'
import type { IconProps } from '../index'

describe('icon', () => {
  test('render icon', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: 'github',
      } as IconProps,
    })

    expect(wrapper.find('use').attributes('href')).toBe('#ka-icon-github')
  })
})

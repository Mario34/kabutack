import { mount } from '@vue/test-utils'
import Tooltip from '../index'
import { newWait } from '/@/utils'

const components = {
  [Tooltip.name]: Tooltip,
}

const Text = 'Tooltip'

describe('Tooltip', () => {
  test('render', async () => {
    const wrapper = mount({
      template: `
        <ka-tooltip content="this is tooltip content.">
          <div class="render-trigger">${Text}</div>
        </ka-tooltip>
      `,
      components,
    })
    expect(wrapper.find('.render-trigger').text()).toBe(Text)
  })

  test('hover trigger', async () => {
    const wrapper = mount({
      template: `
        <ka-tooltip class="hover-trigger-tooltip" content="this is tooltip content.">
          <div class="hover-trigger">${Text}</div>
        </ka-tooltip>
      `,
      components,
    })
    await newWait(200)
    expect(wrapper.find('.hover-trigger').text()).toContain(Text)
    expect(document.querySelector('.hover-trigger-tooltip')?.getAttribute('data-show')).toBe(null)
    wrapper.find('.hover-trigger').trigger('mouseenter')
    await newWait(200)
    expect(document.querySelector('.hover-trigger-tooltip')?.getAttribute('data-show')).toBe('')
    wrapper.find('.hover-trigger').trigger('mouseleave')
    await newWait(200)
    expect(document.querySelector('.hover-trigger-tooltip')?.getAttribute('data-show')).toBe(null)
  })

  test('click trigger', async () => {
    const wrapper = mount({
      template: `
        <ka-tooltip
          class="click-trigger-tooltip"
          content="this is tooltip content."
          triggerType="click"
        >
          <div class="click-trigger">${Text}</div>
        </ka-tooltip>
      `,
      components,
    })
    await newWait(200)
    expect(wrapper.find('.click-trigger').text()).toContain(Text)
    expect(document.querySelector('.click-trigger-tooltip')?.getAttribute('data-show')).toBe(null)
    wrapper.find('.click-trigger').trigger('click')
    await newWait(500)
    expect(document.querySelector('.click-trigger-tooltip')?.getAttribute('data-show')).toBe('')
    wrapper.find('.click-trigger').trigger('click')
  })

  test('manual trigger', async () => {
    const wrapper = mount({
      template: `
        <ka-tooltip
          class="manual-trigger-tooltip"
          content="this is tooltip content."
          triggerType="manual"
          :isShow="true"
        >
          <div class="click-trigger">${Text}</div>
        </ka-tooltip>
      `,
      components,
    })
    await newWait(200)
    expect(wrapper.find('.click-trigger').text()).toContain(Text)
    expect(document.querySelector('.manual-trigger-tooltip')?.getAttribute('data-show')).toBe('')
  })
})

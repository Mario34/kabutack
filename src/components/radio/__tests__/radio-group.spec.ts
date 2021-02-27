import { Radio, RadioGroup } from '../index'
import { mount } from '@vue/test-utils'
import { reactive, nextTick } from 'vue'

const components = {
  [Radio.name]: Radio,
  [RadioGroup.name]: RadioGroup,
}

describe('radio-group', () => {
  test('render', () => {
    const wrapper = mount({
      template: `
        <ka-radio-group>slot</ka-radio-group>
      `,
      components,
    })

    expect(wrapper.find('.ka-radio-group').text()).toContain('slot')
  })

  test('group', async () => {
    const wrapper = mount({
      template: `
        <ka-radio-group v-model="form.check">
          <ka-radio value="A"/>
          <ka-radio value="B"/>
          <ka-radio value="C"/>
        </ka-radio-group>
        <div class="group-value">{{ form.check }}</div>
      `,
      components,
      setup() {
        const form = reactive({ })
        return {
          form,
        }
      },
    })
    const items = wrapper.findAll('.ka-radio')
    const getValueText = () => wrapper.find('.group-value').text()

    expect(items[0].trigger('click'))
    await nextTick()
    expect(getValueText()).toBe('A')

    expect(items[1].trigger('click'))
    await nextTick()
    expect(getValueText()).toBe('B')

    expect(items[2].trigger('click'))
    await nextTick()
    expect(getValueText()).toBe('C')
  })
})

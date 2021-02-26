import { CheckBox, CheckBoxGroup } from '../index'
import { mount } from '@vue/test-utils'
import { reactive, nextTick } from 'vue'

const components = {
  [CheckBox.name]: CheckBox,
  [CheckBoxGroup.name]: CheckBoxGroup,
}

describe('check-box-group', () => {
  test('render', () => {
    const wrapper = mount({
      template: `
        <ka-check-box-group>slot</ka-check-box-group>
      `,
      components,
    })

    expect(wrapper.find('.ka-check-box-group').text()).toContain('slot')
  })

  test('group', async () => {
    const wrapper = mount({
      template: `
        <ka-check-box-group v-model="form.check">
          <ka-check-box name="A">A</ka-check-box>
          <ka-check-box name="B">B</ka-check-box>
          <ka-check-box name="C">C</ka-check-box>
        </ka-check-box-group>
        <div class="group-value">{{ form.check }}</div>
      `,
      components,
      setup() {
        const form = reactive({ check: [] })
        return {
          form,
        }
      },
    })
    const items = wrapper.findAll('.ka-check-box') // []
    const getValueText = () => wrapper.find('.group-value').text()

    expect(items[0].trigger('click')) // ['A']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(false)
    expect(getValueText().includes('C')).toBe(false)

    expect(items[1].trigger('click')) // ['A','B']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(true)
    expect(getValueText().includes('C')).toBe(false)

    expect(items[2].trigger('click')) // ['A','B','C']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(true)
    expect(getValueText().includes('C')).toBe(true)

    expect(items[2].trigger('click')) // ['A','B']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(true)
    expect(getValueText().includes('C')).toBe(false)

    expect(items[0].trigger('click')) // ['B']
    await nextTick()
    expect(getValueText().includes('A')).toBe(false)
    expect(getValueText().includes('B')).toBe(true)
    expect(getValueText().includes('C')).toBe(false)

    expect(items[1].trigger('click')) // []
    await nextTick()
    expect(getValueText().includes('A')).toBe(false)
    expect(getValueText().includes('B')).toBe(false)
    expect(getValueText().includes('C')).toBe(false)
  })

  test('limit', async () => {
    const wrapper = mount({
      template: `
        <ka-check-box-group v-model="form.check" :max="2" :min="1">
          <ka-check-box name="A">A</ka-check-box>
          <ka-check-box name="B">B</ka-check-box>
          <ka-check-box name="C">C</ka-check-box>
        </ka-check-box-group>
        <div class="group-value">{{ form.check }}</div>
      `,
      components,
      setup() {
        const form = reactive({ check: [] })
        return {
          form,
        }
      },
    })
    const items = wrapper.findAll('.ka-check-box') // []
    const getValueText = () => wrapper.find('.group-value').text()

    expect(items[0].trigger('click')) // ['A']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(false)
    expect(getValueText().includes('C')).toBe(false)

    expect(items[0].trigger('click')) // ['A']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(false)
    expect(getValueText().includes('C')).toBe(false)

    expect(items[1].trigger('click')) // ['A','B']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(true)
    expect(getValueText().includes('C')).toBe(false)

    expect(items[2].trigger('click')) // ['A','B']
    await nextTick()
    expect(getValueText().includes('A')).toBe(true)
    expect(getValueText().includes('B')).toBe(true)
    expect(getValueText().includes('C')).toBe(false)
  })
})

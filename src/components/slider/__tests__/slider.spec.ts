import Slider from '../index'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { Form, FormItem } from '/@/components/form'

const components = {
  [Slider.name]: Slider,
  [Form.name]: Form,
  [FormItem.name]: FormItem,
}

describe('slider', () => {
  test('render', () => {
    const wrapper = mount({
      template: `
        <ka-slider v-model="value" :max="10" />
      `,
      components,
      setup() {
        const value = ref(0)

        return {
          value,
        }
      },
    })

    expect(wrapper.find('.ka-slider__controller').exists()).toBe(true)
  })

  test('value', () => {
    const wrapper = mount({
      template: `
        <ka-form>
          <ka-form-item name="name">
            <ka-slider v-model="value" :max="10" />
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const value = ref(2)

        return {
          value,
        }
      },
    })
    expect(wrapper.findComponent({ name: 'KaSlider' }).vm.stateValue).toBe(2)
  })
})

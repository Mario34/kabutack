import Switch from '../index'
import { reactive, nextTick, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { Form, FormItem } from '/@/components/form'

const components = {
  [Form.name]: Form,
  [FormItem.name]: FormItem,
  [Switch.name]: Switch,
}

describe('switch', () => {
  test('render', () => {
    const checked = mount(Switch, {
      props: {
        modelValue: true,
      },
    })
    const unCheck = mount(Switch, {
      props: {
        modelValue: false,
      },
    })

    expect(checked.find('.ka-switch').attributes('class')).toContain('ka-is-checked')
    expect(unCheck.find('.ka-switch').attributes('class').includes('ka-is-checked')).toBe(false)
  })

  test('controlled', async () => {
    const wrapper = mount({
      template: `
        <ka-switch v-model="value"/>
      `,
      components,
      setup() {
        const value = ref(false)
        nextTick(() => {
          value.value = true
        })
        return {
          value,
        }
      },
    })
    expect(wrapper.find('.ka-switch').attributes('class').includes('ka-is-checked')).toBe(false)
    await nextTick()
    expect(wrapper.find('.ka-switch').attributes('class').includes('ka-is-checked')).toBe(true)
  })

  test('v-model', async () => {
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="check" label="check label">
            <ka-switch v-model="form.check"/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({
          check: false,
        })

        return {
          form,
        }
      },
    })
    expect(wrapper.find('.ka-switch').attributes('class').includes('ka-is-checked')).toBe(false)
    wrapper.find('.ka-switch__input').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-switch').attributes('class')).toContain('ka-is-checked')
    wrapper.find('.ka-switch__input').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-switch').attributes('class').includes('ka-is-checked')).toBe(false)
  })

  test('disabled', async () => {
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="check0" label="check label">
            <!-- 0 -->
            <ka-switch v-model="form.check0"/>
          </ka-form-item>
          <ka-form-item class="" name="check1" label="check label">
            <!-- 1 -->
            <ka-switch v-model="form.check1" disabled/>
          </ka-form-item>
          <ka-form-item class="" name="check2" label="check label" disabled>
            <!-- 2 -->
            <ka-switch v-model="form.check2"/>
          </ka-form-item>
          <ka-form-item name="check3" label="check label" :disabled="false">
            <!-- 3 -->
            <ka-switch v-model="form.check3" disabled/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({
          check0: false,
          check1: false,
          check2: false,
          check3: false,
          check4: false,
          check5: false,
        })

        return {
          form,
        }
      },
    })
    const items = wrapper.findAll('.ka-switch')
    for(let i = 0; i < items.length; i++) {
      items[i].find('.ka-switch__input').trigger('click')
      await nextTick()
    }
    expect(items[0].attributes('class')).toContain('ka-is-checked')
    expect(items[1].attributes('class').includes('ka-is-checked')).toBe(false)
    expect(items[2].attributes('class').includes('ka-is-checked')).toBe(false)
    expect(items[3].attributes('class')).toContain('ka-is-checked')
  })

  test('size', async () => {
    const wrapper = mount({
      template: `
        <!-- 0 -->
        <ka-switch v-model="form.check"/>
        <!-- 1 -->
        <ka-switch v-model="form.check" size="xs"/>
        <!-- 2 -->
        <ka-switch v-model="form.check" size="sm"/>
        <!-- 3 -->
        <ka-switch v-model="form.check" size="md"/>
        <ka-form :form="form" size="sm">
          <ka-form-item name="test">
            <!-- 4 -->
            <ka-switch v-model="form.check"/>
          </ka-form-item>
        </ka-form>
        <ka-form :form="form" size="sm">
          <ka-form-item name="test" size="md">
            <!-- 5 -->
            <ka-switch v-model="form.check"/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({ check: false })

        provide('KabutackConfig', reactive({
          size: 'lg',
        }))

        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-switch')
    expect(items[0].attributes('class')).toContain('ka-size-lg')
    expect(items[1].attributes('class')).toContain('ka-size-xs')
    expect(items[2].attributes('class')).toContain('ka-size-sm')
    expect(items[3].attributes('class')).toContain('ka-size-md')
    expect(items[4].attributes('class')).toContain('ka-size-sm')
    expect(items[5].attributes('class')).toContain('ka-size-md')
  })

  test('type', async () => {
    const wrapper = mount({
      template: `
        <!-- 0 -->
        <ka-switch v-model="form.check"/>
        <!-- 1 -->
        <ka-switch v-model="form.check" type="primary"/>
        <!-- 2 -->
        <ka-switch v-model="form.check" type="success"/>
        <!-- 3 -->
        <ka-switch v-model="form.check" type="warning"/>
        <!-- 4 -->
        <ka-switch v-model="form.check" type="danger"/>
      `,
      components,
      setup() {
        const form = reactive({ check: false })

        provide('KabutackConfig', reactive({
          size: 'lg',
        }))

        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-switch')
    expect(items[0].attributes('class')).toContain('ka-type-primary')
    expect(items[1].attributes('class')).toContain('ka-type-primary')
    expect(items[2].attributes('class')).toContain('ka-type-success')
    expect(items[3].attributes('class')).toContain('ka-type-warning')
    expect(items[4].attributes('class')).toContain('ka-type-danger')
  })

  test('true/false value', async () => {
    const wrapper = mount({
      template: `
        <div class="check-value">{{ form.check }}</div>
        <ka-switch v-model="form.check" :true-value="1" :false-value="2"/>
      `,
      components,
      setup() {
        const form = reactive({ check: 1 })
        provide('KabutackConfig', reactive({
          size: 'lg',
        }))

        return {
          form,
        }
      },
    })

    const item = wrapper.find('.ka-switch')
    expect(item.attributes('class').includes('ka-is-checked')).toBe(true)
    item.find('.ka-switch__input').trigger('click')
    await nextTick()
    expect(item.attributes('class').includes('ka-is-checked')).toBe(false)
    expect(wrapper.find('.check-value').text()).toContain('2')
  })
})

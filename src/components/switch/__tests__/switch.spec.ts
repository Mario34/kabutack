import Switch from '../index'
import { reactive, nextTick, provide } from 'vue'
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
    wrapper.find('.ka-switch').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-switch').attributes('class')).toContain('ka-is-checked')
    wrapper.find('.ka-switch').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-switch').attributes('class').includes('ka-is-checked')).toBe(false)
  })

  test('disabled', async () => {
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="check0" label="check label">
            <ka-switch v-model="form.check0"/>
          </ka-form-item>
          <ka-form-item class="" name="check1" label="check label">
            <ka-switch v-model="form.check1" disabled/>
          </ka-form-item>
          <ka-form-item class="" name="check2" label="check label" disabled>
            <ka-switch v-model="form.check2"/>
          </ka-form-item>
          <ka-form-item name="check3" label="check label" :disabled="false">
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
      items[i].trigger('click')
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
        <ka-switch v-model="form.check"/>
        <ka-switch v-model="form.check" size="xs"/>
        <ka-switch v-model="form.check" size="sm"/>
        <ka-switch v-model="form.check" size="md"/>
        <ka-form :form="form" size="sm">
          <ka-form-item name="test">
            <ka-switch v-model="form.check"/>
          </ka-form-item>
        </ka-form>
        <ka-form :form="form" size="sm">
          <ka-form-item name="test" size="md">
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
        <ka-switch v-model="form.check"/>
        <ka-switch v-model="form.check" type="primary"/>
        <ka-switch v-model="form.check" type="success"/>
        <ka-switch v-model="form.check" type="warning"/>
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
})

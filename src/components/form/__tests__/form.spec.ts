import { mount } from '@vue/test-utils'
import { reactive, provide } from 'vue'
import Form from '../src/form.vue'
import FormItem from '../src/form-item.vue'
import type { } from '../index'

const components = {
  [Form.name]: Form,
  [FormItem.name]: FormItem,
}

describe('form', () => {
  test('render default slots', () => {
    const wrapper = mount(Form, {
      props: {
        form: {},
      },
      slots: {
        default: 'Hello world',
      },
    })
    expect(wrapper.text()).toContain('Hello world')
  })

  test('label', () => {
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item label="name" name="name">
            <input v-model="form.name"/>
          </ka-form-item>
          <ka-form-item label="class" name="class">
            <input v-model="form.class"/>
          </ka-form-item>
          <ka-form-item name="noLabel">
            <input v-model="form.class"/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({})
        return {
          form,
        }
      },
    })

    const labels = wrapper.findAll('.ka-form-item')
    expect(labels[0].find('.ka-form-item__label').text()).toContain('name')
    expect(labels[1].find('.ka-form-item__label').text()).toContain('class')
    expect(labels[2].find('.ka-form-item__label').exists()).toBeFalsy()
  })

  test('labelAlign', () => {
    const wrapper = mount({
      template: `
      <ka-form :form="form" label-align="left">
        <ka-form-item label="name" name="name" label-align="top">
          <input v-model="form.name"/>
        </ka-form-item>
        <ka-form-item label="class" name="class" label-align="right">
          <input v-model="form.class"/>
        </ka-form-item>
        <ka-form-item label="class" name="class">
          <input v-model="form.class"/>
        </ka-form-item>
      </ka-form>
      `,
      components,
      setup() {
        const form = reactive({})
        return {
          form,
        }
      },
    })

    const labels = wrapper.findAll('.ka-form-item')
    expect(labels[0].attributes('class')).toContain('ka-align-top')
    expect(labels[1].attributes('class')).toContain('ka-align-right')
    expect(labels[2].attributes('class')).toContain('ka-align-left')
  })

  test('inline', () => {
    const wrapper = mount({
      template: `
        <ka-form :form="form" inline>
          <ka-form-item label="name" name="name">
            <input v-model="form.name"/>
          </ka-form-item>
          <ka-form-item label="class" name="class" :inline="false">
            <input v-model="form.class"/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({})
        return {
          form,
        }
      },
    })

    const labels = wrapper.findAll('.ka-form-item')
    expect(labels[0].attributes('class')).toContain('ka-is-inline')
    expect(labels[1].attributes('class').includes('ka-is-inline')).toBeFalsy()
  })
  test('size', () => {
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item label="name" name="name" size="lg">
            <input v-model="form.name"/>
          </ka-form-item>
          <ka-form-item label="class" name="class">
            <input v-model="form.class"/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({})
        provide('KabutackConfig', reactive({
          size: 'sm',
        }))
        return {
          form,
        }
      },
    })

    const labels = wrapper.findAll('.ka-form-item')
    expect(labels[0].attributes('class')).toContain('ka-size-lg')
    expect(labels[1].attributes('class')).toContain('ka-size-sm')
  })
})

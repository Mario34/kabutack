import Input from '../index'
import { ref, reactive, nextTick, provide } from 'vue'
import { mount } from '@vue/test-utils'
import { Form, FormItem } from '/@/components/form'

const components = {
  [Form.name]: Form,
  [FormItem.name]: FormItem,
  [Input.name]: Input,
}

describe('input', () => {
  test('render', () => {
    const wrapper = mount({
      template: `
        <ka-input v-model="value" />
      `,
      components,
      setup() {
        const value = ref('init value')
        return {
          value,
        }
      },
    })
    expect((wrapper.get('.ka-input__inner').element as HTMLInputElement).value).toBe('init value')
  })

  test('controlled', async () => {
    const wrapper = mount({
      template: `
        <ka-input v-model="value" />
      `,
      components,
      setup() {
        const value = ref('init value')
        nextTick(() => {
          value.value = 'changed value'
        })
        return {
          value,
        }
      },
    })
    expect((wrapper.get('.ka-input__inner').element as HTMLInputElement).value).toBe('init value')
    await nextTick()
    expect((wrapper.get('.ka-input__inner').element as HTMLInputElement).value).toBe('changed value')
  })

  test('size', () => {
    /**
     * size 支持接收Form FormItem props globalConfig中的size属性
     * 优先级为 props > FormItem > Form > globalConfig
    */
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="class">
            <!-- 0 -->
            <ka-input v-model="form.class"/>
          </ka-form-item>
          <ka-form-item name="name" size="md">
            <!-- 1 -->
            <ka-input v-model="form.name"/>
          </ka-form-item>
          <ka-form-item name="class" size="md">
            <!-- 2 -->
            <ka-input v-model="form.class" size="sm"/>
          </ka-form-item>
          </ka-form>
          <ka-form :form="form" size="md">
          <ka-form-item name="class">
            <!-- 3 -->
            <ka-input v-model="form.class"/>
          </ka-form-item>
          <ka-form-item name="class" size="xs">
            <!-- 4 -->
            <ka-input v-model="form.class"/>
          </ka-form-item>
          <ka-form-item name="class" size="xs">
            <!-- 5 -->
            <ka-input v-model="form.class" size="sm"/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({ name: '', class: '' })
        provide(
          'KabutackConfig',
          reactive({
            size: 'lg',
          }),
        )
        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-input')
    expect(items[0].attributes('class').includes('ka-size-lg')).toBe(true)
    expect(items[1].attributes('class').includes('ka-size-md')).toBe(true)
    expect(items[2].attributes('class').includes('ka-size-sm')).toBe(true)
    expect(items[3].attributes('class').includes('ka-size-md')).toBe(true)
    expect(items[4].attributes('class').includes('ka-size-xs')).toBe(true)
    expect(items[5].attributes('class').includes('ka-size-sm')).toBe(true)
  })

  test('disabled', () => {
    /**
     * disabled 支持接收Form FormItem props中的disabled属性
     * 优先级为 Form > FormItem > Form > props
    */
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="name">
            <!-- 0 -->
            <ka-input v-model="form.name"/>
          </ka-form-item>
          <ka-form-item name="name">
            <!-- 1 -->
            <ka-input v-model="form.name" disabled/>
          </ka-form-item>
          <ka-form-item name="name" disabled>
            <!-- 2 -->
            <ka-input v-model="form.name" :disabled="false"/>
          </ka-form-item>
          <ka-form-item name="class">
            <!-- 3 -->
            <ka-input v-model="form.name" disabled/>
          </ka-form-item>
        </ka-form>
        <ka-form :form="form" disabled >
          <ka-form-item name="class">
            <!-- 4 -->
            <ka-input v-model="form.name"/>
          </ka-form-item>
          <ka-form-item name="name" :disabled="false">
            <!-- 5 -->
            <ka-input v-model="form.name" :disabled="false"/>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({ name: '' })
        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-input')
    expect(items[0].attributes('class').includes('ka-is-disabled')).toBe(false)
    expect(items[1].attributes('class').includes('ka-is-disabled')).toBe(true)
    expect(items[2].attributes('class').includes('ka-is-disabled')).toBe(true)
    expect(items[3].attributes('class').includes('ka-is-disabled')).toBe(true)
    expect(items[4].attributes('class').includes('ka-is-disabled')).toBe(true)
    expect(items[5].attributes('class').includes('ka-is-disabled')).toBe(true)
  })

  test('clearable', () => {
    const wrapper = mount({
      template: `
        <!-- 0 -->
        <ka-input v-model="form.name"/>
        <!-- 1 -->
        <ka-input v-model="form.name" clearable/>
        <!-- 2 -->
        <ka-input v-model="form.class"/>
        <!-- 3 -->
        <ka-input v-model="form.class" clearable/>
        <!-- 4 -->
        <ka-input v-model="form.class" clearable disabled/>
      `,
      components,
      setup() {
        const form = reactive({ name: '', class: 'No.1' })
        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-input')
    expect(items[0].attributes('class').includes('ka-is-clearable')).toBe(false)
    expect(items[0].find('.ka-input__clear').exists()).toBe(false)
    expect(items[1].attributes('class').includes('ka-is-clearable')).toBe(true)
    expect(items[1].find('.ka-input__clear').exists()).toBe(false)
    expect(items[2].attributes('class').includes('ka-is-clearable')).toBe(false)
    expect(items[2].find('.ka-input__clear').exists()).toBe(false)
    expect(items[3].attributes('class').includes('ka-is-clearable')).toBe(true)
    expect(items[3].find('.ka-input__clear').exists()).toBe(true)
    expect(items[4].attributes('class').includes('ka-is-clearable')).toBe(true)
    expect(items[4].find('.ka-input__clear').exists()).toBe(false)
  })

  test('inline', () => {
    const wrapper = mount({
      template: `
        <ka-input v-model="form.name"/>
        <ka-input v-model="form.name" inline/>
      `,
      components,
      setup() {
        const form = reactive({ name: '' })
        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-input')
    expect(items[0].attributes('class').includes('ka-is-inline')).toBe(false)
    expect(items[1].attributes('class').includes('ka-is-inline')).toBe(true)
  })

  test('prefix', () => {
    const wrapper = mount({
      template: `
        <ka-input v-model="form.name"/>
        <ka-input v-model="form.name" prefix="github"/>
      `,
      components,
      setup() {
        const form = reactive({ name: '' })
        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-input')
    expect(items[0].find('.ka-input__prefix').exists()).toBe(false)
    expect(items[1].find('.ka-input__prefix').exists()).toBe(true)
  })

  test('suffix', () => {
    /* 右边的icon与轻触按钮同时出现时，清除按钮优先显示 */
    const wrapper = mount({
      template: `
        <!-- 0 -->
        <ka-input v-model="form.name"/>
        <!-- 1 -->
        <ka-input v-model="form.class" suffix="github"/>
        <!-- 2 -->
        <ka-input v-model="form.class" suffix="github" clearable/>
      `,
      components,
      setup() {
        const form = reactive({ name: '', class: 'No.1' })
        return {
          form,
        }
      },
    })

    const items = wrapper.findAll('.ka-input')
    expect(items[0].find('.ka-input__suffix').exists()).toBe(false)
    expect(items[1].find('.ka-input__suffix').exists()).toBe(true)
    expect(items[2].find('.ka-input__suffix').exists()).toBe(false)
    expect(items[2].find('.ka-input__clear').exists()).toBe(true)
  })

  test('type password', () => {
    /**
     * 右侧图标或按钮显示优先级
     * password > clear > suffix
     */
    const wrapper = mount({
      template: `
        <ka-input v-model="form.pass" type="password" clearable suffix="github"/>
      `,
      components,
      setup() {
        const form = reactive({ pass: 'pass' })
        return {
          form,
        }
      },
    })

    expect(wrapper.find('.ka-input__switch-type').exists()).toBe(true)
    expect(wrapper.find('.ka-input__suffix').exists()).toBe(false)
    expect(wrapper.find('.ka-input__clear').exists()).toBe(false)
  })

  test('native attributes', () => {
    const wrapper = mount({
      template: `
        <ka-input
          v-model="form.name"
          type="password"
          maxLength="12"
          placeholder="placeholder str"
          autocomplete="on"
        />
      `,
      components,
      setup() {
        const form = reactive({ name: '', class: 'No.1' })
        return {
          form,
        }
      },
    })

    const input = wrapper.find('.ka-input .ka-input__inner')
    expect(input.attributes('type')).toBe('password')
    expect(input.attributes('maxlength')).toBe('12')
    expect(input.attributes('placeholder')).toBe('placeholder str')
    expect(input.attributes('autocomplete')).toBe('on')
  })
})

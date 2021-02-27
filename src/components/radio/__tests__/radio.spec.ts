import { Radio, RadioGroup } from '../index'
import { reactive, nextTick, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { Form, FormItem } from '/@/components/form'

const components = {
  [Form.name]: Form,
  [FormItem.name]: FormItem,
  [Radio.name]: Radio,
  [RadioGroup.name]: RadioGroup,
}

describe('radio', () => {
  test('render', () => {
    const wrapper = mount({
      template: `
        <ka-radio />
      `,
      components,
    })

    expect(wrapper.find('.ka-radio__input').exists()).toBe(true)
    const vm = wrapper.getComponent({ name: 'KaRadio' }).vm as any
    expect(vm?.checked).toBe(false)
  })

  test('controlled', async () => {
    let model = ''
    const wrapper = mount({
      template: `
        <ka-radio v-model="value" value="A" @change="onChange" />
      `,
      components,
      setup() {
        const value = ref()
        const onChange = (val: any) => {
          model = val
        }
        nextTick(() => {
          value.value = 'A'
        })
        return {
          value,
          onChange,
        }
      },
    })
    expect(wrapper.find('.ka-radio').attributes('class').includes('ka-is-checked')).toBe(false)
    wrapper.find('.ka-radio').trigger('click')
    await nextTick()
    expect(model).toBe('A')
    expect(wrapper.find('.ka-radio').attributes('class').includes('ka-is-checked')).toBe(true)
    wrapper.find('.ka-radio').trigger('click')
    await nextTick()
    expect(model).toBe('A')
    expect(wrapper.find('.ka-radio').attributes('class').includes('ka-is-checked')).toBe(true)
    wrapper.find('.ka-radio').trigger('click')
  })

  test('disabled', async () => {
    /**
     * disabled 支持接收Form FormItem RadioGroup props中的disabled属性
     * 优先级为 Form > FormItem > Form > RadioGroup> props
    */
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="check0" label="check label">
            <!-- 0 -->
            <ka-radio v-model="form.check0" disabled/>
          </ka-form-item>
          <ka-form-item class="" name="check1" label="check label" :disabled="false">
            <!-- 1 -->
            <ka-radio v-model="form.check1" disabled/>
          </ka-form-item>
          <ka-form-item class="" name="check2" label="check label" :disabled="false">
            <!-- 2 -->
            <ka-radio-group v-model="form.check4" disabled>
              <ka-radio name="a" />
            </ka-radio-group>
          </ka-form-item>
        </ka-form>
        <ka-form :form="form" disabled>
          <ka-form-item name="check0" label="check label" :disabled="false">
            <!-- 3 -->
            <ka-radio v-model="form.check0"/>
          </ka-form-item>
          <ka-form-item class="" name="check1" label="check label" :disabled="false">
            <!-- 4 -->
            <ka-radio v-model="form.check1" :disabled="false"/>
          </ka-form-item>
          <ka-form-item class="" name="check2" label="check label" :disabled="false">
            <!-- 5 -->
            <ka-radio-group v-model="form.check4" :disabled="false">
              <ka-radio name="a" />
            </ka-radio-group>
          </ka-form-item>
        </ka-form>
      `,
      components,
      setup() {
        const form = reactive({})
        const disabled = ref(false)
        const switchDisabled = () => disabled.value = !disabled.value
        provide('KabutackConfig', reactive({
          size: 'sm',
        }))
        return {
          form,
          disabled,
          switchDisabled,
        }
      },
    })

    const checkBox = wrapper.findAll('.ka-radio')
    const getClass = (index: number) => checkBox[index].attributes('class')
    const getInner = (index: number) => checkBox[index].find('.ka-radio__input')

    expect(getClass(0).includes('ka-is-disabled')).toBe(true)
    expect(getInner(0).attributes('disabled')).toBe('')

    expect(getClass(1).includes('ka-is-disabled')).toBe(false)
    expect(getInner(1).attributes('disabled')).toBe(undefined)

    expect(getClass(2).includes('ka-is-disabled')).toBe(false)
    expect(getInner(2).attributes('disabled')).toBe(undefined)

    expect(getClass(3).includes('ka-is-disabled')).toBe(true)
    expect(getInner(3).attributes('disabled')).toBe('')

    expect(getClass(4).includes('ka-is-disabled')).toBe(true)
    expect(getInner(4).attributes('disabled')).toBe('')

    expect(getClass(5).includes('ka-is-disabled')).toBe(true)
    expect(getInner(5).attributes('disabled')).toBe('')
  })

  test('size', () => {
    /**
     * size 支持接收Form FormItem props globalConfig中的size属性
     * 优先级为 props > RadioGroup > FormItem > Form > globalConfig
    */
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="a">
            <!-- 0 -->
            <ka-radio v-model="form.a"/>
          </ka-form-item>
          <ka-form-item name="b" size="md">
            <!-- 1 -->
            <ka-radio v-model="form.b"/>
          </ka-form-item>
          <ka-form-item name="c" size="md">
            <!-- 2 -->
            <ka-radio v-model="form.c" size="sm"/>
          </ka-form-item>
        </ka-form>
        <ka-form :form="form" size="md">
          <ka-form-item name="d">
            <!-- 3 -->
            <ka-radio v-model="form.d"/>
          </ka-form-item>
          <ka-form-item name="e" size="xs">
            <!-- 4 -->
            <ka-radio v-model="form.e"/>
          </ka-form-item>
          <ka-form-item name="f" size="xs">
            <!-- 5 -->
            <ka-radio v-model="form.f" size="sm"/>
          </ka-form-item>
          <ka-form-item name="g" size="xs">
            <!-- 6 -->
            <ka-radio-group v-model="form.g" size="sm">
              <ka-radio />
            </ka-radio-group>
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

    const items = wrapper.findAll('.ka-radio')
    expect(items[0].attributes('class').includes('ka-size-lg')).toBe(true)
    expect(items[1].attributes('class').includes('ka-size-md')).toBe(true)
    expect(items[2].attributes('class').includes('ka-size-sm')).toBe(true)
    expect(items[3].attributes('class').includes('ka-size-md')).toBe(true)
    expect(items[4].attributes('class').includes('ka-size-xs')).toBe(true)
    expect(items[5].attributes('class').includes('ka-size-sm')).toBe(true)
    expect(items[6].attributes('class').includes('ka-size-sm')).toBe(true)
  })
})

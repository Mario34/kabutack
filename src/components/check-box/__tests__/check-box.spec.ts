import { CheckBox, CheckBoxGroup } from '../index'
import { reactive, nextTick, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { Form, FormItem } from '/@/components/form'

const components = {
  [Form.name]: Form,
  [FormItem.name]: FormItem,
  [CheckBox.name]: CheckBox,
  [CheckBoxGroup.name]: CheckBoxGroup,
}

describe('check-box', () => {
  test('render', () => {
    const wrapper = mount({
      template: `
        <ka-check-box />
      `,
      components,
    })

    expect(wrapper.find('.ka-check-box__inner').exists()).toBe(true)
    const vm = wrapper.getComponent({ name: 'KaCheckBox' }).vm as any
    expect(vm?.checked).toBe(false)
  })

  test('controlled', async () => {
    const wrapper = mount({
      template: `
        <ka-check-box v-model="value"/>
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
    expect(wrapper.find('.ka-check-box').attributes('class').includes('ka-is-checked')).toBe(false)
    await nextTick()
    expect(wrapper.find('.ka-check-box').attributes('class').includes('ka-is-checked')).toBe(true)
    wrapper.find('.ka-check-box').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-check-box').attributes('class').includes('ka-is-checked')).toBe(false)
  })

  test('indeterminate', async () => {
    /* 当绑定的值为 truthy 值，indeterminate状态会被忽略 */
    const wrapper = mount({
      template: `
        <ka-check-box v-model="value" indeterminate />
      `,
      components,
      setup() {
        const value = ref(false)
        return {
          value,
        }
      },
    })

    expect(wrapper.find('.ka-check-box').attributes('class').includes('ka-is-checked')).toBe(false)
    expect(wrapper.find('.ka-check-box').attributes('class').includes('ka-is-indeterminate')).toBe(true)
    wrapper.find('.ka-check-box').trigger('click')
    await nextTick()
    expect(wrapper.find('.ka-check-box').attributes('class').includes('ka-is-checked')).toBe(true)
    expect(wrapper.find('.ka-check-box').attributes('class').includes('ka-is-indeterminate')).toBe(false)
  })

  test('disabled', async () => {
    /**
     * disabled 支持接收Form FormItem CheckBoxGroup props中的disabled属性
     * 优先级为 Form > FormItem > Form > CheckBoxGroup> props
    */
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="check0" label="check label">
            <!-- 0 -->
            <ka-check-box v-model="form.check0" disabled/>
          </ka-form-item>
          <ka-form-item class="" name="check1" label="check label" :disabled="false">
            <!-- 1 -->
            <ka-check-box v-model="form.check1" disabled/>
          </ka-form-item>
          <ka-form-item class="" name="check2" label="check label" :disabled="false">
            <!-- 2 -->
            <ka-check-box-group v-model="form.check4" disabled>
              <ka-check-box name="a" />
            </ka-check-box-group>
          </ka-form-item>
        </ka-form>
        <ka-form :form="form" disabled>
          <ka-form-item name="check0" label="check label" :disabled="false">
            <!-- 3 -->
            <ka-check-box v-model="form.check0"/>
          </ka-form-item>
          <ka-form-item class="" name="check1" label="check label" :disabled="false">
            <!-- 4 -->
            <ka-check-box v-model="form.check1" :disabled="false"/>
          </ka-form-item>
          <ka-form-item class="" name="check2" label="check label" :disabled="false">
            <!-- 5 -->
            <ka-check-box-group v-model="form.check4" :disabled="false">
              <ka-check-box name="a" />
            </ka-check-box-group>
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

    const checkBox = wrapper.findAll('.ka-check-box')
    const getClass = (index: number) => checkBox[index].attributes('class')
    const getInner = (index: number) => checkBox[index].find('.ka-check-box__inner')

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
     * 优先级为 props > CheckBoxGroup > FormItem > Form > globalConfig
    */
    const wrapper = mount({
      template: `
        <ka-form :form="form">
          <ka-form-item name="a">
            <!-- 0 -->
            <ka-check-box v-model="form.a"/>
          </ka-form-item>
          <ka-form-item name="b" size="md">
            <!-- 1 -->
            <ka-check-box v-model="form.b"/>
          </ka-form-item>
          <ka-form-item name="c" size="md">
            <!-- 2 -->
            <ka-check-box v-model="form.c" size="sm"/>
          </ka-form-item>
        </ka-form>
        <ka-form :form="form" size="md">
          <ka-form-item name="d">
            <!-- 3 -->
            <ka-check-box v-model="form.d"/>
          </ka-form-item>
          <ka-form-item name="e" size="xs">
            <!-- 4 -->
            <ka-check-box v-model="form.e"/>
          </ka-form-item>
          <ka-form-item name="f" size="xs">
            <!-- 5 -->
            <ka-check-box v-model="form.f" size="sm"/>
          </ka-form-item>
          <ka-form-item name="g" size="xs">
            <!-- 6 -->
            <ka-check-box-group v-model="form.g" size="sm">
              <ka-check-box />
            </ka-check-box-group>
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

    const items = wrapper.findAll('.ka-check-box')
    expect(items[0].attributes('class').includes('ka-size-lg')).toBe(true)
    expect(items[1].attributes('class').includes('ka-size-md')).toBe(true)
    expect(items[2].attributes('class').includes('ka-size-sm')).toBe(true)
    expect(items[3].attributes('class').includes('ka-size-md')).toBe(true)
    expect(items[4].attributes('class').includes('ka-size-xs')).toBe(true)
    expect(items[5].attributes('class').includes('ka-size-sm')).toBe(true)
    expect(items[6].attributes('class').includes('ka-size-sm')).toBe(true)
  })
})

<template>
  <div class="form-demo">
    <ka-form
      ref="formRef"
      :form="formData"
      :rules="rules"
      :initial-values="initialValues"
      :disabled="formData.disabled"
      :size="size"
    >
      <ka-form-item name="name" label="姓名" :rules="rules_">
        <ka-input v-model="formData.name" placeholder="请输入姓名" clearable />
      </ka-form-item>
      <ka-form-item name="age" label="年龄">
        <ka-input v-model="formData.age" placeholder="请输入年龄" clearable />
      </ka-form-item>
      <ka-form-item name="class" label="班级">
        <ka-input
          v-model="formData.class"
          placeholder="请输入班级"
          prefix="github"
          suffix="gitlab"
          clearable
        />
      </ka-form-item>
      <!-- <ka-form-item name="switch" label="开关">
        <ka-switch v-model="formData.switch" type="primary" />
      </ka-form-item> -->
      <ka-form-item name="radio" label="单选">
        <ka-radio-group v-model="formData.radio" type="primary">
          <ka-radio value="Radio-1" />
          <ka-radio value="Radio-2" />
          <ka-radio value="Radio-3" />
        </ka-radio-group>
      </ka-form-item>
      <ka-form-item name="checkBox" label="多选">
        <ka-check-box-group v-model="formData.checkBox" type="primary">
          <ka-check-box name="Option-1" />
          <ka-check-box name="Option-2" />
          <ka-check-box name="Option-3" />
        </ka-check-box-group>
      </ka-form-item>
      <ka-form-item name="slider" label="滑块">
        <ka-slider v-model="formData.slider" :max="100" />
      </ka-form-item>
    </ka-form>
    <ka-form>
      <ka-form-item name="disabled" label="禁用状态">
        <ka-switch v-model="formData.disabled" type="primary" />
      </ka-form-item>
      <ka-form-item name="size" label="尺寸">
        <ka-radio-group v-model="size" type="primary">
          <ka-radio value="xs" />
          <ka-radio value="sm" />
          <ka-radio value="md" />
          <ka-radio value="lg" />
        </ka-radio-group>
      </ka-form-item>
    </ka-form>
    <ka-button color-type="success" @click="onSubmit">Submit</ka-button>
    <ka-button @click="clearValidate">ClearValidate</ka-button>
    <ka-button color-type="success" @click="onAddIten">AddItem</ka-button>
    <ka-button color-type="danger" @click="onReset">Reset</ka-button>
    <ka-button @click="changeRule">ChangeRule</ka-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { Rules } from 'async-validator'
import type { Ref } from 'vue'
import KaForm from '/@/components/form/src/form.vue'
import KaFormItem from '/@/components/form/src/form-item.vue'
import KaButton from '/@/components/button'
import KaSwitch from '/@/components/switch'
import KaInput from '/@/components/input'

export default defineComponent({
  name: 'FormDemo',
  components: {
    KaForm,
    KaFormItem,
    KaButton,
    KaSwitch,
    KaInput,
  },
  props: {},
  setup() {
    const initialValues = {
      name: 'Mario',
      age: '24',
      class: '',
      disabled: false,
      slider: 10,
    }
    const formData = reactive({ ...initialValues })
    const size = ref('sm')
    onMounted(() => {})
    const rules = reactive<Rules>({
      name: [{ required: true, type: 'string', message: '请输入姓名' }],
      age: [{ required: true, type: 'string', message: '请输入年龄' }],
      class: [{ required: true, type: 'string', message: '请输入班级' }],
    })
    const rules_ = [{ required: true, type: 'string', message: '请输入姓名+' }]
    const count = ref(0)
    const formRef = ref(null) as Ref<any>
    const show = ref(false)
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('pass')
        })
        .catch((err: any) => {
          console.log('error', err)
        })
    }

    const changeRule = () => {
      rules.class = [
        { required: true, type: 'string', message: 'class is required' },
        { pattern: /^[a-z]+$/, type: 'string', message: 'class pattern' },
      ]
    }
    const clearValidate = () => {
      formRef.value.clearValidate()
    }
    const onReset = () => {
      count.value++
      formRef.value.resetFields()
    }
    const onAddIten = () => {
      show.value = true
    }

    return {
      initialValues,
      formData,
      formRef,
      rules,
      rules_,
      count,
      show,
      onSubmit,
      changeRule,
      onReset,
      clearValidate,
      onAddIten,
      size,
    }
  },
})
</script>

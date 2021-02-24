<template>
  <div
    class="form-demo"
    :style="{
      padding: '20px 0',
      width: '500px',
    }"
  >
    <ka-form
      ref="formRef"
      :form="formData"
      :rules="rules"
      :initial-values="initialValues"
    >
      <ka-form-item name="name" label="姓名" :rules="rules_">
        <ka-input
          v-model="formData.name"
          placeholder="请输入姓名"
          clearable
          type="password"
        />
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
      <ka-form-item name="switch" label="开关">
        <ka-switch v-model="formData.switch" type="primary" />
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
      switch: false,
    }
    const formData = reactive({ ...initialValues })
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
    }
  },
})
</script>

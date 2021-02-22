<template>
  <div class="form-demo">
    <ka-form ref="formRef" :form="formData" :rules="rules" :initial-values="{}">
      <ka-form-item name="name" label="姓名" size="xs" :rules="rules_">
        <input v-model="formData.name" />
      </ka-form-item>
      <ka-form-item name="age" label="年龄" size="sm">
        <input v-model="formData.age" />
      </ka-form-item>
      <ka-form-item name="class" label="班级">
        <input v-model="formData.class" />
      </ka-form-item>
      <ka-form-item name="switch" label="开关">
        <KaSwitch v-model="formData.switch" type="primary" />
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

export default defineComponent({
  name: 'FormDemo',
  components: {
    KaForm,
    KaFormItem,
    KaButton,
    KaSwitch,
  },
  props: {},
  setup() {
    const formData = reactive({
      name: '',
      age: '',
      class: '',
      switch: true,
    })
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

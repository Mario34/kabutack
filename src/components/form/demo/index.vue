<template>
  <div class="form-demo">
    <KaForm ref="formRef" :form="formData" :rules="rules" inline>
      <KaFormItem name="name" label="姓名" size="xs" :rules="rules_">
        <input v-model="formData.name" />
      </KaFormItem>
      <KaFormItem name="age" label="年龄" size="sm" label-align="left">
        <input v-model="formData.age" />
      </KaFormItem>
      <KaFormItem name="class" label="班级" size="lg">
        <input v-model="formData.class" />
      </KaFormItem>
    </KaForm>
    <KaButton color-type="success" @click="onSubmit">Submit</KaButton>
    <KaButton @click="clearValidate">ClearValidate</KaButton>
    <KaButton color-type="success" @click="onAddIten">AddItem</KaButton>
    <KaButton color-type="danger" @click="onReset">Reset</KaButton>
    <KaButton @click="changeRule">ChangeRule</KaButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { Rules } from 'async-validator'
import type { Ref } from 'vue'
import KaForm from '/@/components/form/src/form.vue'
import KaFormItem from '/@/components/form/src/form-item.vue'
import KaButton from '/@/components/button'

export default defineComponent({
  name: 'FormDemo',
  components: {
    KaForm,
    KaFormItem,
    KaButton,
  },
  props: {},
  setup() {
    const formData = reactive({
      name: '',
      age: '',
      class: '',
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

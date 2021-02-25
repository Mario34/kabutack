:::demo

```html
<div class="flex mb-md">
  <ka-input v-model="form.value" placeholder="普通输入框" class="mr-md" />
  <ka-input modelValue="禁用状态" disabled />
</div>
<div class="flex">
  <ka-input
    v-model="form.value"
    placeholder="有清除按钮"
    class="mr-md"
    clearable
  />
  <ka-input
    v-model="form.pass"
    placeholder="请输入密码"
    class=""
    type="password"
  />
</div>

<script>
  import { defineComponent, reactive } from 'vue'
  export default defineComponent({
    setup() {
      const form = reactive({
        pass: '123456',
      })
      return {
        form,
      }
    },
  })
</script>
```

:::

:::demo

```html
<div class="flex mb-md">
  <ka-input
    v-model="form.value"
    placeholder="前置icon"
    class="mr-md"
    prefix="github"
  />
  <ka-input v-model="form.value" placeholder="后置icon" class="" suffix="zap" />
</div>
<div class="flex">
  <ka-input
    v-model="form.value"
    placeholder="混合输入框"
    class="mr-md"
    prefix="github"
    clearable
    suffix="zap"
  />
  <ka-input
    v-model="form.value"
    placeholder="无边框输入框"
    prefix="github"
    clearable
    suffix="zap"
    plain
  />
</div>

<script>
  import { defineComponent, reactive } from 'vue'
  export default defineComponent({
    setup() {
      const form = reactive({
        pass: '123456',
      })
      return {
        form,
      }
    },
  })
</script>
```

:::

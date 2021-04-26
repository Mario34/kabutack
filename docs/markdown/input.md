:::demo

```html
<ka-input v-model="form.value" placeholder="普通输入框" />
<br />
<ka-input modelValue="禁用状态" disabled />
<br />
<ka-input v-model="form.value" placeholder="有清除按钮" clearable />
<br />
<ka-input
  v-model="form.pass"
  placeholder="请输入密码"
  class=""
  type="password"
/>

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
<ka-input v-model="form.value" placeholder="前置icon" prefix="github" />
<br />
<ka-input v-model="form.value" placeholder="后置icon" suffix="zap" />
<br />
<ka-input
  v-model="form.value"
  placeholder="混合输入框"
  prefix="github"
  clearable
  suffix="zap"
/>
<br />
<ka-input
  v-model="form.value"
  placeholder="无边框输入框"
  prefix="github"
  clearable
  suffix="zap"
  plain
/>

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

<ka-input
  v-model="form.value"
  placeholder="混合输入框"
  prefix="github"
  clearable
  suffix="zap"
  size="xs"
/>
<br />
<ka-input
  v-model="form.value"
  placeholder="混合输入框"
  prefix="github"
  clearable
  suffix="zap"
  size="sm"
/>
<br />
<ka-input
  v-model="form.value"
  placeholder="混合输入框"
  prefix="github"
  clearable
  suffix="zap"
  size="md"
/>
<br />
<ka-input
  v-model="form.value"
  placeholder="混合输入框"
  prefix="github"
  clearable
  suffix="zap"
  size="lg"
/>

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

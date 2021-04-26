:::demo

```html
<ka-radio v-model="check" value="A" @change="onChange">check-box</ka-radio>
<ka-radio v-model="check" :disabled="check">禁用状态</ka-radio>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref()
      return {
        check,
        onChange: (v) => {
          console.log(v)
        }
      }
    },
  })
</script>
```

:::

:::demo

```html
<ka-radio-group v-model="check">
  <ka-radio value="A">Option-A</ka-radio>
  <ka-radio value="B">Option-B</ka-radio>
  <ka-radio value="C">Option-C</ka-radio>
</ka-radio-group>
<ka-radio-group v-model="check" disabled>
  <ka-radio value="A">Option-A</ka-radio>
  <ka-radio value="B">Option-B</ka-radio>
  <ka-radio value="C">Option-C</ka-radio>
</ka-radio-group>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref('')
      return {
        check,
      }
    },
  })
</script>
```

:::

:::demo

```html
<ka-radio-group v-model="check">
  <ka-radio size="xs" value="Size-xs" />
  <ka-radio size="sm" value="Size-sm" />
  <ka-radio size="md" value="Size-md" />
  <ka-radio size="lg" value="Size-lg" />
</ka-radio-group>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref(true)

      return {
        check,
      }
    },
  })
</script>
```

:::

:::demo

```html
<ka-radio-group v-model="check">
  <ka-radio :value="1">Option-1</ka-radio>
  <ka-radio :value="2">Option-2</ka-radio>
  <ka-radio :value="3">Option-3</ka-radio>
</ka-radio-group>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref('')
      return {
        check,
      }
    },
  })
</script>
```

:::

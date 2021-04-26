:::demo

```html
<ka-select v-model="value" :options="options" />

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const value = ref(4)
      return {
        value,
        options: new Array(12).fill('').map((_, i) => ({ value: i + 1, label: `选项 ${i + 1}` })),
      }
    },
  })
</script>
```

:::

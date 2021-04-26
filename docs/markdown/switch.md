:::demo

```html
<ka-switch v-model="check" size="xs">check-box</ka-switch>
<ka-switch v-model="check" size="sm">check-box</ka-switch>
<ka-switch v-model="check" size="md">check-box</ka-switch>
<ka-switch v-model="check" size="lg">check-box</ka-switch>

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

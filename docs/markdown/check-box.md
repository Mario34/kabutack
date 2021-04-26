:::demo

```html
<ka-check-box v-model="check">check-box</ka-check-box>
<ka-check-box v-model="check" :disabled="check">禁用状态</ka-check-box>

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
<ka-check-box-group v-model="check">
  <ka-check-box name="A">Option-A</ka-check-box>
  <ka-check-box name="B">Option-B</ka-check-box>
  <ka-check-box name="C">Option-C</ka-check-box>
</ka-check-box-group>
<ka-check-box-group v-model="check" disabled>
  <ka-check-box name="A">Option-A</ka-check-box>
  <ka-check-box name="B">Option-B</ka-check-box>
  <ka-check-box name="C">Option-C</ka-check-box>
</ka-check-box-group>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref([])
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
<ka-check-box-group v-model="check">
  <ka-check-box size="xs" name="Size-xs"/>
  <ka-check-box size="sm" name="Size-sm"/>
  <ka-check-box size="md" name="Size-md"/>
  <ka-check-box size="lg" name="Size-lg"/>
</ka-check-box-group>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref([])
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
<ka-check-box v-model="check" indeterminate>check-box</ka-check-box>
<ka-check-box v-model="check" indeterminate disabled>禁用状态</ka-check-box>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref(false)
      return {
        check,
      }
    },
  })
</script>
```

:::

:::demo 通过 `max` 、`min` 属性控制选项数量

```html
<ka-check-box-group v-model="check" :max="2" :min="1">
  <ka-check-box name="A">Option-A</ka-check-box>
  <ka-check-box name="B">Option-B</ka-check-box>
  <ka-check-box name="C">Option-C</ka-check-box>
</ka-check-box-group>

<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      const check = ref(['B'])
      return {
        check,
      }
    },
  })
</script>
```

:::

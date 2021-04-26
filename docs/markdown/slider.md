:::demo

```html
<div class="slider-demo">
  <ka-slider v-model="value" :min="20" :max="60" :step="1" /> 
  <ka-slider disabled v-model="value" :min="20" :max="60" :step="1" /> 
</div>

<script>
  import { defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    setup() {
      const value = ref(45)
      const numstr = ref(0)

      watch(numstr, () => {
        value.value = +numstr.value
      })

      return {
        value,
        numstr,
      }
    },
  })
</script>
```

:::

:::demo

```html
<div class="slider-demo">
  <ka-slider v-model="value" :min="0" :max="200" :step="1" vertical/> 
</div>

<script>
  import { defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    setup() {
      const value = ref(45)
      const numstr = ref(0)

      watch(numstr, () => {
        value.value = +numstr.value
      })

      return {
        value,
        numstr,
      }
    },
  })
</script>
```

:::

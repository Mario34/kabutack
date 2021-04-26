:::demo 基本用法

```html
<ka-tooltip>
  <template #content>
    <div>this is tooltip content slot.</div>
  </template>
  <ka-button>Hover Me</ka-button>
</ka-tooltip>
```

:::

:::demo 点击激活

```html
<ka-tooltip triggerType="click">
  <template #content>
    <div>this is tooltip content slot.</div>
  </template>
  <ka-button>Click Me</ka-button>
</ka-tooltip>
```

:::

:::demo 通过`placement`控制位置

```html
<ka-tooltip :placement="placement">
  <template #content>
    <div>this is tooltip content slot.</div>
  </template>
  <ka-button>Change Placement</ka-button>
</ka-tooltip>
<br />
<br />
<br />
<ka-radio-group v-model="placement">
  <ka-radio value="top" />
  <ka-radio value="right" />
  <ka-radio value="bottom" />
  <ka-radio value="left" />
</ka-radio-group>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const placement = ref('top')

      return {
        placement,
      }
    },
  })
</script>
```

:::

:::demo 手动控制显示隐藏

```html
<ka-tooltip :isShow="show" triggerType="manual">
  <template #content>
    <div>this is tooltip content slot.</div>
  </template>
  <ka-button light>Manual</ka-button>
</ka-tooltip>
<br />
<br />
显示：<ka-switch v-model="show" />

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const show = ref(true)

      return {
        show,
      }
    },
  })
</script>
```

:::

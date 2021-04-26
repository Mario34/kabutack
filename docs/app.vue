<template>
  <DocLayout />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import routes from './routes'
import DocLayout from './components/doc-layout/index.vue'

export default defineComponent({
  name: 'Docs',
  components: {
    DocLayout,
  },
  provide: {
    size: 'sm',
  },
  setup() {
    return {
      routes,
    }
  },
})
</script>

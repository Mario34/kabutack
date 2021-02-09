<template>
  <div class="demo">
    <div class="nav-bar">
      <router-link
        v-for="route in routes"
        :key="route.path"
        class="nav-bar__item"
        :to="route.path"
      >{{ route.name }}</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import routes from './routes'

export default defineComponent({
  name: 'Docs',
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

<style lang="scss">
.demo {
  width: 800px;
  margin: 0 auto;
}

.nav-bar {
  text-align: center;

  &__item {
    margin: 0 10px;
  }
}
</style>

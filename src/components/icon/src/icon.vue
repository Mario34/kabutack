<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="ka-icon"
  >
    <use v-if="icon" :xlink:href="`#ka-icon-${icon}`" />
    <svg v-else viewBox="0 0 24 24">
      <slot />
    </svg>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KaIcon',
  props: {
    icon: String,
  },
})
</script>

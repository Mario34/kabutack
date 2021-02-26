<template>
  <span class="ka-check-icon" :class="{ checked, disabled, isIndeterminate }">
    <svg
      v-if="isIndeterminate"
      class="ka-check-icon__inner indeterminate"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    ><line x1="5" x2="19" y1="12" y2="12" /></svg>
    <svg
      v-else
      class="ka-check-icon__inner"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/icon'

export default defineComponent({
  name: 'KaCheckIcon',
  components: {
    [Icon.name]: Icon,
  },
  props: {
    checked: Boolean,
    disabled: Boolean,
    isIndeterminate: Boolean,
  },
})
</script>

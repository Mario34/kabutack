<template>
  <div class="ka-icon-demo">
    <div v-for="icon in icons" :key="icon" class="ka-icon-demo__item">
      <KaIcon class="ka-icon-demo__icon" :icon="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import featherIcons from 'feather-icons/dist/icons.json'

export default defineComponent({
  name: 'ButtonDemo',
  setup() {
    return {
      icons: Object.keys(featherIcons),
    }
  },
})
</script>

<style lang="scss">
.ka-icon-demo {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 60px;
    margin: 8px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
  }

  &__icon {
    font-size: 28px;
    color: #313131;
  }
}
</style>

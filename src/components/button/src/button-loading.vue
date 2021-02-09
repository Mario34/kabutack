<template>
  <div class="ka-button-loading" :class="{light}">
    <span class="point"></span>
    <span class="point"></span>
    <span class="point"></span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ButtonLoading',
  props: {
    light: Boolean,
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/config/color.scss';

.ka-button-loading {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: mix($black, $transparent, 15%);
  position: absolute;

  &.light {
    background-color: mix($black, $transparent, 15%);
  }

  @keyframes flicker {
    50% {
      transform: scale(0.9);
      opacity: 0.6;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .point {
    display: inline-block;
    background-color: $white;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 2px;

    &:nth-child(1) {
      animation: flicker 700ms 0ms infinite linear;
    }

    &:nth-child(2) {
      animation: flicker 700ms 350ms infinite linear;
    }

    &:nth-child(3) {
      animation: flicker 700ms 0ms infinite linear;
    }
  }
}
</style>

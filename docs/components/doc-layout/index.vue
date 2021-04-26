<template>
  <div class="doc-layout">
    <header class="doc-layout__header">
      <div class="fixed-box">
        <div class="app-container">
          <div class="left">
            <img class="logo" src="../../img/logo.png" alt="" />
            <img class="logo-text" src="../../img/logo-text.png" alt="" />
          </div>
          <div class="right">
            <a href="https://github.com/Mario34/kabutack" target="blank" class="github">
              <ka-icon icon="github" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="doc-layout__main app-container">
      <div class="doc-layout__side-bar">
        <router-link
          v-for="route in routes"
          :key="route.path"
          class="side-bar-item"
          :to="route.path"
        >{{ route.name }}</router-link>
      </div>
      <div class="doc-layout__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import routes from '/@r/docs/routes'

export default defineComponent({
  name: 'DocLayout',
  setup() {
    return {
      routes,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../../../src/styles/config/color.scss';

.doc-layout {
  box-sizing: border-box;

  $header-height: 50px;

  &__header {
    height: $header-height;

    .fixed-box {
      width: 100%;
      position: fixed;
      height: $header-height;
      background-color: #fff;
      z-index: 100;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;

      .app-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .left {
        display: flex;
        align-items: center;

        .logo {
          height: 30px;
          width: 30px;
          margin-right: 8px;
        }

        .logo-text {
          height: 20px;
        }
      }

      .right {
        .github {
          color: #333;
          font-size: 14px;

          &:hover {
            color: $primary;
          }
        }
      }
    }
  }

  &__main {
    position: relative;
  }

  &__side-bar {
    position: fixed;
    width: 200px;
    height: calc(100vh - #{$header-height});
    overflow-y: auto;
    top: $header-height;
    padding: 30px 0 10px;
    box-sizing: border-box;

    .side-bar-item {
      line-height: 40px;
      display: block;

      &.router-link-exact-active {
        color: #4299e1;
      }
    }
  }

  &__content {
    margin-left: 200px;
    padding: 30px 20px 40px;
    overflow: hidden;
  }
}
</style>

<template>
  <div class="toast-demo">
    <KaButton
      color-type="primary"
      icon="github"
      light
      @click="onClick('primary')"
    >Esm</KaButton><br /><br />
    <KaButton color-type="primary" @click="onClick('primary')">Toast</KaButton><br /><br />
    <KaButton color-type="success" @click="onClick('success')">Toast</KaButton><br /><br />
    <KaButton color-type="warning" @click="onClick('warning')">Toast</KaButton><br /><br />
    <KaButton color-type="danger" @click="onClick('error')">Toast</KaButton><br /><br />
    <KaButton color-type="danger" @click="onClickRender">Toast Render</KaButton><br /><br />
    <KaButton color-type="danger" @click="onCloseAll">CloseAll</KaButton><br /><br />
  </div>
</template>

<script>
import { defineComponent, h } from 'vue'
import KaUI from '/@/'

export default defineComponent({
  name: 'ToastDemo',
  setup() {
    const onClick = (type) => {
      KaUI.Toast({
        title: 'Toast 标题',
        content: 'This is a Toast content',
        duration: 3000,
        type,
      })
    }
    const onClickRender = () => {
      KaUI.Toast({
        title: 'Toast 标题',
        duration: 3000,
        render: () =>
          h('div', [
            h('div', 'custom render h2'),
            h('div', 'custom render h3'),
          ]),
      })
    }
    const onCloseAll = () => {
      KaUI.Toast.closeAll()
    }
    return {
      onClick,
      onClickRender,
      onCloseAll,
    }
  },
})
</script>

<style lang="scss" scoped>
.toast-demo {
  padding: 90px 90px;
}
</style>

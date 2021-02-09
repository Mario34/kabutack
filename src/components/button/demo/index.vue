<template>
  <div style="text-align: center;">
    <br />
    <br />
    <KaButton color-type="primary">Button</KaButton>
    <KaButton color-type="warning">Button</KaButton>
    <KaButton color-type="success">Button</KaButton>
    <KaButton color-type="danger">Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" loading>Button</KaButton>
    <KaButton color-type="warning" loading>Button</KaButton>
    <KaButton color-type="success" loading>Button</KaButton>
    <KaButton color-type="danger" loading>Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" disabled>Button</KaButton>
    <KaButton color-type="warning" disabled>Button</KaButton>
    <KaButton color-type="success" disabled>Button</KaButton>
    <KaButton color-type="danger" disabled>Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" icon="github" />
    <KaButton color-type="primary" icon="github">Button</KaButton>
    <KaButton color-type="warning" icon="github">Button</KaButton>
    <KaButton color-type="success" icon="github">Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" light icon="github" />
    <KaButton color-type="primary" light icon="github">Button</KaButton>
    <KaButton color-type="warning" light icon="github">Button</KaButton>
    <KaButton color-type="success" light icon="github">Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" light>Button</KaButton>
    <KaButton color-type="warning" light>Button</KaButton>
    <KaButton color-type="success" light>Button</KaButton>
    <KaButton color-type="danger" light>Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" light loading>Button</KaButton>
    <KaButton color-type="warning" light loading>Button</KaButton>
    <KaButton color-type="success" light loading>Button</KaButton>
    <KaButton color-type="danger" light loading>Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" light disabled>Button</KaButton>
    <KaButton color-type="warning" light disabled>Button</KaButton>
    <KaButton color-type="success" light disabled>Button</KaButton>
    <KaButton color-type="danger" light disabled>Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" :round="true">Button</KaButton>
    <KaButton color-type="warning" :round="true">Button</KaButton>
    <KaButton color-type="success" :round="true">Button</KaButton>
    <KaButton color-type="danger" :round="true">Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" :round="true" loading>Button</KaButton>
    <KaButton color-type="warning" :round="true" loading>Button</KaButton>
    <KaButton color-type="success" :round="true" loading>Button</KaButton>
    <KaButton color-type="danger" :round="true" loading>Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" :round="true" disabled>Button</KaButton>
    <KaButton color-type="warning" :round="true" disabled>Button</KaButton>
    <KaButton color-type="success" :round="true" disabled>Button</KaButton>
    <KaButton color-type="danger" :round="true" disabled>Button</KaButton>
    <br />
    <br />
    <KaButton color-type="primary" size="xs">Button</KaButton>
    <KaButton color-type="primary" size="sm">Button</KaButton>
    <KaButton color-type="primary" size="md">Button</KaButton>
    <KaButton color-type="primary" size="lg">Button</KaButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonDemo',
})
</script>

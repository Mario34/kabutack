import type { Plugin } from 'vite'
import mdCompile from './md-compile'

export default function mdPlugin(): Plugin {
  /* 参考vite-plugin-md https://github.com/antfu/vite-plugin-md/blob/main/src/index.ts */
  let vuePlugin
  return {
    name: 'md-plugin',
    enforce: 'pre',
    configResolved(config) {
      vuePlugin = config.plugins.find(p => p.name === 'vite:vue')
      if (!vuePlugin)
        throw new Error('[md-plugin] no vue plugin found, do you forget to install it?')
    },
    transform(row, id) {
      if (id.endsWith('.md')) {
        return mdCompile(row)
      }
    },
  }
}
